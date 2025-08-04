import Link from 'next/link';
import React from 'react';

interface Props {
	href: string;
	text: string;
	isOutline: boolean;
	color?: 'blue' | 'red' | 'white';
}

export const LinkButton = ({
	href,
	text,
	isOutline,
	color = 'blue',
}: Props) => {
	const baseClasses =
		'px-6 py-3 rounded-lg font-semibold text-center inline-block transition-colors duration-200';

	const colorClasses = {
		blue: {
			solid: 'bg-blue-900 text-white hover:bg-blue-800',
			outline:
				'border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white',
		},
		red: {
			solid: 'bg-red-500 hover:bg-red-600 text-white',
			outline: 'border-2 border-red-500 text-red-500 hover:bg-red-100',
		},
		white: {
			solid: 'bg-white text-blue-900 hover:bg-gray-200',
			outline:
				'bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900',
		},
	};

	const variantClasses = isOutline
		? colorClasses[color].outline
		: colorClasses[color].solid;

	return (
		<Link href={href} className={`${baseClasses} ${variantClasses}`}>
			{text}
		</Link>
	);
};
