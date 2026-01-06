import {
	Text,
	Image,
	Button,
	View,
	Pressable,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Auth() {
	return (
		<SafeAreaView className="  flex-1  justify-center items-center p-4 ">
			<View>
				<Image
					source={require("../../assets/images/Union.png")}
					className="mx-auto"
				/>
				<Text className="text-lg text-center max-w-xs">
					From detection to actions - your smart farming partner.
				</Text>
				<TouchableOpacity
					activeOpacity={0.6}
					style={{
						backgroundColor: "#52CE19",
						padding: 10,
						alignItems: "center",
						marginTop: 22,
						borderRadius: 100,
						maxWidth: 200,
					}}
					className="rounded-full text-center mx-auto">
					<Text className="text-white text-xl px-4 ">Get Started</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
