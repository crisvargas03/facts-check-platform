import { HistoryResultClient } from '@/components/ui/history';
import { UserCookieData } from '@/lib/auth';
import { getHistoryData } from '@/services';
import { cookies } from 'next/headers';

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

export default async function HistorialResultados() {
	const { user } = (await getCookieFromServer('__user__')) as UserCookieData;
	const { data: historialData } = await getHistoryData({
		startDate: '',
		endDate: '',
		user: user,
		page: 1,
		pageSize: 50,
	});

	if (!historialData) {
		return (
			<div className='px-10 pt-10'>
				<h1 className='text-3xl font-bold text-gray-800 mb-10'>
					Historial de Resultados
				</h1>
				<p>No se encontraron resultados en el historial.</p>
			</div>
		);
	}

	return (
		<div className='px-10 pt-10'>
			<h1 className='text-3xl font-bold text-gray-800 mb-10'>
				Historial de Resultados
			</h1>
			<HistoryResultClient historialData={historialData.items} />
		</div>
	);
}
