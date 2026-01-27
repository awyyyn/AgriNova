import { middleware } from "../middlewares/middleware.js";
import {
	analyzePlantController,
	readPlantsController,
} from "../controllers/plant.controller.js";
import { Router } from "express";

const router = Router();

router.post("/analyze", middleware, analyzePlantController);
router.get("/list", middleware, readPlantsController);

export default router;
