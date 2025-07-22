'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FiX, FiMenu } from 'react-icons/fi';
import { NavbarItems } from './NavbarItems';

interface Props {
	linksOptions: { label: string; href: string }[];
	appName: string;
}

export const PublicNavBar = ({ linksOptions, appName }: Props) => {
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
				</div>
			)}
		</nav>
	);
};
