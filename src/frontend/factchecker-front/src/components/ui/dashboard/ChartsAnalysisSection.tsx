import { DataTableColumn } from '@/lib/ui';
import { BarChart, DataTable } from '../shared';

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

const barChartData = [
	{ day: 'Lun', real: 80, fake: 60 },
	{ day: 'Mar', real: 120, fake: 80 },
	{ day: 'Mié', real: 70, fake: 100 },
	{ day: 'Jue', real: 60, fake: 80 },
	{ day: 'Vie', real: 50, fake: 70 },
	{ day: 'Sáb', real: 65, fake: 55 },
	{ day: 'Dom', real: 45, fake: 40 },
];

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

export const ChartsAnalysisSection = () => {
	// const filteredData = analysisData.filter(item => {
	// 	if (!startDate && !endDate) return true;

	// 	const itemDate = new Date(item.date);
	// 	const start = startDate ? new Date(startDate) : null;
	// 	const end = endDate ? new Date(endDate) : null;

	// 	if (start && end) {
	// 		return itemDate >= start && itemDate <= end;
	// 	} else if (start) {
	// 		return itemDate >= start;
	// 	} else if (end) {
	// 		return itemDate <= end;
	// 	}

	// 	return true;
	// });

	return (
		<div className='grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12'>
			<BarChart data={barChartData} title='Comparativa de Análisis' />

			<DataTable
				columns={columnsSamples}
				data={analysisData}
				title='Análisis Recientes'
				viewDetailLink='/history-results'
			/>
		</div>
	);
};
