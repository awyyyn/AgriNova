import { middleware } from "../middlewares/middleware.js";
import {
	analyzePlantController,
	readPlantController,
	readPlantsController,
} from "../controllers/plant.controller.js";
import { Router } from "express";

const router = Router();

router.post("/analyze", middleware, analyzePlantController);
router.get("/list", middleware, readPlantsController);
router.get("/list/:id", middleware, readPlantController);

export default router;
