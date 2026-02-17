import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ScrollViewLayout from "@src/layouts/scrollview-layout";
import { Card } from "@src/components/ui/card";
import { useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { VStack } from "@src/components/ui/vstack";
import { Camera, Upload } from "lucide-react-native";
import { useRouter } from "expo-router";
import { handleUploadToAppwrite } from "@src/services/appwrite";
import { slugify } from "@src/utils";
import { useLoadingStore } from "@src/store/useLoadingStore";

export default function Scan() {
	const [permission, requestPermission] = useCameraPermissions();
	const setLoading = useLoadingStore((state) => state.setLoading);
	const router = useRouter();

	const handleScan = async () => router.push("/modal");

	// 🖼 Upload from gallery
	const handleUpload = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 1,
		});

		if (!result.canceled) {
			console.log("Uploaded Image:", result.assets[0]);
			const file = result.assets[0];
			setLoading(true);
			try {
				await new Promise((resolve) => setTimeout(resolve, 3000));
				const data = await handleUploadToAppwrite({
					fileName: slugify(file.fileName || "uploaded-image"),
					size: file.fileSize || 0,
					uri: file.uri,
				});
				router.push({
					pathname: "/analyze",
					params: { id: data.$id },
				});
			} catch (error) {
				console.error("Error uploading image:", error);
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<ScrollViewLayout>
			<Card
				size="lg"
				style={{
					shadowColor: "#82D55C",
					shadowOffset: { width: 0, height: 3 },
					shadowRadius: 4,
					shadowOpacity: 1,
					elevation: 10,
				}}
				className="bg-[#F0FDF4] border border-[#0A980F] mt-2 ">
				<Text className="text-2xl text-center font-jakarta font-medium">
					Scan or Upload an Image
				</Text>
				<Text className="leading-relaxed text-center text-xl">
					Use the camera to scan a pest or plant, or upload an image from your
					gallery for identification.
				</Text>
			</Card>

			<Card
				style={{
					shadowColor: "#82D55C",
					shadowOffset: { width: 0, height: 3 },
					shadowRadius: 4,
					shadowOpacity: 1,
					elevation: 10,
				}}
				className="bg-[#F0FDF4] border border-[#0A980F] mt-5 "
				size="lg">
				<Text className="font-medium text-2xl">Tips:</Text>
				<VStack className="mt-2" space="sm">
					<Text className="pl-[1rem] text-xl">
						- Ensure good lighting conditions for better image quality.
					</Text>
					<Text className="pl-[1rem] text-xl">
						- Hold your device steady while capturing the image.
					</Text>
					<Text className="pl-[1rem] text-xl">
						- Center the pest or plant in the frame for accurate detection.
					</Text>
					<Text className="pl-[1rem] text-xl">
						- Avoid blurry or out-of-focus images for optimal results.
					</Text>
				</VStack>
			</Card>

			<Card
				style={{
					shadowColor: "#82D55C",
					shadowOffset: { width: 0, height: 3 },
					shadowRadius: 4,
					shadowOpacity: 1,
					elevation: 10,
				}}
				className="mt-5 py-10 bg-[#F0FDF4] border border-[#0A980F]"
				size="lg">
				<TouchableOpacity
					onPress={handleScan}
					className="h-[117px] w-[117px] mx-auto bg-[#A5F5A0] rounded-full relative   flex items-center justify-center"
					// className="border border-gray-300 py-4 rounded-xl flex-row justify-center items-center gap-2"
				>
					{/* <Ionicons name="image" size={20} color="#111" /> */}
					<Camera size={50} color="#000" />
				</TouchableOpacity>
				<Text className="  text-xl text-center">Start Scanning</Text>
				<TouchableOpacity
					onPress={handleUpload}
					className=" mt-2 py-4 bg-[#2e7d32] rounded-2xl flex-row justify-center items-center gap-2">
					<Upload size={25} color="#FFF" />
					<Text className=" ml-2 text-xl text-white">Upload Image</Text>
				</TouchableOpacity>
			</Card>
		</ScrollViewLayout>
	);
}
