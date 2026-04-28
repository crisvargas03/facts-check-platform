import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				pathname: '/**',
			},
			{ protocol: 'https', hostname: 'images.law.com', pathname: '/**' },
			{
				protocol: 'https',
				hostname: 'encrypted-tbn0.gstatic.com',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'api.dicebear.com',
				pathname: '/**',
			},
		],
		deviceSizes: [320, 420, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	},
	env: {
		APP_NAME: process.env.APP_NAME,
		APP_DESCRIPTION: process.env.APP_DESCRIPTION,
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
		AUTH_SECRET: process.env.AUTH_SECRET,
		AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
		AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
	},
};

export default nextConfig;
