import { View, Text, ScrollView } from "react-native";
import { Leaf, Camera, ShieldCheck } from "lucide-react-native";

export default function AboutPage() {
	return (
		<ScrollView className="flex-1 bg-white px-[5vw] py-6">
			{/* App Name */}
			<Text className="text-3xl font-bold text-green-700 mb-2">AgriNova</Text>

			<Text className="text-xl text-gray-600 mb-6">
				Your smart farming partner 🌱
			</Text>

			{/* Description */}
			<Text className="text-xl text-justify text-gray-700 leading-6 mb-6">
				AgriNova is a smart farming application designed to help farmers monitor
				plant health easily and efficiently. By simply taking or uploading a
				photo of your plant, AgriNova analyzes the image to determine whether
				the plant is healthy or affected by pests or diseases.
			</Text>

			<Text className="text-xl text-justify text-gray-700 leading-6 mb-8">
				Our goal is to empower farmers with fast, reliable insights so they can
				take action early, reduce crop loss, and improve overall yield.
			</Text>

			{/* Features */}
			<Text className="text-2xl font-semibold mb-4">What AgriNova Can Do</Text>

			<View className="gap-4">
				<View className="flex-row gap-3">
					<Camera size={28} color="#15803d" />
					<Text className="flex-1 text-xl text-gray-700 leading-6">
						Scan or upload plant images for instant analysis
					</Text>
				</View>

				<View className="flex-row gap-3">
					<ShieldCheck size={28} color="#15803d" />
					<Text className="flex-1 text-xl text-gray-700 leading-6">
						Detect pests, diseases, and overall plant health
					</Text>
				</View>

				<View className="flex-row gap-3">
					<Leaf size={28} color="#15803d" />
					<Text className="flex-1 text-xl text-gray-700 leading-6">
						Get actionable insights to protect and improve your crops
					</Text>
				</View>
			</View>

			{/* Footer */}
			<Text className="text-center text-lg text-gray-400 mt-12">
				© {new Date().getFullYear()} AgriNova. All rights reserved.
			</Text>
		</ScrollView>
	);
}
