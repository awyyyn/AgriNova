import { Request, Response } from "express";
import { parseISO } from "date-fns";
import {
	getOverviewMetrics,
	getWeeklyMetrics,
	getDailyBreakdown,
	getTopDiseases,
	getSeverityDistribution,
	getHealthStatusDistribution,
	getAnalysisByType,
	getConfidenceDistribution,
	getGrowthTrends,
	getMostActiveUsers,
	getRecentAnalyses,
	getCompleteDashboardReport,
} from "../services/admin-stats.service.js";
import { DateRanges } from "@src/utils/date-fns.js";
import { getUsersByRole } from "@src/services/user.service.js";
import { getPublicStats } from "@src/services/stat.service.js";

// ============================================================================
// MAIN DASHBOARD
// ============================================================================

export const getDashboardReport = async (req: Request, res: Response) => {
	try {
		const { range = "last7Days", start, end } = req.query;

		let dateRange: { start: Date; end: Date };

		switch (range) {
			case "today":
				dateRange = DateRanges.today();
				break;
			case "yesterday":
				dateRange = DateRanges.yesterday();
				break;
			case "last7Days":
				dateRange = DateRanges.last7Days();
				break;
			case "last30Days":
				dateRange = DateRanges.last30Days();
				break;
			case "last90Days":
				dateRange = DateRanges.last90Days();
				break;
			case "thisWeek":
				dateRange = DateRanges.thisWeek();
				break;
			case "lastWeek":
				dateRange = DateRanges.lastWeek();
				break;
			case "thisMonth":
				dateRange = DateRanges.thisMonth();
				break;
			case "lastMonth":
				dateRange = DateRanges.lastMonth();
				break;
			case "thisYear":
				dateRange = DateRanges.thisYear();
				break;
			case "custom":
				if (!start || !end) {
					return res.status(400).json({
						success: false,
						message: "start and end dates are required for custom range",
					});
				}
				dateRange = DateRanges.custom(
					parseISO(start as string),
					parseISO(end as string),
				);
				break;
			default:
				dateRange = DateRanges.last7Days();
		}

		const report = await getCompleteDashboardReport(
			dateRange.start,
			dateRange.end,
		);

		return res.json({ success: true, data: report });
	} catch (error) {
		console.error("Dashboard error:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to load dashboard data",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
};

// ============================================================================
// OVERVIEW
// ============================================================================

export const getDashboardOverview = async (_req: Request, res: Response) => {
	try {
		const overview = await getOverviewMetrics();
		return res.json({ success: true, data: overview });
	} catch (error) {
		console.error("Overview error:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to load overview metrics",
		});
	}
};

// ============================================================================
// METRICS
// ============================================================================

export const getDashboardMetrics = async (req: Request, res: Response) => {
	try {
		const { start, end } = req.query;

		const startDate = start ? parseISO(start as string) : undefined;
		const endDate = end ? parseISO(end as string) : undefined;

		const metrics = await getWeeklyMetrics(startDate, endDate);
		return res.json({ success: true, data: metrics });
	} catch (error) {
		console.error("Metrics error:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to load metrics",
		});
	}
};

// ============================================================================
// DAILY BREAKDOWN
// ============================================================================

export const getDashboardDailyBreakdown = async (
	req: Request,
	res: Response,
) => {
	try {
		const { days, start, end } = req.query;

		let startDate: Date;
		let endDate: Date;

		if (start && end) {
			startDate = parseISO(start as string);
			endDate = parseISO(end as string);
		} else {
			const daysCount = days ? parseInt(days as string) : 30;
			const range = DateRanges.custom(
				new Date(Date.now() - daysCount * 24 * 60 * 60 * 1000),
				new Date(),
			);
			startDate = range.start;
			endDate = range.end;
		}

		const dailyData = await getDailyBreakdown(startDate, endDate);
		return res.json({ success: true, data: dailyData });
	} catch (error) {
		console.error("Daily breakdown error:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to load daily breakdown",
		});
	}
};

// ============================================================================
// TOP DISEASES
// ============================================================================

export const getDashboardTopDiseases = async (req: Request, res: Response) => {
	try {
		const { limit = "10", start, end } = req.query;

		const startDate = start ? parseISO(start as string) : undefined;
		const endDate = end ? parseISO(end as string) : undefined;

		const diseases = await getTopDiseases(
			parseInt(limit as string),
			startDate,
			endDate,
		);

		return res.json({ success: true, data: diseases });
	} catch (error) {
		console.error("Top diseases error:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to load top diseases",
		});
	}
};

// ============================================================================
// DISTRIBUTIONS
// ============================================================================

export const getDashboardDistributions = async (
	req: Request,
	res: Response,
) => {
	try {
		const { start, end } = req.query;

		const startDate = start ? parseISO(start as string) : undefined;
		const endDate = end ? parseISO(end as string) : undefined;

		const [usersByRole, analysisByType, severity, healthStatus, confidence] =
			await Promise.all([
				getUsersByRole(),
				getAnalysisByType(startDate, endDate),
				getSeverityDistribution(startDate, endDate),
				getHealthStatusDistribution(startDate, endDate),
				getConfidenceDistribution(startDate, endDate),
			]);

		return res.json({
			success: true,
			data: {
				usersByRole,
				analysisByType,
				severity,
				healthStatus,
				confidence,
			},
		});
	} catch (error) {
		console.error("Distributions error:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to load distributions",
		});
	}
};

// ============================================================================
// GROWTH
// ============================================================================

export const getDashboardGrowthTrends = async (
	_req: Request,
	res: Response,
) => {
	try {
		const growth = await getGrowthTrends();
		return res.json({ success: true, data: growth });
	} catch (error) {
		console.error("Growth trends error:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to load growth trends",
		});
	}
};

// ============================================================================
// ACTIVE USERS
// ============================================================================

export const getDashboardActiveUsers = async (req: Request, res: Response) => {
	try {
		const { limit = "10", start, end } = req.query;

		const startDate = start ? parseISO(start as string) : undefined;
		const endDate = end ? parseISO(end as string) : undefined;

		const users = await getMostActiveUsers(
			parseInt(limit as string),
			startDate,
			endDate,
		);

		return res.json({ success: true, data: users });
	} catch (error) {
		console.error("Active users error:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to load active users",
		});
	}
};

// ============================================================================
// RECENT ANALYSES
// ============================================================================

export const getDashboardRecentAnalyses = async (
	req: Request,
	res: Response,
) => {
	try {
		const { limit = "10" } = req.query;

		const recent = await getRecentAnalyses(parseInt(limit as string));
		return res.json({ success: true, data: recent });
	} catch (error) {
		console.error("Recent analyses error:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to load recent analyses",
		});
	}
};

/**
 * GET /api/public/stats
 * Get public statistics for landing page
 */
export async function getPublicStatsController(req: Request, res: Response) {
	try {
		// Get overall statistics
		const data = await getPublicStats();

		return res.json({
			success: true,
			data,
		});
	} catch (error) {
		console.error("Error fetching public stats:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to fetch statistics",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
}
