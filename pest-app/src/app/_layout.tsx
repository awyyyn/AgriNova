import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@src/hooks/use-color-scheme";

import { GluestackUIProvider } from "@src/components/ui/gluestack-ui-provider";
import "@src/global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Toaster } from "sonner-native";

export const unstable_settings = {
	anchor: "(tabs)",
};

export default function RootLayout() {
	const colorScheme = useColorScheme();

	return (
		<SafeAreaProvider>
			<GestureHandlerRootView>
				<GluestackUIProvider mode="light">
					<ThemeProvider
						value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
						<Stack>
							<Stack.Screen name="(auth)" options={{ headerShown: false }} />
							<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
							<Stack.Screen
								name="modal"
								options={{ presentation: "modal", title: "Modal" }}
							/>
							<Stack.Protected guard={false}>
								<Stack.Screen
									name="onboarding"
									options={{ headerShown: false }}
								/>
							</Stack.Protected>
						</Stack>
						<StatusBar style="auto" />
					</ThemeProvider>
				</GluestackUIProvider>
				<Toaster />
			</GestureHandlerRootView>
		</SafeAreaProvider>
	);
}
