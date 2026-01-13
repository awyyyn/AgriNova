import { addMonths, differenceInDays, isAfter, isEqual } from "date-fns";

export const canChangePassword = (lastChangePassword: Date | string) => {
	const lastChange = new Date(lastChangePassword);
	const allowedDate = addMonths(lastChange, 3);
	const now = new Date();

	return isAfter(now, allowedDate) || isEqual(now, allowedDate);
};

export const daysRemainingToChangePassword = (
	lastChangePassword: Date | string
) => {
	const allowedDate = addMonths(new Date(lastChangePassword), 3);
	const now = new Date();

	return Math.max(0, differenceInDays(allowedDate, now));
};
