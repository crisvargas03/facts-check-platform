'use client';

import { useState } from 'react';
import { getResultColor } from '@/utils';
import { historyColumns } from '@/utils/datatable-utils';
import { ProgressBar } from '../ProgressBar';
import { Badge, EyeIcon, DataTable, Modal } from '../shared';
import { EmptyStateCard } from './EmptyStateCard';
import { AnalysisInfoResult } from '../article-results';
import { HistorialItem } from '@/lib/history';

interface Props {
	historialData: HistorialItem[];
}

export const HistoryResultClient = ({ historialData = [] }: Props) => {
	const [showModal, setShowModal] = useState(false);
	const [selectedItem, setSelectedItem] = useState<HistorialItem | null>(
		null
	);

	const handleViewDetails = (item: HistorialItem) => {
		setSelectedItem(item);
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
		setSelectedItem(null);
	};

	const renderCell = (
		item: HistorialItem,
		columnKey: string,
		index: number
	): React.ReactNode => {
		switch (columnKey) {
			case 'id':
				return (
					<span style={{ color: '#9ca3af', fontSize: '14px' }}>
						{String(index + 1).padStart(2, '0')}
					</span>
				);

			case 'nombre':
				return (
					<span
						style={{
							color: '#374151',
							fontWeight: 500,
							fontSize: '14px',
						}}>
						{item.articleName}
					</span>
				);

			case 'fecha':
				return (
					<span style={{ color: '#374151', fontSize: '14px' }}>
						{item.analysisDate
							? new Date(item.analysisDate).toLocaleDateString(
									'es-ES'
							  )
							: '—'}
					</span>
				);

			case 'credibilidad':
				return (
					<div style={{ maxWidth: '200px' }}>
						<ProgressBar percentage={item.credibility} />
					</div>
				);

			case 'porcentaje':
				return (
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Badge customColor={getResultColor(item.credibility)}>
							{item.credibility}%
						</Badge>
					</div>
				);

			case 'detalle':
				return (
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<span
							onClick={e => {
								e.stopPropagation?.();
								handleViewDetails(item);
							}}>
							<EyeIcon />
						</span>
					</div>
				);

			default: {
				const value = item[columnKey as keyof HistorialItem];
				if (
					typeof value === 'string' ||
					typeof value === 'number' ||
					typeof value === 'boolean' ||
					value === null ||
					value === undefined
				) {
					return value as
						| string
						| number
						| boolean
						| null
						| undefined;
				}
				return null;
			}
		}
	};

	if (historialData && historialData.length === 0) {
		return (
			<EmptyStateCard
				href='/submit-article'
				ctaLabel='Analizar Primer Artículo'
			/>
		);
	}

	return (
		<>
			<DataTable
				columns={historyColumns}
				data={historialData}
				itemsPerPage={5}
				renderCell={renderCell}
				onRowClick={handleViewDetails}
				title='Historial de Análisis'
			/>

			<Modal
				isOpen={showModal}
				onClose={closeModal}
				title='Detalle del Análisis'>
				{selectedItem && (
					<div className='flex flex-col gap-4'>
						<h3 className='text-lg font-semibold'>
							{selectedItem.articleName}
						</h3>

						<span className='text-sm text-gray-500'>
							{`Analizado el: ${
								selectedItem.analysisDate
									? new Date(
											selectedItem.analysisDate
									  ).toLocaleDateString('es-ES')
									: '—'
							}`}
						</span>

						<AnalysisInfoResult
							analysisDetails={{
								evaluationFactors:
									selectedItem.evaluationFactors, // ajusta al shape que espera tu componente
								summary: selectedItem.summary,
								percentageTrust: selectedItem.credibility,
							}}
							showActionButton={false}
							showBorders={true}
						/>
					</div>
				)}
			</Modal>
		</>
	);
};
