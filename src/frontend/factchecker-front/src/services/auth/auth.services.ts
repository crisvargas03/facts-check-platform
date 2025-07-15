import { LoginFormData, LoginResponse } from '@/lib/auth';
import { BaseServicesResponse } from '@/lib/base';

export const postLogin = async (
	data: LoginFormData
): Promise<BaseServicesResponse<LoginResponse>> => {
	try {
		const response = await fetch(`http://localhost:5177/api/auth/login`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const result =
			(await response.json()) as BaseServicesResponse<LoginResponse>;

		return result;
	} catch (error) {
		console.error('Error al iniciar sesión:', error);
		return {
			statusCode: 500,
			message: 'Error al iniciar sesión',
			isSuccess: false,
			errors: [error as string],
			data: null,
		};
	}
};
