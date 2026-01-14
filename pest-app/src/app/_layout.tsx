import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@src/hooks/use-color-scheme";

import { GluestackUIProvider } from "@src/components/ui/gluestack-ui-provider";
import "@src/global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Toaster } from "sonner-native";
import { useAuthStore } from "@src/store/useAuthStore";
import { useEffect } from "react";
import { Platform } from "react-native";
import LoadingOverlay from "@src/components/loading-overlay";
import { useLoadingStore } from "@src/store/useLoadingStore";

export const unstable_settings = {
	anchor: "(protected)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const loading = useLoadingStore((s) => s.loading);
	const { isAuthenticated, restoreSession, isLoading, user } = useAuthStore();
	const colorScheme = useColorScheme();

	useEffect(() => {
		restoreSession();
	}, []);

	console.log(user, "qqq");

	useEffect(() => {
		if (!isLoading) {
			SplashScreen.hideAsync();
		}
	}, [isLoading]);

	const stackOptions = {
		headerTintColor: "#FFFFFF",
		headerBackTitle: "Back",
		headerTitleStyle: {
			fontWeight: Platform.OS === "ios" ? "600" : "bold",
		},
		headerStyle: {
			backgroundColor: "#52CE19",
		},
	};

	return (
		<>
			<SafeAreaProvider>
				<GestureHandlerRootView>
					<GluestackUIProvider mode="light">
						<ThemeProvider
							value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
							<Stack>
								<Stack.Protected guard={!isAuthenticated}>
									<Stack.Screen
										name="(auth)"
										options={{ headerShown: false }}
									/>
								</Stack.Protected>

								<Stack.Protected guard={isAuthenticated}>
									<Stack.Screen
										name="analyze"
										options={{
											animation: "slide_from_bottom",
											presentation: "pageSheet",
											// sheetAllowedDetents: [0.2, 0.5],

											headerTintColor: "#FFFFFF",
											headerBackTitle: "Back",
											headerBackButtonDisplayMode: "minimal",
											headerTitleStyle: {
												fontWeight: Platform.OS === "ios" ? "600" : "bold",
											},
											headerStyle: {
												backgroundColor: "#52CE19",
											},
											sheetGrabberVisible: true,
											sheetCornerRadius: 16,
											sheetElevation: 5,
										}}
									/>
									<Stack.Screen
										name="(tabs)"
										options={{ headerShown: false }}
									/>
									<Stack.Screen
										name="modal"
										options={{
											animation: "slide_from_bottom",
											presentation: "containedModal",
											sheetAllowedDetents: [0, 1],
											headerShown: false,
										}}
									/>
									<Stack.Screen
										name="profile"
										options={{
											headerTintColor: "#FFFFFF",
											headerBackTitle: "Back",
											headerTitleStyle: {
												fontWeight: Platform.OS === "ios" ? "600" : "bold",
											},
											headerStyle: {
												backgroundColor: "#52CE19",
											},
											headerTitle: "Profile",
										}}
									/>
									<Stack.Screen
										name="change-password"
										options={{
											headerTintColor: "#FFFFFF",
											headerBackTitle: "Back",
											headerBackButtonDisplayMode: "minimal",
											headerTitleStyle: {
												fontWeight: Platform.OS === "ios" ? "600" : "bold",
											},
											headerStyle: {
												backgroundColor: "#52CE19",
											},
											headerTitle: "Change Password",
										}}
									/>
								</Stack.Protected>
							</Stack>
							<StatusBar style="auto" />
						</ThemeProvider>
					</GluestackUIProvider>
					<Toaster />
				</GestureHandlerRootView>
			</SafeAreaProvider>

			<LoadingOverlay visible={loading} message="Uploading..." />
		</>
	);
}
