import { FeaturesSection, LinkButton } from '@/components/ui/homepage';

export default function Home() {
	return (
		<div className='min-h-screen px-4 sm:px-6 lg:px-8 py-10'>
			<div className='max-w-screen-xl mx-auto'>
				{/* Hero Section */}
				<div className='text-center mb-20'>
					<h1 className='text-4xl sm:text-5xl lg:text-[72px] font-bold text-black mb-6'>
						ChequeaEsoRD
					</h1>
					<p className='text-base sm:text-lg text-gray-500 mb-8 max-w-3xl mx-auto'>
						Plataforma avanzada para el análisis de veracidad de
						artículos. Utilizamos tecnología de última generación
						para determinar el porcentaje de credibilidad de
						cualquier contenido periodístico o informativo.
					</p>
					<div className='flex flex-col sm:flex-row justify-center gap-4 mb-20'>
						<LinkButton
							href='/auth/login'
							text='Iniciar Sesión'
							isOutline={false}
							color='blue'
						/>
						<LinkButton
							href='/auth/signup'
							text='Registrarse'
							isOutline={true}
							color='blue'
						/>
					</div>
				</div>

				{/* Features */}
				<FeaturesSection />

				{/* Demo Preview Section */}
				<div className='text-center mt-20 px-4 sm:px-10 py-12 sm:py-16 bg-white rounded-lg border border-gray-200 shadow-sm p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2'>
					<h2 className='text-2xl sm:text-3xl font-bold text-black mb-4'>
						¿Quieres probar?
					</h2>
					<p className='text-base sm:text-lg text-gray-500 mb-8 max-w-xl mx-auto'>
						Ve cómo funciona nuestra plataforma con un ejemplo real
						de análisis de veracidad.
					</p>
					<LinkButton
						href='/demo'
						text='Ver Demo Interactivo'
						isOutline={false}
						color='blue'
					/>
				</div>

				{/* Join Us Section */}
				<div className='text-center mt-16 px-4 sm:px-10 py-12 sm:py-16 bg-blue-900 rounded-lg text-white border shadow-sm p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2'>
					<h2 className='text-2xl sm:text-3xl font-bold mb-4'>
						Únete a nuestra comunidad
					</h2>
					<p className='text-base sm:text-lg mb-8 max-w-xl mx-auto opacity-90'>
						Sé uno de los primeros en experimentar el futuro de la
						verificación de información. Únete a ChequeaEsoRD y
						comienza a analizar la veracidad de artículos con
						tecnología de IA avanzada.
					</p>
					<div className='flex flex-col sm:flex-row justify-center gap-4'>
						<LinkButton
							href='/auth/signup'
							text='Crear Cuenta Gratis'
							isOutline={false}
							color='white'
						/>
						<LinkButton
							href='/plans'
							text='Ver Planes'
							isOutline={true}
							color='white'
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
