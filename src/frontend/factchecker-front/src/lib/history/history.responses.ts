import { factor } from '../article-results';

export interface HistorialItem {
	id: string;
	name: string;
	date: string;
	credibility: number;
	summary: string;
	factors: factor[];
}
