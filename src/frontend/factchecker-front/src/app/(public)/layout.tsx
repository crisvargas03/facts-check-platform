import { CustomNavbar, Footer } from '@/components/ui';
import { appName, publicLinksOptions } from '@/utils';

interface Props {
	children: React.ReactNode;
}

export default function PublicLayout({ children }: Props) {
	return (
		<div className='min-h-screen flex flex-col'>
			<CustomNavbar
				linksOptions={publicLinksOptions}
				appName={appName || ''}
			/>
			<main className='flex-1'>{children}</main>
			<Footer />
		</div>
	);
}
