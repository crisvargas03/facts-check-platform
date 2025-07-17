'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, FormInput } from '../ui';
import { PolicyCheckbox } from './PolicyCheckbox';
import { postSignUp } from '@/services';
import { setCookieData } from '@/utils';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type SignUpInputs = {
	name: string;
	lastName: string;
	email: string;
	password: string;
};

export const SignUpForm = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpInputs>();

	const onSubmit: SubmitHandler<SignUpInputs> = data => {
		const toastId = toast.loading('Cargando...');
		postSignUp(data).then(res => {
			if (res?.statusCode === 200) {
				const user = {
					expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
					token: res.data?.token,
					user: res.data?.email,
				};

				setCookieData('__user__', user);

				toast.success('Cuenta creada exitosamente', {
					id: toastId,
				});
				router.push('/dashboard');
			}

			if (res?.statusCode === 400) {
				toast.error('Verifique los datos ingresados', {
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
				labelText='Nombre'
				placeholder='Ingresa tu nombre'
				register={register}
				errors={errors}
				type='text'
				name='name'
				required={true}
				minLength={2}
			/>
			<FormInput
				labelText='Apellido'
				placeholder='Ingresa tu apellido'
				register={register}
				errors={errors}
				type='text'
				name='lastName'
				required={true}
				minLength={2}
			/>
			<FormInput
				labelText='Correo Electrónico'
				placeholder='Ingresa tu correo electrónico'
				register={register}
				errors={errors}
				type='email'
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
				minLength={10}
			/>

			<PolicyCheckbox />

			<Button text='Crear Cuenta' type='submit' />
		</form>
	);
};
