import { Image, ImageContentFit } from "expo-image";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useState } from "react";

export function LazyImage({
	uri,
	height = 200,
	contentFit = "cover",
}: {
	uri: string;
	height?: number;
	contentFit?: ImageContentFit;
}) {
	const [loading, setLoading] = useState(true);

	return (
		<View style={[styles.container, { height }]}>
			{loading && <ActivityIndicator style={StyleSheet.absoluteFill} />}

			<Image
				source={{ uri }}
				style={StyleSheet.absoluteFill}
				contentFit={contentFit}
				transition={300}
				cachePolicy="disk"
				onLoadEnd={() => setLoading(false)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		backgroundColor: "#f2f2f2",
		overflow: "hidden",
	},
});
