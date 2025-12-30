import axios from "axios";
import type { Request, Response } from "express";

export const identifyDiseaseController = async (
  req: Request,
  res: Response,
) => {
  if (!req.file) {
    console.log("No file uploaded");
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  const form = new FormData();

  // ✅ Attach the actual file
  form.append("images", req.file.path);

  // ✅ Other fields
  form.append("similar_images", "true");

  form.append("details", "severity,treatment");

  await axios
    .post(
      `https://my-api.plantnet.org/v2/diseases/identify?include-related-images=true&api-key=${process.env.PLANTNET_API_KEY}`,
      form,
      {
        headers: {
          "Api-Key": process.env.PLANTNET_API_KEY,
          "Content-Type": "multipart/form-data",
        },
        method: "post",
        maxBodyLength: Infinity,
      },
    )
    .then((response) => {
      console.log("============ RESPONSE ============");
      console.log(JSON.stringify(response.data));
      res.status(200).json({ data: response.data });
    })
    .catch((error) => {
      console.log("============ ERROR ============");
      console.log(error);
      res.json(error);
    });
};
