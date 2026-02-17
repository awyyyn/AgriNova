import {
	Text,
	ActivityIndicator,
	RefreshControl,
	ScrollView,
	Dimensions,
	View,
} from "react-native";
import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Header } from "@src/components/header";
import { Card } from "@src/components/ui/card";
import { Heading } from "@src/components/ui/heading";
import { Grid, GridItem } from "@src/components/ui/grid";
import {
	Activity,
	Bug,
	ChartLine,
	File,
	FileText,
	Scan,
	Shield,
} from "lucide-react-native";
import { Button, ButtonText } from "@src/components/ui/button";
import { router } from "expo-router";
import { useAuthStore } from "@src/store/useAuthStore";
import { ImageBackground } from "expo-image";

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
		// <ScrollViewLayout
		// 	refreshControl={
		// 		<RefreshControl
		// 			refreshing={refreshing}
		// 			onRefresh={onRefresh}
		// 			tintColor="#41B249"
		// 		/>
		// 	}>
		<ScrollView
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={onRefresh}
					tintColor="#41B249"
				/>
			}
			bounces={false}
			alwaysBounceVertical={false}
			showsVerticalScrollIndicator={false}
			stickyHeaderIndices={[0]}
			contentContainerStyle={{ flexGrow: 1 }}>
			<Header centerElements color="light" />
			<ImageBackground
				style={{ flex: 1, padding: Dimensions.get("screen").width * 0.05 }}
				source={require("../../assets/bg.png")}>
				<Heading size="4xl" className="text-[#2e7d32]">
					Welcome back
				</Heading>
				<Text className="text-xl px-2 mb-2 leading-relaxed tracking-wide">
					Protect your plants with AI-powered pest detection
				</Text>

				<Card
					style={{
						shadowColor: "#82D55C",
						shadowOffset: { width: 0, height: 3 },
						shadowRadius: 4,
						shadowOpacity: 1,
						elevation: 10,
					}}
					size="lg"
					className="rounded-2xl border-[#0A980F] border bg-[#E0FFE7] overflow-hidden mb-4">
					<Heading className="  text-black">Quick Scan</Heading>
					<Text className="text-black text-xl">
						Detect pest instantly and get treatment recommendations.
					</Text>
					<Button
						onPress={() => router.push("/modal")}
						className="ml-auto border-[#0A980F] border bg-white mt-3 rounded-xl max-w-[150px]">
						<ButtonText className="text-[#2e7d32] text-xl">
							Start Scan
						</ButtonText>
					</Button>
				</Card>

				<Heading size="2xl" className="mb-2">
					Statistics
				</Heading>

				{loading && !stats ? (
					<ActivityIndicator />
				) : (
					<Grid className="gap-5" _extra={{ className: "grid-cols-1" }}>
						<GridItem _extra={{ className: "" }}>
							<Card
								style={{
									shadowColor: "#82D55C",
									shadowOffset: { width: 0, height: 3 },
									shadowRadius: 4,
									shadowOpacity: 1,
									elevation: 10,
								}}
								className="  bg-[#F0FDF4] border border-[#2e7d32] rounded-2xl flex flex-row justify-between items-start"
								size="lg">
								<View>
									<Text className=" text-xl text-black font-medium  ">
										Total Scans
									</Text>
									<Text className="text-black text-xl mt-5">
										{stats?.totalAnalyses ?? 0}
									</Text>
								</View>
								<FileText size={32} color="#2e7d32" />
							</Card>
						</GridItem>

						<GridItem _extra={{ className: "" }}>
							<Card
								style={{
									shadowColor: "#82D55C",
									shadowOffset: { width: 0, height: 3 },
									shadowRadius: 4,
									shadowOpacity: 1,
									elevation: 10,
								}}
								size="lg"
								className="bg-[#FFF7ED] border border-[#2e7d32] rounded-2xl flex flex-row justify-between items-start">
								<View>
									<Text className="  text-black font-medium text-xl">
										Success Rate
									</Text>
									<Text className="text-black text-xl mt-5">
										{Number(stats?.successRate ?? 0).toFixed(2)}%
									</Text>
								</View>
								<Activity size={32} color="#F00" />
							</Card>
						</GridItem>

						<GridItem _extra={{ className: "" }}>
							<Card
								style={{
									shadowColor: "#82D55C",
									shadowOffset: { width: 0, height: 3 },
									shadowRadius: 4,
									shadowOpacity: 1,
									elevation: 10,
								}}
								size="lg"
								className="bg-[#FEF2F2] border border-[#2e7d32] rounded-2xl flex flex-row justify-between items-start">
								<View>
									<Text className=" text-black font-medium text-xl">
										Pest Found
									</Text>
									<Text className="text-black text-xl mt-5">
										{stats?.plantsWithPestsCount ?? 0}
									</Text>
								</View>
								<Bug size={32} color="#F00" />
							</Card>
						</GridItem>
					</Grid>
				)}
			</ImageBackground>
		</ScrollView>
		// </ScrollViewLayout>
	);
}
