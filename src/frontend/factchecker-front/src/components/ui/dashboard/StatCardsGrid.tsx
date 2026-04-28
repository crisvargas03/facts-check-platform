import React from 'react';
import {
	IoPerson,
	IoCheckmarkCircle,
	IoWarning,
	IoBarChart,
} from 'react-icons/io5';
import { StatCard } from './StatCard';
import { SummaryStatsServiceResponse } from '@/lib/dashboard';

type Props = {
	sumaryData: SummaryStatsServiceResponse;
};

export const StatCardsGrid = async ({ sumaryData }: Props) => {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
			<StatCard
				icon={<IoPerson />}
				value={sumaryData?.totalAnalyzed ?? 0}
				label='Total Analizado'
				backgroundColor='#f3e8ff'
				iconBackgroundColor='#e9d5ff'
				iconColor='#7c3aed'
			/>
			<StatCard
				icon={<IoCheckmarkCircle />}
				value={sumaryData?.realScans ?? 0}
				label='Escaneos Reales'
				backgroundColor='#dcfce7'
				iconBackgroundColor='#bbf7d0'
				iconColor='#16a34a'
			/>
			<StatCard
				icon={<IoWarning />}
				value={sumaryData?.inaccurateScans ?? 0}
				label='Escaneos Imprecisos'
				backgroundColor='#fed7aa'
				iconBackgroundColor='#fdba74'
				iconColor='#ea580c'
			/>
			<StatCard
				icon={<IoBarChart />}
				value={sumaryData?.fakeScans ?? 0}
				label='Escaneos Falsos'
				backgroundColor='#fecaca'
				iconBackgroundColor='#fca5a5'
				iconColor='#dc2626'
			/>
		</div>
	);
};
