import {
	addMonths,
	differenceInDays,
	isAfter,
	isEqual,
	startOfDay,
	subDays,
	subWeeks,
	subMonths,
	startOfWeek,
	endOfWeek,
	startOfMonth,
	endOfMonth,
	startOfYear,
	endOfYear,
	endOfDay,
	format,
	parseISO,
	isBefore,
	addDays,
	eachDayOfInterval,
	eachWeekOfInterval,
	eachMonthOfInterval,
} from "date-fns";

export const canChangePassword = (
	lastChangePassword?: Date | string | null,
) => {
	if (!lastChangePassword) return true;

	const lastChange = new Date(lastChangePassword);
	const allowedDate = addMonths(lastChange, 3);
	const now = new Date();

	return isAfter(now, allowedDate) || isEqual(now, allowedDate);
};

export const daysRemainingToChangePassword = (
	lastChangePassword?: Date | string | null,
) => {
	if (!lastChangePassword) return 0;

	const allowedDate = addMonths(new Date(lastChangePassword), 3);
	const now = new Date();

	return Math.max(0, differenceInDays(allowedDate, now));
};

export const DateRanges = {
	today: () => ({ start: new Date(), end: new Date() }),

	yesterday: () => ({
		start: startOfDay(subDays(new Date(), 1)),
		end: endOfDay(subDays(new Date(), 1)),
	}),

	last7Days: () => ({
		start: startOfDay(subDays(new Date(), 7)),
		end: endOfDay(new Date()),
	}),

	last30Days: () => ({
		start: startOfDay(subDays(new Date(), 30)),
		end: endOfDay(new Date()),
	}),

	last90Days: () => ({
		start: startOfDay(subDays(new Date(), 90)),
		end: endOfDay(new Date()),
	}),

	thisWeek: () => ({
		start: startOfWeek(new Date(), { weekStartsOn: 1 }), // Monday
		end: endOfWeek(new Date(), { weekStartsOn: 1 }),
	}),

	lastWeek: () => {
		const lastWeek = subWeeks(new Date(), 1);
		return {
			start: startOfWeek(lastWeek, { weekStartsOn: 1 }),
			end: endOfWeek(lastWeek, { weekStartsOn: 1 }),
		};
	},

	thisMonth: () => ({
		start: startOfMonth(new Date()),
		end: endOfMonth(new Date()),
	}),

	lastMonth: () => {
		const lastMonth = subMonths(new Date(), 1);
		return {
			start: startOfMonth(lastMonth),
			end: endOfMonth(lastMonth),
		};
	},

	thisYear: () => ({
		start: startOfYear(new Date()),
		end: endOfYear(new Date()),
	}),

	custom: (start: Date, end: Date) => ({
		start: startOfDay(start),
		end: endOfDay(end),
	}),
};

export function getRelativeTime(date: Date): string {
	const now = new Date();
	const diffInMinutes = Math.floor(
		(now.getTime() - date.getTime()) / (1000 * 60),
	);

	if (diffInMinutes < 1) return "just now";
	if (diffInMinutes < 60)
		return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;

	const diffInHours = Math.floor(diffInMinutes / 60);
	if (diffInHours < 24)
		return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;

	const diffInDays = Math.floor(diffInHours / 24);
	if (diffInDays < 7)
		return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;

	const diffInWeeks = Math.floor(diffInDays / 7);
	if (diffInWeeks < 4)
		return `${diffInWeeks} week${diffInWeeks !== 1 ? "s" : ""} ago`;

	const diffInMonths = Math.floor(diffInDays / 30);
	return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`;
}
