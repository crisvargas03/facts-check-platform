export type AnalysisDetails = {
	evaluationFactors: factor[];
	summary: string;
	percentageTrust: number;
};

export type factor = {
	name: string;
	score: number;
	description: string;
};

export type submitFormData = {
	titulo: string;
	contenido: string;
	url?: string;
};
