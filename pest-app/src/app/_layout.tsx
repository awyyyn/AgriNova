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
import { Toaster, toast } from "sonner-native";
import { useAuthStore } from "@src/store/useAuthStore";
import { useEffect, useRef } from "react";
import { Platform } from "react-native";
import LoadingOverlay from "@src/components/loading-overlay";
import { useLoadingStore } from "@src/store/useLoadingStore";
import NetInfo from "@react-native-community/netinfo";

export const unstable_settings = {
	anchor: "(protected)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const loading = useLoadingStore((s) => s.loading);
	const { isAuthenticated, restoreSession, isLoading } = useAuthStore();
	const colorScheme = useColorScheme();
	const hasShownInitialToast = useRef(false);

	useEffect(() => {
		restoreSession();
	}, []);

	useEffect(() => {
		if (!isLoading) {
			SplashScreen.hideAsync();
		}
	}, [isLoading]);

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			const isConnected = state.isConnected && state.isInternetReachable;

			// Show only once on app open
			if (!hasShownInitialToast.current) {
				if (isConnected) {
					toast.success("You’re online", {
						richColors: true,
						duration: 3000,
						position: "bottom-center",
					});
				} else {
					toast.error("No internet connection", {
						richColors: true,
						dismissible: true,
						duration: 10000,
						position: "bottom-center",
					});
				}

				hasShownInitialToast.current = true;
			}
		});

		return () => unsubscribe();
	}, []);

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
										name="(tabs)"
										options={{ headerShown: false }}
									/>
									<Stack.Screen
										name="analyze"
										options={{
											animation: "slide_from_bottom",
											presentation: "pageSheet",
											// sheetAllowedDetents: [0.2, 0.5],
											headerTitle: "Analyze Image",
											headerTintColor: "#FFFFFF",
											headerBackTitle: "Back",
											headerBackButtonDisplayMode: "minimal",
											headerTitleStyle: {
												fontWeight: "600",
											},
											headerStyle: {
												backgroundColor: "#2e7d32",
											},
											sheetGrabberVisible: true,
											sheetCornerRadius: 16,
											sheetElevation: 5,
										}}
									/>
									<Stack.Screen
										name="modal"
										options={{
											animation: "slide_from_bottom",
											presentation: "containedModal",
											headerShown: false,
										}}
									/>
									<Stack.Screen
										name="plant/[id]"
										options={{
											presentation: "formSheet",
											headerShown: false,
											sheetAllowedDetents: [0.8, 0.8, 0.9555],
											sheetInitialDetentIndex: 1,
											contentStyle: {
												backgroundColor: "#ffffff60",
											},
											sheetCornerRadius: 30,
										}}
									/>
									<Stack.Screen
										name="about"
										options={{
											presentation: "formSheet",
											headerShown: false,
											sheetAllowedDetents: [0.6, 0.6, 0.7],
											sheetInitialDetentIndex: 0,
											contentStyle: {
												backgroundColor: "#ffffff60",
											},
											sheetCornerRadius: 30,
										}}
									/>
									<Stack.Screen
										name="help"
										options={{
											presentation: "formSheet",
											headerShown: false,
											sheetAllowedDetents: [0.8, 0.8, 0.81],
											sheetInitialDetentIndex: 0,
											contentStyle: {
												backgroundColor: "#ffffff60",
											},
											sheetCornerRadius: 30,
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
												backgroundColor: "#2e7d32",
											},
											headerTitle: "Profile",
										}}
									/>
									<Stack.Screen
										name="faqs"
										options={{
											headerTintColor: "#FFFFFF",
											headerBackTitle: "Back",
											headerTitleStyle: {
												fontWeight: Platform.OS === "ios" ? "600" : "bold",
											},
											headerStyle: {
												backgroundColor: "#2e7d32",
											},
											headerTitle: "FAQ's",
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
												backgroundColor: "#2e7d32",
											},
											headerTitle: "Change Password",
										}}
									/>
									<Stack.Screen
										name="history"
										options={{
											headerTintColor: "#FFFFFF",
											headerBackTitle: "Back",
											headerBackButtonDisplayMode: "minimal",
											headerTitleStyle: {
												fontWeight: Platform.OS === "ios" ? "600" : "bold",
											},
											headerStyle: {
												backgroundColor: "#2e7d32",
											},
											headerTitle: "Analysis History",
										}}
									/>
									<Stack.Screen
										name="pests"
										options={{
											headerTintColor: "#FFFFFF",
											headerBackTitle: "Back",
											headerBackButtonDisplayMode: "minimal",
											headerTitleStyle: {
												fontWeight: Platform.OS === "ios" ? "600" : "bold",
											},
											headerStyle: {
												backgroundColor: "#2e7d32",
											},
											headerTitle: "Pests Found",
										}}
									/>
									<Stack.Screen
										name="success-rate"
										options={{
											headerTintColor: "#FFFFFF",
											headerBackTitle: "Back",
											headerBackButtonDisplayMode: "minimal",
											headerTitleStyle: {
												fontWeight: Platform.OS === "ios" ? "600" : "bold",
											},
											headerStyle: {
												backgroundColor: "#2e7d32",
											},
											headerTitle: "Success Rate",
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
