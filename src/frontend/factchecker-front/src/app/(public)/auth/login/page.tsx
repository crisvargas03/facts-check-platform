import { HasAccount } from '@/components/auth';
import { Button, FormInput, Separator } from '@/components/ui';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
	return (
		<div className='m-5 max-w-7xl mx-auto p-5'>
			<h1 className='text-4xl lg:text-5xl font-bold mb-2'>
				¡Bienvenido de Nuevo!
			</h1>
			<span className='text-gray-600 text-sm lg:text-base'>
				Inicia sesión con tus credenciales
			</span>

			<div className='flex flex-col lg:flex-row gap-8 mt-8'>
				<div className='w-full lg:w-1/2'>
					<form className='flex flex-col gap-4'>
						<FormInput
							labelText='Correo Electrónico'
							placeholder='Ingresa tu correo electrónico'
						/>
						<FormInput
							labelText='Contraseña'
							placeholder='Ingresa tu contraseña'
						/>

						<Button text='Iniciar Sesión' />
					</form>
				</div>

				<div className='w-full lg:w-1/2 flex flex-col items-center'>
					<div className='flex flex-col w-full max-w-sm gap-4 mt-4'>
						<Separator text='Continuar con' />

						<Button
							text='Iniciar con Google'
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
							text='¿No tienes una cuenta?'
							textLink='Regístrate aquí'
							link='/auth/signup'
						/>
					</div>

					<div className='mt-10 w-full max-w-md'>
						<Image
							src='https://images.law.com/contrib/content/uploads/sites/390/2021/08/Artificial-Intelligence-Technology-767x633.jpg'
							alt='Login Ilustración'
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
