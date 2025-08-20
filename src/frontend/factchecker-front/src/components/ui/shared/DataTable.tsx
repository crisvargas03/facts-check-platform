// disable any
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import React, { useMemo, useState } from 'react';
import { Badge } from './Badge';
import { ProgressBar } from '../ProgressBar';
import type { DataTableColumn } from '@/lib/ui';
import { Pagination } from '../dashboard/Pagination';

type SortOrder = 'asc' | 'desc';

interface DataTableProps {
	columns?: DataTableColumn[];
	data: any[];
	itemsPerPage?: number;
	onRowClick?: (item: any) => void;
	renderCell?: (
		item: any,
		columnKey: string,
		rowIndex: number
	) => React.ReactNode;
	title?: string;
	viewDetailLink?: string;
	viewDetailText?: string;
	emptyMessage?: string;
}

const cx = (...classes: Array<string | false | undefined>) =>
	classes.filter(Boolean).join(' ');

export function DataTable({
	columns,
	data,
	itemsPerPage = 5,
	onRowClick,
	renderCell,
	title,
	viewDetailLink,
	viewDetailText = 'Ver Detalles',
	emptyMessage = 'No hay datos para mostrar.',
}: DataTableProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const [sortBy, setSortBy] = useState<string>('');
	const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

	// Columnas por defecto (compatibilidad)
	const defaultColumns: DataTableColumn[] = [
		{ key: 'index', label: '#', align: 'left', width: '56px' },
		{ key: 'name', label: 'Nombre', sortable: true },
		{
			key: 'credibility',
			label: 'Credibilidad',
			sortable: true,
			align: 'center',
		},
		{
			key: 'percentage',
			label: 'Porcentaje',
			sortable: true,
			align: 'center',
			width: '96px',
		},
		{
			key: 'date',
			label: 'Fecha',
			sortable: true,
			align: 'center',
			width: '120px',
		},
	];
	const tableColumns = columns?.length ? columns : defaultColumns;

	const toggleSort = (columnKey: string) => {
		if (sortBy === columnKey) {
			setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
		} else {
			setSortBy(columnKey);
			setSortOrder('desc');
		}
		setCurrentPage(1);
	};

	const sortedData = useMemo(() => {
		if (!sortBy) return data;
		const cp = [...data];
		cp.sort((a, b) => {
			let av: any = a?.[sortBy];
			let bv: any = b?.[sortBy];
			if (typeof av === 'string') av = av.toLowerCase();
			if (typeof bv === 'string') bv = bv.toLowerCase();
			if (av === bv) return 0;
			const res = av > bv ? 1 : -1;
			return sortOrder === 'asc' ? res : -res;
		});
		return cp;
	}, [data, sortBy, sortOrder]);

	const totalPages = Math.max(1, Math.ceil(sortedData.length / itemsPerPage));
	const currentData = useMemo(() => {
		const start = (currentPage - 1) * itemsPerPage;
		return sortedData.slice(start, start + itemsPerPage);
	}, [sortedData, currentPage, itemsPerPage]);

	const SortIcon = ({ columnKey }: { columnKey: string }) => {
		if (sortBy !== columnKey) {
			return (
				<span className='text-gray-400' aria-hidden>
					↕
				</span>
			);
		}
		return (
			<span className='text-gray-700' aria-hidden>
				{sortOrder === 'desc' ? '↓' : '↑'}
			</span>
		);
	};

	const defaultRenderCell = (
		item: any,
		columnKey: string,
		rowIndex: number
	) => {
		switch (columnKey) {
			case 'index':
				return (
					<span className='text-sm text-gray-400'>
						{String(rowIndex + 1).padStart(2, '0')}
					</span>
				);
			case 'name':
				return (
					<span className='text-sm text-gray-900'>{item.name}</span>
				);
			case 'credibility':
				return (
					<ProgressBar
						percentage={item.credibility}
						width='100%'
						height='8px'
					/>
				);
			case 'percentage': {
				const getColor = (cred: number) =>
					cred >= 80
						? 'green'
						: cred >= 60
						? 'yellow'
						: cred >= 40
						? 'orange'
						: 'red';
				return (
					<Badge color={getColor(item.credibility)}>
						{item.percentage}
					</Badge>
				);
			}
			case 'date':
				return (
					<span className='text-sm text-gray-500'>
						{item.date
							? new Date(item.date).toLocaleDateString('es-ES')
							: '—'}
					</span>
				);
			default:
				return (
					<span className='text-sm text-gray-700'>
						{String(item[columnKey] ?? '—')}
					</span>
				);
		}
	};

	const cellRenderer = renderCell ?? defaultRenderCell;

	return (
		<div className='bg-white rounded-lg border border-gray-200 shadow-sm p-8'>
			{/* Header */}
			{(title || viewDetailLink) && (
				<div className='mb-8 flex items-center justify-between gap-3'>
					{title && (
						<h3 className='text-2xl font-bold text-black'>
							{title}
						</h3>
					)}
					{viewDetailLink && (
						<a
							href={viewDetailLink}
							className='text-sm font-medium text-blue-900 hover:underline'>
							{viewDetailText}
						</a>
					)}
				</div>
			)}

			{/* Tabla */}
			<div className='w-full overflow-hidden rounded-xl'>
				<div className='w-full overflow-x-auto'>
					<table className='w-full border-collapse'>
						<thead className='bg-white'>
							<tr className='border-b border-gray-100'>
								{tableColumns.map(col => {
									const isSortable = !!col.sortable;
									const align =
										col.align === 'center'
											? 'text-center'
											: col.align === 'right'
											? 'text-right'
											: 'text-left';
									const width = col.width
										? { width: col.width }
										: undefined;
									return (
										<th
											key={col.key}
											scope='col'
											style={width}
											className={cx(
												'px-6 py-4 text-sm font-semibold text-gray-400',
												align
											)}
											aria-sort={
												sortBy === col.key
													? sortOrder === 'asc'
														? 'ascending'
														: 'descending'
													: 'none'
											}>
											{isSortable ? (
												<button
													type='button'
													onClick={() =>
														toggleSort(col.key)
													}
													className={cx(
														'group inline-flex items-center gap-2',
														align === 'text-left' &&
															'justify-start',
														align ===
															'text-center' &&
															'justify-center',
														align ===
															'text-right' &&
															'justify-end'
													)}
													aria-label={`Ordenar por ${col.label}`}>
													<span>{col.label}</span>
													<span className='transition-colors group-hover:text-gray-600'>
														<SortIcon
															columnKey={col.key}
														/>
													</span>
												</button>
											) : (
												<span className='inline-flex items-center gap-2'>
													{col.label}
												</span>
											)}
										</th>
									);
								})}
							</tr>
						</thead>

						<tbody>
							{currentData.length === 0 ? (
								<tr>
									<td
										colSpan={tableColumns.length}
										className='px-6 py-10 text-center text-sm text-gray-500'>
										{emptyMessage}
									</td>
								</tr>
							) : (
								currentData.map((item, idx) => (
									<tr
										key={
											item.id ??
											`${idx}-${item?.name ?? 'row'}`
										}
										className={cx(
											'border-b border-gray-100 transition-colors',
											onRowClick &&
												'cursor-pointer hover:bg-gray-50'
										)}
										onClick={() => onRowClick?.(item)}>
										{tableColumns.map(col => {
											const align =
												col.align === 'center'
													? 'text-center'
													: col.align === 'right'
													? 'text-right'
													: 'text-left';
											return (
												<td
													key={col.key}
													className={cx(
														'px-6 py-4 text-gray-700 text-sm',
														align
													)}>
													{cellRenderer(
														item,
														col.key,
														(currentPage - 1) *
															itemsPerPage +
															idx
													)}
												</td>
											);
										})}
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>

			{/* Paginación */}
			{totalPages > 1 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={setCurrentPage}
				/>
			)}
		</div>
	);
}
