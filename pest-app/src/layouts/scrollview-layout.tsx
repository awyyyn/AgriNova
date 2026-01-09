import { View, ScrollView } from "react-native";
import React from "react";
import { Header } from "@src/components/header";

interface ScrollViewLayoutProps {
	children?: React.ReactNode;
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
			contentContainerStyle={{ flexGrow: 1, backgroundColor: "#ECFDF0" }}
			stickyHeaderIndices={[0]}
			showsVerticalScrollIndicator={false}>
			<Header description={description} centerElements color="light" />

			<View className="p-[4vw]">{children}</View>
		</ScrollView>
	);
}
