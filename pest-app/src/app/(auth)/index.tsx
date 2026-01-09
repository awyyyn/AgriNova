import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AgriNova from "../../components/agri-nova";

export default function Auth() {
	return (
		<SafeAreaView className="  flex-1  justify-center items-center p-4 ">
			<AgriNova centerElements showButton />
		</SafeAreaView>
	);
}
