// import React from "react";
// import { ImageBackground } from "expo-image";
// import { Stack } from "expo-router";

import { ImageBackground } from "expo-image";
import { Slot } from "expo-router";
import { View } from "react-native";

// export default function AuthLayout() {
// 	return (
// 		<Stack>
// 			<ImageBackground
// 				source={require("../../assets/images/bg.png")}
// 				contentFit="cover"
// 				contentPosition="center">
// 				<Stack.Screen name="index" options={{ headerShown: false }} />
// 				<Stack.Screen name="sign-in" options={{ headerShown: false }} />
// 			</ImageBackground>
// 		</Stack>
// 	);
// }

export default function AuthLayout() {
	return (
		<ImageBackground
			source={require("../../assets/images/bg.png")}
			contentFit="cover"
			contentPosition="center"
			imageStyle={{ opacity: 0.8 }}
			style={{ flex: 1 }}>
			<Slot />
		</ImageBackground>
	);
}
