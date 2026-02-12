import { Router } from "express";
import { getCommonDiseases } from "@src/controllers/diseases.controller.js";

const router = Router();

router.get("/", getCommonDiseases);

export default router;
