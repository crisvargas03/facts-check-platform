export const appName = process.env.APP_NAME;
export const appDescription = process.env.APP_DESCRIPTION;
export const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const authSecret = process.env.AUTH_SECRET;
export const authGoogleId = process.env.AUTH_GOOGLE_ID;
export const authGoogleSecret = process.env.AUTH_GOOGLE_SECRET;
export const appYear = new Date().getFullYear();

export const getApiBaseUrl = () => {
	if (typeof window === 'undefined') {
		const q = process.env.API_URL_INTERNAL ?? '';
		console.log(`API Base URL from server side: ${q}`);
		return q;
	}

	const q = process.env.NEXT_PUBLIC_API_URL ?? '';
	console.log(`API Base URL from client side: ${q}`);
	return q;
};
