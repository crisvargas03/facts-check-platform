import { UpdloadArticle } from '@/components/ui/article-results/UpdloadArticle';
import { AnalysisDetails, submitFormData } from '@/lib/article-results';
import { BaseServicesResponse } from '@/lib/base';

// server action
export async function submitArticleToBack(
	data: submitFormData
): Promise<BaseServicesResponse<AnalysisDetails>> {
	'use server';

	// TODO: SEND TO THE BACKEND

	const dummy: BaseServicesResponse<AnalysisDetails> = {
		statusCode: 200,
		message: 'Artículo analizado correctamente',
		isSuccess: true,
		errors: [],
		data: {
			summary: 'Este es un resumen del artículo.',
			percentageTrust: 87,
			evaluationFactors: [
				{
					name: 'Fuente Confiable',
					score: 90,
					description:
						'Evaluacion de la reputacion y confiabilidad de la fuente',
				},
				{
					name: 'Evidencia Cientifica',
					score: 85,
					description:
						'Precesia de datos, estudios, p referencias cientificas',
				},
			],
		},
	};

	console.log(data);

	return dummy;
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
