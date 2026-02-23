// types/plant-analysis.ts
export interface PlantAnalysisResponse {
	id: string;
	imageValidation: "valid" | "invalid";
	message?: string;
	localName: string;
	pestLocalName: string;
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
	treatment?: {
		organic: string[];
		chemical?: string[];
		diy?: string[];
		notes?: string;
	};

	preventionTips?: string[];
	recoveryTimeline?: string;
	type: "plant" | "vegetable" | "fruit" | "unknown";
	hasPestFound: boolean;
	confidence: number;
	isDone: boolean;
}

export interface PlantAnalysis extends PlantAnalysisResponse {
	readonly id: string;
	formattedId: string;
	createdAt: string;
	img: string;
}
