import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_ID || '',
			clientSecret:
				process.env.AUTH_GOOGLE_SECRET ||
				process.env.GOOGLE_SECRET ||
				'',
		}),
	],

	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async jwt({ token, account, profile }) {
			if (account && profile) {
				token.user = {
					name: profile.name,
					email: profile.email,
					image: profile.image,
				};
			}
			return token;
		},
		async session({ session, token }) {
			session.user = {
				...session.user,
				...(token.user as {
					name: string;
					email: string;
					image: string;
				}),
			};
			return session;
		},
	},

	trustHost:
		process.env.AUTH_TRUST_HOST === 'true' ||
		process.env.NODE_ENV !== 'production',
	secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
	redirectProxyUrl:
		process.env.AUTH_REDIRECT_PROXY_URL || process.env.AUTH_URL,
	pages: {
		signIn: '/auth/login',
	},
});
