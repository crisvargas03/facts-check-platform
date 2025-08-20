export const getResultColor = (percentage: number) => {
	if (percentage >= 80)
		return { color: '#166534', backgroundColor: '#dcfce7' };
	if (percentage >= 60)
		return { color: '#92400e', backgroundColor: '#fef3c7' };
	if (percentage >= 40)
		return { color: '#9a3412', backgroundColor: '#fed7aa' };
	return { color: '#991b1b', backgroundColor: '#fecaca' };
};

export const getResultLabel = (percentage: number) => {
	if (percentage >= 80) return 'El artículo tiene alta credibilidad';
	if (percentage >= 60) return 'El artículo tiene credibilidad moderada';
	if (percentage >= 40) return 'El artículo tiene credibilidad cuestionable';
	return 'El artículo tiene baja credibilidad';
};
