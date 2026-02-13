import { Client, Storage, ID } from "appwrite";

const client = new Client()
	.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT!)
	.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID!);

export const storage = new Storage(client);

export const handleUploadToAppwrite = async ({
	file,
	bucketId,
}: {
	bucketId?: string;
	file: File;
}) => {
	try {
		const response = await storage.createFile({
			bucketId: bucketId || "plant-images",
			fileId: ID.unique(),
			file,
		});
		console.log("File uploaded successfully:", response);
		return response;
	} catch (error) {
		console.error("Error uploading file:", error);
		throw error;
	}
};
