import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

interface AgriNovaProps {
	showButton?: boolean;
	centerElements?: boolean;
}

export default function AgriNova({
	showButton = false,
	centerElements = false,
}: AgriNovaProps) {
	const router = useRouter();

	return (
		<View>
			<Image
				source={require("../../../assets/images/Union.png")}
				className={centerElements ? "mx-auto" : ""}
			/>
			<Text
				className={`text-lg max-w-xs ${centerElements ? "text-center " : ""}`}>
				From detection to actions - your smart farming partner.
			</Text>
			{showButton && (
				<TouchableOpacity
					onPress={() => router.replace("/(auth)/sign-in")}
					activeOpacity={0.6}
					style={{
						backgroundColor: "#52CE19",
						padding: 10,
						alignItems: !centerElements ? "baseline" : "center",
						marginTop: 22,
						borderRadius: 100,
						maxWidth: centerElements ? 200 : 150,
						width: centerElements ? 200 : "100%",
					}}
					className={`rounded-full text-center ${centerElements ? "mx-auto" : ""}`}>
					<Text className="text-white text-xl px-4 ">Get Started</Text>
				</TouchableOpacity>
			)}
		</View>
	);
}
