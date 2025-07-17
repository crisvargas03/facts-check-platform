interface Props {
	text: string;
	type?: 'button' | 'submit' | 'reset';
	color?: string;

	disabled?: boolean;
	icon?: React.ReactNode;
	onClick?: () => void;
}

interface Colors {
	[key: string]: {
		color: string;
		hoverColor: string;
		textColor: string;
	};
}

export const Button = ({
	text,
	type = 'button',
	color = 'primary',
	disabled = false,
	icon = null,
	onClick,
}: Props) => {
	const colors: Colors = {
		primary: {
			color: 'bg-[rgb(53,72,170)]',
			hoverColor: 'hover:bg-[rgb(37,56,123)]',
			textColor: 'text-white',
		},
		secondary: {
			color: 'bg-gray-100',
			hoverColor: 'hover:bg-gray-200',
			textColor: 'text-gray-800',
		},
		danger: {
			color: 'bg-red-500',
			hoverColor: 'hover:bg-red-600',
			textColor: 'text-white',
		},
	};

	const {
		color: bgColor,
		hoverColor,
		textColor,
	} = colors[color] || colors.primary;

	return (
		<button
			onClick={onClick}
			type={type}
			className={`w-full ${bgColor} ${textColor} p-2 rounded ${hoverColor} transition duration-200`}
			disabled={disabled}>
			{text}
			{icon && <span className='inline-block ml-2'>{icon}</span>}
		</button>
	);
};
