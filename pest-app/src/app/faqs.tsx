import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	LayoutAnimation,
	Platform,
	UIManager,
} from "react-native";
import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react-native";

// Enable animation on Android
if (
	Platform.OS === "android" &&
	UIManager.setLayoutAnimationEnabledExperimental
) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

type FAQItem = {
	question: string;
	answer: string;
};

const FAQS: FAQItem[] = [
	{
		question: "What is AgriNova?",
		answer:
			"AgriNova is a smart farming app that helps farmers analyze plant health using images. It detects pests, diseases, and provides actionable insights to protect crops.",
	},
	{
		question: "How does plant analysis work?",
		answer:
			"You simply take or upload a photo of your plant. AgriNova analyzes the image using AI to check if the plant is healthy or affected by pests or diseases.",
	},
	{
		question: "What types of plants can I scan?",
		answer:
			"You can scan most crops, fruits, vegetables, and common plants. For best results, make sure the plant and affected areas are clearly visible.",
	},
	{
		question: "What does the confidence score mean?",
		answer:
			"The confidence score shows how certain the AI is about the diagnosis. A higher percentage means higher confidence in the result.",
	},
	{
		question: "Is AgriNova always accurate?",
		answer:
			"AgriNova provides AI-based analysis to assist farmers. While it is highly useful, results should be used as guidance and verified when needed with agricultural experts.",
	},
	{
		question: "Why does the app say no plant detected?",
		answer:
			"This usually happens if the image is blurry, too dark, or does not clearly show a plant. Try taking a clearer photo in good lighting.",
	},
	{
		question: "Can I view my past analyses?",
		answer:
			"Yes. AgriNova keeps a history of your previous plant analyses, even offline, so you can review them anytime.",
	},
	{
		question: "Does AgriNova work offline?",
		answer:
			"You need an internet connection to analyze new images, but previously analyzed results are available offline.",
	},
];

export default function FAQsPage() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	function toggle(index: number) {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		setOpenIndex(openIndex === index ? null : index);
	}

	return (
		<ScrollView className="flex-1 bg-white px-[5vw] py-6">
			{/* Header */}
			<View className="mb-6">
				{/* <Text className="text-3xl font-bold text-green-700 mb-2">FAQs</Text> */}
				<Text className="text-base text-gray-600">
					Frequently Asked Questions about AgriNova
				</Text>
			</View>

			{/* FAQ List */}
			<View className="gap-3">
				{FAQS.map((item, index) => {
					const isOpen = openIndex === index;

					return (
						<View
							key={index}
							className="border border-gray-200 rounded-xl overflow-hidden">
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => toggle(index)}
								className="flex-row items-center justify-between p-4 bg-gray-50">
								<View className="flex-row items-center gap-3 flex-1">
									<HelpCircle size={20} color="#15803d" />
									<Text className="text-base font-medium text-gray-800 flex-1">
										{item.question}
									</Text>
								</View>

								{isOpen ? (
									<ChevronUp size={20} color="#15803d" />
								) : (
									<ChevronDown size={20} color="#15803d" />
								)}
							</TouchableOpacity>

							{isOpen && (
								<View className="p-4 bg-white border-t border-gray-200">
									<Text className="text-gray-700 leading-6">{item.answer}</Text>
								</View>
							)}
						</View>
					);
				})}
			</View>

			{/* Footer */}
			<Text className="text-center text-xs text-gray-400 mt-10">
				Still have questions? AgriNova is here to help 🌱
			</Text>
		</ScrollView>
	);
}
