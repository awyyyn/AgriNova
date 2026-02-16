import React, { useCallback, useEffect, useRef, useState } from "react";
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import NetInfo from "@react-native-community/netinfo";
import { LazyImage } from "@src/components/lazy-image";
import { useAuthStore } from "@src/store/useAuthStore";
import { PlantAnalysis } from "@src/types";
import { Box } from "@src/components/ui/box";
import { HealthBadge } from "@src/components/health-badge";
import { HStack } from "@src/components/ui/hstack";
import { VStack } from "@src/components/ui/vstack";
import { usePestHistoryStore } from "@src/store/usePestHistoryStore";
import { format } from "date-fns";
import { Button, ButtonText } from "@src/components/ui/button";

const PAGE_SIZE = 10;

export default function PestAnalysisHistory() {
	const router = useRouter();
	const { token } = useAuthStore();

	const { items, page, hasMore, setItems, addItems } = usePestHistoryStore();

	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);

	const isFetchingRef = useRef(false);

	/* --------------------------------
	   FETCH FUNCTION (OFFLINE-SAFE)
	-------------------------------- */
	const fetchHistory = async (
		pageNumber = 0,
		replace = false,
		silent = false,
	) => {
		if (isFetchingRef.current) return;

		try {
			isFetchingRef.current = true;
			if (!silent) setLoading(true);

			const res = await fetch(
				`${process.env.EXPO_PUBLIC_API_URL}/plant/list?page=${pageNumber}&limit=${PAGE_SIZE}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			const json = await res.json();
			if (!res.ok) throw new Error(json.message);

			const data: PlantAnalysis[] = json.data;

			replace ? setItems(data) : addItems(data);
		} catch (err) {
			console.error("History fetch error:", err);
		} finally {
			isFetchingRef.current = false;
			if (!silent) {
				setLoading(false);
				setRefreshing(false);
			}
		}
	};

	/* --------------------------------
	   INITIAL LOAD (OFFLINE-FIRST)
	-------------------------------- */
	useEffect(() => {
		const init = async () => {
			// Show cached data immediately (Zustand already does this)

			const net = await NetInfo.fetch();

			if (net.isConnected) {
				// Silent refresh page 0
				fetchHistory(0, true, true);
			}
		};

		init();

		const unsubscribe = NetInfo.addEventListener((state) => {
			if (state.isConnected) {
				fetchHistory(0, true, true);
			}
		});

		return () => unsubscribe();
	}, []);

	/* --------------------------------
	   PULL TO REFRESH
	-------------------------------- */
	const onRefresh = useCallback(() => {
		setRefreshing(true);
		fetchHistory(0, true);
	}, []);

	/* --------------------------------
	   PAGINATION
	-------------------------------- */
	const onEndReached = () => {
		if (!loading && hasMore) {
			fetchHistory(page + 1);
		}
	};

	/* --------------------------------
	   ITEM RENDER
	-------------------------------- */
	const renderItem = ({ item }: { item: PlantAnalysis }) => (
		<TouchableOpacity
			activeOpacity={0.85}
			onPress={() =>
				router.push({ pathname: "/plant/[id]", params: { id: item.id } })
			}
			className="flex-row gap-3 bg-white p-3 rounded-xl shadow-sm mb-3">
			{/* Image */}
			<Box className="w-32 rounded-lg">
				<LazyImage
					height={110}
					uri={item.img}
					className="rounded-xl"
					contentFit="cover"
				/>
			</Box>

			{/* Info */}
			<View className="flex-1 justify-between">
				<HStack className="flex-1 justify-between">
					<View>
						{item.plantIdentification?.commonName && (
							<Text className="text-sm text-gray-500">Common name:</Text>
						)}
						<Text className="font-semibold text-xl">
							{item.plantIdentification?.commonName ||
								`Analysis #${item.id.slice(0, 6)}`}
						</Text>
						{item.plantIdentification?.scientificName && (
							<>
								<Text className="text-sm text-gray-500">Scientific name:</Text>
								<Text className="font-semibold text-xl">
									{item.plantIdentification.scientificName}
								</Text>
							</>
						)}
					</View>

					<VStack className="items-ends">
						{/* <Text className="text-xs text-gray-500">
							{format(new Date(item.createdAt), "hh:mm a").toString()}
						</Text> */}
						{/* <Text className="text-xs text-gray-400">
							{format(new Date(item.createdAt), "MMM dd, yyyy").toString()}
						</Text> */}
					</VStack>
				</HStack>

				<View className="flex-row items-center gap-2 mt-2">
					<HealthBadge size="sm" status={item.healthStatus || "unknown"} />
					{item.confidence ? (
						<Text className="text-sm text-gray-500">
							Confidence: {item.confidence}%
						</Text>
					) : null}
				</View>
			</View>
		</TouchableOpacity>
	);

	return (
		<View className="flex-1 p-[4vw] bg-gray-50">
			<FlatList
				data={items}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				refreshing={refreshing}
				onRefresh={onRefresh}
				onEndReached={onEndReached}
				onEndReachedThreshold={0.4}
				showsVerticalScrollIndicator={false}
				ListFooterComponent={
					loading && hasMore ? (
						<View className="py-4">
							<ActivityIndicator />
						</View>
					) : null
				}
				ListEmptyComponent={
					!loading ? (
						<View className="mt-24 items-center">
							<Text className="text-gray-500">No analysis history yet 🌱</Text>
							<Button
								className="mt-2 rounded-lg"
								onPress={() => router.dismissTo("/(tabs)/scan")}>
								<ButtonText>Go to Scan</ButtonText>
							</Button>
						</View>
					) : null
				}
			/>
		</View>
	);
}
