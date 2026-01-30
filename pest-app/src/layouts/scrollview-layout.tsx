import { View, ScrollView } from "react-native";
import React, { JSX } from "react";
import { Header } from "@src/components/header";

interface ScrollViewLayoutProps {
	children?: React.ReactNode;
	description?: string;
	refreshControl?: JSX.Element;
}

export default function ScrollViewLayout({
	children,
	description,
	refreshControl,
}: ScrollViewLayoutProps) {
	return (
		<ScrollView
			bounces={false}
			alwaysBounceVertical={false}
			contentContainerStyle={{ flexGrow: 1, backgroundColor: "#ECFDF0" }}
			stickyHeaderIndices={[0]}
			refreshControl={refreshControl}
			showsVerticalScrollIndicator={false}>
			<Header description={description} centerElements color="light" />

			<View className="p-[4vw]">{children}</View>
		</ScrollView>
	);
}
