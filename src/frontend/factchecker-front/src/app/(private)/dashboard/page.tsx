'use client';

import { useState } from 'react';
import { IoFilter } from 'react-icons/io5';
import FilterModal from '@/components/ui/FilterModal';
import { BarChart, DataTable } from '@/components/ui/shared';
import { StatCardsGrid } from '@/components/ui/dashboard';
import { DataTableColumn } from '@/lib/ui';

const analysisData = [
	{
		id: 1,
		name: 'Artículo 1',
		credibility: 90,
		percentage: '90%',
		date: '2024-01-15',
	},
	{
		id: 2,
		name: 'Artículo 2',
		credibility: 65,
		percentage: '65%',
		date: '2024-01-14',
	},
	{
		id: 3,
		name: 'Artículo 3',
		credibility: 50,
		percentage: '50%',
		date: '2024-01-13',
	},
	{
		id: 4,
		name: 'Artículo 4',
		credibility: 25,
		percentage: '25%',
		date: '2024-01-12',
	},
];

const columnsSamples: DataTableColumn[] = [
	{
		key: 'index',
		label: '#',
		align: 'left',
		width: '40px',
	},
	{ key: 'name', label: 'Nombre', sortable: true },
	{
		key: 'credibility',
		label: 'Credibilidad',
		sortable: true,
		align: 'center',
	},
	{
		key: 'percentage',
		label: 'Porcentaje',
		sortable: true,
		align: 'center',
		width: '80px',
	},
	{
		key: 'date',
		label: 'Fecha',
		sortable: true,
		align: 'center',
		width: '100px',
	},
];

export default function Dashboard() {
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [showFilterModal, setShowFilterModal] = useState(false);

	const filteredData = analysisData.filter(item => {
		if (!startDate && !endDate) return true;

		const itemDate = new Date(item.date);
		const start = startDate ? new Date(startDate) : null;
		const end = endDate ? new Date(endDate) : null;

		if (start && end) {
			return itemDate >= start && itemDate <= end;
		} else if (start) {
			return itemDate >= start;
		} else if (end) {
			return itemDate <= end;
		}

		return true;
	});

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
				{/* Stats Section */}
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
				<div className='grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12'>
					<BarChart
						data={[
							{ day: 'Lun', real: 80, fake: 60 },
							{ day: 'Mar', real: 120, fake: 80 },
							{ day: 'Mié', real: 70, fake: 100 },
							{ day: 'Jue', real: 60, fake: 80 },
							{ day: 'Vie', real: 50, fake: 70 },
							{ day: 'Sáb', real: 65, fake: 55 },
							{ day: 'Dom', real: 45, fake: 40 },
						]}
						title='Comparativa de Análisis'
					/>

					<DataTable
						columns={columnsSamples}
						data={filteredData}
						title='Análisis Recientes'
						viewDetailLink='/history-results'
					/>
				</div>

				{/* Filter Modal */}
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
