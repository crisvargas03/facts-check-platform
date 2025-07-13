interface Props {
	labelText: string;
	placeholder: string;
}

export const FormInput = ({ labelText, placeholder }: Props) => {
	return (
		<div className='mb-5'>
			<label htmlFor=''>
				<span className='text-gray-400'>{labelText}</span>
				<input
					type='email'
					className='w-full p-2 border border-gray-300 rounded mt-1'
					placeholder={placeholder}
					required
				/>
			</label>
		</div>
	);
};
