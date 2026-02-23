import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { PlantAnalysis } from "@src/types";

type PestHistoryState = {
	items: PlantAnalysis[];
	page: number;
	hasMore: boolean;

	setItems: (items: PlantAnalysis[]) => void;
	addItems: (items: PlantAnalysis[]) => void;
	reset: () => void;
	getItemById: (id: string) => PlantAnalysis | undefined;
};

export const usePestHistoryStore = create<PestHistoryState>()(
	persist(
		(set, get) => ({
			items: [],
			page: 1,
			hasMore: true,

			setItems: (items) =>
				set({
					items,
					page: 1,
					hasMore: items.length > 0,
				}),

			addItems: (items) =>
				set((state) => ({
					items: [...state.items, ...items],
					page: state.page + 1,
					hasMore: items.length > 0,
				})),

			reset: () =>
				set({
					items: [],
					page: 1,
					hasMore: true,
				}),
			getItemById: (id) => {
				const { items } = get();
				return items.find((item) => item.id === id);
			},
		}),
		{
			name: "pest-analysis-history", // storage key
			storage: {
				getItem: async (key) => {
					const value = await AsyncStorage.getItem(key);

					if (!value) {
						const token = await SecureStore.getItemAsync("auth_token");

						if (!token) return null;

						const response = await fetch(
							`${process.env.EXPO_PUBLIC_API_URL}/plant/list/${key}`,
							{
								headers: {
									Authorization: `Bearer ${token}`,
									"Content-type": "application/json",
								},
							},
						);

						const data = await response.json();

						if (response.status !== 200 || !response.ok) return null;

						await AsyncStorage.setItem(key, JSON.stringify(data.data));

						return data.data;
					}
					return JSON.parse(value);
				},
				setItem: async (key, value) => {
					await AsyncStorage.setItem(key, JSON.stringify(value));
				},
				removeItem: async (key) => {
					await AsyncStorage.removeItem(key);
				},
			},
		},
	),
);
