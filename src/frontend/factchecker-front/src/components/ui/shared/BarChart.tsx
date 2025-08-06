interface BarChartData {
	day: string;
	real: number;
	fake: number;
}

interface BarChartProps {
	data: BarChartData[];
	title: string;
	height?: number;
	gap?: number;
}

// TODO - Apply a UI library for better styling

export const BarChart = ({
	data,
	title,
	height = 200,
	gap = 12,
}: BarChartProps) => {
	return (
		<div className='rounded-lg border border-gray-200 shadow-sm p-6'>
			<h3 className='text-2xl font-bold text-black mb-10'>{title}</h3>

			{/* Bar Chart */}
			<div
				className='flex items-end mb-6'
				style={{ gap: `${gap}px`, height: `${height}px` }}>
				{data.map((item, index) => (
					<div
						key={index}
						className='flex-1 flex flex-col items-center'>
						<div className='w-full flex flex-col'>
							<div
								className='w-full rounded-t bg-red-700'
								style={{ height: `${item.fake}px` }}
							/>
							<div
								className='w-full rounded-b bg-green-700'
								style={{ height: `${item.real}px` }}
							/>
						</div>
						<span className='text-xs text-gray-500 mt-2 font-medium'>
							{item.day}
						</span>
					</div>
				))}
			</div>

			{/* Legend */}
			<div className='flex justify-center items-center gap-8'>
				<div className='flex items-center'>
					<div className='w-4 h-4 bg-red-700 rounded-sm mr-2' />
					<span className='text-sm text-gray-400'>
						Artículos Falsos
					</span>
					<span className='ml-2 text-base font-semibold text-black'>
						1,135
					</span>
				</div>
				<div className='flex items-center'>
					<div className='w-4 h-4 bg-green-700 rounded-sm mr-2' />
					<span className='text-sm text-gray-400'>
						Artículos Reales
					</span>
					<span className='ml-2 text-base font-semibold text-black'>
						635
					</span>
				</div>
			</div>
		</div>
	);
};
