export type AnalysisDetails = {
	evaluationFactors: factor[];
	summary: string;
	percentageTrust: number;
	remainingAttempts?: number;
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
	email?: string;
};

export type SubmitResult = {
	analysisDetails: AnalysisDetails | null;
	message: string | null;
};
