// types/plant-analysis.ts
export interface PlantAnalysisResponse {
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
	confidence?: number; // 0-100
	treatment?: {
		organic: string[];
		chemical?: string[];
		notes?: string;
	};

	preventionTips?: string[];
	recoveryTimeline?: string;
	type: "plant" | "vegetable" | "fruit" | "unknown";
	hasPestFound: boolean;
}

export interface PlantAnalysis extends PlantAnalysisResponse {
	readonly id: string;
	formattedId: string;
	createdAt: string;
	img: string;
}
