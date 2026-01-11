import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ModalScreen() {
	const insets = useSafeAreaInsets();
	const [cameraPermissions, requestCameraPermissions] = useCameraPermissions();
	const cameraRef = useRef<CameraView>(null);
	const router = useRouter();

	useEffect(() => {
		if (!cameraPermissions?.granted) {
			requestCameraPermissions();
		}
	}, []);

	const handleEnableCamera = async () => {
		// cameraPermissions not determined yet
		if (!cameraPermissions) {
			await requestCameraPermissions();
			return;
		}

		// cameraPermissions denied but can ask again
		if (!cameraPermissions.granted && cameraPermissions.canAskAgain) {
			await requestCameraPermissions();
			return;
		}

		// cameraPermissions permanently denied → open settings
		if (!cameraPermissions.granted && !cameraPermissions.canAskAgain) {
			Linking.openSettings();
		}
	};

	if (!cameraPermissions?.granted) {
		return (
			<View className="flex-1 items-center justify-center px-6 bg-white">
				{/* Icon Placeholder */}
				<View className="w-20 h-20 rounded-full bg-blue-100 items-center justify-center mb-6">
					<Text className="text-3xl">📷</Text>
				</View>

				<Text className="text-center text-xl font-bold mb-2 text-gray-900">
					Camera access needed
				</Text>

				<Text className="text-center text-gray-600 mb-6 leading-5">
					We need access to your camera so you can scan or upload a plant image
					for analysis and disease detection.
				</Text>

				<TouchableOpacity
					onPress={() => {
						handleEnableCamera();
						console.log("cameraPermissions requested");
					}}
					className="bg-[#44DF3E] px-8 py-3 rounded-xl w-full mb-3">
					<Text className="text-white font-semibold text-center text-base">
						Allow Camera Access
					</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => router.back()} className="py-2 ">
					<Text className="text-[#109b0b] font-medium text-sm">Back</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<View style={{ flex: 1 }}>
			<CameraView ref={cameraRef} style={{ flex: 1 }} facing="back" />
			<View className={`absolute  left-5`} style={{ top: insets.top }}>
				<TouchableOpacity
					onPress={() => router.back()}
					className="bg-white flex flex-row items-center gap-2 px-4 py-2 rounded-lg">
					<ChevronLeft color="#16a34a" />
					<Text className=" text-green-600 font-medium text-sm">Back</Text>
				</TouchableOpacity>
			</View>
			<View className="absolute bottom-10 w-full items-center">
				<TouchableOpacity
					onPress={async () => {
						if (!cameraRef.current) return;

						const result = await cameraRef.current.takePictureAsync({
							quality: 0.8,
							skipProcessing: true,
						});

						console.log("Photo taken:", result.uri);

						// setPhoto(result);
					}}
					className="h-20 w-20 rounded-full bg-white items-center justify-center">
					<View className="h-16 w-16 rounded-full bg-green-600" />
				</TouchableOpacity>
			</View>
		</View>
	);
}
