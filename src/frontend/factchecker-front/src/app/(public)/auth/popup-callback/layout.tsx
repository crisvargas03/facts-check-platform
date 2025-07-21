interface Props {
	children: React.ReactNode;
}

export default function PublicLayout({ children }: Props) {
	return (
		<div className='min-h-screen flex flex-col'>
			<main className='flex-1'>{children}</main>
		</div>
	);
}
