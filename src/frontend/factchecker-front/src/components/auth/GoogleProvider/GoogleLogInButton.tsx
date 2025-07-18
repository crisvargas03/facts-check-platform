'use client';

import { useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui';
import { FcGoogle } from 'react-icons/fc';
import { postLogin } from '@/services';
import { LoginFormData } from '@/lib/auth';
import { setCookieData } from '@/utils';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export function GoogleLogInButton() {
	const router = useRouter();
	useEffect(() => {
		function onMessage(e: MessageEvent) {
			if (e.origin !== window.location.origin) return;
			if (e.data?.type === 'oauth:google' && e.data.user) {
				// recibes aquí `{ name, email, picture }`
				const toastId = toast.loading('Cargando...');
				const userToLogin: LoginFormData = {
					email: e.data.user.email as string,
					password: '',
					loginMethod: 'google',
				};

				postLogin(userToLogin).then(res => {
					if (res?.statusCode === 200) {
						const user = {
							expires: new Date(
								Date.now() + 1000 * 60 * 60 * 24 * 30
							),
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
			}
		}
		window.addEventListener('message', onMessage);
		return () => window.removeEventListener('message', onMessage);
	}, [router]);

	const handleGoogle = async () => {
		// indicamos al signIn que no redirija y que, tras oauth,
		// nos lleve a /auth/popup-callback
		const res = await signIn('google', {
			redirect: false,
			callbackUrl: `${window.location.origin}/auth/popup-callback`,
		});

		if (!res?.url) {
			console.error('No se obtuvo URL de autenticación:', res);
			return;
		}

		const width = 500;
		const height = 600;
		const left = window.screenX + (window.innerWidth - width) / 2;
		const top = window.screenY + (window.innerHeight - height) / 2;

		window.open(
			res.url,
			'google_oauth',
			`width=${width},height=${height},left=${left},top=${top}`
		);
	};

	return (
		<Button
			onClick={handleGoogle}
			text='Iniciar sesión con Google'
			color='secondary'
			icon={<FcGoogle size={20} className='inline-block ml-2' />}
		/>
	);
}
