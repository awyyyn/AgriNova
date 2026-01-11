import { Text, TouchableOpacity, GestureResponderEvent } from "react-native";
import { ReactNode } from "react";

interface SettingsButtonProps {
	icon: ReactNode;
	onPress?: (e: GestureResponderEvent) => void;
	text: string;
}

export default function SettingsButton({
	icon,
	onPress,
	text,
}: SettingsButtonProps) {
	return (
		<TouchableOpacity
			onPress={onPress}
			className="flex flex-row items-center gap-4">
			{icon}
			<Text className="text-xl  ">{text}</Text>
		</TouchableOpacity>
	);
}
