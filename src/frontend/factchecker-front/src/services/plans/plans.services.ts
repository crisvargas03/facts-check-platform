import { BaseServicesResponse } from '@/lib/base';
import type { PricingPlanResponse } from '@/lib/plans';
import { apiUrl } from '@/utils/app-info';

export const getPricingPlans = async (): Promise<
	BaseServicesResponse<PricingPlanResponse[]>
> => {
	try {
		const response = await fetch(`${apiUrl}/plans/pricing`);

		const result = (await response.json()) as BaseServicesResponse<
			PricingPlanResponse[]
		>;

		return result;
	} catch (error) {
		console.error('Error fetching pricing plans:', error);
		return {
			statusCode: 500,
			message: 'Error al obtener los planes de precios',
			isSuccess: false,
			errors: [error as string],
			data: null,
		};
	}
};
