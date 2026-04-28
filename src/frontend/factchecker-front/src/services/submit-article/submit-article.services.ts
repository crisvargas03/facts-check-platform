import { AnalysisDetails, submitFormData } from '@/lib/article-results';
import { BaseServicesResponse } from '@/lib/base';
import { getApiBaseUrl } from '@/utils';

export const PostArticle = async (
	articleData: submitFormData
): Promise<BaseServicesResponse<AnalysisDetails | null>> => {
	try {
		const response = await fetch(`${getApiBaseUrl()}/articles/analyze`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(articleData),
		});

		if (!response.ok) {
			throw new Error('Error submitting article');
		}

		const result =
			(await response.json()) as BaseServicesResponse<AnalysisDetails>;

		return result;
	} catch (error) {
		console.log(error);
		return {
			isSuccess: false,
			message: '',
			data: null,
			statusCode: 500,
			errors: [error as string],
		};
	}
};
