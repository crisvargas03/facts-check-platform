export const getResultsTitle = (startDate: string, endDate: string) => {
	if (!startDate && !endDate) {
		return 'Resultados de Hoy';
	}

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('es-ES', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});
	};

	if (startDate && endDate) {
		return `Resultados del ${formatDate(startDate)} al ${formatDate(
			endDate
		)}`;
	} else if (startDate) {
		return `Resultados desde ${formatDate(startDate)}`;
	} else if (endDate) {
		return `Resultados hasta ${formatDate(endDate)}`;
	}

	return 'Resultados de Hoy';
};
