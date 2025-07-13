import { CustomNavbar, Footer } from '@/components/ui';
import { appName } from '@/utils';
import { privateLinksOptions } from '@/utils/links-options';

interface Props {
	children: React.ReactNode;
}

export default function PrivateLayout({ children }: Props) {
	return (
		<div className='min-h-screen flex flex-col'>
			<CustomNavbar
				linksOptions={privateLinksOptions}
				appName={appName || ''}
			/>
			<main className='flex-1 m-2'>{children}</main>
			<Footer />
		</div>
	);
}
