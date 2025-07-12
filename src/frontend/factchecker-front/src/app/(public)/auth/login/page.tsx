import { HasAccount } from '@/components/auth';
import { Button, FormInput, Separator } from '@/components/ui';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
	return (
		<div className='m-5'>
			<h1 className='text-4xl font-bold mb-1'>¡Bienvenido de Nuevo!</h1>
			<span className='text-gray-600 text-sm'>
				Inicia Sesión con tus credenciales
			</span>

			<div className='flex flex-col md:flex-row gap-5 justify-center items-center'>
				{/* Form Section */}
				<div className='w-full md:w-1/2'>
					<div className='flex flex-col'>
						<form className='flex flex-col gap-5 mt-10'>
							<FormInput
								labelText='Correo Electrónico'
								placeholder='Ingresa tu correo electrónico'
							/>

							<FormInput
								labelText='Contraseña'
								placeholder='Ingresa tu contraseña'
							/>

							<div className='mb-5'>
								<Button text='Iniciar Sesión' />
							</div>
						</form>

						<Separator text='Continuar con' />
						<div className='mb-10'>
							<Button
								text='Iniciar Sesión con Google'
								color='secondary'
								icon={
									<FcGoogle
										size={25}
										className='inline-block ml-2'
									/>
								}
							/>
						</div>

						<HasAccount
							text='¿No tienes una cuenta?'
							textLink='Regístrate aquí'
							link='/auth/signup'
						/>
					</div>
				</div>

				{/* Image Section */}
				<div className='md:w-1/2 flex lg:justify-center'>
					<Image
						src='https://images.law.com/contrib/content/uploads/sites/390/2021/08/Artificial-Intelligence-Technology-767x633.jpg'
						alt='Login Image'
						width={400}
						height={600}
						priority
						className='object-cover hidden md:block rounded-3xl shadow-2xl w-auto h-auto'
					/>
				</div>
			</div>
		</div>
	);
}
