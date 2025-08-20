import { DemoSubmitClientComponent } from '@/components/ui';
import { cookies } from 'next/headers';
import { analyzeDemoAction, resetDemoAction } from './actions';
import { AnalysisInfoResult } from '@/components/ui/article-results';
import { analysisResults, sampleArticle } from '@/utils';
import { LinkButton } from '@/components/ui/homepage';
import { IoSparkles } from 'react-icons/io5';

export default async function DemoPage() {
	const cookieStore = await cookies();
	const showResults = cookieStore.get('showResults')?.value === '1';

	return (
		<div className='px-5 py-10'>
			<div className=''>
				<div className='text-center mb-12'>
					<h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-4'>
						Demo: Análisis de Veracidad
					</h1>
					<p className='text-lg text-gray-500 max-w-[800px] mx-auto'>
						Ve cómo funciona ChequeaEsoRD analizando un artículo de
						ejemplo. Esta es una demostración de nuestra tecnología
						de IA.
					</p>
				</div>

				{/* Contenido */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					{/* Columna 1: Artículo */}
					<div className='bg-white rounded-lg border border-gray-200 shadow-sm p-6'>
						<h2 className='text-2xl font-semibold text-gray-800 mb-4'>
							Artículo de Ejemplo
						</h2>
						<div className='space-y-3'>
							<h3 className='text-lg font-medium text-gray-700'>
								{sampleArticle.title}
							</h3>
							<p className='text-sm text-gray-500'>
								{sampleArticle.source}
							</p>
							<div className='bg-gray-100 p-4 rounded-lg text-gray-800 leading-relaxed hover:cursor-not-allowed'>
								{sampleArticle.content}
							</div>
						</div>
					</div>

					{/* Columna 2: Análisis */}
					<div className='bg-white rounded-lg border border-gray-200 shadow-sm p-6'>
						{!showResults ? (
							<div className='flex items-center justify-center flex-col h-full'>
								<div className='w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center mb-6'>
									<IoSparkles className='w-10 h-10 text-blue-900' />
								</div>
								<form
									action={analyzeDemoAction}
									className='text-center'>
									<p className='text-gray-500 mb-6'>
										Haz clic en el botón para analizar este
										artículo con nuestra IA
									</p>
									<DemoSubmitClientComponent />
								</form>
							</div>
						) : (
							<>
								<AnalysisInfoResult
									analysisDetails={analysisResults}
									showActionButton={false}
									actionButtonText='Reiniciar Demo'
									actionButtonAction={resetDemoAction}
									showBorders={false}
								/>
								<div>
									<p className='mt-2 text-xs text-gray-500'>
										Esta es una demostración. Los resultados
										pueden no reflejar análisis reales.
									</p>
								</div>
							</>
						)}
					</div>
				</div>
				{showResults && (
					<div className='mt-10'>
						<div className='bg-white rounded-lg border border-gray-200 shadow-sm p-6  text-center'>
							<h3 className='text-3xl font-bold text-gray-900 mb-4'>
								¿Te gustó lo que viste?
							</h3>
							<p className='text-lg text-gray-600 mb-8 max-w-2xl mx-auto'>
								Únete a ChequaEsoRD y obtén acceso completo a
								nuestra plataforma de análisis de veracidad.
							</p>
							<div className='flex flex-col sm:flex-row justify-center gap-4'>
								<LinkButton
									href='/auth/signup'
									text='Crear Cuenta Gratis'
									isOutline={false}
									color='blue'
								/>
								<LinkButton
									href='/plans'
									text='Ver Planes'
									isOutline={true}
									color='blue'
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
