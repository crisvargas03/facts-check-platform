import { AnalysisDetails } from '@/lib/article-results';
import { getResultColor, getResultLabel } from '@/utils';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Props {
	analysisDetails: AnalysisDetails;
	showActionButton?: boolean;
	title?: string;
	actionButtonText?: string;
	actionButtonAction?: () => void;
	showBorders?: boolean;
}

export const AnalysisInfoResult = ({
	analysisDetails,
	showActionButton = true,
	title,
	actionButtonText,
	actionButtonAction,
	showBorders = true,
}: Props) => {
	if (!analysisDetails) {
		toast.error('No se encontraron resultados de análisis.');
		return (
			<div className='p-6 bg-white rounded-lg border border-gray-200'>
				<p className='text-red-500'>
					No se encontraron resultados de análisis.
				</p>
			</div>
		);
	}
	return (
		<div
			className={`p-6 rounded-lg ${
				showBorders ? 'border-2 border-gray-200' : ''
			} bg-white`}>
			<h3 className='text-xl font-bold text-black mb-4'>
				<span>{title}</span>
			</h3>

			{/* Overall Score */}
			<div className='text-center mb-6'>
				<div
					className={`inline-block px-6 py-3 rounded-lg text-2xl font-bold border-1 border-gray-200`}
					style={getResultColor(analysisDetails.percentageTrust)}>
					{analysisDetails.percentageTrust}% de Veracidad
				</div>
				<p className='mt-4 text-gray-500'>
					{getResultLabel(analysisDetails.percentageTrust)}
				</p>
			</div>

			{/* Factors */}
			<div className='mb-6'>
				<h4 className='text-base font-semibold text-black mb-3'>
					Factores Evaluados
				</h4>
				<div className='flex flex-col gap-3'>
					{analysisDetails.evaluationFactors.map((factor, index) => (
						<div
							key={index}
							className='pl-4 border-l-3 border-blue-500'>
							<div className='flex justify-between items-center mb-1'>
								<span className='font-medium text-gray-700'>
									{factor.name}
								</span>
								<span className='text-sm font-semibold text-blue-600'>
									{factor.score}%
								</span>
							</div>
							<div className='w-full bg-gray-200 rounded h-2 mb-2'>
								<div
									className='bg-blue-600 h-2 rounded transition-all duration-1000 ease-in-out'
									style={{
										width: `${factor.score}%`,
									}}
								/>
							</div>
							<p className='text-sm text-gray-500'>
								{factor.description}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* Summary */}
			<div className='bg-gray-50 border border-blue-500 p-4 rounded-lg mb-6'>
				<h4 className='text-base font-semibold text-black mb-2'>
					Resumen del Análisis
				</h4>
				<p className='text-sm text-gray-700 leading-relaxed'>
					{analysisDetails.summary}
				</p>
			</div>

			{actionButtonText && actionButtonAction && (
				<div className='flex justify-center gap-4'>
					<button
						onClick={actionButtonAction}
						className='bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded-lg transition'>
						{actionButtonText}
					</button>
				</div>
			)}

			{showActionButton && (
				<div className='flex justify-center gap-4'>
					<Link
						href='/history-results'
						className='bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-lg transition'>
						<span className='inline-block align-middle'>
							Ver Historial
						</span>
					</Link>
				</div>
			)}
		</div>
	);
};
