// app/plant/[id].tsx
import React, { useEffect, useRef } from "react";
import {
	ScrollView,
	Image,
	TouchableOpacity,
	Animated,
	Dimensions,
	PanResponder,
	Text,
	View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { usePestHistoryStore } from "@src/store/usePestHistoryStore";
import { Leaf, X } from "lucide-react-native";
import { PlantAnalysis } from "@src/types";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Plant() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();
	const pest: PlantAnalysis | undefined = usePestHistoryStore
		.getState()
		.getItemById(id);

	const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

	useEffect(() => {
		// Slide up animation on mount
		Animated.timing(slideAnim, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start();
	}, []);

	const handleClose = () => {
		Animated.timing(slideAnim, {
			toValue: SCREEN_HEIGHT,
			duration: 250,
			useNativeDriver: true,
		}).start(() => router.back());
	};

	// PanResponder for swipe-down
	const pan = useRef(new Animated.ValueXY()).current;
	const panResponder = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: (_, gesture) => {
				return Math.abs(gesture.dy) > 5;
			},
			onPanResponderMove: (_, gesture) => {
				if (gesture.dy > 0) {
					pan.setValue({ x: 0, y: gesture.dy });
				}
			},
			onPanResponderRelease: (_, gesture) => {
				if (gesture.dy > 120) {
					handleClose(); // close if swiped enough
				} else {
					Animated.spring(pan, {
						toValue: { x: 0, y: 0 },
						useNativeDriver: true,
					}).start();
				}
			},
		}),
	).current;

	if (!pest) {
		router.replace("/history");
		return null;
	}

	const getSeverityColor = (severity: string) => {
		switch (severity) {
			case "mild":
				return "bg-yellow-300";
			case "moderate":
				return "bg-orange-400";
			case "severe":
				return "bg-red-500";
			default:
				return "bg-gray-400";
		}
	};

	return (
		<Animated.View
			style={{
				flex: 1,
				transform: [{ translateY: Animated.add(slideAnim, pan.y) }],
			}}
			className="absolute inset-0 bg-gray-100"
			{...panResponder.panHandlers}>
			{/* Close Button */}
			<TouchableOpacity
				onPress={handleClose}
				className="absolute top-12 right-4 z-50 bg-white p-2 rounded-full shadow">
				<X size={24} color="#000" />
			</TouchableOpacity>

			<ScrollView className="flex-1 p-4 mt-16">
				{/* Header */}
				<View className="flex-row items-center mb-4">
					<Image
						source={{ uri: pest.img }}
						className="w-32 h-32 rounded-xl bg-gray-300"
					/>
					<View className="flex-1 ml-3">
						<Text className="text-2xl font-bold">
							{pest.plantIdentification?.commonName || "Unknown Plant"}
						</Text>
						{pest.plantIdentification?.scientificName && (
							<Text className="text-gray-500 italic">
								({pest.plantIdentification.scientificName})
							</Text>
						)}
						{pest.healthStatus && (
							<View
								className={`mt-2 px-2 py-1 rounded-lg ${
									pest.healthStatus === "healthy"
										? "bg-green-500"
										: "bg-red-500"
								}`}>
								<Text className="text-white font-bold capitalize">
									{pest.healthStatus}
								</Text>
							</View>
						)}
					</View>
				</View>

				{/* Diagnosis Card */}
				{pest.diagnosis && (
					<View className="bg-white rounded-xl p-4 mb-4 shadow">
						<Text className="font-bold text-lg mb-2">Diagnosis</Text>
						<Text>Name: {pest.diagnosis.name}</Text>
						<Text
							className={`${getSeverityColor(
								pest.diagnosis.severity,
							)} px-2 py-1 rounded mt-1`}>
							Severity: {pest.diagnosis.severity}
						</Text>
						{pest.diagnosis.symptoms.length > 0 && (
							<Text>Symptoms: {pest.diagnosis.symptoms.join(", ")}</Text>
						)}
						{pest.diagnosis.confidence !== undefined && (
							<Text>Confidence: {pest.diagnosis.confidence}%</Text>
						)}
					</View>
				)}

				{/* Treatment Card */}
				{pest.treatment && (
					<View className="bg-white rounded-xl p-4 mb-4 shadow">
						<Text className="font-bold text-lg mb-2">Treatment</Text>

						{pest.treatment.organic.length > 0 && (
							<View className="flex-row items-center my-1">
								<Leaf size={16} color="#4caf50" />
								<Text className="ml-2">
									Organic: {pest.treatment.organic.join(", ")}
								</Text>
							</View>
						)}

						{pest.treatment.chemical && pest.treatment.chemical.length > 0 && (
							<View className="flex-row items-center my-1">
								{/* <Flask size={16} color="#ff9800" /> */}
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
				{pest.confidence !== undefined && (
					<View className="bg-white rounded-xl p-4 mb-4 shadow">
						<Text className="font-bold text-lg mb-2">Overall Confidence</Text>
						<Text>{pest.confidence}%</Text>
					</View>
				)}
			</ScrollView>
		</Animated.View>
	);
}
