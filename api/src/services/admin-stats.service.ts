import {
	differenceInDays,
	format,
	endOfDay,
	startOfDay,
	subDays,
	eachDayOfInterval,
} from "date-fns";
import { prisma } from "../configs/prisma.js";
import { getUsersByRole } from "./user.service.js";
import { getRelativeTime } from "@src/utils/date-fns.js";

export async function getOverviewMetrics() {
	const [
		totalUsers,
		totalAnalyses,
		totalWithPest,
		totalWithoutPest,
		avgConfidence,
	] = await Promise.all([
		prisma.user.count(),
		prisma.plant.count(),
		prisma.plant.count({ where: { hasPestFound: true } }),
		prisma.plant.count({ where: { hasPestFound: false } }),
		prisma.plant.aggregate({ _avg: { confidence: true } }),
	]);

	const pestPercentage =
		totalAnalyses > 0 ? (totalWithPest / totalAnalyses) * 100 : 0;

	return {
		totalUsers,
		totalAnalyses,
		totalWithPest,
		totalWithoutPest,
		pestPercentage: pestPercentage.toFixed(2),
		averageConfidence: (avgConfidence._avg.confidence || 0).toFixed(2),
	};
}

export async function getWeeklyMetrics(startDate?: Date, endDate?: Date) {
	const end = endDate || endOfDay(new Date());
	const start = startDate || startOfDay(subDays(end, 7));

	const [
		newUsers,
		weeklyAnalyses,
		weeklyWithPest,
		weeklyWithoutPest,
		activeUsers,
		avgConfidenceWeek,
	] = await Promise.all([
		// New users this week
		prisma.user.count({
			where: {
				createdAt: { gte: start, lte: end },
			},
		}),

		// Analyses created this week
		prisma.plant.count({
			where: {
				createdAt: { gte: start, lte: end },
			},
		}),

		// Analyses with pest this week
		prisma.plant.count({
			where: {
				createdAt: { gte: start, lte: end },
				hasPestFound: true,
			},
		}),

		// Analyses without pest this week
		prisma.plant.count({
			where: {
				createdAt: { gte: start, lte: end },
				hasPestFound: false,
			},
		}),

		// Active users (users who created at least 1 analysis this week)
		prisma.user.count({
			where: {
				plantAnalysis: {
					some: {
						createdAt: { gte: start, lte: end },
					},
				},
			},
		}),

		// Average confidence this week
		prisma.plant.aggregate({
			where: {
				createdAt: { gte: start, lte: end },
			},
			_avg: { confidence: true },
		}),
	]);

	const weeklyPestPercentage =
		weeklyAnalyses > 0 ? (weeklyWithPest / weeklyAnalyses) * 100 : 0;

	return {
		dateRange: {
			start: format(start, "yyyy-MM-dd"),
			end: format(end, "yyyy-MM-dd"),
		},
		newUsers,
		weeklyAnalyses,
		weeklyWithPest,
		weeklyWithoutPest,
		weeklyPestPercentage: weeklyPestPercentage.toFixed(2),
		activeUsers,
		averageConfidenceWeek: (avgConfidenceWeek._avg.confidence || 0).toFixed(2),
		daysInPeriod: differenceInDays(end, start) + 1,
	};
}

export async function getAnalysisByType(startDate?: Date, endDate?: Date) {
	const whereClause =
		startDate && endDate
			? { createdAt: { gte: startOfDay(startDate), lte: endOfDay(endDate) } }
			: {};

	const analysisByType = await prisma.plant.groupBy({
		by: ["type"],
		where: whereClause,
		_count: true,
		orderBy: {
			_count: {
				type: "desc",
			},
		},
	});

	return analysisByType.map((item) => ({
		type: item.type,
		count: item._count,
	}));
}

export async function getTopDiseases(
	limit: number = 10,
	startDate?: Date,
	endDate?: Date,
) {
	const whereClause = {
		diagnosis: { isNot: null },
		...(startDate && endDate
			? {
					createdAt: { gte: startOfDay(startDate), lte: endOfDay(endDate) },
				}
			: {}),
	};

	const plants = await prisma.plant.findMany({
		where: whereClause,
		select: {
			diagnosis: true,
		},
	});

	// Count diseases manually (since diagnosis.name is in a composite type)
	const diseaseCount: Record<string, number> = {};

	plants.forEach((plant) => {
		if (plant.diagnosis) {
			const name = plant.diagnosis.name;
			diseaseCount[name] = (diseaseCount[name] || 0) + 1;
		}
	});

	// Sort and limit
	const topDiseases = Object.entries(diseaseCount)
		.map(([name, count]) => ({ name, count }))
		.sort((a, b) => b.count - a.count)
		.slice(0, limit);

	return topDiseases;
}

