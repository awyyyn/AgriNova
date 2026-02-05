"use client";

import { useState, useCallback, useEffect } from "react";
import { PaginatedResponse, PlantAnalysis } from "@/types";

interface AnalysisOptions {
	initialLimit?: number;
	loading?: boolean;
}

export function useAnalysis(options: AnalysisOptions = {}) {
	const { initialLimit = 1, loading = true } = options;

	const [data, setData] = useState<PlantAnalysis[]>([]);
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(0);
	const [limit, setLimit] = useState(initialLimit);
	const [query, setQuery] = useState("");
	const [isLoading, setIsLoading] = useState(loading);
	const [error, setError] = useState<Error | null>(null);

	// Consolidated fetch effect
	useEffect(() => {
		const controller = new AbortController();

		const fetchUsers = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const params = new URLSearchParams({
					page: page.toString(),
					limit: limit.toString(),
					...(query && { query }),
				});

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/plant/list?${params}`,
					{
						signal: controller.signal,
						headers: {
							authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
						},
					},
				);

				if (!response.ok) throw new Error("Failed to fetch users");

				const result: PaginatedResponse<PlantAnalysis> = await response.json();
				setData(result.data);
				setTotal(result.total);
			} catch (err) {
				if ((err as any).name === "AbortError") return;
				setError(err instanceof Error ? err : new Error("Unknown error"));
				setData([]);
			} finally {
				setIsLoading(false);
			}
		};

		fetchUsers();

		return () => controller.abort();
	}, [page, limit, query]);

	const handleSearch = useCallback((searchQuery: string) => {
		setQuery(searchQuery);
		setPage(0); // Reset to first page on new search
	}, []);

	const handleClearSearch = useCallback(() => {
		setQuery("");
		setPage(0); // Reset to first page
	}, []);

	const handlePageChange = useCallback((newPage: number) => {
		setPage(newPage);
	}, []);

	const handleLimitChange = useCallback((newLimit: number) => {
		setLimit(newLimit);
		setPage(0); // Reset to first page when changing limit
	}, []);

	const totalPages = Math.ceil(total / limit);

	return {
		data,
		total,
		page,
		limit,
		query,
		isLoading,
		error,
		totalPages,
		handleSearch,
		handleClearSearch,
		handlePageChange,
		handleLimitChange,
	};
}
