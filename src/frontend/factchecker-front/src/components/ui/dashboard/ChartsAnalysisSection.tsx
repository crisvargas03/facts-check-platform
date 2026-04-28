import {
	ComparisonStatsServiceResponse,
	HistoryDataServiceResponse,
} from '@/lib/dashboard';
import { BarChart, DataTable } from '../shared';
import { dashboardColumns } from '@/utils/datatable-utils';

interface Props {
	comparisonData: ComparisonStatsServiceResponse;
	historyData: HistoryDataServiceResponse;
}

export const ChartsAnalysisSection = async ({
	comparisonData,
	historyData,
}: Props) => {
	return (
		<div className='grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12'>
			<DataTable
				columns={dashboardColumns}
				data={historyData.items}
				title='Análisis Recientes'
				viewDetailLink='/history-results'
			/>
			<BarChart
				data={comparisonData.weeklyData}
				title='Comparativa de Análisis'
			/>
		</div>
	);
};
