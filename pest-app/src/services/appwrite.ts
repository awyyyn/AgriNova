import { Client, Storage, ID } from "react-native-appwrite";

const client = new Client()
	.setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
	.setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

export const storage = new Storage(client);

export const handleUploadToAppwrite = async (file: {
	uri: string;
	fileName: string;
	size: number;
}) => {
	try {
		const response = await storage.createFile({
			bucketId: "plant-images",
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
