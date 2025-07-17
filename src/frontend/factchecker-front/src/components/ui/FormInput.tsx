/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface Props {
	labelText: string;
	placeholder: string;
	register: UseFormRegister<any>;
	errors: FieldErrors<any>;
	type: string;
	name: string;
	minLength?: number;
	required?: boolean;
}

export const FormInput = ({
	labelText,
	placeholder,
	register,
	errors,
	type,
	name,
	minLength = 0,
	required = true,
}: Props) => {
	const errorMessage = () => {
		if (errors[name]?.type === 'required') return 'Este campo es requerido';

		if (errors[name]?.type === 'pattern' && name === 'email')
			return 'El correo electrónico no es válido';

		if (errors[name]?.type === 'minLength' && name === 'password')
			return `La contraseña debe tener al menos ${minLength} caracteres`;

		if (errors[name]?.type === 'minLength' && name === 'name')
			return `El nombre debe tener al menos ${minLength} caracteres`;

		if (errors[name]?.type === 'minLength' && name === 'lastName')
			return `El apellido debe tener al menos ${minLength} caracteres`;
	};

	return (
		<div className='mb-5'>
			<label htmlFor=''>
				<span className='text-gray-400 '>{labelText}</span>
				<input
					type={type}
					className={`w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded mt-1 ${
						errors[name] && 'border-red-500'
					}`}
					placeholder={placeholder}
					required={required}
					{...register(name, {
						required: required,
						minLength: minLength,
						pattern:
							name === 'email'
								? /^[^\s@]+@[^\s@]+\.[^\s@]+$/
								: undefined,
					})}
				/>
				{errors[name] && (
					<span className='text-red-500 text-xs'>
						{errorMessage()}
					</span>
				)}
			</label>
		</div>
	);
};
