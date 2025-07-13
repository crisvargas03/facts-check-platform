import { HasAccount, PolicyCheckbox } from '@/components/auth';
import { Button, FormInput, Separator } from '@/components/ui';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';

export default function SignUpPage() {
	return (
		<div className='m-5 max-w-7xl mx-auto p-5'>
			<h1 className='text-4xl lg:text-5xl font-bold mb-2'>
				Crear una cuenta
			</h1>
			<span className='text-gray-600 text-sm lg:text-base'>
				Complete los datos del formulario
			</span>

			<div className='flex flex-col lg:flex-row gap-8 mt-8'>
				<div className='w-full lg:w-1/2'>
					<form className='flex flex-col gap-4'>
						<FormInput
							labelText='Nombre'
							placeholder='Ingresa tu nombre'
						/>
						<FormInput
							labelText='Apellido'
							placeholder='Ingresa tu apellido'
						/>
						<FormInput
							labelText='Correo Electrónico'
							placeholder='Ingresa tu correo electrónico'
						/>
						<FormInput
							labelText='Contraseña'
							placeholder='Ingresa tu contraseña'
						/>

						<PolicyCheckbox />

						<Button text='Crear Cuenta' />
					</form>
				</div>
				<div className='w-full lg:w-1/2 flex flex-col items-center'>
					<div className='flex flex-col w-full max-w-sm gap-4 mt-4'>
						<Separator text='Continuar con' />

						<Button
							text='Registrarse con Google'
							color='secondary'
							icon={
								<FcGoogle
									size={20}
									className='inline-block ml-2'
								/>
							}
						/>
					</div>

					<div className='mt-6'>
						<HasAccount
							text='¿Ya tienes una cuenta?'
							textLink='Inicia Sesión'
							link='/auth/login'
						/>
					</div>

					<div className='mt-10 w-full max-w-md'>
						<Image
							src='https://images.law.com/contrib/content/uploads/sites/390/2021/08/Artificial-Intelligence-Technology-767x633.jpg'
							alt='Registro Ilustración'
							width={600}
							height={600}
							className='w-full h-auto object-contain rounded-2xl hidden lg:block'
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
