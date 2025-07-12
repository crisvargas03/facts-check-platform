import React from 'react';

interface Props {
	text: string;
}

export const Separator = ({ text }: Props) => {
	return (
		<div className='flex items-center my-6'>
			<hr className='flex-grow border-t border-gray-300' />
			<span className='mx-4 text-gray-600'>{text}</span>
			<hr className='flex-grow border-t border-gray-300' />
		</div>
	);
};
