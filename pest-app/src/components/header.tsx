import AgriNova from "@src/components/agri-nova";
import { View } from "react-native";

interface HeaderProps {
	showButton?: boolean;
	centerElements?: boolean;
	color?: "light";
	description?: string;
}

export const Header = ({
	centerElements = true,
	color = "light",
	...props
}: HeaderProps) => {
	return (
		<View className="bg-[#52CE19] w-full h-[18vh] rounded-b-3xl justify-center">
			<AgriNova {...props} />
		</View>
	);
};
