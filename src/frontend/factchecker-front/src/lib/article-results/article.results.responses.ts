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
	title: string;
	content: string;
	source?: string;
};
