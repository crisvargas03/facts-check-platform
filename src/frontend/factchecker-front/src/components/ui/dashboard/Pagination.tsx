import React from 'react';

type PaginationProps = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};

const cx = (...classes: Array<string | false | undefined>) =>
	classes.filter(Boolean).join(' ');

export function Pagination({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) {
	if (totalPages <= 1) return null;

	return (
		<nav
			className='mt-8 flex items-center justify-center gap-2'
			aria-label='Paginación'>
			{/* Botón Anterior */}
			<button
				type='button'
				onClick={() => onPageChange(Math.max(1, currentPage - 1))}
				disabled={currentPage === 1}
				className={cx(
					'rounded-md border border-gray-300 px-3 py-2 text-sm transition',
					currentPage === 1
						? 'bg-gray-100 text-gray-400 cursor-not-allowed'
						: 'bg-white text-gray-700 hover:bg-gray-50'
				)}>
				Anterior
			</button>

			{/* Números de página */}
			{Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
				<button
					key={page}
					type='button'
					onClick={() => onPageChange(page)}
					className={cx(
						'rounded-md border px-3 py-2 text-sm transition',
						currentPage === page
							? 'border-blue-700 bg-blue-700 text-white font-semibold'
							: 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
					)}
					aria-current={currentPage === page ? 'page' : undefined}>
					{page}
				</button>
			))}

			{/* Botón Siguiente */}
			<button
				type='button'
				onClick={() =>
					onPageChange(Math.min(totalPages, currentPage + 1))
				}
				disabled={currentPage === totalPages}
				className={cx(
					'rounded-md border border-gray-300 px-3 py-2 text-sm transition',
					currentPage === totalPages
						? 'bg-gray-100 text-gray-400 cursor-not-allowed'
						: 'bg-white text-gray-700 hover:bg-gray-50'
				)}>
				Siguiente
			</button>
		</nav>
	);
}
