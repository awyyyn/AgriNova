import { ScrollView, Text, View } from "react-native";
import AgriNova from "../../components/agri-nova";
import ScrollViewLayout from "../../layouts/scrollview-layout";
import { Card } from "@src/components/ui/card";

export default function HomeScreen() {
	return (
		<ScrollViewLayout>
			<Card className="shadow-sm">
				<Text className="text-xl text-[#41B249] font-medium">
					How it works?
				</Text>
				<Text className="text-[#41B249]  text-lg  leading-relaxed tracking-wide">
					Upload an image from the farm. Agrinova will analyze it and detect any
					pests, providing severity levels and treatment recommendations.
				</Text>
			</Card>
		</ScrollViewLayout>
	);
}
