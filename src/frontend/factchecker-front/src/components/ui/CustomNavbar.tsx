'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { NavbarItems } from './NavbarItems';
import { getCookieData, LinkOptions } from '@/utils';
import { FiMenu, FiX } from 'react-icons/fi';
import { UserCookieData } from '@/lib/auth';

interface Props {
	linksOptions: LinkOptions[];
	appName: string;
}

export const CustomNavbar = ({ linksOptions, appName }: Props) => {
	const [open, setOpen] = useState(false);
	const user = getCookieData('__user__') as UserCookieData;

	return (
		<nav className='bg-white shadow w-full px-6 py-2'>
			<div className='flex items-center justify-between'>
				<Link
					href='/home'
					className='text-2xl font-bold font-sans text-gray-800 hover:text-[rgb(37,56,123)] no-underline'>
					{appName}
				</Link>

				{/* TODO: Add component to show user information */}

				<button
					className='sm:hidden text-2xl focus:outline-none'
					onClick={() => setOpen(!open)}
					aria-label='Toggle menu'>
					{open ? <FiX /> : <FiMenu />}
				</button>
				<div className='hidden sm:flex sm:items-center sm:gap-6'>
					{linksOptions.map(option => (
						<NavbarItems
							key={option.label}
							label={option.label}
							path={option.href}
						/>
					))}
				</div>
			</div>

			{open && (
				<div className='sm:hidden mt-2 flex flex-col gap-4'>
					{user.user}
					{linksOptions.map(option => (
						<NavbarItems
							key={option.label}
							label={option.label}
							path={option.href}
						/>
					))}
				</div>
			)}
		</nav>
	);
};
