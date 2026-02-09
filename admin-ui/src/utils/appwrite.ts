import { Client, Storage, ID } from "appwrite";

const client = new Client()
	.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT!)
	.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID!);

export const storage = new Storage(client);

export const handleUploadToAppwrite = async (file: {
	uri: string;
	fileName: string;
	size: number;
	// upgrade appwrite subscriptiong to use avatars bucket
	bucketId?: "plant-images" | "avatars";
}) => {
	try {
		const response = await storage.createFile({
			bucketId: file?.bucketId || "plant-images",
			fileId: ID.unique(),
			file: {
				uri: file.uri,
				type: "image/jpeg",
				name: file.fileName,
				size: file.size,
			},
		});
		console.log("File uploaded successfully:", response);
		return response;
	} catch (error) {
		console.error("Error uploading file:", error);
		throw error;
	}
};
