import { ScrollView, Text, View } from "react-native";
import AgriNova from "../(auth)/__components/agri-nova";

export default function HomeScreen() {
	return (
		<ScrollView
			bounces={false}
			alwaysBounceVertical={false}
			contentContainerStyle={{ flexGrow: 1 }}
			stickyHeaderIndices={[0]}
			showsVerticalScrollIndicator={false}>
			<View className="bg-[#52CE19] w-full h-[18vh] rounded-b-3xl justify-center">
				<AgriNova centerElements color="light" />
			</View>
		</ScrollView>
	);
}
