import toast from 'react-hot-toast';

export const showSuccessToast = (message: string) => {
	toast.success(message);
};
export const showErrorToast = (message: string) => {
	toast.error(message);
};
