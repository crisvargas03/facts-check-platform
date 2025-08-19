import React, { useEffect, useRef } from 'react';

interface FilterModalProps {
	isOpen: boolean;
	onClose: () => void;
	startDate: string;
	endDate: string;
	onStartDateChange: (date: string) => void;
	onEndDateChange: (date: string) => void;
	onClear: () => void;
	onApply: () => void; // <-- nuevo
	isApplying?: boolean; // <-- nuevo (estado de transición)
	title?: string;
}

export default function FilterModal({
	isOpen,
	onClose,
	startDate,
	endDate,
	onStartDateChange,
	onEndDateChange,
	onClear,
	onApply,
	isApplying = false,
	title = 'Filtrar por Fecha',
}: FilterModalProps) {
	const initialFocusRef = useRef<HTMLInputElement | null>(null);
	const headingId = 'filter-modal-title';

	useEffect(() => {
		if (!isOpen) return;
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && !isApplying) onClose();
		};
		window.addEventListener('keydown', onKeyDown);
		initialFocusRef.current?.focus();
		return () => {
			document.body.style.overflow = prevOverflow;
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [isOpen, onClose, isApplying]);

	// YYYY-MM-DD compara bien como string para validar rango
	const errorDate = Boolean(startDate && endDate && startDate > endDate);
	const canApply = !errorDate && !isApplying;

	if (!isOpen) return null;

	return (
		<div
			className='fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4'
			onClick={e => {
				if (e.target === e.currentTarget && !isApplying) onClose(); // cerrar al hacer click fuera si no está aplicando
			}}
			aria-labelledby={headingId}
			aria-modal='true'
			role='dialog'
			aria-busy={isApplying}>
			<div className='relative w-full max-w-md rounded-lg bg-white p-8 shadow-sm'>
				{/* Botón cerrar */}
				<button
					onClick={onClose}
					aria-label='Cerrar'
					disabled={isApplying}
					className='absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md text-2xl leading-none text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'>
					×
				</button>

				<h3
					id={headingId}
					className='mb-6 text-2xl font-bold text-gray-800'>
					{title}
				</h3>

				<div className='flex flex-col gap-5'>
					{/* Fecha Inicio */}
					<div>
						<label
							htmlFor='start-date'
							className='mb-2 block text-sm font-medium text-gray-600'>
							Fecha Inicio
						</label>
						<input
							id='start-date'
							type='date'
							ref={initialFocusRef}
							value={startDate}
							onChange={e => onStartDateChange(e.target.value)}
							disabled={isApplying}
							className='w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-60'
						/>
					</div>

					{/* Fecha Fin */}
					<div>
						<label
							htmlFor='end-date'
							className='mb-2 block text-sm font-medium text-gray-600'>
							Fecha Fin
						</label>
						<input
							id='end-date'
							type='date'
							value={endDate}
							onChange={e => onEndDateChange(e.target.value)}
							disabled={isApplying}
							className='w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-60'
						/>
					</div>

					{/* Acciones */}
					<div className='mt-1 flex gap-3'>
						<button
							type='button'
							onClick={onClear}
							disabled={isApplying}
							className='flex-1 rounded-lg bg-gray-600 px-5 py-3 text-base font-medium text-white transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed'>
							Limpiar
						</button>
						<button
							type='button'
							onClick={onApply}
							disabled={!canApply}
							aria-disabled={!canApply}
							className='flex-1 rounded-lg bg-green-600 px-5 py-3 text-base font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50 disabled:cursor-not-allowed'>
							{isApplying ? 'Aplicando…' : 'Aplicar Filtro'}
						</button>
					</div>

					{errorDate && (
						<p className='text-sm text-red-600'>
							La fecha de inicio no puede ser mayor que la fecha
							fin.
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
