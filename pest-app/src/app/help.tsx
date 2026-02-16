import { View, Text, ScrollView } from "react-native";
import { HelpCircle, Camera, Upload, RefreshCw } from "lucide-react-native";

export default function HelpPage() {
	return (
		<ScrollView className="flex-1 bg-white px-[5vw] py-6">
			{/* Header */}
			<Text className="text-3xl font-bold text-green-700 mb-2">
				Help & Support
			</Text>

			<Text className="text-lg text-gray-600 mb-6">
				Learn how to use AgriNova effectively
			</Text>

			{/* How to Use */}
			<Text className="text-2xl font-semibold mb-4">
				How to Analyze a Plant
			</Text>

			<View className="gap-4 mb-8">
				<View className="flex-row gap-3">
					<Camera size={28} color="#15803d" />
					<Text className="flex-1 text-xl text-gray-700 leading-6">
						Open the Scan page and take a clear photo of the plant. Make sure
						the affected area is visible.
					</Text>
				</View>

				<View className="flex-row gap-3">
					<Upload size={28} color="#15803d" />
					<Text className="flex-1 text-xl text-gray-700 leading-6">
						Alternatively, upload an existing image from your gallery.
					</Text>
				</View>

				<View className="flex-row gap-3">
					<RefreshCw size={28} color="#15803d" />
					<Text className="flex-1 text-xl text-gray-700 leading-6">
						Wait for the analysis result showing plant health, pest detection,
						severity, and confidence level.
					</Text>
				</View>
			</View>

			{/* Tips */}
			<Text className="text-2xl font-semibold mb-4">
				Tips for Better Results
			</Text>

			<View className="gap-3 mb-8">
				<Text className="text-xl text-gray-700 leading-6">
					• Take photos in good lighting
				</Text>
				<Text className="text-xl text-gray-700 leading-6">
					• Avoid blurry or distant images
				</Text>
				<Text className="text-xl text-gray-700 leading-6">
					• Focus on leaves, fruits, or affected areas
				</Text>
			</View>

			{/* Troubleshooting */}
			<Text className="text-2xl font-semibold mb-4">Common Issues</Text>

			<View className="gap-3 mb-10">
				<View className="flex-row gap-3">
					<HelpCircle size={28} color="#15803d" />
					<Text className="text-xl flex-1 text-gray-700 leading-6">
						If no plant is detected, ensure the image clearly shows a plant,
						fruit, or vegetable.
					</Text>
				</View>

				<View className="flex-row gap-3">
					<HelpCircle size={28} color="#15803d" />
					<Text className="text-xl lex-1 text-gray-700 leading-6">
						If results seem inaccurate, try retaking the photo from a closer
						angle.
					</Text>
				</View>
			</View>

			{/* Footer */}
			<Text className="text-center text-lg text-gray-400">
				Need more help? Contact your local agricultural expert 🌾
			</Text>
		</ScrollView>
	);
}
