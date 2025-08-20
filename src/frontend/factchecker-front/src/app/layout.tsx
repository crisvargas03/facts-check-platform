import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const dm_sans = DM_Sans({
	subsets: ['latin'],
});

const appName = process.env.APP_NAME;
const appDescription = process.env.APP_DESCRIPTION;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!appName || !appDescription || !apiUrl) {
	throw new Error('Variables de entorno no definidas');
}

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
				<Toaster position='top-center' />
			</body>
		</html>
	);
}
