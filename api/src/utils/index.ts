export * from "./appError.js";
export * from "./bcrypt.js";
export * from "./date-fns.js";
export * from "./emails.js";
export * from "./jsonwebtoken.js";
export * from "./multer.js";

/**
 * Generates a formatted ID for plant detection analysis
 * Example: PLANT-ANL-20260126-143522-A9F3
 */
export function generatePlantAnalysisId(): string {
	const now = new Date();

	const date = now.toISOString().slice(0, 10).replace(/-/g, "");
	const time = now.toTimeString().slice(0, 8).replace(/:/g, "");

	const random = Math.random().toString(36).substring(2, 6).toUpperCase();

	return `PLANT-ANL-${date}-${time}-${random}`;
}
