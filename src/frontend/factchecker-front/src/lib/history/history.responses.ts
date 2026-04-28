import { factor } from '../article-results';

export interface HistorialItem {
	id: string;
	articleName: string;
	analysisDate: string;
	credibility: number;
	summary: string;
	evaluationFactors: factor[];
}
