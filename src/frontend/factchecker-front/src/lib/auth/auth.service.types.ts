export type LoginFormData = {
	email: string;
	password: string;
};

export type LoginResponse = {
	email: string;
	token: string;
};

export type UserCookieData = {
	expires: Date;
	token: string;
	user: string;
};
