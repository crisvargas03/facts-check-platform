'use client';
import React from 'react';
import { Button } from '../ui/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { postLogin } from '@/services';
import { showErrorToast } from '@/utils/toasts-alert';

type Inputs = {
	email: string;
	password: string;
};

// TODO: Agregar un loading state
// TODO: Agregar un mensaje de error si el usuario no existe
// TODO: Agregar un mensaje de error si la contraseña es incorrecta
// TODO: Agregar un mensaje de error si el usuario no existe

export const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = data => {
		postLogin(data)
			.then(res => {
				if (res?.statusCode === 400) {
					showErrorToast(res?.errors.join(','));
				}
			})
			.catch(() => {
				showErrorToast('Error al iniciar sesión...');
			});
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
			<div className='mb-5'>
				<label htmlFor=''>
					<span className='text-gray-400'>Correo Electrónico</span>
					<input
						type='email'
						className='w-full p-2 border border-gray-300 rounded mt-1'
						placeholder='Ingresa tu correo electrónico'
						required
						{...register('email', { required: true })}
					/>
					{errors.email && (
						<span className='text-red-500 text-xs'>
							Este campo es requerido
						</span>
					)}
				</label>
			</div>
			<div className='mb-5'>
				<label htmlFor=''>
					<span className='text-gray-400'>Contraseña</span>
					<input
						type='password'
						className='w-full p-2 border border-gray-300 rounded mt-1'
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
