import { BarChart, DataTable } from '../shared';
import { dashboardColumns } from '@/utils/datatable-utils';

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
	{
		id: 5,
		name: 'Artículo 5',
		credibility: 80,
		percentage: '80%',
		date: '2024-01-11',
	},
];

export const ChartsAnalysisSection = () => {
	return (
		<div className='grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12'>
			<DataTable
				columns={dashboardColumns}
				data={analysisData}
				title='Análisis Recientes'
				viewDetailLink='/history-results'
			/>
			<BarChart data={barChartData} title='Comparativa de Análisis' />
		</div>
	);
};
