import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ScrollViewLayout from "@src/layouts/scrollview-layout";
import { Card } from "@src/components/ui/card";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { VStack } from "@src/components/ui/vstack";
import { Camera } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function Scan() {
	const [permission, requestPermission] = useCameraPermissions();
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleScan = async () => {
		router.push("/modal");
		// try {
		// 	setLoading(true);

		// 	const photo = await cameraRef.current.takePictureAsync({
		// 		quality: 1,
		// 		skipProcessing: false,
		// 	});

		// 	console.log("Scanned Image:", photo.uri);

		// 	// 👉 Navigate to preview / processing screen
		// 	// router.push({ pathname: "/scan/preview", params: { uri: photo.uri } });
		// } catch (err) {
		// 	console.error(err);
		// } finally {
		// 	setLoading(false);
		// }
	};

	// 🖼 Upload from gallery
	const handleUpload = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 1,
		});

		if (!result.canceled) {
			console.log("Uploaded Image:", result.assets[0].uri);

			// 👉 Navigate to preview / processing screen
		}
	};

	return (
		<ScrollViewLayout>
			<Card size="lg">
				<Text className="text-2xl font-jakarta font-medium">
					Scan or Upload an Image
				</Text>
				<Text className="leading-relaxed">
					Use the camera to scan a pest or plant, or upload an image from your
					gallery for identification.
				</Text>
			</Card>

			<Card className="shadow-ssm mt-5" size="lg">
				<Text className="font-medium text-lg">Tips:</Text>
				<VStack className="mt-2" space="sm">
					<Text className="pl-[1rem]">
						- Ensure good lighting conditions for better image quality.
					</Text>
					<Text className="pl-[1rem]">
						- Hold your device steady while capturing the image.
					</Text>
					<Text className="pl-[1rem]">
						- Center the pest or plant in the frame for accurate detection.
					</Text>
					<Text className="pl-[1rem]">
						- Avoid blurry or out-of-focus images for optimal results.
					</Text>
				</VStack>
			</Card>

			<Card className="mt-5 py-10" size="lg">
				<TouchableOpacity
					onPress={handleScan}
					className="h-[117px] w-[117px] mx-auto bg-[#DAFFD7] rounded-full relative   flex items-center justify-center"
					// className="border border-gray-300 py-4 rounded-xl flex-row justify-center items-center gap-2"
				>
					{/* <Ionicons name="image" size={20} color="#111" /> */}
					<Camera size={50} color="#34C759" />
				</TouchableOpacity>
				<Text className="  text-lg text-center">Start Scanning</Text>
				<TouchableOpacity
					onPress={handleUpload}
					className=" mt-2 py-4 bg-[#44DF3E] rounded-2xl flex-row justify-center items-center gap-2">
					{/* <Ionicons name="image" size={20} color="#111" /> */}
					<Text className="  text-lg text-white">Upload from Gallery</Text>
				</TouchableOpacity>
			</Card>
		</ScrollViewLayout>
	);
}
