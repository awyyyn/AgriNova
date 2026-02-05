"use client";

import { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface SearchBarProps {
	query: string;
	isLoading: boolean;
	onSearch: (query: string) => void;
	onClear: () => void;
	placeholder?: string;
}

export function SearchBar({
	query,
	isLoading,
	onSearch,
	onClear,
	placeholder = "Search..",
}: SearchBarProps) {
	const [inputValue, setInputValue] = useState(query);

	// Debounced search
	useEffect(() => {
		const timer = setTimeout(() => {
			if (inputValue !== query) {
				onSearch(inputValue);
			}
		}, 300);

		return () => clearTimeout(timer);
	}, [inputValue, query, onSearch]);

	const handleClear = useCallback(() => {
		setInputValue("");
		onClear();
	}, [onClear]);

	return (
		<div className="relative lg:min-w-[400px]">
			<Input
				placeholder={placeholder}
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				disabled={isLoading}
				className="pr-8"
			/>
			{inputValue ? (
				<Button
					variant="ghost"
					size="sm"
					onClick={handleClear}
					disabled={isLoading}
					className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0">
					<X className="h-4 w-4" />
				</Button>
			) : (
				<Search className="absolute right-1 top-1/2 -translate-1/2 h-4 w-4" />
			)}
		</div>
	);
}
