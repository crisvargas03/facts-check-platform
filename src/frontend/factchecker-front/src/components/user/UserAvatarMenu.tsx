'use client'; // TODO: Remove that this is a client component
import { UserCookieData } from '@/lib/auth';
import { getCookieData, deleteCookieData } from '@/utils';
import { UserDownMenu } from './UserDownMenu';
import { UserSideBarMenu } from './UserSideBarMenu';
import { useEffect, useState } from 'react';
import { getUserInfo } from '@/services/users/users.services';
import { UserServicesResponse } from '@/lib/users';

interface Props {
	smallScreen?: boolean;
}

export const UserAvatarMenu = ({ smallScreen }: Props) => {
	const cookieData = getCookieData('__user__') as UserCookieData;
	const [userInfo, setUserInfo] = useState<UserServicesResponse | null>();

	// TODO: Move this to the server side
	useEffect(() => {
		getUserInfo(cookieData.user, cookieData.token).then(response => {
			if (response.isSuccess) {
				setUserInfo(response.data);
			} else {
				console.error('Error fetching user info:', response.errors);
			}
		});
	}, [cookieData.user]);

	const dummy = {
		image: 'https://api.dicebear.com/7.x/initials/png?seed=Test&size=128&backgroundColor=8ecae6&radius=50',
	};

	console.log({ userInfo });

	const handleLogout = () => {
		// TODO: Implement the logic of logic, alert, confimations... etc
		deleteCookieData('__user__');
	};

	return (
		<>
			{!userInfo && (
				<div className='flex items-center gap-2'>
					<div className='w-8 h-8 bg-gray-300 rounded-full animate-pulse' />
					<span className='text-gray-500'>Loading...</span>
				</div>
			)}
			{smallScreen ? (
				<UserSideBarMenu
					name={userInfo?.name}
					email={userInfo?.email}
					image={dummy.image}
					onLogout={handleLogout}
				/>
			) : (
				<UserDownMenu
					name={userInfo?.name}
					email={userInfo?.email}
					image={dummy.image}
					onLogout={handleLogout}
				/>
			)}
		</>
	);
};
