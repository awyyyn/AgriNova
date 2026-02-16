import { Text, ActivityIndicator, RefreshControl } from "react-native";
import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScrollViewLayout from "../../layouts/scrollview-layout";
import { Card } from "@src/components/ui/card";
import { Heading } from "@src/components/ui/heading";
import { Grid, GridItem } from "@src/components/ui/grid";
import { ChartLine, Scan, Shield } from "lucide-react-native";
import { Button, ButtonText } from "@src/components/ui/button";
import { router } from "expo-router";
import { useAuthStore } from "@src/store/useAuthStore";

type Stats = {
	totalAnalyses: number;
	successRate: number;
	plantsWithPestsCount: number;
};

const STATS_CACHE_KEY = "AGRINOVA_STATS_CACHE";

export default function HomeScreen() {
	const [stats, setStats] = useState<Stats | null>(null);
	const token = useAuthStore.getState().token;
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		loadStats();
	}, []);

	const loadStats = async () => {
		// Load cached data first
		const cached = await AsyncStorage.getItem(STATS_CACHE_KEY);
		if (cached && !refreshing) {
			setStats(JSON.parse(cached));
			setLoading(false);
		}
		console.log("Fetching stats from API...");
		try {
			const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/stats`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const data: Stats = await res.json();

			setStats(data);

			console.log("Fetched stats:", data);
			await AsyncStorage.setItem(STATS_CACHE_KEY, JSON.stringify(data));
		} catch (err) {
			console.log("Using cached stats (offline)");
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	};

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		loadStats();
	}, []);

	return (
		<ScrollViewLayout
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={onRefresh}
					tintColor="#41B249"
				/>
			}>
			<Heading size="4xl">Welcome back</Heading>
			<Text className="text-xl px-2 mb-2 leading-relaxed tracking-wide">
				Protect your plants with AI-powered pest detection
			</Text>

			<Card
				size="lg"
				className="rounded-none bg-[#2e7d32] overflow-hidden mb-4">
				<Heading className="text-white">Quick Scan</Heading>
				<Text className="text-white text-xl">
					Detect pest instantly and get treatment recommendations.
				</Text>
				<Button
					onPress={() => router.push("/modal")}
					className="bg-white mt-3 rounded-xl max-w-[150px]">
					<ButtonText className="text-[#2e7d32] text-xl">Start Scan</ButtonText>
				</Button>
			</Card>

			<Heading size="2xl" className="mb-2">
				Your stats
			</Heading>

			{loading && !stats ? (
				<ActivityIndicator />
			) : (
				<Grid className="gap-5" _extra={{ className: "grid-cols-2" }}>
					<GridItem _extra={{ className: "" }}>
						<Card size="lg" className="bg-[#2e7d32] rounded-none">
							<Scan size={32} color="#FFF" />
							<Text className="mt-4 text-xl text-white font-medium  ">
								Total Scans
							</Text>
							<Text className="text-white text-xl">
								{stats?.totalAnalyses ?? 0}
							</Text>
						</Card>
					</GridItem>

					<GridItem _extra={{ className: "" }}>
						<Card size="lg" className="bg-[#2e7d32] rounded-none">
							<ChartLine size={32} color="#FFF" />
							<Text className="mt-4 text-white font-medium text-xl">
								Success Rate
							</Text>
							<Text className="text-white text-xl">
								{Number(stats?.successRate ?? 0).toFixed(2)}%
							</Text>
						</Card>
					</GridItem>

					<GridItem _extra={{ className: "" }}>
						<Card size="lg" className="bg-[#2e7d32] rounded-none">
							<Shield size={32} color="#FFF" />
							<Text className="mt-4 text-white font-medium text-xl">
								Pest Found
							</Text>
							<Text className="text-white text-xl">
								{stats?.plantsWithPestsCount ?? 0}
							</Text>
						</Card>
					</GridItem>

					<GridItem _extra={{ className: "" }} />
				</Grid>
			)}
		</ScrollViewLayout>
	);
}
