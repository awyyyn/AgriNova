import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	useColorScheme,
	Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

import { LazyImage } from "@src/components/lazy-image";

import { useAuthStore } from "@src/store/useAuthStore";
import { PlantAnalysisResponse } from "@src/types";
import { AlertTriangle } from "lucide-react-native";
import { Button, ButtonText } from "@src/components/ui/button";
import { toast } from "sonner-native";
import { MarkPlantAnalyzationAsDone } from "@src/utils";

export default function Analyze() {
	const { id } = useLocalSearchParams();
	const router = useRouter();
	const { token } = useAuthStore();
	const [markAsDone, setMarkAsDone] = useState(false);
	const scheme = useColorScheme();

	const [loading, setLoading] = useState(false);
	const [analyzed, setAnalyzed] = useState(false);
	const [error, setError] = useState("");
	const [data, setData] = useState<PlantAnalysisResponse | null>(null);

	const imageUrl = `https://fra.cloud.appwrite.io/v1/storage/buckets/plant-images/files/${id}/view?project=${process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID}`;

	// Load cached result if exists
	// useEffect(() => {
	// 	const loadCache = async () => {
	// 		try {
	// 			const cached = await AsyncStorage.getItem(`plant-analysis-${id}`);
	// 			if (cached) {
	// 				setData(JSON.parse(cached));
	// 				setAnalyzed(true);
	// 			}
	// 		} catch {}
	// 	};
	// 	loadCache();
	// }, [id]);

	if (!id) return router.dismiss();

	async function handleAnalyze() {
		try {
			setError("");
			setLoading(true);
			setAnalyzed(false);

			Haptics.selectionAsync();

			const response = await fetch(
				`${process.env.EXPO_PUBLIC_API_URL}/plant/analyze`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ img: imageUrl }),
				},
			);

			const result = await response.json();

			if (!response.ok) {
				Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
				throw new Error(result.message || "Failed to analyze image");
			}

			setData(result);
			setAnalyzed(true);
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

			// Cache result
			// await AsyncStorage.setItem(
			// 	`plant-analysis-${id}`,
			// 	JSON.stringify(result),
			// );
		} catch (err) {
			setError((err as Error).message || "Something went wrong");
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
		} finally {
			setLoading(false);
		}
	}

	const isDark = scheme === "dark";

	const handleMarkAsDone = async () => {
		try {
			if (!data?.id) return;
			setMarkAsDone(true);
			await MarkPlantAnalyzationAsDone(token, data.id);
			// router.push
			router.dismissTo("/history");
		} catch (error) {
			toast.error("An Error Occurred", {
				description: (error as Error).message,
				richColors: true,
				duration: 5000,
			});
		} finally {
			setMarkAsDone(false);
		}
	};

	return (
		<ScrollView
			className={`flex-1 p-[4vw]`}
			contentContainerStyle={{ gap: 20, paddingBottom: 50 }}
			style={{ backgroundColor: isDark ? "#1A1A1A" : "#F8FAFC" }}>
			<LazyImage height={380} contentFit="contain" uri={imageUrl} />

			{!loading && !analyzed && (
				<TouchableOpacity
					onPress={handleAnalyze}
					className="bg-[#2e7d32] p-4 rounded-xl">
					<Text className="text-center text-lg font-semibold text-white">
						Analyze Plant
					</Text>
				</TouchableOpacity>
			)}

			{/* Skeleton loader */}
			{loading && (
				<View className="gap-4 mt-10">
					<View className="h-20 bg-gray-300 rounded-xl animate-pulse" />
					<View className="h-20 bg-gray-300 rounded-xl animate-pulse" />
					<View className="h-20 bg-gray-300 rounded-xl animate-pulse" />
				</View>
			)}

			{/* Error */}
			{error !== "" && !loading && (
				<View
					className={`p-4 rounded-xl border gap-2 ${
						isDark ? "border-red-400 bg-red-900" : "border-red-200 bg-red-50"
					}`}>
					<Text
						className={`${isDark ? "text-red-200" : "text-red-600"} text-2xl font-semibold`}>
						Analysis Failed
					</Text>
					<Text
						className={`${isDark ? "text-red-300" : "text-red-500"} text-xl`}>
						{error}
					</Text>

					<TouchableOpacity
						onPress={handleAnalyze}
						className="mt-2 bg-red-500 rounded-lg py-2">
						<Text className="text-white text-center text-xl font-medium">
							Try Again
						</Text>
					</TouchableOpacity>
				</View>
			)}

			{/* Invalid Image */}
			{analyzed && data?.imageValidation === "invalid" && (
				<View className="flex-1 bg-white px-6 justify-center">
					{/* Icon */}
					<View className="items-center mb-6">
						<AlertTriangle size={64} color="#16a34a" />
					</View>

					{/* Title */}
					<Text className="text-2xl font-semibold text-center mb-2">
						We couldn&apos;t analyze this image
					</Text>

					{/* Description */}
					<Text className="text-center text-xl text-gray-600 mb-6">
						The image doesn&apos;t appear to contain a plant, fruit, or
						vegetable. Please upload a clear photo of a plant leaf, fruit, or
						crop for accurate analysis.
					</Text>

					{/* Tips */}
					<View className="bg-green-50 rounded-2xl p-4 mb-8">
						<Text className="font-semibold text-xl mb-2 text-[#2e7d32]">
							For best results:
						</Text>
						<Text className="text-[#2e7d32] text-xl">• Good lighting</Text>
						<Text className="text-[#2e7d32] text-xl">
							• Plant fills the frame
						</Text>
						<Text className="text-[#2e7d32] text-xl">
							• One plant per photo
						</Text>
					</View>

					{/* Actions */}
					<Pressable
						onPress={() => router.dismissTo("/modal")}
						className="bg-[#2e7d32] py-4 rounded-2xl mb-3">
						<Text className="text-white text-xl text-center font-semibold">
							Retake Photo
						</Text>
					</Pressable>

					<Pressable onPress={() => router.dismissTo("/(tabs)/scan")}>
						<Text className="text-center text-[#2e7d32] text-xl">
							Upload another image
						</Text>
					</Pressable>
				</View>
			)}

			{/* Valid Results */}
			{analyzed && data?.imageValidation === "valid" && (
				<>
					{/* Overview */}
					<View
						className={`rounded-2xl p-4 shadow-sm gap-2 ${
							isDark ? "bg-gray-800" : "bg-white"
						}`}>
						<Text
							className={`text-2xl font-semibold ${isDark ? "text-white" : "text-black"}`}>
							Plant Overview
						</Text>
						<Text className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
							Status:{" "}
							<Text
								className={`${
									data.healthStatus === "healthy"
										? "text-green-400 font-semibold"
										: "text-red-400 font-semibold"
								} text-xl`}>
								{data.healthStatus}{" "}
								{data.confidence && `(Confidence: ${data.confidence}%)`}
							</Text>
						</Text>

						{data.plantIdentification?.commonName && (
							<Text
								className={`${isDark ? "text-gray-300" : "text-gray-600"} text-xl`}>
								Plant: {data.plantIdentification.commonName}
							</Text>
						)}

						{!!data.localName.trim() && (
							<Text
								className={`${isDark ? "text-gray-300" : "text-gray-600"} text-xl`}>
								Local Name: {data.localName}
							</Text>
						)}
						{!!data.pestLocalName.trim() && (
							<Text
								className={`${isDark ? "text-gray-300" : "text-gray-600"} text-xl`}>
								Pest Local Name: {data.pestLocalName}
							</Text>
						)}
					</View>

					{/* Diagnosis */}
					{data.diagnosis && (
						<View
							className={`rounded-2xl   p-4 shadow-sm gap-2 ${
								isDark ? "bg-gray-800" : "bg-white"
							}`}>
							<Text
								className={`text-2xl font-semibold ${isDark ? "text-white" : "text-black"}`}>
								Diagnosis
							</Text>

							<View className="flex-swrow itesms-center relative gap-2">
								<Text className=" text-xl">{data.diagnosis.name}</Text>

								<Text className="text-xl capitalize">
									Severity: {data.diagnosis.severity}
								</Text>
								{data.diagnosis.confidence && (
									<Text className="text-xs text-gray-500">
										({data.diagnosis.confidence}% confidence)
									</Text>
								)}
							</View>

							{data.diagnosis.symptoms.map((s, i) => (
								<Text
									key={i}
									className={`${isDark ? "text-gray-300" : "text-gray-500"} text-xl`}>
									• {s}
								</Text>
							))}
						</View>
					)}

					{/* Treatment */}
					{data.treatment && (
						<View
							className={`rounded-2xl p-4 shadow-sm gap-2 ${
								isDark ? "bg-gray-800" : "bg-white"
							}`}>
							<Text
								className={`text-2xl font-semibold ${isDark ? "text-white" : "text-black"}`}>
								Treatment
							</Text>

							<Text className="font-medium text-xl">Organic</Text>
							{data.treatment.organic.map((t, i) => (
								<Text
									key={i}
									className={`text-xl ${isDark ? "text-gray-300" : "text-gray-500"} text-sm`}>
									• {t}
								</Text>
							))}

							{data.treatment.chemical?.length ? (
								<>
									<Text className="font-medium mt-2 text-xl">Chemical</Text>
									{data.treatment.chemical.map((t, i) => (
										<Text
											key={i}
											className={`text-xl ${isDark ? "text-gray-300" : "text-gray-500"} text-sm`}>
											• {t}
										</Text>
									))}
								</>
							) : null}

							{data.treatment?.diy && (
								<View
									className={`rounded-2xl p-4 shadow-sm gap-2 ${
										isDark ? "bg-gray-800" : "bg-white"
									}`}>
									<Text className="font-bold text-xl mb-2">DIY Treatments</Text>
									{data.treatment?.diy.map((diy, index) => (
										<Text key={index} className="text-xl">
											{diy}
										</Text>
									))}
								</View>
							)}

							{data.treatment.notes && (
								<Text className="text-lg text-gray-400 mt-1">
									{data.treatment.notes}
								</Text>
							)}
						</View>
					)}

					{/* Prevention */}
					{data.preventionTips && (
						<View
							className={`p-4 rounded-2xl border gap-2 ${
								isDark
									? "bg-green-900 border-green-700"
									: "bg-green-50 border-green-200"
							}`}>
							<Text
								className={`text-xl font-semibold ${isDark ? "text-green-200" : "text-[#2e7d32]"}`}>
								Prevention Tips
							</Text>

							{data.preventionTips.map((tip, i) => (
								<Text
									key={i}
									className={`${isDark ? "text-green-300" : "text-[#2e7d32]"} text-lg`}>
									• {tip}
								</Text>
							))}

							{!data.recoveryTimeline && (
								<Text className="text-xs text-[#2e7d32] mt-2">
									Expected recovery: {data.recoveryTimeline}
								</Text>
							)}
						</View>
					)}

					<Button
						onPress={handleMarkAsDone}
						isDisabled={markAsDone}
						className="bg-[#2e7d32]">
						<ButtonText>
							{markAsDone ? "Marking as done..." : "Mark as done"}
						</ButtonText>
					</Button>
				</>
			)}
		</ScrollView>
	);
}
