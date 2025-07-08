import { HasAccount } from '@/components/auth';
import { Button, FormInput } from '@/components/ui';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
	return (
		<div className='m-5'>
			<h1 className='text-4xl font-bold mb-1'>Bienvenido de Nuevo</h1>
			<span className='text-gray-600 text-sm '>
				Inicia Sesión con tus credenciales
			</span>

			<div className='flex flex-row gap-5'>
				<div className='flex-1'>
					<div className='flex flex-col mt-10'>
						<form>
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
						<hr className='my-5 text-gray-300' />
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
				<div className='flex-1 w-full flex h-full items-center justify-center'>
					<Image
						src={
							'https://images.unsplash.com/photo-1727434032773-af3cd98375ba?q=80&w=3864&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
						}
						alt='Login Image'
						width={700}
						height={1200}
						priority
						className='rounded-lg'
					/>
				</div>
			</div>
		</div>
	);
}
