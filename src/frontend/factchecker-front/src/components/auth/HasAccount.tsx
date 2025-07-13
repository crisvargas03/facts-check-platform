import Link from 'next/link';
import React from 'react';

interface Props {
	text: string;
	textLink: string;
	link: string;
}
export const HasAccount = ({ text, textLink, link }: Props) => {
	return (
		<div className='text-gray-500 text-sm text-center'>
			{text}{' '}
			<Link href={link} className='text-[rgb(53,72,170)] hover:underline'>
				{textLink}
			</Link>
		</div>
	);
};
