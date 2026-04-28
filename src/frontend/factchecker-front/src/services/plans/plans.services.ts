import { BaseServicesResponse } from '@/lib/base';
import type { PricingPlanResponse } from '@/lib/plans';
import { getApiBaseUrl } from '@/utils/app-info';

export const getPricingPlans = async (): Promise<
	BaseServicesResponse<PricingPlanResponse[]>
> => {
	try {
		const response = await fetch(`${getApiBaseUrl()}/plans/pricing`, {
			cache: 'no-store',
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = (await response.json()) as BaseServicesResponse<
			PricingPlanResponse[]
		>;

		// Validate the response structure
		if (!result || typeof result.isSuccess !== 'boolean') {
			throw new Error('Invalid response format from API');
		}

		return result;
	} catch (error) {
		console.error('Error fetching pricing plans:', error);
		return {
			statusCode: 500,
			message: 'Error al obtener los planes de precios',
			isSuccess: false,
			errors: [error instanceof Error ? error.message : String(error)],
			data: null,
		};
	}
};
