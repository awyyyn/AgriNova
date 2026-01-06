import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AgriNova from "./__components/agri-nova";

export default function SignIn() {
	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 16 }}>
			<View style={{ flex: 1, paddingInline: "5%" }}>
				<AgriNova />


				<View>
					
				</View>
			</View>
		</ScrollView>
	);
}
