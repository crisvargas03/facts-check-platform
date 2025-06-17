import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

const roboto = Roboto({
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
			<body className={`${roboto.className} antialiased`}>
				{children}
			</body>
		</html>
	);
}
