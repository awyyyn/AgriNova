import { endOfMonth, startOfMonth, subMonths } from "date-fns";
import { prisma } from "../configs/prisma.js";

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
export async function getPublicStats() {
	const [
		totalPlants,
		totalVegetables,
		totalFruits,
		totalPlantsType,
		totalDiseasesFound,
		recentAnalyses,
	] = await Promise.all([
		// Total plants (all types)
		prisma.plant.count(),

		// Total vegetables
		prisma.plant.count({
			where: { type: "vegetable" },
		}),

		// Total fruits
		prisma.plant.count({
			where: { type: "fruit" },
		}),

		// Total plants (only 'plant' type)
		prisma.plant.count({
			where: { type: "plant" },
		}),

		// Total diseases found (plants with diagnosis)
		prisma.plant.count({
			where: {
				diagnosis: {
					isNot: null,
				},
			},
		}),

		// Recent analyses for showcase (last 6, anonymized)
		prisma.plant.findMany({
			take: 6,
			orderBy: { createdAt: "desc" },
			select: {
				id: true,
				type: true,
				hasPestFound: true,
				confidence: true,
				plantIdentification: true,
				healthStatus: true,
				createdAt: true,
			},
		}),
	]);

	// Get monthly growth data (last 6 months)
	const monthlyData = await getMonthlyGrowth();

	// Calculate healthy plants
	const healthyPlants = await prisma.plant.count({
		where: { healthStatus: "healthy" },
	});

	return {
		overview: {
			totalPlants,
			totalVegetables,
			totalFruits,
			totalPlantsType,
			totalDiseasesFound,
			healthyPlants,
			unhealthyPlants: totalPlants - healthyPlants,
		},
		recentAnalyses: recentAnalyses.map((analysis: any) => ({
			id: analysis.id,
			type: analysis.type,
			commonName: analysis.plantIdentification?.commonName || "Unknown",
			status: analysis.healthStatus === "healthy" ? "Healthy" : "Diseased",
			confidence: analysis.confidence,
			analyzedAt: analysis.createdAt,
		})),
		monthlyGrowth: monthlyData,
	};
}

export async function getMonthlyGrowth() {
	const months = [];
	const now = new Date();

	for (let i = 5; i >= 0; i--) {
		const date = subMonths(now, i);
		const start = startOfMonth(date);
		const end = endOfMonth(date);

		const count = await prisma.plant.count({
			where: {
				createdAt: {
					gte: start,
					lte: end,
				},
			},
		});

		months.push({
			month: date.toLocaleString("default", { month: "short" }),
			year: date.getFullYear(),
			count,
		});
	}

	return months;
}

export const getDailySuccessRate = async (userId?: string) => {
	const plants = await prisma.plant.findMany({
		select: {
			createdAt: true,
			healthStatus: true,
			hasPestFound: true,
			confidence: true,
		},
		where: { userId },
		orderBy: { createdAt: "desc" },
	});

	const byDay = plants.reduce(
		(acc, plant) => {
			const day = plant.createdAt.toISOString().split("T")[0];

			if (!acc[day]) acc[day] = { totalConfidence: 0, successfulConfidence: 0 };

			acc[day].totalConfidence += plant.confidence;

			if (!plant.hasPestFound || plant.healthStatus === "healthy") {
				acc[day].successfulConfidence += plant.confidence;
			}

			return acc;
		},
		{} as Record<
			string,
			{ totalConfidence: number; successfulConfidence: number }
		>,
	);

	const last10DaysWithData = Object.entries(byDay)
		.sort(([a], [b]) => b.localeCompare(a))
		.slice(0, 10)
		.map(([date, { totalConfidence, successfulConfidence }]) => ({
			date,
			successRate:
				totalConfidence > 0
					? (successfulConfidence / totalConfidence) * 100
					: 0,
		}));

	return last10DaysWithData;
};
