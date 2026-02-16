import { Tabs } from "expo-router";
import React from "react";
import { HapticTab } from "@src/components/haptic-tab";
import { IconSymbol } from "@src/components/ui/icon-symbol";
import { Colors } from "@src/constants/theme";
import { useColorScheme } from "@src/hooks/use-color-scheme";
import { Aperture, Settings } from "lucide-react-native";
import { Text } from "react-native";

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
					tabBarIcon: ({ color, focused }) => (
						<IconSymbol
							size={28}
							name="house.fill"
							color={focused ? "#2e7d32" : color}
						/>
					),
					tabBarLabel({ focused, color }) {
						return (
							<Text
								className={` ${focused ? "text-[#2e7d32] text-md" : `text-sm ${color}`}`}>
								Home
							</Text>
						);
					},
				}}
			/>
			<Tabs.Screen
				name="scan"
				options={{
					title: "Scan",
					tabBarIcon: ({ color, focused }) => (
						<Aperture color={focused ? "#2e7d32" : color} />
					),
					tabBarLabel({ focused, color }) {
						return (
							<Text
								className={` ${focused ? "text-[#2e7d32] text-md" : `text-sm ${color}`}`}>
								Scan
							</Text>
						);
					},
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					tabBarIcon: ({ color, focused }) => (
						<Settings color={focused ? "#2e7d32" : color} />
					),
					tabBarLabel({ focused, color }) {
						return (
							<Text
								className={` ${focused ? "text-[#2e7d32] text-md" : `text-sm ${color}`}`}>
								Settings
							</Text>
						);
					},
				}}
			/>
		</Tabs>
	);
}
