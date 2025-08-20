import type {
	LoginFormData,
	LoginResponse,
	SignUpFormData,
	SignUpResponse,
} from '@/lib/auth';
import { BaseServicesResponse } from '@/lib/base';
import { apiUrl } from '@/utils';

export const postLogin = async (
	data: LoginFormData
): Promise<BaseServicesResponse<LoginResponse>> => {
	try {
		const response = await fetch(`${apiUrl}/auth/login`, {
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

export const postSignUp = async ({
	fullName,
	email,
	password,
	registrationMethod,
}: SignUpFormData): Promise<BaseServicesResponse<SignUpResponse>> => {
	try {
		const body = {
			name: fullName,
			email,
			password,
			registrationMethod,
		};
		const response = await fetch(`${apiUrl}/auth/register`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const result =
			(await response.json()) as BaseServicesResponse<SignUpResponse>;

		return result;
	} catch (error) {
		console.error('Error al crear cuenta:', error);
		return {
			statusCode: 500,
			message: 'Error al crear cuenta',
			isSuccess: false,
			errors: [error as string],
			data: null,
		};
	}
};
