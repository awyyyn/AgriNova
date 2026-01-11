import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { User } from "@src/types";

type AuthState = {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;

	login: (token: string, user: User) => Promise<void>;
	logout: () => Promise<void>;
	restoreSession: () => Promise<void>;
	onboarded: boolean;
	setOnboarded: (value: boolean) => void;
};

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";
const ONBOARD_KEY = "onboarded";

export const useAuthStore = create<AuthState>((set) => ({
	onboarded: false,
	user: null,
	isLoading: true,
	isAuthenticated: false,

	setOnboarded: async (value: boolean) => {
		await SecureStore.setItemAsync(ONBOARD_KEY, String(value));
		set({ onboarded: value });
	},

	login: async (token, user) => {
		await SecureStore.setItemAsync(TOKEN_KEY, token);
		await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));

		set({ user, isAuthenticated: true });
	},

	logout: async () => {
		await SecureStore.deleteItemAsync(TOKEN_KEY);
		await SecureStore.deleteItemAsync(USER_KEY);

		set({ user: null, isAuthenticated: false });
	},

	restoreSession: async () => {
		try {
			const token = await SecureStore.getItemAsync(TOKEN_KEY);
			const user = await SecureStore.getItemAsync(USER_KEY);
			const onboardedValue = await SecureStore.getItemAsync(ONBOARD_KEY);

			if (token && user) {
				set({
					user: JSON.parse(user),
					isAuthenticated: true,
				});
			}

			set({
				onboarded: onboardedValue === "true",
			});
		} finally {
			set({ isLoading: false });
		}
	},
}));
