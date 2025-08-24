import { UpdloadArticle } from '@/components/ui/article-results/UpdloadArticle';
import { submitFormData, SubmitResult } from '@/lib/article-results';
import { UserCookieData } from '@/lib/auth';
import { PostArticle } from '@/services';
import { cookies } from 'next/headers';

const getCookieFromServer = async (key: string) => {
	const cookieStore = await cookies();
	// get the cookie data
	const data = cookieStore.get(key);
	if (!data) {
		return null;
	}

	// decrypt the data
	const decrypted = atob(data.value);
	// console.log('Decrypted cookie data:', decrypted);
	return JSON.parse(decrypted);
};

// server action
async function submitArticleToBack(
	data: submitFormData
): Promise<SubmitResult> {
	'use server';

	try {
		// TODO: SEND TO THE BACKEND
		const { user } = (await getCookieFromServer(
			'__user__'
		)) as UserCookieData;
		data.email = user;
		const { data: analysisResult, statusCode } = await PostArticle(data);
		if (statusCode === 403 || !analysisResult) {
			return {
				analysisDetails: null,
				message: 'Haz excedido el límite de análisis para hoy',
			};
		}
		return {
			analysisDetails: analysisResult,
			message: null,
		};
	} catch (error) {
		console.error('Error submitting article:', error);
		return {
			analysisDetails: null,
			message: 'Error al enviar el artículo para análisis',
		};
	}
}

export default function AnalyzarArticulo() {
	return (
		<div className='px-5 py-10'>
			<div className='max-w-[1000px] mx-auto'>
				<div className='bg-white rounded-lg border border-gray-200 shadow-sm p-10'>
					<h1 className='text-2xl md:text-3xl font-bold text-black mb-8'>
						Analizar Nuevo Artículo
					</h1>
					<UpdloadArticle onAnalyze={submitArticleToBack} />
				</div>
			</div>
		</div>
	);
}
