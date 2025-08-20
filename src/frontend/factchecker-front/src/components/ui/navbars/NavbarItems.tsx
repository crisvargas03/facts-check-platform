'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
	label: string;
	path: string;
}

const getActiveClass = (currentPath: string, path: string): string => {
	const activeClass = currentPath === path ? 'text-lg font-bold' : 'text-md';
	if (currentPath === '/auth/signup' && path === '/auth/login') {
		return 'text-lg font-bold';
	}
	return activeClass;
};

export const NavbarItems = ({ label, path }: Props) => {
	const pathName = usePathname();
	const activeClass = getActiveClass(pathName, path);

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
