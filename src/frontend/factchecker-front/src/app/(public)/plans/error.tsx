'use client';

import Link from 'next/link';

export default function Error({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className='from-gray-50 via-white to-blue-50 p-8'>
			<div className='text-center mb-16'>
				<h1 className='text-4xl font-bold text-gray-900 mb-4'>
					Elige el plan perfecto para ti
				</h1>
			</div>

			<div className='max-w-2xl mx-auto text-center'>
				<div className='bg-red-50 border border-red-200 rounded-lg p-8'>
					<h2 className='text-2xl font-bold text-red-600 mb-4'>
						Error al cargar los planes
					</h2>
					<p className='text-gray-600 mb-6'>
						Ha ocurrido un error inesperado al cargar la información
						de los planes.
					</p>
					<div className='flex gap-4 justify-center'>
						<button
							onClick={reset}
							className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium transition-colors'>
							Intentar de nuevo
						</button>
						<Link href='/'>
							<span className='bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md font-medium transition-colors inline-block'>
								Volver al inicio
							</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
