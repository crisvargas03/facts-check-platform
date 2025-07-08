import { publicLinksOptions } from '@/utils';
import { FaXTwitter } from 'react-icons/fa6';
import { IoLogoInstagram } from 'react-icons/io5';

export const Footer = () => {
	return (
		<footer className='bg-gray-900 text-white w-full fixed bottom-0 left-0 z-50'>
			<div className='max-w-7xl mx-auto px-6 py-12'>
				<div className='lg:flex lg:justify-between'>
					<div className='mb-10 lg:mb-0 lg:max-w-md'>
						<h3 className='text-2xl font-bold mb-4'>Certum</h3>
						<p className='text-gray-300 text-sm leading-relaxed'>
							Where every game is a lesson, and every lesson is a
							game. Our app transforms learning into playful
							games, captivating young minds with interactive fun.
						</p>
					</div>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
						<div>
							<h4 className='text-lg font-semibold mb-4'>
								Quick links
							</h4>
							<ul className='space-y-3'>
								{publicLinksOptions.map(link => (
									<li key={link.href}>
										<a
											href={link.href}
											className='text-gray-300 hover:text-white transition-colors duration-200'>
											{link.label}
										</a>
									</li>
								))}
							</ul>
						</div>
						<div>
							<h4 className='text-lg font-semibold mb-4'>
								Conecta con Nosotros
							</h4>
							<div className='space-y-3'>
								<a
									href='#'
									className='flex items-center text-gray-300 hover:text-white transition-colors duration-200'>
									<IoLogoInstagram className='w-5 h-5 mr-3' />
									Instagram
								</a>
								<a
									href='#'
									className='flex items-center text-gray-300 hover:text-white transition-colors duration-200'>
									<FaXTwitter className='w-5 h-5 mr-3' />X
									(Twitter)
								</a>
							</div>
						</div>
					</div>
				</div>

				<div className='border-t border-gray-700 mt-12 pt-8'>
					<div className='flex flex-col md:flex-row md:justify-between md:items-center'>
						<div className='flex flex-wrap gap-6 mb-4 md:mb-0'>
							<div className='text-gray-300 hover:text-white transition-colors duration-200 text-sm'>
								Privacy Policy
							</div>
							<div className='text-gray-300 hover:text-white transition-colors duration-200 text-sm'>
								Terms &amp; Conditions
							</div>
							<div className='text-gray-300 hover:text-white transition-colors duration-200 text-sm'>
								Support
							</div>
						</div>
						<p className='text-gray-500 text-sm'>
							© Copyright 2025, Todos los Derechos Reservados
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};
