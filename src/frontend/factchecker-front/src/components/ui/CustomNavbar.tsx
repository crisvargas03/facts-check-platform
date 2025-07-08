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
		<nav className='flex flex-col text-center content-center sm:flex-row sm:text-left sm:justify-between py-2 px-6 bg-white shadow sm:items-baseline w-full'>
			<div className='mb-2 sm:mb-0 flex flex-row'>
				<div>
					<Link
						href='/home'
						className='text-2xl no-underline text-grey-darkest hover:text-blue-dark font-sans font-bold'>
						{appName}
					</Link>
				</div>
			</div>

			<div className='sm:mb-0 self-center'>
				{linksOptions.map(option => (
					<NavbarItems
						key={option.label}
						label={option.label}
						path={option.href}
					/>
				))}
			</div>
		</nav>
	);
};
