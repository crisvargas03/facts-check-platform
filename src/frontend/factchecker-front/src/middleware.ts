import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { UserCookieData } from './lib/auth';

export function middleware(request: NextRequest) {
	const cookie = request.cookies.get('__user__')?.value;

	if (!cookie) {
		return NextResponse.redirect(new URL('/auth/login', request.url));
	}

	let user: UserCookieData;
	try {
		user = JSON.parse(atob(cookie));
	} catch {
		const response = NextResponse.redirect(
			new URL('/auth/login', request.url)
		);
		response.cookies.set('__user__', '', {
			expires: new Date(0),
			path: '/',
		});
		return response;
	}

	if (!user?.expires || new Date(user.expires) < new Date()) {
		const response = NextResponse.redirect(
			new URL('/auth/login', request.url)
		);
		response.cookies.set('__user__', '', {
			expires: new Date(0),
			path: '/',
		});
		return response;
	}

	return NextResponse.next();
}

// configure matcher to only run on private routes
export const config = {
	matcher: [
		'/dashboard/:path*',
		'/history-results/:path*',
		'/submit-article/:path*',
		// add more as needed
	],
};
