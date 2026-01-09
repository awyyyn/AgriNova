import { View, ScrollView } from "react-native";
import React from "react";
import AgriNova from "@src/components/agri-nova";

interface ScrollViewLayoutProps {
	children: React.ReactNode;
	description?: string;
}

export default function ScrollViewLayout({
	children,
	description,
}: ScrollViewLayoutProps) {
	return (
		<ScrollView
			bounces={false}
			alwaysBounceVertical={false}
			contentContainerStyle={{ flexGrow: 1 }}
			stickyHeaderIndices={[0]}
			showsVerticalScrollIndicator={false}>
			<View className="bg-[#52CE19] w-full h-[18vh] rounded-b-3xl justify-center">
				<AgriNova description={description} centerElements color="light" />
			</View>
			<View className="p-[4vw]">{children}</View>
		</ScrollView>
	);
}
