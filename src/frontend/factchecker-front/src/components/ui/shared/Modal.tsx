'use client';

import React, { useEffect, useId, useRef } from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
	maxWidthClass?: string; // ej: 'sm:max-w-lg md:max-w-2xl lg:max-w-3xl'
}

export const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	title,
	children,
	maxWidthClass = 'sm:max-w-lg md:max-w-2xl lg:max-w-3xl',
}) => {
	const headingId = useId();
	const dialogRef = useRef<HTMLDivElement | null>(null);
	const firstFocusRef = useRef<HTMLButtonElement | null>(null);

	useEffect(() => {
		if (!isOpen) return;
		// Bloquear scroll
		const prev = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		// ESC para cerrar
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', onKey);

		// Enfocar botón cerrar al abrir
		firstFocusRef.current?.focus();

		return () => {
			document.body.style.overflow = prev;
			window.removeEventListener('keydown', onKey);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div
			className='fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-5 sm:p-6'
			role='dialog'
			aria-modal='true'
			aria-labelledby={headingId}
			onClick={e => {
				if (e.target === e.currentTarget) onClose(); // cerrar al hacer click fuera
			}}>
			<div
				ref={dialogRef}
				className={[
					'relative w-full rounded-2xl bg-white shadow-2xl ring-1 ring-black/5',
					'max-h-[90vh] overflow-hidden',
					maxWidthClass,
				].join(' ')}>
				{/* Header */}
				<div className='sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-5 sm:px-8 py-4 sm:py-5'>
					<h2
						id={headingId}
						className='m-0 text-xl sm:text-2xl font-bold text-gray-900'>
						{title}
					</h2>
					<button
						ref={firstFocusRef}
						onClick={onClose}
						aria-label='Cerrar'
						className='inline-flex h-9 w-9 items-center justify-center rounded-md text-2xl leading-none text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'>
						×
					</button>
				</div>

				{/* Contenido */}
				<div className='overflow-y-auto px-5 sm:px-8 py-6 sm:py-8 max-h-[calc(90vh-74px)]'>
					{children}
				</div>
			</div>
		</div>
	);
};
