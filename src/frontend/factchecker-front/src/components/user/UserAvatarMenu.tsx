import toast from 'react-hot-toast';
import { UserDownMenu } from './UserDownMenu';
import { UserSideBarMenu } from './UserSideBarMenu';
import { UserServicesResponse } from '@/lib/users';
import { deleteCookieData } from '@/utils/';
import { useRouter } from 'next/navigation';

interface Props {
	smallScreen?: boolean;
	userInfo: UserServicesResponse;
}

export const UserAvatarMenu = ({ smallScreen, userInfo }: Props) => {
	const router = useRouter();
	//! Watch out this component get destroy and constructed every time

	const handleLogout = () => {
		const toastId = toast.loading('Cargando...');
		deleteCookieData('__user__');
		toast.success('Cierre de sesión exitoso', {
			id: toastId,
		});
		router.push('/auth/login');
	};

	return (
		<>
			{smallScreen ? (
				<UserSideBarMenu
					name={userInfo.name || 'User'}
					email={userInfo.email || 'user@example.com'}
					image={userInfo.image!}
					onLogout={handleLogout}
				/>
			) : (
				<UserDownMenu
					name={userInfo.name || 'User'}
					email={userInfo.email || 'user@example.com'}
					image={userInfo.image!}
					onLogout={handleLogout}
				/>
			)}
		</>
	);
};
