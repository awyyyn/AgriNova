export * from "./enums";
export * from "./user";
export * from "./analysis";
export * from "./notification";

export interface Pagination {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
	data: T[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

export interface PublicStats {
	overview: {
		totalPlants: number;
		totalVegetables: number;
		totalFruits: number;
		totalPlantsType: number;
		totalDiseasesFound: number;
		healthyPlants: number;
		unhealthyPlants: number;
	};
	recentAnalyses: Array<{
		id: string;
		type: string;
		commonName: string;
		status: string;
		confidence: number;
		analyzedAt: string;
	}>;
	monthlyGrowth: Array<{
		month: string;
		year: number;
		count: number;
	}>;
}
