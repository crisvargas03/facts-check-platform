import React from 'react';
import {
	IoPerson,
	IoCheckmarkCircle,
	IoWarning,
	IoBarChart,
} from 'react-icons/io5';
import { StatCard } from './StatCard';

export const StatCardsGrid = () => {
	// TODO: Here fetch or calculate the data for the stat cards

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
			<StatCard
				icon={<IoPerson />}
				value='24'
				label='Total Analizado'
				backgroundColor='#f3e8ff'
				iconBackgroundColor='#e9d5ff'
				iconColor='#7c3aed'
			/>
			<StatCard
				icon={<IoCheckmarkCircle />}
				value='12'
				label='Escaneos Reales'
				backgroundColor='#dcfce7'
				iconBackgroundColor='#bbf7d0'
				iconColor='#16a34a'
			/>
			<StatCard
				icon={<IoWarning />}
				value='2'
				label='Escaneos Imprecisos'
				backgroundColor='#fed7aa'
				iconBackgroundColor='#fdba74'
				iconColor='#ea580c'
			/>
			<StatCard
				icon={<IoBarChart />}
				value='10'
				label='Escaneos Falsos'
				backgroundColor='#fecaca'
				iconBackgroundColor='#fca5a5'
				iconColor='#dc2626'
			/>
		</div>
	);
};
