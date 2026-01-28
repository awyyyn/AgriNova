import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
					return value ? JSON.parse(value) : null;
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
