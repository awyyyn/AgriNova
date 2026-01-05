import { loginController, registerController } from "@src/controllers/index.js";
import { Router } from "express";

const router = Router();

router.post("/login", loginController);
router.post("/register", registerController);

export default router;
