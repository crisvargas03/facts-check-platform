import { BaseServicesResponse } from '@/lib/base';
import {
	ComparisonStatsServiceResponse,
	HistoryDataParams,
	HistoryDataServiceResponse,
	SummaryStatsServiceResponse,
} from '@/lib/dashboard/dashboard.responses';
import { apiUrl } from '@/utils';

interface Params {
	user: string;
	startDate: string;
	endDate: string;
}

export const getSummaryStatsInfo = async (
	params: Params
): Promise<BaseServicesResponse<SummaryStatsServiceResponse>> => {
	try {
		const { user, startDate, endDate } = params;
		if (!user || !startDate || !endDate) {
			return {
				statusCode: 400,
				message: 'Invalid parameters',
				isSuccess: false,
				errors: ['User, startDate and endDate are required'],
				data: null,
			};
		}
		const response = await fetch(
			`${apiUrl}/dashboard/summary?user=${user}&startDate=${startDate}&endDate=${endDate}`
		);

		if (!response.ok) {
			return {
				statusCode: response.status,
				message: 'Error fetching summary stats',
				isSuccess: false,
				errors: [await response.text()],
				data: null,
			};
		}

		const result =
			(await response.json()) as BaseServicesResponse<SummaryStatsServiceResponse>;
		return {
			statusCode: 200,
			message: 'Summary stats fetched successfully',
			isSuccess: true,
			errors: [],
			data: result.data,
		};
	} catch (error) {
		return {
			statusCode: 500,
			message: 'Error fetching summary stats',
			isSuccess: false,
			errors: [error as string],
			data: null,
		};
	}
};

export const getComparisonStatsInfo = async (
	params: Params
): Promise<BaseServicesResponse<ComparisonStatsServiceResponse>> => {
	try {
		const { user, startDate, endDate } = params;
		if (!user || !startDate || !endDate) {
			return {
				statusCode: 400,
				message: 'Invalid parameters',
				isSuccess: false,
				errors: ['User, startDate and endDate are required'],
				data: null,
			};
		}
		const response = await fetch(
			`${apiUrl}/dashboard/comparison?user=${user}&startDate=${startDate}&endDate=${endDate}`
		);

		if (!response.ok) {
			return {
				statusCode: response.status,
				message: 'Error fetching comparison stats',
				isSuccess: false,
				errors: [await response.text()],
				data: null,
			};
		}

		const result =
			(await response.json()) as BaseServicesResponse<ComparisonStatsServiceResponse>;
		return {
			statusCode: 200,
			message: 'Comparison stats fetched successfully',
			isSuccess: true,
			errors: [],
			data: result.data,
		};
	} catch (error) {
		return {
			statusCode: 500,
			message: 'Error fetching comparison stats',
			isSuccess: false,
			errors: [error as string],
			data: null,
		};
	}
};

export const getHistoryData = async ({
	user,
	startDate,
	endDate,
	page,
	pageSize,
}: HistoryDataParams) => {
	try {
		const response = await fetch(
			`${apiUrl}/dashboard/history?user=${user}&startDate=${startDate}&endDate=${endDate}&page=${page}&pageSize=${pageSize}`
		);

		if (!response.ok) {
			return {
				statusCode: response.status,
				message: 'Error fetching history data',
				isSuccess: false,
				errors: [await response.text()],
				data: null,
			};
		}

		const result =
			(await response.json()) as BaseServicesResponse<HistoryDataServiceResponse>;
		return {
			statusCode: 200,
			message: 'History data fetched successfully',
			isSuccess: true,
			errors: [],
			data: result.data,
		};
	} catch (error) {
		return {
			statusCode: 500,
			message: 'Error fetching comparison stats',
			isSuccess: false,
			errors: [error as string],
			data: null,
		};
	}
};
