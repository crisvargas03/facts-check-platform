import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';

const dm_sans = DM_Sans({
	subsets: ['latin'],
});

const appName = process.env.APP_NAME;
const appDescription = process.env.APP_DESCRIPTION;

export const metadata: Metadata = {
	title: appName,
	description: appDescription,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${dm_sans.className} antialiased`}>
				{children}
			</body>
		</html>
	);
}
