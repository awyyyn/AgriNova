import {
	getDashboardActiveUsers,
	getDashboardDailyBreakdown,
	getDashboardDistributions,
	getDashboardGrowthTrends,
	getDashboardMetrics,
	getDashboardOverview,
	getDashboardRecentAnalyses,
	getDashboardReport,
	getDashboardTopDiseases,
} from "@src/controllers/analytics.controller.js";
import { getPublicStats } from "@src/services/stat.service.js";
import { Router } from "express";

const router = Router();

router.get("/", getDashboardReport);
// router.get("/stats", getPublicStats);
router.get("/overview", getDashboardOverview);
router.get("/metrics", getDashboardMetrics);
router.get("/daily", getDashboardDailyBreakdown);
router.get("/diseases/top", getDashboardTopDiseases);
router.get("/distributions", getDashboardDistributions);
router.get("/growth", getDashboardGrowthTrends);
router.get("/users/active", getDashboardActiveUsers);
router.get("/analyses/recent", getDashboardRecentAnalyses);

export default router;
