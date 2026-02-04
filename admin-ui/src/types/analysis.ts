export interface PlantAnalysis {
	readonly id: string;
	formattedId: string;
	createdAt: string;
	img: string;

	imageValidation: "valid" | "invalid";
	message?: string;
	plantIdentification?: {
		commonName?: string;
		scientificName?: string;
	};
	healthStatus?: "healthy" | "unhealthy";
	diagnosis?: {
		name: string;
		severity: "mild" | "moderate" | "severe";
		symptoms: string[];
		confidence?: number;
	};
	confidence: number; // 0-100
	treatment?: {
		organic: string[];
		chemical?: string[];
		notes?: string;
		diy?: string[];
	};
	preventionTips?: string[];
	recoveryTimeline?: string;
	type: "plant" | "vegetable" | "fruit" | "unknown";
	hasPestFound: boolean;
}

export type PlantAnalysisTableData = Pick<
	PlantAnalysis,
	| "id"
	| "confidence"
	| "imageValidation"
	| "createdAt"
	| "img"
	| "formattedId"
	| "type"
>;
