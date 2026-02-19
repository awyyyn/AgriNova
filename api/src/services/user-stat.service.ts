import { prisma } from "../configs/prisma.js";

export function getWeightedSuccessRate(
	plants: {
		confidence: number;
		hasPestFound: boolean;
		healthStatus: string | null;
	}[],
) {
	const totalConfidence = plants.reduce((acc, p) => acc + p.confidence, 0);
	if (totalConfidence === 0) return 0;

	const successfulConfidence = plants
		.filter((p) => !p.hasPestFound || p.healthStatus === "healthy")
		.reduce((acc, p) => acc + p.confidence, 0);

	return (successfulConfidence / totalConfidence) * 100 || 0;
}

export async function getUserPlantStats(userId?: string) {
	const plants = await prisma.plant.findMany({
		where: { userId },
		select: {
			createdAt: true,
			healthStatus: true,
			hasPestFound: true,
			confidence: true,
			type: true,
		},
		orderBy: { createdAt: "desc" },
	});

	// ─── Weighted Success Rate (for pie chart) ───────────────────────────────
	const totalConfidence = plants.reduce((acc, p) => acc + p.confidence, 0);
	const successfulConfidence = plants
		.filter((p) => !p.hasPestFound || p.healthStatus === "healthy")
		.reduce((acc, p) => acc + p.confidence, 0);

	const successRate =
		totalConfidence > 0 ? (successfulConfidence / totalConfidence) * 100 : 0;

	const pieChart = {
		successRate: successRate || 0,
		failureRate: 100 - (successRate || 0),
	};

	// ─── Health Status Radar Chart ────────────────────────────────────────────
	const healthRadar = plants.reduce(
		(acc, p) => {
			const status = p.healthStatus?.toLowerCase();
			if (status === "healthy") acc.healthy += 1;
			else if (status === "unhealthy") acc.unhealthy += 1;
			else acc.unknown += 1;
			return acc;
		},
		{ healthy: 0, unhealthy: 0, unknown: 0 },
	);

	const radarChart = [
		{ label: "Healthy Plant", value: healthRadar.healthy },
		{ label: "Unhealthy", value: healthRadar.unhealthy },
		{ label: "Unknown", value: healthRadar.unknown },
	];

	// ─── Plant Type Chart ─────────────────────────────────────────────────────
	const typeCount = plants.reduce(
		(acc, p) => {
			const type = p.type?.toLowerCase();
			if (type === "plant") acc.plant += 1;
			else if (type === "vegetable") acc.vegetable += 1;
			else if (type === "fruit") acc.fruit += 1;
			else acc.unknown += 1;
			return acc;
		},
		{ plant: 0, vegetable: 0, fruit: 0, unknown: 0 },
	);

	const typeChart = [
		{ label: "Plant", value: typeCount.plant },
		{ label: "Vegetable", value: typeCount.vegetable },
		{ label: "Fruit", value: typeCount.fruit },
		{ label: "Unknown", value: typeCount.unknown },
	];

	// ─── Success Rate Line Chart ──────────────────────────────────────────────
	const lineChart = plants.reduce(
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

	const lineChartData = Object.entries(lineChart)
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([date, { totalConfidence, successfulConfidence }]) => ({
			date,
			successRate:
				totalConfidence > 0
					? (successfulConfidence / totalConfidence) * 100
					: 0,
		}));

	return {
		pieChart,
		radarChart,
		typeChart,
		lineChart,
	};
}
