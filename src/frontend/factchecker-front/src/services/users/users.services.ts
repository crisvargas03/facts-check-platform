import { BaseServicesResponse } from '@/lib/base';
import { UserServicesResponse } from '@/lib/users';
import { apiUrl } from '@/utils/app-info';

export const getUserInfo = async (email: string, token: string) => {
	try {
		const response = await fetch(
			`${apiUrl}/users/info?email=${encodeURIComponent(email)}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
			// TODO: Cache for 120 seconds
		);
		if (response.status === 401) {
			return {
				statusCode: 401,
				message: 'Unauthorized access',
				isSuccess: false,
				errors: ['Invalid token or user not authenticated'],
				data: null,
			};
		}
		const result =
			(await response.json()) as BaseServicesResponse<UserServicesResponse>;

		return result;
	} catch (error) {
		console.error('Error fetching pricing plans:', error);
		return {
			statusCode: 500,
			message: 'Error al obtener la información del usuario',
			isSuccess: false,
			errors: [error as string],
			data: null,
		};
	}
};
