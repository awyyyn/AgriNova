import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

interface AgriNovaProps {
	showButton?: boolean;
	centerElements?: boolean;
	color?: "light";
	description?: string;
}

export default function AgriNova({
	showButton = false,
	centerElements = false,
	color = undefined,
	description,
}: AgriNovaProps) {
	const router = useRouter();

	return (
		<View>
			<Image
				source={
					color === "light"
						? require("../../../assets/images/light-brand.png")
						: require("../../../assets/images/Union.png")
				}
				className={centerElements ? "mx-auto" : ""}
			/>
			<View className={`${centerElements ? " items-center" : " "} `}>
				<Text
					className={`text-lg max-w-xs ${color === "light" ? "text-white" : "text-black"} ${centerElements ? "text-center " : ""}`}>
					{description ||
						"From detection to actions - your smart farming partner."}
				</Text>
			</View>
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
