import React from 'react';
import { IoCheckmarkCircle, IoBarChart, IoFlash } from 'react-icons/io5';

const features = [
	{
		icon: <IoCheckmarkCircle className='text-green-500' size={32} />,
		title: 'Análisis de Veracidad',
		desc: 'Utilizamos IA avanzada para evaluar la credibilidad de artículos y noticias.',
		bg: 'bg-green-50',
	},
	{
		icon: <IoBarChart className='text-blue-500' size={32} />,
		title: 'Estadísticas Detalladas',
		desc: 'Proporcionamos informes detallados con métricas de veracidad y análisis de contenido.',
		bg: 'bg-blue-50',
	},
	{
		icon: <IoFlash className='text-yellow-500' size={32} />,
		title: 'Resultados Rápidos',
		desc: 'Obtén resultados en tiempo real para tomar decisiones informadas al instante.',
		bg: 'bg-yellow-50',
	},
];

export const FeaturesSection = () => {
	return (
		<div>
			<div className='grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
				{features.map(({ icon, title, desc, bg }, i) => (
					<div
						key={i}
						className='bg-white rounded-lg border border-gray-200 shadow-sm p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2'>
						<div
							className={`w-16 h-16 ${bg} rounded-xl flex items-center justify-center mx-auto mb-6`}>
							{icon}
						</div>
						<h3 className='text-lg font-semibold text-black mb-3 text-center'>
							{title}
						</h3>
						<p className='text-gray-500 text-center leading-relaxed'>
							{desc}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};
