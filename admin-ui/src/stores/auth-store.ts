import { User } from "@/types";
import { create } from "zustand";

interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
	refreshToken: VoidFunction;
	logout: VoidFunction;
}

export const useAuth = create<AuthState>((set) => ({
	isAuthenticated: false,
	refreshToken: async () => {
		const token = localStorage.getItem("accessToken");

		try {
			//
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/auth/verify-token`,
				{
					method: "POST",
					headers: {
						"Content-type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				},
			);

			const data = await response.json();

			if (response.status !== 200) {
				throw new Error(data.message || "Something went wrong!");
			}

			localStorage.setItem("accessToken", data.data.accessToken);
			set({
				user: data.data.user,
				isAuthenticated: true,
			});
		} catch (error) {
			console.log("==== Error ====");
			console.error(error);
			set({
				user: null,
				isAuthenticated: false,
			});
			throw new Error((error as Error).message);
		}
	},
	user: null,
	logout: () => {
		localStorage.clear();

		set({
			user: null,
			isAuthenticated: false,
		});
	},
}));
