import { PlantAnalysisResponse } from "@src/types/plant-analysis.js";
import { openAI } from "../configs/openai.js";
import { Request, Response } from "express";
import { prisma } from "@src/configs/prisma.js";
import { generatePlantAnalysisId } from "@src/utils/index.js";

const ANALYSIS_PROMPT = `
You are an agricultural plant health expert.

Analyze the image and respond ONLY with valid JSON.
DO NOT include markdown, explanations, or extra text.

If NO plant, fruit, or vegetable is detected, return:

{
  "imageValidation": "invalid",
  "message": "No plant, fruit, or vegetable detected in this image. Please upload a clear photo of your plant for pest analysis."
}

If a plant IS detected, return this structure:

{
  "imageValidation": "valid",
  "plantIdentification": {
    "commonName": "string | null",
    "scientificName": "string | null"
  },
  "healthStatus": "healthy | unhealthy",
  "diagnosis": {
    "name": "string",
    "severity": "mild | moderate | severe",
    "symptoms": ["string"]
  } | null,
  "treatment": {
    "organic": ["string"],
    "chemical": ["string"],
    "notes": "string"
  } | null,
  "preventionTips": ["string"],
  "recoveryTimeline": "string"
}

Rules:
- diagnosis and treatment MUST be null if plant is healthy
- preventionTips must contain 3–5 items
- severity must be lowercase
- Use "suspected" if unsure
`;

export const analyzePlantController = async (req: Request, res: Response) => {
	try {
		const { img } = req.body;

		if (!req.userId) {
			res.status(400).json({
				message: "UnAuthorized",
				error: true,
			});
			return;
		}

		if (!img) {
			res.status(400).json({
				error: true,
				message: "Image is required!",
			});
			return;
		}

		const response = await openAI.responses.create(
			{
				model: "gpt-4.1-mini",
				input: [
					{
						role: "user",
						content: [
							{
								type: "input_text",
								text: ANALYSIS_PROMPT,
							},
							{
								type: "input_image",
								image_url: img,
							},
						],
					},
				],
			},
			{},
		);

		console.log(response.output_text);

		// Safely extract JSON text
		const outputText = response.output_text;

		if (!outputText) {
			res.status(500).json({
				error: true,
				message: "No response from AI",
			});
			return;
		}

		const parsed: PlantAnalysisResponse = JSON.parse(outputText);

		const analysis = await prisma.plant.create({
			data: {
				img,
				formattedId: generatePlantAnalysisId(),
				confidence: parsed.confidence,
				diagnosis: parsed.diagnosis,
				healthStatus: parsed.healthStatus,
				message: parsed.message,
				plantIdentification: parsed.plantIdentification,
				preventionTips: parsed.preventionTips,
				recoveryTimeline: parsed.recoveryTimeline,
				treatment: parsed.treatment,
				user: {
					connect: {
						id: req.userId,
					},
				},
			},
		});

		if (!analysis) {
			res.status(400).json({
				message: "Something went wrong while saving your analysis.",
				error: true,
			});
			return;
		}

		res.status(200).json(parsed);
	} catch (error) {
		console.error(`Error in loginController:`);
		console.error(error);
		res.status(500).json({
			message: "Internal server error!",
		});
	}
};
