import {
	forgotPasswordController,
	loginController,
	registerController,
	resetPasswordController,
	verifyTokenController,
} from "@src/controllers/index.js";
import { Router } from "express";

const router = Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);
router.post("/verify-token", verifyTokenController);

export default router;
