'use client';

import { Button } from '../ui/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { postLogin } from '@/services';
import toast from 'react-hot-toast';

type Inputs = {
	email: string;
	password: string;
};

export const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = data => {
		const toastId = toast.loading('Cargando...');
		postLogin(data)
			.then(res => {
				if (res?.statusCode === 200) {
					// TODO: Guardar el token en el cookie
					// TODO: Redirigir al dashboard
					toast.success('Inicio de sesión exitoso');
				}

				if (res?.statusCode === 400) {
					toast.error('Contraseña o usuario incorrectos', {
						icon: '🔒',
					});
				}

				if (res?.statusCode === 500) {
					toast.error(
						'Error al iniciar sesión, por favor intente mas tarde...'
					);
				}
			})
			.finally(() => {
				toast.dismiss(toastId);
			});
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
			<div className='mb-5'>
				<label htmlFor=''>
					<span className='text-gray-400 '>Correo Electrónico</span>
					<input
						type='text'
						className={`w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded mt-1 ${
							errors.email && 'border-red-500'
						}`}
						placeholder='Ingresa tu correo electrónico'
						required
						{...register('email', {
							required: true,
							pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
						})}
					/>
					{errors.email && (
						<span className='text-red-500 text-xs'>
							{errors.email.type === 'pattern'
								? 'El correo electrónico no es válido'
								: 'Este campo es requerido'}
						</span>
					)}
				</label>
			</div>
			<div className='mb-5'>
				<label htmlFor=''>
					<span className='text-gray-400'>Contraseña</span>
					<input
						type='password'
						className={`w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded mt-1 ${
							errors.password && 'border-red-500'
						}`}
						placeholder='Ingresa tu contraseña'
						required
						{...register('password', {
							required: true,
							minLength: 8,
						})}
					/>
					{errors.password && (
						<span className='text-red-500 text-xs'>
							{errors.password.type === 'minLength'
								? 'La contraseña debe tener al menos 8 caracteres'
								: 'Este campo es requerido'}
						</span>
					)}
				</label>
			</div>

			<Button text='Iniciar Sesión' type='submit' />
		</form>
	);
};
