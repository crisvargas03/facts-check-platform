import {
	ChartsAnalysisSection,
	StatCardsGrid,
} from '@/components/ui/dashboard';

import { OpenModalButton } from '@/components/ui/dashboard/OpenModalButton';
import { UserCookieData } from '@/lib/auth';
import {
	getComparisonStatsInfo,
	getHistoryData,
	getSummaryStatsInfo,
} from '@/services';
import { getResultsTitle } from '@/utils/dashboard-info';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function fetchDashboardData(params: { start: string; end: string }) {
	const { start, end } = params;

	if (!start || !end) {
		console.log('Invalid date range');
	}

	const { user } = (await getCookieFromServer('__user__')) as UserCookieData;

	const { data: summaryData } = await getSummaryStatsInfo({
		user,
		startDate: start,
		endDate: end,
	});

	const { data: comparisonData } = await getComparisonStatsInfo({
		user,
		startDate: start,
		endDate: end,
	});

	const { data: historyData } = await getHistoryData({
		user,
		startDate: start,
		endDate: end,
		page: 1,
		pageSize: 5,
	});

	return { summaryData, comparisonData, historyData };
}

const getCookieFromServer = async (key: string) => {
	const cookieStore = await cookies();
	// get the cookie data
	const data = cookieStore.get(key);
	if (!data) {
		return null;
	}

	// decrypt the data
	const decrypted = atob(data.value);
	// console.log('Decrypted cookie data:', decrypted);
	return JSON.parse(decrypted);
};

export default async function Dashboard() {
	const cookieStore = await cookies();

	const raw = cookieStore.get('dashboard_filter')?.value ?? '';
	// start with a month before of today range
	let start = new Date(new Date().setMonth(new Date().getMonth() - 1))
			.toISOString()
			.split('T')[0],
		end = new Date().toISOString().split('T')[0];

	if (raw) {
		try {
			const parsed = JSON.parse(raw) as { start?: string; end?: string };
			start = parsed.start ?? start;
			end = parsed.end ?? end;
		} catch {
			console.log('Error parsing dashboard_filter cookie:');
		}
	}

	const { summaryData, comparisonData, historyData } =
		await fetchDashboardData({
			start,
			end,
		});

	if (!summaryData || !comparisonData || !historyData) {
		redirect('/submit-article');
	}

	const titleResult = getResultsTitle(start, end);

	return (
		<div className='py-5 px-5 min-h-screen'>
			<div>
				<div className='mb-12'>
					<div className='flex flex-col sm:flex-row justify-between items-center mb-2 gap-4'>
						<div className='flex-1 flex-rows items-center gap-4'>
							<h2 className='text-3xl font-bold text-black'>
								{titleResult}
							</h2>
							<span className='text-gray-500 text-sm'>
								Resumen de Resultados
							</span>
						</div>
						<OpenModalButton
							initialStartDate={start}
							initialEndDate={end}
						/>
					</div>

					<StatCardsGrid sumaryData={summaryData} />
				</div>

				{/* Chart and Analysis Section */}
				<ChartsAnalysisSection
					comparisonData={comparisonData}
					historyData={historyData}
				/>
			</div>
		</div>
	);
}
