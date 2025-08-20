import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { UserCookieData } from './lib/auth';

const PRIVATE_PREFIXES = ['/dashboard', '/history-results', '/submit-article'];

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const isPrivate = PRIVATE_PREFIXES.some(p => pathname.startsWith(p));

	const hasShowResults = Boolean(request.cookies.get('showResults'));
	const shouldCleanupDemoCookie =
		hasShowResults && !pathname.startsWith('/demo');

	const nextRes = NextResponse.next();
	if (shouldCleanupDemoCookie) {
		nextRes.cookies.delete('showResults');
	}

	if (!isPrivate) {
		return nextRes;
	}

	const cookie = request.cookies.get('__user__')?.value;

	const makeAuthRedirect = () => {
		const res = NextResponse.redirect(new URL('/auth/login', request.url));
		if (shouldCleanupDemoCookie) {
			res.cookies.delete('showResults');
		}
		return res;
	};

	if (!cookie) {
		return makeAuthRedirect();
	}

	let user: UserCookieData;
	try {
		user = JSON.parse(atob(cookie));
	} catch {
		const res = makeAuthRedirect();
		res.cookies.set('__user__', '', { expires: new Date(0), path: '/' });
		return res;
	}

	if (!user?.expires || new Date(user.expires) < new Date()) {
		const res = makeAuthRedirect();
		res.cookies.set('__user__', '', { expires: new Date(0), path: '/' });
		return res;
	}

	// Autenticación ok: devolvemos el next con la posible limpieza de showResults aplicada
	return nextRes;
}

export const config = {
	matcher: ['/((?!_next|api|.*\\..*).*)'],
};
