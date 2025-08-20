import { AnalysisDetails, submitFormData } from '@/lib/article-results';

export const sampleArticle: submitFormData = {
	title: 'Nuevo descubrimiento científico revoluciona la medicina moderna',
	content: `Un equipo de investigadores de la Universidad de Stanford ha anunciado un 
		descubrimiento revolucionario en el campo de la medicina. Según el estudio publicado 
		en la prestigiosa revista Nature, los científicos han desarrollado una nueva técnica 
		que permite regenerar tejidos dañados en cuestión de días, en lugar de meses o años. 
		
		El Dr. María González, líder del proyecto, explicó que "esta tecnología podría 
		transformar completamente la forma en que tratamos lesiones y enfermedades crónicas". 
		Los ensayos clínicos iniciales han mostrado resultados prometedores, con una tasa de 
		éxito del 85% en pacientes con lesiones graves.
		
		Sin embargo, es importante notar que la investigación aún se encuentra en fase 
		experimental y se necesitan más estudios antes de que pueda ser aprobada para uso 
		general en humanos. Los expertos estiman que podría tomar entre 5 a 10 años antes 
		de que esta tecnología esté disponible comercialmente.`,
	source: 'https://ejemplo-noticias.com/ciencia/2024',
};

export const analysisResults: AnalysisDetails = {
	percentageTrust: 78,
	evaluationFactors: [
		{
			name: 'Fuente Confiable',
			score: 85,
			description:
				'La fuente tiene buena reputación en el campo científico',
		},
		{
			name: 'Evidencia Científica',
			score: 90,
			description: 'Menciona estudios específicos y revistas científicas',
		},
		{
			name: 'Citas y Referencias',
			score: 70,
			description:
				'Incluye citas de expertos pero falta información detallada',
		},
		{
			name: 'Lenguaje Objetivo',
			score: 75,
			description: 'El tono es principalmente objetivo y factual',
		},
		{
			name: 'Contexto y Limitaciones',
			score: 70,
			description: 'Menciona limitaciones pero podría ser más específico',
		},
	],
	summary:
		'Este artículo presenta información científica con un buen nivel de credibilidad. La fuente es confiable y el contenido incluye elementos científicos válidos, aunque podría beneficiarse de más detalles sobre la metodología y limitaciones del estudio.',
};
