import { Request, Response } from "express";
import { prisma } from "../configs/prisma.js";

export async function getCommonDiseases(_: Request, res: Response) {
	try {
		// Get diagnoses from plants
		const plants = await prisma.plant.findMany({
			where: {
				diagnosis: {
					isNot: null,
				},
			},
			select: {
				diagnosis: true,
			},
		});

		// Count disease occurrences
		const diseaseCount = new Map<string, number>();

		plants.forEach((plant: any) => {
			if (plant.diagnosis && typeof plant.diagnosis === "object") {
				const diagnosis = plant.diagnosis as any;
				if (diagnosis.name) {
					const name = diagnosis.name;
					diseaseCount.set(name, (diseaseCount.get(name) || 0) + 1);
				}
			}
		});

		// Convert to array and sort
		const topDiseases = Array.from(diseaseCount.entries())
			.map(([name, count]) => ({ name, count }))
			.sort((a, b) => b.count - a.count)
			.slice(0, 10);

		return res.json({
			success: true,
			data: topDiseases,
		});
	} catch (error) {
		console.error("Error fetching diseases:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to fetch diseases",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
}
