import {
	ChartsAnalysisSection,
	StatCardsGrid,
} from '@/components/ui/dashboard';

import { OpenModalButton } from '@/components/ui/dashboard/OpenModalButton';
import { getResultsTitle } from '@/utils/dashboard-info';
import { cookies } from 'next/headers';

async function fetchDashboardData(params: { start: string; end: string }) {
	console.log(params);
	return {};
}

export default async function Dashboard() {
	const cookieStore = await cookies();

	const raw = cookieStore.get('dashboard_filter')?.value ?? '';
	let start = '',
		end = '';

	if (raw) {
		try {
			const parsed = JSON.parse(raw) as { start?: string; end?: string };
			start = parsed.start ?? '';
			end = parsed.end ?? '';
		} catch {
			console.log('Error parsing dashboard_filter cookie:');
		}
	}

	const data = await fetchDashboardData({ start, end });
	const titleResult = getResultsTitle(start, end);
	console.log(data);

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
						<OpenModalButton />
					</div>

					<StatCardsGrid />
				</div>

				{/* Chart and Analysis Section */}
				<ChartsAnalysisSection />
			</div>
		</div>
	);
}
