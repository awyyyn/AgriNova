import { changePasswordController } from "@src/controllers/password.controller.js";
import {
	deleteUserController,
	updateProfileController,
} from "@src/controllers/user.controller.js";
import { middleware } from "@src/middlewares/middleware.js";
import { Router } from "express";

const router = Router();

router.post("/edit", middleware, updateProfileController);
router.delete("/delete", middleware, deleteUserController);
router.post("/change-password", middleware, changePasswordController);

export default router;
