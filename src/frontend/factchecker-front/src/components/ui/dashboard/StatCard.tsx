import { ReactNode } from 'react';

interface StatCardProps {
	icon: ReactNode;
	value: string | number;
	label: string;
	backgroundColor: string;
	iconBackgroundColor: string;
	iconColor: string;
}

export const StatCard = ({
	icon,
	value,
	label,
	backgroundColor,
	iconBackgroundColor,
	iconColor,
}: StatCardProps) => {
	return (
		<div className='p-6 rounded-lg shadow-sm' style={{ backgroundColor }}>
			<div className='flex items-center mb-4'>
				<div
					className='w-12 h-12 rounded-md flex items-center justify-center'
					style={{ backgroundColor: iconBackgroundColor }}>
					<div className='text-2xl' style={{ color: iconColor }}>
						{icon}
					</div>
				</div>
			</div>

			<div className='text-3xl font-bold text-black mb-1'>{value}</div>
			<div className='text-gray-700 font-semibold text-sm'>{label}</div>
		</div>
	);
};
