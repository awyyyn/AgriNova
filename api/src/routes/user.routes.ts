import { Authorize } from "../middlewares/authorize.js";
import { changePasswordController } from "../controllers/password.controller.js";
import {
	deleteUserController,
	readUserController,
	readUsersController,
	updateProfileController,
} from "../controllers/user.controller.js";
import { middleware } from "../middlewares/middleware.js";
import { Router } from "express";
import { readStatsController } from "../controllers/stats.contnroller.js";

const router = Router();

router.get(
	"/list",
	middleware,
	Authorize(["ADMIN", "SUPER_ADMIN"]),
	readUsersController,
);
router.get("/stats", middleware, readStatsController);
router.get("/:id", readUserController);
router.post("/edit", middleware, updateProfileController);
router.delete("/delete", middleware, deleteUserController);
router.post("/change-password", middleware, changePasswordController);

export default router;
