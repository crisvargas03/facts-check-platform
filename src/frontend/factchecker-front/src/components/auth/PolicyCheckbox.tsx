import Link from 'next/link';

export const PolicyCheckbox = () => {
	return (
		<div>
			<input type='checkbox' id='terms' className='mr-2' />
			<label htmlFor='terms' className='text-gray-600 text-sm'>
				Al crear una cuenta, acepto los{' '}
				<Link href='' className='underline'>
					Términos de uso
				</Link>{' '}
				y la{' '}
				<Link href='' className='underline'>
					Política de privacidad
				</Link>
			</label>
		</div>
	);
};
