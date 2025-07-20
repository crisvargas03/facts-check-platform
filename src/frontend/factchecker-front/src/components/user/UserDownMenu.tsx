'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FiChevronDown, FiLogOut, FiSettings, FiUser } from 'react-icons/fi';

interface Props {
	name: string;
	email: string;
	image: string;
	onLogout: () => void;
}

export const UserDownMenu = ({ name, email, image, onLogout }: Props) => {
	const [open, setOpen] = useState(false);
	return (
		<div className='relative'>
			<button
				onClick={() => setOpen(!open)}
				className='flex items-center gap-2'>
				<div className='rounded-full flex items-center justify-center text-white font-semibold'>
					<Image src={image} alt={name} width={30} height={30} />
				</div>
				<div className='hidden sm:flex flex-col text-left'>
					<span className='text-sm font-medium text-gray-800'>
						{name}
					</span>
				</div>
				<FiChevronDown className='text-gray-500 text-sm' />
			</button>

			{open && (
				<div className='absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50'>
					<div className='px-4 py-3 border-b border-gray-300'>
						<p className='font-medium text-sm text-gray-800'>
							{name}
						</p>
						<p className='text-xs text-gray-500'>{email}</p>
					</div>
					<div className='flex flex-col gap-4 mt-2 px-4 py-3'>
						<Link
							href='/'
							className='text-sm text-gray-800 hover:text-gray-600'>
							<span className='flex flex-row justify-start align-middle items-center gap-2'>
								<FiUser size={20} />
								<span>Mi Perfil</span>
							</span>
						</Link>
						<Link
							href='/'
							className='text-sm text-gray-800 hover:text-gray-600'>
							<span className='flex flex-row justify-start align-middle items-center gap-2'>
								<FiSettings size={20} />
								<span> Configuración </span>
							</span>
						</Link>
						<button
							onClick={onLogout}
							className='text-sm text-red-600 text-left hover:text-red-700'>
							<span className='flex flex-row justify-start align-middle items-center gap-2'>
								<FiLogOut size={20} />
								<span>Cerrar Sesión</span>
							</span>
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
