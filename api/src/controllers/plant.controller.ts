import { openAI } from "../configs/openai.js";
import { Request, Response } from "express";

export const analyzePlantController = async (req: Request, res: Response) => {
	try {
		const response = await openAI.responses.create(
			{
				model: "gpt-4.1-mini",
				input: [
					{
						role: "user",
						content: [
							{
								type: "input_text",
								text: "what's in this image?",
							},
							{
								type: "input_image",
								image_url:
									"https://camo.githubusercontent.com/5e45bc648dba68520ce949a53690af6bcef2880f84a1d46cbb1636649afd6d84/68747470733a2f2f796176757a63656c696b65722e6769746875622e696f2f73616d706c652d696d616765732f696d6167652d313032312e6a7067",
							},
						],
					},
				],
			},
			{}
		);

		console.log(response.output_text);

		res;
	} catch (error) {
		console.error(`Error in loginController:`);
		console.error(error);
		res.status(500).json({
			message: "Internal server error!",
		});
	}
};
