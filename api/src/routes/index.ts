import express from "express";
import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";
import AnalyticsRoutes from "./analytics.routes.js";
import PlantRoutes from "./plant.routes.js";
import NotificationRoutes from "./notification.routes.js";
import DiseasesRoutes from "./diseases.routes.js";
import { middleware } from "@src/middlewares/middleware.js";
import { Authorize } from "@src/middlewares/authorize.js";

import { getPublicStatsController } from "@src/controllers/analytics.controller.js";

const Router: express.Router = express.Router();

Router.get("/stats", getPublicStatsController);
Router.use("/auth", AuthRoutes);
Router.use("/user", UserRoutes);
Router.use("/plant", PlantRoutes);
Router.use(
	"/analytics",
	middleware,
	Authorize(["ADMIN", "SUPER_ADMIN"]),
	AnalyticsRoutes,
);
Router.use(
	"/notifications",
	middleware,
	Authorize(["ADMIN", "SUPER_ADMIN"]),
	NotificationRoutes,
);
Router.use("/diseases", DiseasesRoutes);

export default Router;
