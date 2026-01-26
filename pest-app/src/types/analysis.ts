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
	};

	treatment?: {
		organic: string[];
		chemical?: string[];
		notes?: string;
	};

	preventionTips?: string[];
	recoveryTimeline?: string;
}
