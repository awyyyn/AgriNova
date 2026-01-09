import AgriNova from "@src/components/agri-nova";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
	const insets = useSafeAreaInsets();

	return (
		<View
			className={`bg-[#52CE19] w-full  rounded-b-3xl justify-center`}
			style={{
				paddingTop: Platform.OS === "ios" ? insets.top + 10 : insets.top + 15,
				paddingBottom: 20,
			}}>
			<AgriNova
				centerElements={centerElements}
				color={color}
				description={props.description}
				showButton={props.showButton}
			/>
		</View>
	);
};
