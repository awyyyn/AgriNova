import React, { useState } from "react";
import { ScrollView, Image, Text, View, Pressable, Modal } from "react-native";
import { useLocalSearchParams, Redirect, useRouter } from "expo-router";
import { usePestHistoryStore } from "@src/store/usePestHistoryStore";
import { PlantAnalysis } from "@src/types";
import { Box } from "@src/components/ui/box";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import { FlaskRound, Info, Leaf } from "lucide-react-native";
import { HealthBadge } from "@src/components/health-badge";
import { Card } from "@src/components/ui/card";
import { HStack } from "@src/components/ui/hstack";
import { Badge, BadgeText } from "@src/components/ui/badge";
import { VStack } from "@src/components/ui/vstack";
import { Button, ButtonText } from "@src/components/ui/button";
import { MarkPlantAnalyzationAsDone } from "@src/utils";
import { useAuthStore } from "@src/store/useAuthStore";
import { toast } from "sonner-native";

export default function Plant() {
	const [previewImg, setPreviewImg] = useState(false);
	const { token } = useAuthStore();
	const [markAsDone, setMarkAsDone] = useState(false);
	const { id } = useLocalSearchParams<{ id: string }>();
	const insets = useSafeAreaInsets();
	const router = useRouter();
	const pest: PlantAnalysis | undefined = usePestHistoryStore
		.getState()
		.getItemById(id);
	const { setItems, items } = usePestHistoryStore();

	if (!pest) return <Redirect href="/history" />;

	const handleMarkAsDone = async () => {
		try {
			if (!id) return;
			setMarkAsDone(true);
			await MarkPlantAnalyzationAsDone(token, id);
			// router.push
			const updatedItems = items.map((item) => {
				if (item.id === pest.id) {
					return { ...pest, isDone: true };
				}
				return item;
			});
			setItems(updatedItems);
			router.dismiss();
			toast.success("Done", {
				description: "Analyzed marked as done!",
			});
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
						<View className="mb-2">
							<HStack className="items-center gap-2">
								<Text className="text-md text-gray-400">Type:</Text>
								<Badge className="">
									<BadgeText className="font-medium text-lg">
										{pest.type}
									</BadgeText>
								</Badge>
							</HStack>
							<HStack className="items-center gap-2 mt-1">
								<Text className="text-md text-gray-400">Confidence:</Text>
								<Badge
									className={`${pest.confidence < 50 ? "bg-red-500" : pest.confidence < 75 ? "bg-orange-500" : "bg-green-500"}`}>
									<BadgeText className="font-medium text-white text-lg">
										{pest.confidence}%
									</BadgeText>
								</Badge>
							</HStack>
							{pest.type !== "unknown" && (
								<HStack className="items-center gap-2">
									<Text className="text-md text-gray-400">Pest Found:</Text>
									<Text className="text-lg">
										{pest.hasPestFound ? "Yes" : "None"}
									</Text>
								</HStack>
							)}
						</View>
						{pest.plantIdentification?.commonName ? (
							<>
								<Text className="text-md text-gray-400">Common Name:</Text>
								<Text className="text-2xl font-bold">
									{pest.plantIdentification?.commonName || "Unknown Plant"}
								</Text>
								<Text className="text-md text-gray-400">Local Name:</Text>
								<Text className="text-xl font-bold">
									{pest.localName || "N/A"}
								</Text>
								<Text className="text-md text-gray-400">Pest Local Name:</Text>
								<Text className="text-xl font-bold">
									{pest.pestLocalName || "N/A"}
								</Text>
							</>
						) : (
							<>
								{/* Status badge */}
								<View className="self-start bg-amber-100 px-3 py-1 rounded-full mb-3">
									<Text className="text-amber-700 text-md font-medium">
										Analysis Inconclusive
									</Text>
								</View>

								{/* Title */}
								<Text className="text-2xl font-semibold mb-2">
									No plant detected in this image
								</Text>

								{/* Explanation */}
								<Text className="text-gray-600 mb-4 text-xl">
									During analysis, the system could not detect a plant, fruit,
									or vegetable in this image. As a result, pest detection and
									treatment recommendations were not generated.
								</Text>

								{/* Reasons */}
								<View className="bg-gray-50 rounded-2xl p-4 mb-4">
									<Text className="font-semibold mb-2 text-lg">
										Possible reasons:
									</Text>
									<Text className="text-gray-600 text-xl">
										• Plant is too small or unclear
									</Text>
									<Text className="text-gray-600 text-xl">
										• Image contains non-plant objects
									</Text>
									<Text className="text-gray-600 text-xl">
										• Poor lighting or angle
									</Text>
								</View>

								{/* Info note */}
								<View className="flex-row gap-3 bg-blue-50 rounded-2xl p-4 mb-6">
									<Info size={20} color="#2563eb" />
									<Text className="text-blue-700 flex-1 text-lg">
										This analysis was saved for history purposes, but no
										insights are available for this image.
									</Text>
								</View>
							</>
						)}
						{pest.plantIdentification?.scientificName && (
							<>
								<Text className="text-md text-gray-400">Scientific Name:</Text>
								<Text className="text-gray-500 italic text-lg">
									({pest.plantIdentification.scientificName})
								</Text>
							</>
						)}
					</View>
				</Card>

				{/* Diagnosis Card */}
				{pest.diagnosis && (
					<Card className="bg-white rounded-xl p-4 mb-4 shadow">
						<Text className="font-bold text-2xl mb-2">Diagnosis</Text>
						<HStack>
							<Text className="text-lg">Name: </Text>
							<Text className="font-medium text-xl">{pest.diagnosis.name}</Text>
						</HStack>
						<HStack>
							<Text className="text-lg">Severity: </Text>
							<Text className="text-xl capitalize">
								{pest.diagnosis.severity}
							</Text>
						</HStack>
						{pest.diagnosis.symptoms.length > 0 && (
							<>
								<Text className="text-lg">Symptoms: </Text>
								{pest.diagnosis.symptoms.map((item, index) => (
									<Text key={item} className="pl-5 text-xl capitalize">
										- {item}
									</Text>
								))}
							</>
						)}
						{pest.diagnosis.confidence && (
							<HStack>
								<Text className="text-lg">Confidence:</Text>
								<Text className="text-xl">{pest.diagnosis.confidence}%</Text>
							</HStack>
						)}
					</Card>
				)}

				{/* Treatment Card */}
				{pest.treatment && (
					<View className="bg-white rounded-xl p-4 mb-4 shadow">
						<Text className="font-bold text-2xl mb-2  ">Treatment</Text>

						{pest.treatment.organic.length > 0 && (
							<View className="flex-row items-start my-1">
								<Leaf />
								<VStack>
									<Text className="ml-2 text-xl">Organic:</Text>
									{pest.treatment.organic.map((org) => (
										<Text className="text-xl" key={org}>
											- {org}
										</Text>
									))}
								</VStack>
							</View>
						)}

						{pest.treatment.chemical && pest.treatment.chemical.length > 0 && (
							<View className="flex-row items-start my-1">
								<FlaskRound />

								<VStack>
									<Text className="ml-2 text-xl">Chemical:</Text>
									{pest.treatment.chemical.map((chem) => (
										<Text key={chem} className="text-xl">
											- {chem}
										</Text>
									))}
								</VStack>
							</View>
						)}

						{pest.treatment?.diy && (
							<View className="mt-2">
								<Text className="font-bold text-xl mb-2">DIY Treatments</Text>
								{pest.treatment?.diy.map((diy, index) => (
									<Text key={index} className="pl-4 text-xl">
										- {diy}
									</Text>
								))}
							</View>
						)}

						{pest.treatment.notes && (
							<Text className="mt-1 text-lg">
								Notes: {pest.treatment.notes}
							</Text>
						)}
					</View>
				)}

				{/* Prevention Tips */}
				{pest.preventionTips && pest.preventionTips.length > 0 && (
					<View className="bg-white rounded-xl p-4 mb-4 shadow">
						<Text className="font-bold text-2xl mb-2 ">Prevention Tips</Text>
						{pest.preventionTips.map((tip, index) => (
							<Text key={index} className="text-xl">
								• {tip}
							</Text>
						))}
					</View>
				)}

				{/* Recovery Timeline */}
				{pest.recoveryTimeline && (
					<View className="bg-white rounded-xl p-4 mb-4 shadow">
						<Text className="font-bold text-2xl mb-2 ">Recovery Timeline</Text>
						<Text className="text-xl">{pest.recoveryTimeline}</Text>
					</View>
				)}

				{!pest.isDone && (
					<Button
						onPress={handleMarkAsDone}
						isDisabled={markAsDone}
						className="bg-[#2e7d32]">
						<ButtonText>
							{markAsDone ? "Marking as done..." : "Mark as done"}
						</ButtonText>
					</Button>
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
