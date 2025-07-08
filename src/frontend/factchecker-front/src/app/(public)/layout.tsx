import { PublicNavbar } from '@/components/ui/PublicNavbar';

interface Props {
	children: React.ReactNode;
}

export default function PublicLayout({ children }: Props) {
	return (
		<>
			<PublicNavbar />
			<div className='m-2'>
				<div>{children}</div>
			</div>
		</>
	);
}
