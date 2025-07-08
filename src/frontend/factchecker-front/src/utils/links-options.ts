export const publicLinksOptions: LinkOptions[] = [
	{ label: 'Inicio', href: '/home' },
	{ label: 'Planes', href: '/plans' },
	{ label: 'Acerca de', href: '/about' },
	{ label: 'Unirse', href: '/auth/login' },
];

export const privateLinksOptions: LinkOptions[] = [
	{ label: 'Dashboard', href: '/dashboard' },
	{ label: 'Historial', href: '/history-results' },
	{ label: 'Analizar Artículo', href: '/submit-article' },
];

export interface LinkOptions {
	label: string;
	href: string;
}
