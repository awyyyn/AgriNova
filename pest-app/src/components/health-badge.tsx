import React from "react";
import { Badge, BadgeIcon, BadgeText } from "./ui/badge";
import {
	ShieldAlert,
	ShieldPlus,
	ShieldQuestionMark,
} from "lucide-react-native";

interface HealthBadgeProps {
	status: "unhealthy" | "healthy" | "unknown";
	size?: "sm" | "md" | "lg";
}

export function HealthBadge({ status, size = "md" }: HealthBadgeProps) {
	const bgColor =
		status === "healthy"
			? "bg-primary-500"
			: status === "unhealthy"
				? "bg-red-500"
				: "bg-gray-200";

	return (
		<Badge
			size={size}
			className={`${bgColor} rounded-lg px-2 min-w-[75px] flex flex-row justify-between`}>
			<BadgeText
				className={`${status === "unknown" ? "text-black" : "text-white"} capitalize `}>
				{status}
			</BadgeText>
			<BadgeIcon
				color={status === "unknown" ? "#000" : "#fff"}
				as={
					status === "healthy"
						? ShieldPlus
						: status === "unhealthy"
							? ShieldAlert
							: ShieldQuestionMark
				}
			/>
		</Badge>
	);
}