export async function getSeverityDistribution(
	startDate?: Date,
	endDate?: Date,
) {
	const whereClause = {
		diagnosis: { isNot: null },
		...(startDate && endDate
			? {
					createdAt: { gte: startOfDay(startDate), lte: endOfDay(endDate) },
				}
			: {}),
	};

	const plants = await prisma.plant.findMany({
		where: whereClause,
		select: {
			diagnosis: true,
		},
	});

	const severityCount: Record<string, number> = {};

	plants.forEach((plant) => {
		if (plant.diagnosis) {
			const severity = plant.diagnosis.severity;
			severityCount[severity] = (severityCount[severity] || 0) + 1;
		}
	});

	return severityCount;
}

export async function getHealthStatusDistribution(
	startDate?: Date,
	endDate?: Date,
) {
	const whereClause = {
		healthStatus: { not: null },
		...(startDate && endDate
			? {
					createdAt: { gte: startOfDay(startDate), lte: endOfDay(endDate) },
				}
			: {}),
	};

	const plants = await prisma.plant.findMany({
		where: whereClause,
		select: {
			healthStatus: true,
		},
	});

	const statusCount: Record<string, number> = {};

	plants.forEach((plant) => {
		if (plant.healthStatus) {
			statusCount[plant.healthStatus] =
				(statusCount[plant.healthStatus] || 0) + 1;
		}
	});

	return statusCount;
}

export async function getDailyBreakdown(startDate: Date, endDate: Date) {
	const start = startOfDay(startDate);
	const end = endOfDay(endDate);

	const plants = await prisma.plant.findMany({
		where: {
			createdAt: { gte: start, lte: end },
		},
		select: {
			createdAt: true,
			hasPestFound: true,
			confidence: true,
		},
		orderBy: {
			createdAt: "asc",
		},
	});

	// Group by date
	const dailyData: Record<
		string,
		{
			total: number;
			withPest: number;
			withoutPest: number;
			totalConfidence: number;
		}
	> = {};

	plants.forEach((plant) => {
		const date = format(plant.createdAt, "yyyy-MM-dd");

		if (!dailyData[date]) {
			dailyData[date] = {
				total: 0,
				withPest: 0,
				withoutPest: 0,
				totalConfidence: 0,
			};
		}

		dailyData[date].total++;
		dailyData[date].totalConfidence += plant.confidence;

		if (plant.hasPestFound) {
			dailyData[date].withPest++;
		} else {
			dailyData[date].withoutPest++;
		}
	});

	// Fill in missing dates with zero counts
	const allDates = eachDayOfInterval({ start, end });

	return allDates.map((date) => {
		const dateStr = format(date, "yyyy-MM-dd");
		const data = dailyData[dateStr] || {
			total: 0,
			withPest: 0,
			withoutPest: 0,
			totalConfidence: 0,
		};

		return {
			date: dateStr,
			total: data.total,
			withPest: data.withPest,
			withoutPest: data.withoutPest,
			avgConfidence:
				data.total > 0
					? (data.totalConfidence / data.total).toFixed(2)
					: "0.00",
		};
	});
}

export async function getMostActiveUsers(
	limit: number = 10,
	startDate?: Date,
	endDate?: Date,
) {
	const whereClause =
		startDate && endDate
			? { createdAt: { gte: startOfDay(startDate), lte: endOfDay(endDate) } }
			: {};

	const users = await prisma.user.findMany({
		include: {
			plantAnalysis: {
				where: whereClause,
				select: { id: true },
			},
		},
	});

	// Map and sort by analysis count
	const activeUsers = users
		.map((user) => ({
			id: user.id,
			email: user.email,
			name: `${user.firstName} ${user.lastName || ""}`.trim(),
			role: user.role,
			analysisCount: user.plantAnalysis.length,
		}))
		.filter((user) => user.analysisCount > 0)
		.sort((a, b) => b.analysisCount - a.analysisCount)
		.slice(0, limit);

	return activeUsers;
}

