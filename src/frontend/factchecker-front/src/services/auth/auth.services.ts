import { LoginFormData, LoginResponse } from '@/lib/auth';
import { BaseServicesResponse } from '@/lib/base';

export const postLogin = async (data: LoginFormData) => {
	try {
		const response = (await fetch(`http://localhost:5177/api/auth/login`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(data => data)) as BaseServicesResponse<LoginResponse>;

		return response;
	} catch (error) {
		console.error('Error al iniciar sesión:', error);
	}
};
