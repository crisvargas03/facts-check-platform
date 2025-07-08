'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
	label: string;
	path: string;
}

export const NavbarItems = ({ label, path }: Props) => {
	const pathName = usePathname();
	const activeClass = path === pathName ? 'text-lg font-bold' : 'text-md';
	return (
		<div className='inline-block'>
			<Link
				href={path}
				className={`no-underline text-gray-800 hover:text-black ml-2 px-1 ${activeClass}`}>
				{label}
			</Link>
		</div>
	);
};
