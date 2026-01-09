import { Tabs } from "expo-router";
import React from "react";
import { HapticTab } from "@src/components/haptic-tab";
import { IconSymbol } from "@src/components/ui/icon-symbol";
import { Colors } from "@src/constants/theme";
import { useColorScheme } from "@src/hooks/use-color-scheme";
import { Aperture, Settings } from "lucide-react-native";

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				headerShown: false,
				tabBarButton: HapticTab,
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="house.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="scan"
				options={{
					title: "Scan",
					tabBarIcon: ({ color }) => <Aperture color={color} />,
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					tabBarIcon: ({ color }) => <Settings color={color} />,
				}}
			/>
		</Tabs>
	);
}
