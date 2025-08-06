'use client';

import { useState } from 'react';
import { IoFilter } from 'react-icons/io5';
import FilterModal from '@/components/ui/FilterModal';
import {
	ChartsAnalysisSection,
	StatCardsGrid,
} from '@/components/ui/dashboard';

export default function Dashboard() {
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [showFilterModal, setShowFilterModal] = useState(false);

	const getResultsTitle = () => {
		if (!startDate && !endDate) {
			return 'Resultados de Hoy';
		}

		const formatDate = (dateString: string) => {
			const date = new Date(dateString);
			return date.toLocaleDateString('es-ES', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			});
		};

		if (startDate && endDate) {
			return `Resultados del ${formatDate(startDate)} al ${formatDate(
				endDate
			)}`;
		} else if (startDate) {
			return `Resultados desde ${formatDate(startDate)}`;
		} else if (endDate) {
			return `Resultados hasta ${formatDate(endDate)}`;
		}

		return 'Resultados de Hoy';
	};

	return (
		<div className='py-5 px-5 min-h-screen'>
			<div>
				<div className='mb-12'>
					<div className='flex flex-col sm:flex-row justify-between items-center mb-2 gap-4'>
						<div className='flex-1 flex-rows items-center gap-4'>
							<h2 className='text-3xl font-bold text-black'>
								{getResultsTitle()}
							</h2>
							<span className='text-gray-500 text-sm'>
								Resumen de Resultados
							</span>
						</div>
						<button
							onClick={() => setShowFilterModal(true)}
							className='flex items-center gap-2 bg-blue-900 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-800 transition-colors'>
							<IoFilter className='text-sm' />
							Filtrar
						</button>
					</div>

					<StatCardsGrid />
				</div>

				{/* Chart and Analysis Section */}
				<ChartsAnalysisSection />

				{/* Filter Modal TODO:  */}
				<FilterModal
					isOpen={showFilterModal}
					onClose={() => setShowFilterModal(false)}
					startDate={startDate}
					endDate={endDate}
					onStartDateChange={setStartDate}
					onEndDateChange={setEndDate}
					onClear={() => {
						setStartDate('');
						setEndDate('');
					}}
				/>
			</div>
		</div>
	);
}
