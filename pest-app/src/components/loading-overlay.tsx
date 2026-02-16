import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

type Props = {
	visible: boolean;
	message?: string;
};

export default function LoadingOverlay({
	visible,
	message = "Loading...",
}: Props) {
	if (!visible) return null;

	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<ActivityIndicator size="large" color="#2e7d32" />
				<Text style={styles.text}>{message}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0,0,0,0.45)",
		alignItems: "center",
		justifyContent: "center",
		zIndex: 9999,
	},
	card: {
		backgroundColor: "#fff",
		padding: 24,
		borderRadius: 16,
		alignItems: "center",
		minWidth: 160,
	},
	text: {
		marginTop: 12,
		fontSize: 16,
		fontWeight: "500",
	},
});
