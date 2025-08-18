import { SubmitHandler, useForm } from 'react-hook-form';
import { IoSparkles } from 'react-icons/io5';

interface Props {
	isAnalyzing: boolean;
	onSubmitForm: (data: NormalUploadInputs) => void;
}

type NormalUploadInputs = {
	titulo: string;
	contenido: string;
	url?: string;
};

export const NormalUploadForms = ({ isAnalyzing, onSubmitForm }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<NormalUploadInputs>();

	const styleForBtn = isAnalyzing
		? 'bg-gray-400 cursor-not-allowed'
		: 'bg-blue-900 hover:bg-blue-800 cursor-pointer';

	const errorStyle = 'border-red-500 focus:ring-red-500';

	const onSubmit: SubmitHandler<NormalUploadInputs> = data => {
		onSubmitForm(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
			{/* Título */}
			<div>
				<label
					htmlFor='titulo'
					className='block text-sm font-semibold text-gray-400 mb-2'>
					Título del Artículo
				</label>
				<input
					type='text'
					id='titulo'
					{...register('titulo', { required: true })}
					className={`w-full px-4 py-3 border border-gray-300 rounded-lg text-base  focus:border-blue-500 focus:ring-blue-500 outline-none transition ${
						errors.titulo ? errorStyle : ''
					}`}
					placeholder='Ingresa el título del artículo...'
					required
				/>
				{errors.titulo && (
					<span className='mt-2 text-xs text-red-500'>
						El título es obligatorio
					</span>
				)}
			</div>

			{/* Contenido */}
			<div>
				<label
					htmlFor='contenido'
					className='block text-sm font-semibold text-gray-400 mb-2'>
					Contenido del Artículo
				</label>
				<textarea
					id='contenido'
					{...register('contenido', { required: true })}
					rows={10}
					className={`w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 outline-none transition resize-y ${
						errors.contenido ? errorStyle : ''
					}`}
					placeholder='Pega aquí el contenido completo del artículo...'
					required
				/>
				{errors.contenido && (
					<span className='mt-2 text-xs text-red-500'>
						El contenido es obligatorio
					</span>
				)}
			</div>

			{/* URL */}
			<div>
				<label
					htmlFor='url'
					className='block text-sm font-semibold text-gray-400 mb-2'>
					URL (Opcional)
				</label>
				<input
					type='url'
					id='url'
					{...register('url')}
					className='w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-blue-500 outline-none transition'
					placeholder='https://ejemplo.com/articulo'
				/>
			</div>

			{/* Submit Button */}
			<div className='flex justify-center pt-4 gap-4'>
				<button
					type='submit'
					disabled={isAnalyzing}
					className={`px-8 py-3 rounded-lg font-semibold text-white text-base transition ${styleForBtn}`}>
					{isAnalyzing ? (
						'Analizando...'
					) : (
						<span>
							<IoSparkles className='inline mr-1' />
							Analizar Artículo
						</span>
					)}
				</button>
				{/* <button
					type='button'
					disabled={isAnalyzing}
					className='px-8 py-3 rounded-lg font-semibold text-white text-base bg-red-600 hover:bg-red-500 transition'
					onClick={handleClear}>
					Analizar Otro Artículo
				</button> */}
			</div>
		</form>
	);
};
