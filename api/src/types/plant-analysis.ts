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
