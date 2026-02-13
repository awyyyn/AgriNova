import { NotificationType, NotificationResponse } from "@/types";
import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./auth-context";

interface NotificationContextType {
	notifications: NotificationType[];
	unreadCount: number;
	markAsRead: (id: string) => Promise<void>;
	markAllAsRead: () => Promise<void>;
	deleteNotification: (id: string) => Promise<void>;
	fetchNotifications: () => Promise<void>;
	loading: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
	undefined,
);

export function NotificationProvider({ children }: { children: ReactNode }) {
	const [notifications, setNotifications] = useState<NotificationType[]>([]);
	const [unreadCount, setUnreadCount] = useState(0);
	const { isAuthenticated } = useAuth();
	const [loading, setLoading] = useState(false);
	const [, setSocket] = useState<Socket | null>(null);

	// Initialize Socket.IO connection
	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (!token) return;

		const socketInstance = io(import.meta.env.VITE_WS_URL, {
			auth: { token },
			transports: ["websocket", "polling"],
		});

		socketInstance.on("connect", () => {
			console.log("Notification socket connected");

			fetchNotifications();
		});

		// Listen for new notifications
		socketInstance.on("notification", (notification: NotificationType) => {
			setNotifications((prev) => [notification, ...prev]);
			setUnreadCount((prev) => prev + 1);

			// Show browser notification if permitted
			if (Notification.permission === "granted") {
				new Notification(notification.title, {
					body: notification.message,
					icon: "/logo.png",
					badge: "/logo.png",
				});
			}

			// Play notification sound
			const audio = new Audio("/notification.mp3");
			audio.play().catch(() => {});
		});

		socketInstance.on("disconnect", () => {
			console.log("Notification socket disconnected");
		});

		setSocket(socketInstance);

		return () => {
			socketInstance.disconnect();
		};
	}, [isAuthenticated]);

	// Request browser notification permission
	useEffect(() => {
		if ("Notification" in window && Notification.permission === "default") {
			Notification.requestPermission();
		}
	}, []);

	const fetchNotifications = async () => {
		try {
			setLoading(true);
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/notifications`,
				{
					headers: {
						authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						"Content-Type": "application/json",
					},
				},
			);

			if (!response.ok) throw new Error("Failed to fetch notifications");

			const data: NotificationResponse = await response.json();
			setNotifications(data.notifications);
			setUnreadCount(data.unreadCount);
		} catch (error) {
			console.error("Error fetching notifications:", error);
		} finally {
			setLoading(false);
		}
	};

	const markAsRead = async (id: string) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/notifications/${id}/read`,
				{
					method: "PATCH",
					headers: {
						authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						"Content-Type": "application/json",
					},
				},
			);

			if (!response.ok) throw new Error("Failed to mark as read");

			setNotifications((prev) =>
				prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
			);
			setUnreadCount((prev) => Math.max(0, prev - 1));
		} catch (error) {
			console.error("Error marking notification as read:", error);
		}
	};

	const markAllAsRead = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/notifications/read-all`,
				{
					method: "PATCH",
					headers: {
						authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						"Content-Type": "application/json",
					},
				},
			);

			if (!response.ok) throw new Error("Failed to mark all as read");

			setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
			setUnreadCount(0);
		} catch (error) {
			console.error("Error marking all as read:", error);
		}
	};

	const deleteNotification = async (id: string) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/notifications/${id}`,
				{
					method: "DELETE",
					headers: {
						authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						"Content-Type": "application/json",
					},
				},
			);

			if (!response.ok) throw new Error("Failed to delete notification");

			const wasUnread = notifications.find((n) => n.id === id)?.read === false;
			setNotifications((prev) => prev.filter((n) => n.id !== id));
			if (wasUnread) {
				setUnreadCount((prev) => Math.max(0, prev - 1));
			}
		} catch (error) {
			console.error("Error deleting notification:", error);
		}
	};

	return (
		<NotificationContext.Provider
			value={{
				notifications,
				unreadCount,
				markAsRead,
				markAllAsRead,
				deleteNotification,
				fetchNotifications,
				loading,
			}}>
			{children}
		</NotificationContext.Provider>
	);
}

export function useNotifications() {
	const context = useContext(NotificationContext);
	if (!context) {
		throw new Error(
			"useNotifications must be used within NotificationProvider",
		);
	}
	return context;
}
