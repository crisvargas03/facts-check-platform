import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiLogOut, FiSettings, FiUser } from 'react-icons/fi';

interface Props {
	name: string;
	email: string;
	image: string;
	onLogout: () => void;
}

export const UserSideBarMenu = ({ name, email, image, onLogout }: Props) => {
	return (
		<div className='flex flex-col gap-2 px-4 py-2'>
			<div className='flex items-center gap-3 py-2'>
				<div className='w-8 h-8 rounded-full flex items-center justify-center font-bold'>
					<Image
						src={image}
						alt={name}
						width={32}
						height={32}
						unoptimized
					/>
				</div>
				<div>
					<p className='text-md font-semibold'>{name}</p>
					<p className='text-xs text-gray-500'>{email}</p>
				</div>
			</div>

			<div className='flex flex-col gap-4 mt-2'>
				<Link
					href='/'
					className='text-sm font-medium text-gray-800 hover:text-gray-600'>
					<span className='flex flex-row justify-start align-middle items-center gap-2'>
						<FiUser size={20} />
						<span>Mi Perfil</span>
					</span>
				</Link>
				<Link
					href='/configuracion'
					className='text-sm font-medium text-gray-800 hover:text-gray-600'>
					<span className='flex flex-row justify-start align-middle items-center gap-2'>
						<FiSettings size={20} />
						<span> Configuración </span>
					</span>
				</Link>
				<button
					onClick={onLogout}
					className='text-sm font-medium text-red-600 text-left hover:text-red-700'>
					<span className='flex flex-row justify-start align-middle items-center gap-2'>
						<FiLogOut size={20} />
						<span>Cerrar Sesión</span>
					</span>
				</button>
			</div>
		</div>
	);
};
