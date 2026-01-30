import {
	computeAverageConfidence,
	computeHealthyPlantsCount,
	computePlantsWithNoPestsCount,
	computePlantsWithPestsCount,
	computeTotalAnalyses,
	computeUnhealthyPlantsCount,
	computeWeightedSuccessRate,
} from "../services/stat.service.js";
import { Request, Response } from "express";

export const readStatsController = async (req: Request, res: Response) => {
	try {
		const userId = req.userId;

		const totalAnalyses = await computeTotalAnalyses(userId);
		const healthyPlantsCount = await computeHealthyPlantsCount(userId);
		const unhealthyPlantsCount = await computeUnhealthyPlantsCount(userId);
		const plantsWithNoPestsCount = await computePlantsWithNoPestsCount(userId);
		const plantsWithPestsCount = await computePlantsWithPestsCount(userId);
		const averageConfidence = await computeAverageConfidence(userId);
		const successRate = await computeWeightedSuccessRate(userId);

		console.log({
			totalAnalyses,
			healthyPlantsCount,
			unhealthyPlantsCount,
			plantsWithNoPestsCount,
			plantsWithPestsCount,
			averageConfidence,
			successRate,
		});
		res.status(200).json({
			totalAnalyses,
			healthyPlantsCount,
			unhealthyPlantsCount,
			plantsWithNoPestsCount,
			plantsWithPestsCount,
			averageConfidence,
			successRate,
		});
	} catch (error) {
		console.error(`Error in readStatsController:`);
		console.error(error);
		res.status(500).json({
			message: "Internal server error!",
		});
	}
};
