'use client';
import React from 'react';
import { FormInput } from '../ui/FormInput';
import { showToast } from 'nextjs-toast-notify';
import { Button } from '../ui/Button';

export const LoginForm = () => {
	const handleShowToast = () => {
		showToast.success('¡La operación se realizó con éxito!', {
			duration: 5000,
			progress: true,
			position: 'top-right',
			transition: 'bounceIn',
		});
	};

	return (
		<form className='flex flex-col gap-4'>
			<FormInput
				labelText='Correo Electrónico'
				placeholder='Ingresa tu correo electrónico'
			/>
			<FormInput
				labelText='Contraseña'
				placeholder='Ingresa tu contraseña'
			/>

			<Button
				text='Iniciar Sesión'
				onClick={() => {
					handleShowToast();
				}}
			/>
		</form>
	);
};
