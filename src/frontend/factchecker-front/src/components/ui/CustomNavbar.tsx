import Link from 'next/link';
import React from 'react';
import { NavbarItems } from './NavbarItems';
import { LinkOptions } from '@/utils';

const appName = process.env.APP_NAME;

interface Props {
	linksOptions: LinkOptions[];
}

export const CustomNavbar = ({ linksOptions }: Props) => {
	return (
		<nav className='bg-white shadow w-full px-6 py-2'>
			<div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
				{/* Brand */}
				<div className='flex justify-center sm:justify-start mb-2 sm:mb-0'>
					<Link
						href='/home'
						className='text-2xl font-bold font-sans text-gray-800 hover:text-[rgb(37,56,123)] no-underline'>
						{appName}
					</Link>
				</div>

				{/* Links */}
				<div className='flex flex-col sm:flex-row items-center gap-4'>
					{linksOptions.map(option => (
						<NavbarItems
							key={option.label}
							label={option.label}
							path={option.href}
						/>
					))}
				</div>
			</div>
		</nav>
	);
};
