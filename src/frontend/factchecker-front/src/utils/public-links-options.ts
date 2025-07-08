export const publicLinksOptions: LinkOptions[] = [
	{ label: 'Inicio', href: '/' },
	{ label: 'Planes', href: '/plans' },
	{ label: 'Acerca de', href: '/about' },
	{ label: 'Unirse', href: '/auth/login' },
];

interface LinkOptions {
	label: string;
	href: string;
}
