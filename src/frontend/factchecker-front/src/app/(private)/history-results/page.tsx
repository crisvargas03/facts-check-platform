import { HistoryResultClient } from '@/components/ui/history';
import { HistorialItem } from '@/lib/history';

export default function HistorialResultados() {
	const historialData: HistorialItem[] = [
		{
			id: '1',
			name: 'Artículo 1',
			date: '2023-10-01',
			credibility: 85,
			summary: 'Resumen del artículo 1',
			factors: [
				{
					name: 'Fuente Confiable',
					score: 90,
					description: 'Descripción de la fuente confiable',
				},
				{
					name: 'Evidencia Cientifica',
					score: 80,
					description: 'Descripción de la evidencia científica',
				},
			],
		},
		{
			id: '2',
			name: 'Artículo 2',
			date: '2023-10-02',
			credibility: 75,
			summary: 'Resumen del artículo 2',
			factors: [
				{
					name: 'Fuente Confiable',
					score: 70,
					description: 'Descripción de la fuente confiable',
				},
				{
					name: 'Evidencia Cientifica',
					score: 80,
					description: 'Descripción de la evidencia científica',
				},
			],
		},
	];

	return (
		<div className='px-10 pt-10'>
			<h1 className='text-3xl font-bold text-gray-800 mb-10'>
				Historial de Resultados
			</h1>
			<HistoryResultClient historialData={historialData} />
		</div>
	);
}
