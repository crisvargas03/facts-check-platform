'use client';

import { useFormStatus } from 'react-dom';
import { LoadingState } from '../shared';

export const DemoSubmitClientComponent = () => {
	const { pending } = useFormStatus();
	return (
		<div className='flex justify-center'>
			{pending ? (
				<LoadingState />
			) : (
				<button
					type='submit'
					className='px-8 py-3 rounded-lg font-semibold text-white transition bg-blue-900 hover:bg-blue-800'>
					Analizar Artículo
				</button>
			)}
		</div>
	);
};
