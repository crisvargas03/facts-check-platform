import { DataTableColumn } from '@/lib/ui';

export const historyColumns: DataTableColumn[] = [
	{ key: 'id', label: '#', sortable: false, width: '60px' },
	{ key: 'nombre', label: 'Nombre', sortable: true },
	{ key: 'fecha', label: 'Fecha', sortable: true },
	{
		key: 'porcentaje',
		label: 'Porcentaje',
		sortable: true,
		align: 'center' as const,
	},
	{ key: 'credibilidad', label: 'Credibilidad', sortable: false },
	{
		key: 'detalle',
		label: 'Detalle',
		sortable: false,
		align: 'center' as const,
	},
];

export const dashboardColumns: DataTableColumn[] = [
	{
		key: 'name',
		label: 'Nombre',
		sortable: true,
		width: '300px',
	},
	{
		key: 'date',
		label: 'Fecha',
		sortable: true,
		align: 'center',
		width: '100px',
	},
	{
		key: 'percentage',
		label: 'Porcentaje',
		sortable: true,
		align: 'center',
		width: '100px',
	},
	{
		key: 'credibility',
		label: 'Credibilidad',
		sortable: true,
		align: 'center',
		width: '200px',
	},
];
