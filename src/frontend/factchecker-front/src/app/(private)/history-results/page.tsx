import { HistoryResultClient } from '@/components/ui/history';
import { getHistoryData } from '@/services';

export default async function HistorialResultados() {
	const { data: historialData } = await getHistoryData({
		startDate: '',
		endDate: '',
		user: 'chatgptplus550@gmail.com',
		page: 1,
		pageSize: 10,
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
