import { getCookie, setCookie, deleteCookie } from 'cookies-next';

export const getCookieData = (key: string) => {
	const data = getCookie(key);

	if (!data) return null;

	// decrypt the data
	const decrypted = atob(data as string);
	return JSON.parse(decrypted);
};

export const setCookieData = (key: string, data: unknown) => {
	// encrypt the data base64
	const encrypted = btoa(JSON.stringify(data));
	setCookie(key, encrypted);
};

export const deleteCookieData = (key: string) => {
	deleteCookie(key);
};
