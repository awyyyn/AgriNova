import { changePasswordController } from "@src/controllers/password.controller.js";
import { middleware } from "@src/middlewares/middleware.js";
import { Router } from "express";

const router = Router();

router.post("/change", middleware, changePasswordController);

export default router;
