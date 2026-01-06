import { ScrollView, View, useWindowDimensions } from "react-native";

export default function ResponsiveWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const { width } = useWindowDimensions();
	const isSmall = width < 375;

	if (isSmall) {
		return (
			<ScrollView
				contentContainerStyle={{ flexGrow: 1 }}
				showsVerticalScrollIndicator={false}>
				{children}
			</ScrollView>
		);
	}

	return <View style={{ flex: 1 }}>{children}</View>;
}
