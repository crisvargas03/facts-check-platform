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

export type SignUpFormData = {
	fullName: string;
	email: string;
	password: string;
	registrationMethod: string;
};

export type SignUpResponse = {
	email: string;
	token: string;
	name: string;
};
