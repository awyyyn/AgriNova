"use client";

import { useEffect, useState } from "react";
import { User } from "@/types/user";

interface UseUserDetailReturn {
	user: User | null;
	isLoading: boolean;
	error: Error | null;
}

export function useUserDetail(id: string): UseUserDetailReturn {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/user/${id}`,
					{
						headers: {
							"Content-Type": "application/json",
							authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						},
					},
				);
				if (!response.ok) {
					throw new Error("Failed to fetch user");
				}
				const data: { data: User } = await response.json();
				setUser(data.data);
			} catch (err) {
				setError(err instanceof Error ? err : new Error("Unknown error"));
				setUser(null);
			} finally {
				setIsLoading(false);
			}
		};

		if (id) {
			fetchUser();
		}
	}, [id]);

	return { user, isLoading, error };
}
