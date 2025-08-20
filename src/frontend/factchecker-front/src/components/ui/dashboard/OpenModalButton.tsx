'use client';

import { useEffect, useState, useTransition } from 'react';
import { IoFilter } from 'react-icons/io5';
import FilterModal from '../FilterModal';
import { useRouter } from 'next/navigation';
import {
	clearDashboardFilter,
	setDashboardFilter,
} from '@/app/(private)/dashboard/actions';

type Props = {
	initialStartDate?: string;
	initialEndDate?: string;
};

export const OpenModalButton = ({
	initialStartDate = '',
	initialEndDate = '',
}: Props) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const [startDate, setStartDate] = useState(initialStartDate);
	const [endDate, setEndDate] = useState(initialEndDate);
	const [showFilterModal, setShowFilterModal] = useState(false);

	useEffect(() => {
		setStartDate(initialStartDate);
		setEndDate(initialEndDate);
	}, [initialStartDate, initialEndDate]);

	const applyFilter = () => {
		startTransition(async () => {
			await setDashboardFilter({
				start: startDate,
				end: endDate,
			});
			setShowFilterModal(false);
			router.refresh();
		});
	};

	const clearFilter = () => {
		startTransition(async () => {
			await clearDashboardFilter();
			setShowFilterModal(false);
			router.refresh();
		});
	};

	return (
		<div>
			<button
				onClick={() => setShowFilterModal(true)}
				className='flex items-center gap-2 bg-blue-900 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-800 transition-colors'>
				<IoFilter className='text-sm' />
				Filtrar
			</button>

			<>
				{/* Filter Modal TODO:  */}
				<FilterModal
					isOpen={showFilterModal}
					onClose={() => setShowFilterModal(false)}
					startDate={startDate}
					endDate={endDate}
					onStartDateChange={setStartDate}
					onEndDateChange={setEndDate}
					onClear={clearFilter}
					onApply={applyFilter}
					isApplying={isPending}
				/>
			</>
		</div>
	);
};
