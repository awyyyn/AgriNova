import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getRangeName = (range: string) => {
	const rangeNames: Record<string, string> = {
		today: "Today",
		yesterday: "Yesterday",
		last7Days: "Last 7 Days",
		last30Days: "Last 30 Days",
		thisWeek: "This Week",
		lastWeek: "Last Week",
		thisMonth: "This Month",
		lastMonth: "Last Month",
		custom: "Custom Range",
	};
	return rangeNames[range] || range;
};
