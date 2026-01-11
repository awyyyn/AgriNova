import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AgriNova from "../../components/agri-nova";
import { useAuthStore } from "@src/store/useAuthStore";
import { Redirect } from "expo-router";

export default function Auth() {
	const onboarded = useAuthStore((s) => s.onboarded);

	if (onboarded) return <Redirect href="/(auth)/sign-in" />;

	return (
		<SafeAreaView className="  flex-1  justify-center items-center p-4 ">
			<AgriNova centerElements showButton />
		</SafeAreaView>
	);
}
