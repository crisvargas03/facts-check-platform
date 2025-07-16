'use client';

import { Button } from '../ui/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { postLogin } from '@/services';
import toast from 'react-hot-toast';
import { FormInput } from '../ui';
import { useRouter } from 'next/navigation';
import { setCookieData } from '@/utils';

type LoginInputs = {
	email: string;
	password: string;
};

export const LoginForm = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInputs>();

	const onSubmit: SubmitHandler<LoginInputs> = data => {
		const toastId = toast.loading('Cargando...');
		postLogin(data).then(res => {
			if (res?.statusCode === 200) {
				const user = {
					expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
					token: res.data?.token,
					user: res.data?.email,
				};

				setCookieData('__user__', user);

				toast.success('Inicio de sesión exitoso', {
					id: toastId,
				});
				router.push('/dashboard');
			}

			if (res?.statusCode === 400) {
				toast.error('Contraseña o usuario incorrectos', {
					icon: '🔒',
					id: toastId,
				});
			}

			if (res?.statusCode === 500) {
				toast.error(
					'Error al iniciar sesión, por favor intente mas tarde...',
					{
						id: toastId,
					}
				);
			}
		});
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
			<FormInput
				labelText='Correo Electrónico'
				placeholder='Ingresa tu correo electrónico'
				register={register}
				errors={errors}
				type='text'
				name='email'
				required={true}
			/>
			<FormInput
				labelText='Contraseña'
				placeholder='Ingresa tu contraseña'
				register={register}
				errors={errors}
				type='password'
				name='password'
				required={true}
			/>
			<Button text='Iniciar Sesión' type='submit' />
		</form>
	);
};
