import React from 'react';
import Link from 'next/link';

type EmptyStateCardProps = {
	title?: string;
	description?: string;
	href: string;
	ctaLabel?: string;
	className?: string;
};

export function EmptyStateCard({
	title = 'No hay resultados',
	description = 'Aún no has analizado ningún artículo.',
	href,
	ctaLabel = 'Analizar Primer Artículo',
	className,
}: EmptyStateCardProps) {
	return (
		<div
			className={[
				'w-full bg-white rounded-lg p-8 text-center',
				'border border-gray-200 shadow-sm',
				'border border-black/5',
				className,
			]
				.filter(Boolean)
				.join(' ')}>
			<h3 className='text-xl font-semibold text-black mb-2'>{title}</h3>

			<p className='text-gray-500 mb-6'>{description}</p>

			<Link
				href={href}
				className='inline-flex items-center justify-center rounded-lg bg-blue-900 px-6 py-2.5 text-white font-medium transition-colors hover:bg-blue-800'>
				{ctaLabel}
			</Link>
		</div>
	);
}
