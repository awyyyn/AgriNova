import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LazyImage } from "@src/components/lazy-image";
import { Center } from "@src/components/ui/center";

export default function Analyze() {
	const { id } = useLocalSearchParams();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [analyzed, setAnalyzed] = useState(false);
	const [error, setError] = useState("");

	if (!id) return router.dismiss();

	const url = `https://fra.cloud.appwrite.io/v1/storage/buckets/plant-images/files/${id}/view?project=${process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID}`;

	async function handleAnalyze() {
		try {
			setError("");
			setLoading(true);

			await new Promise((resolve) => setTimeout(resolve, 5000));
			// setAnalyzed(true);
		} catch (error) {
			// Handle Error here
			setError((error as Error).message || "Something went wrong!");
		} finally {
			setLoading(false);
		}
	}

	return (
		<View className="flex-1 p-[4vw] gap-y-5">
			<LazyImage
				height={400}
				contentFit="contain"
				uri={
					url ||
					"https://fra.cloud.appwrite.io/v1/storage/buckets/plant-images/files/6966e216895558f2d1d1/view?project=6966450d0024a30601ae&mode=admin"
				}
			/>
			{(!analyzed || !loading) && (
				<TouchableOpacity
					disabled={loading}
					onPress={handleAnalyze}
					className=" disabled:bg-[#44DF3E80] bg-[#44DF3E] p-3 mx-auto min-w-[80vw] rounded-lg">
					<Text className=" text-center text-lg text-white">Analyze</Text>
				</TouchableOpacity>
			)}

			{loading && (
				<Center className="mt-20">
					<ActivityIndicator />
					<Text>analyzing your image...</Text>
				</Center>
			)}
		</View>
	);
}
