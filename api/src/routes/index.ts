import express from "express";
import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";
import AnalyticsRoutes from "./analytics.routes.js";
import PlantRoutes from "./plant.routes.js";
import NotificationRoutes from "./notification.routes.js";
import { middleware } from "@src/middlewares/middleware.js";
import { Authorize } from "@src/middlewares/authorize.js";

const Router: express.Router = express.Router();

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

export default Router;
