import { Footer, PublicNavbar } from '@/components/ui';

interface Props {
	children: React.ReactNode;
}

export default function PublicLayout({ children }: Props) {
	return (
		<div className='min-h-screen flex flex-col'>
			<PublicNavbar />
			<main className='flex-1 m-2'>{children}</main>
			<Footer />
		</div>
	);
}
