import { BaseServicesResponse } from '@/lib/base';
import { PricingPlanResponse } from '@/lib/plans';
import { apiUrl } from '@/utils/app-info';

export const getPricingPlans = async (): Promise<PricingPlanResponse[]> => {
	try {
		const respose = (await fetch(`${apiUrl}/plans/pricing`).then(res =>
			res.json()
		)) as BaseServicesResponse<PricingPlanResponse[]>;

		if (!respose.isSuccess) {
			throw new Error('Failed to fetch pricing plans');
		}

		return respose.data;
	} catch (error) {
		console.error('Error fetching pricing plans:', error);
		throw error;
	}
};
