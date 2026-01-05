import {
	forgotPasswordController,
	loginController,
	registerController,
	resetPasswordController,
} from "@src/controllers/index.js";
import { Router } from "express";

const router = Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);

export default router;
