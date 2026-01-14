import { View, Text } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { Fab, FabIcon, FabLabel } from "@src/components/ui/fab";
import { Edit } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Card } from "@src/components/ui/card";
import { VStack } from "@src/components/ui/vstack";
import { HStack } from "@src/components/ui/hstack";
import { Avatar, AvatarFallbackText } from "@src/components/ui/avatar";
import { useAuthStore } from "@src/store/useAuthStore";

export default function Profile() {
	const insets = useSafeAreaInsets();
	const editing = useState(false);
	const { user, logout } = useAuthStore();
	const name = user ? `${user.firstName} ${user.lastName}` : "User";

	return (
		<View className="p-[4vw] bg-[#ECFDF0]" style={{ flex: 1 }}>
			<VStack space="lg">
				<Card size="lg" className="items-center ">
					<Avatar size="2xl" className="bg-[#DAFFD7]">
						<AvatarFallbackText className="text-black">
							{name}
						</AvatarFallbackText>
					</Avatar>
					<VStack className="items-center">
						<Text className="text-2xl font-semibold">{name}</Text>
						<Text className="text-[#25AF1B]">{user?.email}</Text>
					</VStack>
				</Card>
			</VStack>
			<Fab
				onPress={() => alert("Work in progress!")}
				size="lg"
				placement="bottom right"
				isHovered={false}
				isDisabled={false}
				isPressed={false}
				style={{
					position: "absolute",
					bottom: insets.bottom + 5,
					right: 20,
					backgroundColor: "#52CE19",
				}}>
				<FabIcon as={Edit} />
				<FabLabel>Edit Profile</FabLabel>
			</Fab>
		</View>
	);
}
