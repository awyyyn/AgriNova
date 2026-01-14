import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LazyImage } from "@src/components/lazy-image";

export default function Analyze() {
	const { id } = useLocalSearchParams();
	const router = useRouter();

	if (!id) return router.dismiss();

	const url = `https://fra.cloud.appwrite.io/v1/storage/buckets/plant-images/files/${id}/view?project=${process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID}`;

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

			<TouchableOpacity
				onPress={() => alert("Work in progress!")}
				className="bg-[#44DF3E] p-3 mx-auto min-w-[80vw] rounded-lg">
				<Text className=" text-center text-lg">Analyze</Text>
			</TouchableOpacity>
		</View>
	);
}
