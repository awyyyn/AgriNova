import {
	deleteUserController,
	updateProfileController,
} from "@src/controllers/user.controller.js";
import { middleware } from "@src/middlewares/middleware.js";
import { Router } from "express";

const router = Router();

router.post("/edit", middleware, updateProfileController);
router.delete("/delete", middleware, deleteUserController);

export default router;
