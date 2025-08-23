import { HistorialItem } from '../history';

export interface SummaryStatsServiceResponse {
	totalAnalyzed: number;
	realScans: number;
	inaccurateScans: number;
	fakeScans: number;
}

export interface ComparisonStatsServiceResponse {
	weeklyData: WeeklyData[];
}

interface WeeklyData {
	day: string;
	fakeArticles: number;
	realArticles: number;
}

export interface HistoryDataServiceResponse {
	items: HistorialItem[];
	pagination: Pagination;
}

export interface Pagination {
	currentPage: number;
	totalPages: number;
	pageSize: number;
	totalItems: number;
}

export interface HistoryDataParams {
	startDate: string;
	endDate: string;
	page: number;
	pageSize: number;
	user: string;
}
