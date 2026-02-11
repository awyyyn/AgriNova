export interface NotificationType {
	id: string;
	type: "user_registered" | "plant_analyzed" | "system" | "info";
	title: string;
	message: string;
	data?: {
		userId?: string;
		userName?: string;
		userEmail?: string;
		plantId?: string;
		plantType?: string;
		hasPest?: boolean;
		analysisId?: string;
	};
	read: boolean;
	createdAt: string;
}

export interface NotificationResponse {
	notifications: NotificationType[];
	unreadCount: number;
	total: number;
}
