import { middleware } from "../middlewares/middleware.js";
import { analyzePlantController } from "../controllers/plant.controller.js";
import { Router } from "express";

const router = Router();

router.post("/analyze", middleware, analyzePlantController);

export default router;
