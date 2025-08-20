export const LoadingState = () => {
	return (
		<div className='mt-8 text-center'>
			<div className='inline-block w-8 h-8 border-[3px] border-gray-200 border-t-blue-600 rounded-full animate-spin'></div>
			<p className='mt-4 text-gray-500'>
				Analizando el artículo, por favor espera...
			</p>
			<p className='mt-2 text-sm text-gray-400'>
				Evaluando credibilidad, verificando fuentes, analizando
				contenido...
			</p>
		</div>
	);
};
