import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "access_token";

export const saveToken = async (token: string) => {
	try {
		await SecureStore.setItemAsync(TOKEN_KEY, token);
	} catch (e) {
		console.error("Error saving token:", e);
	}
};

export const getToken = async () => {
	try {
		const token = await SecureStore.getItemAsync(TOKEN_KEY);
		return token;
	} catch (e) {
		console.error("Error getting token:", e);
		return null;
	}
};

export const deleteToken = async () => {
	try {
		await SecureStore.deleteItemAsync(TOKEN_KEY);
	} catch (e) {
		console.error("Error deleting token:", e);
	}
};
