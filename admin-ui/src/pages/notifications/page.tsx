import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNotifications } from "@/contexts/notification-context";
import { cn } from "@/lib/utils";
import { NotificationType } from "@/types";
import {
	Bell,
	Check,
	CheckCheck,
	Info,
	Microscope,
	UserPlus,
} from "lucide-react";
import { useNavigate } from "react-router";
import { NotificationItem } from "./_componets/item";
import { Button } from "@/components/ui/button";

export function NotificationsPage() {
	const navigate = useNavigate();
	const { notifications, markAsRead, markAllAsRead, deleteNotification } =
		useNotifications();

	const unreadNotifications = notifications.filter((n) => !n.read);
	const readNotifications = notifications.filter((n) => n.read);

	const getNotificationIcon = (type: NotificationType["type"]) => {
		switch (type) {
			case "user_registered":
				return <UserPlus className="h-5 w-5 text-blue-600" />;
			case "plant_analyzed":
				return <Microscope className="h-5 w-5 text-green-600" />;
			default:
				return <Info className="h-5 w-5 text-gray-600" />;
		}
	};

	const handleNotificationClick = async (notification: NotificationType) => {
		if (!notification.read) {
			await markAsRead(notification.id);
		}

		if (
			notification.type === "plant_analyzed" &&
			notification.data?.analysisId
		) {
			navigate(`/admin/analysis/${notification.data.analysisId}`);
		} else if (
			notification.type === "user_registered" &&
			notification.data?.userId
		) {
			navigate(`/admin/users/${notification.data.userId}`);
		}
	};

	return (
		<div className="container mx-auto p-6 max-w-4xl">
			<div className="flex items-center justify-between mb-6">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
					<p className="text-muted-foreground">
						Stay updated with user activities and plant analyses
					</p>
				</div>

				{unreadNotifications.length > 0 && (
					<Button onClick={markAllAsRead} variant="outline" size="sm">
						<CheckCheck className="h-4 w-4 mr-2" />
						Mark all as read
					</Button>
				)}
			</div>

			<Tabs defaultValue="all" className="w-full">
				<TabsList>
					<TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
					<TabsTrigger value="unread">
						Unread ({unreadNotifications.length})
					</TabsTrigger>
					<TabsTrigger value="read">
						Read ({readNotifications.length})
					</TabsTrigger>
				</TabsList>

				<TabsContent value="all" className="space-y-2 mt-4">
					{notifications.length === 0 ? (
						<Card>
							<CardContent className="p-12 text-center">
								<Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
								<p className="text-muted-foreground">No notifications yet</p>
							</CardContent>
						</Card>
					) : (
						notifications.map((notification) => (
							<Card
								key={notification.id}
								className={cn(
									"cursor-pointer hover:bg-muted/50 transition-colors",
									!notification.read && "border-primary/50",
								)}
								onClick={() => handleNotificationClick(notification)}>
								<CardContent className="p-4">
									<NotificationItem
										notification={notification}
										onClick={() => handleNotificationClick(notification)}
										onDelete={(e) => {
											e.stopPropagation();
											deleteNotification(notification.id);
										}}
										getIcon={getNotificationIcon}
									/>
								</CardContent>
							</Card>
						))
					)}
				</TabsContent>

				<TabsContent value="unread" className="space-y-2 mt-4">
					{unreadNotifications.length === 0 ? (
						<Card>
							<CardContent className="p-12 text-center">
								<Check className="h-12 w-12 mx-auto mb-4 text-green-600" />
								<p className="text-muted-foreground">All caught up!</p>
							</CardContent>
						</Card>
					) : (
						unreadNotifications.map((notification) => (
							<Card
								key={notification.id}
								className="cursor-pointer hover:bg-muted/50 transition-colors border-primary/50"
								onClick={() => handleNotificationClick(notification)}>
								<CardContent className="p-4">
									<NotificationItem
										notification={notification}
										onClick={() => handleNotificationClick(notification)}
										onDelete={(e) => {
											e.stopPropagation();
											deleteNotification(notification.id);
										}}
										getIcon={getNotificationIcon}
									/>
								</CardContent>
							</Card>
						))
					)}
				</TabsContent>

				<TabsContent value="read" className="space-y-2 mt-4">
					{readNotifications.map((notification) => (
						<Card
							key={notification.id}
							className="cursor-pointer hover:bg-muted/50 transition-colors"
							onClick={() => handleNotificationClick(notification)}>
							<CardContent className="p-4">
								<NotificationItem
									notification={notification}
									onClick={() => handleNotificationClick(notification)}
									onDelete={(e) => {
										e.stopPropagation();
										deleteNotification(notification.id);
									}}
									getIcon={getNotificationIcon}
								/>
							</CardContent>
						</Card>
					))}
				</TabsContent>
			</Tabs>
		</div>
	);
}
