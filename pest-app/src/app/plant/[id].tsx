import React, { useState } from "react";
import { ScrollView, Image, Text, View, Pressable, Modal } from "react-native";
import { useLocalSearchParams, Redirect } from "expo-router";
import { usePestHistoryStore } from "@src/store/usePestHistoryStore";
import { PlantAnalysis } from "@src/types";
import { Icon } from "@src/components/ui/icon";
import { Box } from "@src/components/ui/box";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import { FlaskRound, Leaf } from "lucide-react-native";
import { HealthBadge } from "@src/components/health-badge";
import { Card } from "@src/components/ui/card";
import { HStack } from "@src/components/ui/hstack";

export default function Plant() {
	const [previewImg, setPreviewImg] = useState(false);
	const { id } = useLocalSearchParams<{ id: string }>();
	const insets = useSafeAreaInsets();
	const pest: PlantAnalysis | undefined = usePestHistoryStore
		.getState()
		.getItemById(id);

	if (!pest) return <Redirect href="/history" />;

	return (
		<>
			<ScrollView
				contentInsetAdjustmentBehavior="never"
				showsVerticalScrollIndicator={false}
				keyboardDismissMode="on-drag"
				nestedScrollEnabled
				contentContainerStyle={{
					paddingTop: insets.top - 10,
					paddingBottom: 100,
				}}
				className="flex-1 bg-gray-100 p-4">
				{/* Header */}
				<Box className="mb-4">
					<Pressable onPress={() => setPreviewImg(true)}>
						<Image
							source={{ uri: pest.img }}
							className="w-full h-96 rounded-3xl bg-gray-300"
						/>
						{pest.healthStatus && (
							<View className={`absolute bottom-5 right-6`}>
								<HealthBadge size="lg" status={pest.healthStatus} />
							</View>
						)}
					</Pressable>
				</Box>
				<Card className="  rounded-xl p-4 mb-4 shadow">
					<View className="flex-1  ">
						<Text className="text-sm text-gray-400">Common Name:</Text>
						<Text className="text-2xl font-bold">
							{pest.plantIdentification?.commonName || "Unknown Plant"}
						</Text>
						{pest.plantIdentification?.scientificName && (
							<>
								<Text className="text-sm text-gray-400">Scientific Name:</Text>
								<Text className="text-gray-500 italic">
									({pest.plantIdentification.scientificName})
								</Text>
							</>
						)}
					</View>
				</Card>

				{/* Diagnosis Card */}
				{pest.diagnosis && (
					<Card className="bg-white rounded-xl p-4 mb-4 shadow">
						<Text className="font-bold text-lg mb-2">Diagnosis</Text>
						<HStack>
							<Text>Name: </Text>
							<Text className="font-medium">{pest.diagnosis.name}</Text>
						</HStack>
						<Text>Severity: {pest.diagnosis.severity}</Text>
						{pest.diagnosis.symptoms.length > 0 && (
							<>
								<Text>Symptoms: </Text>
								{pest.diagnosis.symptoms.map((item, index) => (
									<Text key={item} className="pl-5 capitalize">
										- {item}
									</Text>
								))}
							</>
						)}
						{pest.diagnosis.confidence && (
							<Text>Confidence: {pest.diagnosis.confidence}%</Text>
						)}
					</Card>
				)}

				{/* Treatment Card */}
				{pest.treatment && (
					<View className="bg-white rounded-xl p-4 mb-4 shadow">
						<Text className="font-bold text-lg mb-2">Treatment</Text>

						{pest.treatment.organic.length > 0 && (
							<View className="flex-row items-center my-1">
								<Leaf />
								<Text className="ml-2">
									Organic: {pest.treatment.organic.join(", ")}
								</Text>
							</View>
						)}

						{pest.treatment.chemical && pest.treatment.chemical.length > 0 && (
							<View className="flex-row items-center my-1">
								<FlaskRound />
								<Text className="ml-2">
									Chemical: {pest.treatment.chemical.join(", ")}
								</Text>
							</View>
						)}

						{pest.treatment.notes && (
							<Text className="mt-1">Notes: {pest.treatment.notes}</Text>
						)}
					</View>
				)}

				{/* Prevention Tips */}
				{pest.preventionTips && pest.preventionTips.length > 0 && (
					<View className="bg-white rounded-xl p-4 mb-4 shadow">
						<Text className="font-bold text-lg mb-2">Prevention Tips</Text>
						{pest.preventionTips.map((tip, index) => (
							<Text key={index}>• {tip}</Text>
						))}
					</View>
				)}

				{/* Recovery Timeline */}
				{pest.recoveryTimeline && (
					<View className="bg-white rounded-xl p-4 mb-4 shadow">
						<Text className="font-bold text-lg mb-2">Recovery Timeline</Text>
						<Text>{pest.recoveryTimeline}</Text>
					</View>
				)}

				{/* Overall Confidence */}
				{pest.confidence && (
					<View className="bg-white rounded-xl p-4 mb-4 shadow">
						<Text className="font-bold text-lg mb-2">Overall Confidence</Text>
						<Text>{pest.confidence}%</Text>
					</View>
				)}
			</ScrollView>
			<Modal
				visible={previewImg}
				transparent
				animationType="fade"
				onDismiss={() => setPreviewImg(false)}
				onRequestClose={() => setPreviewImg(false)}>
				<View style={{ flex: 1, backgroundColor: "black" }}>
					<Pressable
						onPress={() => setPreviewImg(false)}
						style={{
							position: "absolute",
							top: 50,
							right: 20,
							zIndex: 10,
						}}>
						<Text style={{ color: "white", fontSize: 24 }}>✕</Text>
					</Pressable>
					<GestureHandlerRootView>
						<ImageZoom
							isDoubleTapEnabled
							isPinchEnabled
							uri={pest.img}
							minScale={1}
							maxScale={3}
							doubleTapScale={2}
							style={{ flex: 1 }}
							resizeMode="contain"
							isPanEnabled
						/>
					</GestureHandlerRootView>
				</View>
			</Modal>
		</>
	);
}
