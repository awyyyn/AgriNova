import { prisma } from "@src/configs/prisma.js";

export async function computeWeightedSuccessRate(userId?: string) {
	// Fetch relevant fields
	const plants = await prisma.plant.findMany({
		where: userId ? { userId } : {},
		select: {
			healthStatus: true,
			hasPestFound: true,
			confidence: true,
		},
	});

	if (plants.length === 0) return 0;

	// Sum of confidences for successful plants
	const successfulConfidence = plants
		.filter((p) => p.healthStatus === "healthy" || p.hasPestFound === false)
		.reduce((acc, p) => acc + p.confidence, 0);

	// Total confidence
	const totalConfidence = plants.reduce((acc, p) => acc + p.confidence, 0);

	if (totalConfidence === 0) return 0;

	const weightedSuccessRate = (successfulConfidence / totalConfidence) * 100;

	return weightedSuccessRate || 0;
}

export const computeTotalAnalyses = async (userId?: string) => {
	const count = await prisma.plant.count({
		where: {
			user: userId ? { id: userId } : undefined,
		},
	});
	return count;
};

export const computeHealthyPlantsCount = async (userId?: string) => {
	const count = await prisma.plant.count({
		where: {
			healthStatus: "healthy",
			...(userId ? { userId } : {}),
		},
	});
	return count;
};

export const computePlantsWithNoPestsCount = async (userId?: string) => {
	const count = await prisma.plant.count({
		where: {
			hasPestFound: false,
			...(userId ? { userId } : {}),
		},
	});
	return count;
};

export const computeUnhealthyPlantsCount = async (userId?: string) => {
	const count = await prisma.plant.count({
		where: {
			healthStatus: "unhealthy",
			...(userId ? { userId } : {}),
		},
	});
	return count;
};

export const computePlantsWithPestsCount = async (userId?: string) => {
	const count = await prisma.plant.count({
		where: {
			hasPestFound: true,
			...(userId ? { userId } : {}),
		},
	});
	return count;
};

export const computeAverageConfidence = async (userId?: string) => {
	const plants = await prisma.plant.findMany({
		where: userId ? { userId } : {},
		select: {
			confidence: true,
		},
	});

	if (plants.length === 0) return 0;

	const totalConfidence = plants.reduce((acc, p) => acc + p.confidence, 0);
	const averageConfidence = totalConfidence / plants.length;

	return averageConfidence;
};
