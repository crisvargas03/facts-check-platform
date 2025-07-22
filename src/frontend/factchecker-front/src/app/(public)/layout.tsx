import { Footer } from '@/components/ui';
import { PublicNavBar } from '@/components/ui/navbars';
import { appName, publicLinksOptions } from '@/utils';

interface Props {
	children: React.ReactNode;
}

export default function PublicLayout({ children }: Props) {
	return (
		<div className='min-h-screen flex flex-col'>
			<PublicNavBar
				linksOptions={publicLinksOptions}
				appName={appName || ''}
			/>
			<main className='flex-1'>{children}</main>
			<Footer />
		</div>
	);
}
