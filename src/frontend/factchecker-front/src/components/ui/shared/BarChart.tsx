'use client';

import {
	ResponsiveContainer,
	BarChart as RBarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	CartesianGrid,
} from 'recharts';
import React, { useMemo } from 'react';

interface BarChartData {
	day: string;
	real: number;
	fake: number;
}

interface BarChartProps {
	data: BarChartData[];
	title: string;
	height?: number;
	barGap?: number;
}

export const BarChart = ({
	data,
	title,
	height = 260,
	barGap = 10,
}: BarChartProps) => {
	/* const totals = useMemo(() => {
		let real = 0,
			fake = 0;
		for (const d of data) {
			real += d.real;
			fake += d.fake;
		}
		return { real, fake };
	}, [data]);*/

	return (
		// centralizar verticalmente
		<div className='rounded-lg border border-gray-200 shadow-sm p-6'>
			<h3 className='text-2xl font-bold text-black mb-6'>{title}</h3>

			<div
				className='flex flex-col justify-center my-20'
				style={{ width: '100%', height }}>
				<ResponsiveContainer>
					<RBarChart data={data} barGap={barGap}>
						<CartesianGrid vertical={false} stroke='#eee' />
						<XAxis
							dataKey='day'
							tick={{ fill: '#6b7280', fontSize: 14 }}
						/>
						<YAxis hide tick={{ fill: '#6b7280', fontSize: 14 }} />
						<Tooltip
							cursor={{ fill: 'rgba(0,0,0,0.04)' }}
							contentStyle={{
								borderRadius: 8,
								borderColor: '#e5e7eb',
							}}
							formatter={(value: number, name) => [
								value,
								name === 'fake'
									? 'Artículos Falsos'
									: 'Artículos Reales',
							]}
							labelStyle={{ color: '#111827', fontWeight: 600 }}
						/>
						<Legend
							verticalAlign='bottom'
							wrapperStyle={{ paddingTop: 14 }}
							formatter={value =>
								value === 'fake'
									? 'Artículos Falsos'
									: 'Artículos Reales'
							}
						/>
						<Bar
							dataKey='fake'
							stackId='total'
							fill='#b91c1c'
							radius={[3, 3, 3, 3]}
						/>
						<Bar
							dataKey='real'
							stackId='total'
							fill='#166534'
							radius={[3, 3, 3, 3]}
						/>
					</RBarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};
