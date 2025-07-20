'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { NavbarItems } from './NavbarItems';
import { LinkOptions } from '@/utils';
import { FiMenu, FiX } from 'react-icons/fi';
import { UserAvatarMenu } from '../user';

interface Props {
	linksOptions: LinkOptions[];
	appName: string;
}

export const CustomNavbar = ({ linksOptions, appName }: Props) => {
	const [open, setOpen] = useState(false);

	return (
		<nav className='bg-white shadow w-fulL py-2'>
			<div className='flex items-center justify-between px-4 gap-6'>
				<Link
					href='/home'
					className='text-2xl font-bold text-gray-800 hover:text-[rgb(37,56,123)] no-underline'>
					{appName}
				</Link>

				<div className='flex items-center gap-6'>
					<button
						className='md:hidden text-2xl focus:outline-none'
						onClick={() => setOpen(!open)}
						aria-label='Toggle menu'>
						{open ? <FiX /> : <FiMenu />}
					</button>
					<div className='hidden md:flex md:items-center md:gap-6'>
						{linksOptions.map(option => (
							<NavbarItems
								key={option.label}
								label={option.label}
								path={option.href}
							/>
						))}
					</div>

					<div className='hidden md:block'>
						<UserAvatarMenu />
					</div>
				</div>
			</div>

			{open && (
				<div className='md:hidden mt-4 px-6'>
					<div className='flex flex-col gap-4'>
						{linksOptions.map(option => (
							<NavbarItems
								key={option.label}
								label={option.label}
								path={option.href}
							/>
						))}
					</div>
					<div className='mt-4 border-t border-gray-300'>
						<UserAvatarMenu smallScreen={true} />
					</div>
				</div>
			)}
		</nav>
	);
};