export async function getConfidenceDistribution(
	startDate?: Date,
	endDate?: Date,
) {
	const whereClause =
		startDate && endDate
			? { createdAt: { gte: startOfDay(startDate), lte: endOfDay(endDate) } }
			: {};

	const plants = await prisma.plant.findMany({
		where: whereClause,
		select: {
			confidence: true,
		},
	});

	const distribution = {
		low: 0, // 0-0.5
		medium: 0, // 0.5-0.8
		high: 0, // 0.8-1.0
	};

	plants.forEach((plant) => {
		if (plant.confidence < 0.5) {
			distribution.low++;
		} else if (plant.confidence < 0.8) {
			distribution.medium++;
		} else {
			distribution.high++;
		}
	});

	return distribution;
}

export async function getGrowthTrends() {
	const now = endOfDay(new Date());
	const thisWeekStart = startOfDay(subDays(now, 7));
	const lastWeekStart = startOfDay(subDays(now, 14));
	const lastWeekEnd = thisWeekStart;

	const [thisWeekUsers, lastWeekUsers, thisWeekAnalyses, lastWeekAnalyses] =
		await Promise.all([
			prisma.user.count({
				where: { createdAt: { gte: thisWeekStart, lte: now } },
			}),
			prisma.user.count({
				where: { createdAt: { gte: lastWeekStart, lt: lastWeekEnd } },
			}),
			prisma.plant.count({
				where: { createdAt: { gte: thisWeekStart, lte: now } },
			}),
			prisma.plant.count({
				where: { createdAt: { gte: lastWeekStart, lt: lastWeekEnd } },
			}),
		]);

	const userGrowth =
		lastWeekUsers > 0
			? (((thisWeekUsers - lastWeekUsers) / lastWeekUsers) * 100).toFixed(2)
			: "0";

	const analysisGrowth =
		lastWeekAnalyses > 0
			? (
					((thisWeekAnalyses - lastWeekAnalyses) / lastWeekAnalyses) *
					100
				).toFixed(2)
			: "0";

	return {
		userGrowth: `${userGrowth}%`,
		analysisGrowth: `${analysisGrowth}%`,
		thisWeek: {
			users: thisWeekUsers,
			analyses: thisWeekAnalyses,
			period: {
				start: format(thisWeekStart, "yyyy-MM-dd"),
				end: format(now, "yyyy-MM-dd"),
			},
		},
		lastWeek: {
			users: lastWeekUsers,
			analyses: lastWeekAnalyses,
			period: {
				start: format(lastWeekStart, "yyyy-MM-dd"),
				end: format(lastWeekEnd, "yyyy-MM-dd"),
			},
		},
	};
}

export async function getRecentAnalyses(limit: number = 10) {
	const recentAnalyses = await prisma.plant.findMany({
		take: limit,
		orderBy: {
			createdAt: "desc",
		},
		include: {
			user: {
				select: {
					firstName: true,
					lastName: true,
					email: true,
				},
			},
		},
	});

	return recentAnalyses.map((plant) => ({
		id: plant.id,
		formattedId: plant.formattedId,
		type: plant.type,
		hasPestFound: plant.hasPestFound,
		confidence: plant.confidence,
		healthStatus: plant.healthStatus,
		diagnosis: plant.diagnosis,
		plantIdentification: plant.plantIdentification,
		createdAt: format(plant.createdAt, "yyyy-MM-dd HH:mm:ss"),
		createdAtRelative: getRelativeTime(plant.createdAt),
		user: plant.user
			? {
					name: `${plant.user.firstName} ${plant.user.lastName || ""}`.trim(),
					email: plant.user.email,
				}
			: null,
	}));
}

export async function getCompleteDashboardReport(
	startDate?: Date,
	endDate?: Date,
) {
	const [
		overview,
		weekly,
		usersByRole,
		analysisByType,
		topDiseases,
		severityDist,
		healthStatusDist,
		confidenceDist,
		growthTrends,
		activeUsers,
		recentAnalyses,
	] = await Promise.all([
		getOverviewMetrics(),
		getWeeklyMetrics(startDate, endDate),
		getUsersByRole(),
		getAnalysisByType(startDate, endDate),
		getTopDiseases(10, startDate, endDate),
		getSeverityDistribution(startDate, endDate),
		getHealthStatusDistribution(startDate, endDate),
		getConfidenceDistribution(startDate, endDate),
		getGrowthTrends(),
		getMostActiveUsers(10, startDate, endDate),
		getRecentAnalyses(10),
	]);

	return {
		overview,
		weekly,
		distributions: {
			usersByRole,
			analysisByType,
			severity: severityDist,
			healthStatus: healthStatusDist,
			confidence: confidenceDist,
		},
		topDiseases,
		growthTrends,
		activeUsers,
		recentAnalyses,
		generatedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
	};
}
