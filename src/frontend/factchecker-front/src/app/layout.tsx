import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const dm_sans = DM_Sans({
	subsets: ['latin'],
});

export async function generateMetadata(): Promise<Metadata> {
	const title = process.env.APP_NAME ?? 'FactChecker';
	const description =
		process.env.APP_DESCRIPTION ?? 'Detector de noticias falsas';
	return { title, description };
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	if (process.env.NODE_ENV !== 'production') {
		if (
			!process.env.APP_NAME ||
			!process.env.APP_DESCRIPTION ||
			!process.env.NEXT_PUBLIC_API_URL
		) {
			console.warn(
				'Faltan variables APP_NAME / APP_DESCRIPTION / NEXT_PUBLIC_API_URL (solo aviso en dev).'
			);
		}
	}
	return (
		<html lang='en'>
			<body className={`${dm_sans.className} antialiased`}>
				{children}
				<Toaster position='top-center' />
			</body>
		</html>
	);
}
