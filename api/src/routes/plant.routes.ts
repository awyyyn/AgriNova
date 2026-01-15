import { analyzePlantController } from "../controllers/plant.controller.js";
import { Router } from "express";

const router = Router();

router.post("/analyze", analyzePlantController);

export default router;
