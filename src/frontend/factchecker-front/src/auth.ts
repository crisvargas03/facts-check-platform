import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [Google],
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
	pages: {
		signIn: '/auth/login',
	},
});
