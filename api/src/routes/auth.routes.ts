import {
	forgotPasswordController,
	loginController,
	registerController,
} from "@src/controllers/index.js";
import { Router } from "express";

const router = Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/forgot-password", forgotPasswordController);

export default router;
