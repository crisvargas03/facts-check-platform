import { CustomNavbar, Footer } from '@/components/ui';
import { UserCookieData } from '@/lib/auth';
import { appName, deleteCookieData } from '@/utils';
import { privateLinksOptions } from '@/utils/links-options';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface Props {
	children: React.ReactNode;
}

export default async function PrivateLayout({ children }: Props) {
	const cookieStore = await cookies();
	const encryptedUser = cookieStore.get('__user__')?.value;

	if (!encryptedUser) {
		redirect('/auth/login');
	}

	const user = JSON.parse(atob(encryptedUser)) as UserCookieData;

	if (!user || user.expires < new Date()) {
		deleteCookieData('__user__');
		redirect('/auth/login');
	}

	return (
		<div className='min-h-screen flex flex-col' style={{ backgroundColor: '#f8fafc' }}>
			<CustomNavbar
				linksOptions={privateLinksOptions}
				appName={appName || ''}
			/>
			<main className='flex-1' style={{ backgroundColor: '#f8fafc' }}>{children}</main>
			<Footer />
		</div>
	);
}
