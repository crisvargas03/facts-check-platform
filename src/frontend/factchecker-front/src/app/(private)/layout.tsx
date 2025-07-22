import { Footer } from '@/components/ui';
import { PrivateNavBar } from '@/components/ui/navbars';
import { UserCookieData } from '@/lib/auth';
import { getUserInfo } from '@/services';
import { appName, getAvatarUrl } from '@/utils';
import { privateLinksOptions } from '@/utils/links-options';
import { cookies } from 'next/headers';

interface Props {
	children: React.ReactNode;
}

const getCookieFromServer = async (key: string) => {
	const cookieStore = await cookies();
	// get the cookie data
	const data = cookieStore.get(key);
	if (!data) {
		return null;
	}

	// decrypt the data
	const decrypted = atob(data.value);
	return JSON.parse(decrypted);
};

export default async function PrivateLayout({ children }: Props) {
	const cookiedata = (await getCookieFromServer(
		'__user__'
	)) as UserCookieData;

	const userInfo = await getUserInfo(cookiedata.user, cookiedata.token);
	userInfo.data!.image = getAvatarUrl(userInfo.data!.name);

	return (
    <div className='min-h-screen flex flex-col'>
			<PrivateNavBar
				userInfo={userInfo.data!}
				linksOptions={privateLinksOptions}
				appName={appName || ''}
			/>
			<main className='flex-1 m-2'>{children}</main>
			<Footer />
		</div>
	);
}
