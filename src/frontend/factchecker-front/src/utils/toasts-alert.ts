import { showToast } from 'nextjs-toast-notify';

export const showSuccessToast = (message: string) => {
	showToast.success(message, {
		duration: 3000,
		progress: true,
		position: 'top-right',
		transition: 'bounceIn',
	});
};
export const showErrorToast = (message: string) => {
	showToast.error(message, {
		duration: 3000,
		progress: true,
		position: 'top-right',
		transition: 'bounceIn',
	});
};

export const showWarningToast = (message: string) => {
	showToast.warning(message, {
		duration: 3000,
		progress: true,
		position: 'top-right',
		transition: 'bounceIn',
	});
};
