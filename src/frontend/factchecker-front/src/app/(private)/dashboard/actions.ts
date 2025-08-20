'use server';
import { cookies } from 'next/headers';

export async function setDashboardFilter(input: {
	start: string;
	end: string;
}) {
	const { start = '', end = '' } = input ?? {};
	const cookieStore = await cookies();
	cookieStore.set('dashboard_filter', JSON.stringify({ start, end }), {
		path: '/',
	});
}

export async function clearDashboardFilter() {
	const cookieStore = await cookies();
	cookieStore.delete('dashboard_filter');
}
