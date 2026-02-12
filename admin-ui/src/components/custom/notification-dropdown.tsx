import { useState } from "react";
import { useNavigate } from "react-router";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, UserPlus, Microscope, CheckCheck, Info } from "lucide-react";
import { useNotifications } from "@/contexts/notification-context";
import type { NotificationType } from "@/types/notification";
import { NotificationItem } from "@/pages/notifications/_componets/item";

export function NotificationBell() {
	const navigate = useNavigate();
	const {
		notifications,
		unreadCount,
		markAsRead,
		markAllAsRead,
		deleteNotification,
		loading,
	} = useNotifications();

	const [open, setOpen] = useState(false);

	const getNotificationIcon = (type: NotificationType["type"]) => {
		switch (type) {
			case "user_registered":
				return <UserPlus className="h-4 w-4 text-blue-600" />;
			case "plant_analyzed":
				return <Microscope className="h-4 w-4 text-green-600" />;
			case "system":
				return <Info className="h-4 w-4 text-amber-600" />;
			default:
				return <Bell className="h-4 w-4 text-gray-600" />;
		}
	};

	const handleNotificationClick = async (notification: NotificationType) => {
		// Mark as read
		if (!notification.read) {
			await markAsRead(notification.id);
		}

		// Navigate based on type
		if (
			notification.type === "plant_analyzed" &&
			notification.data?.analysisId
		) {
			navigate(`/admin/analysis/${notification.data.analysisId}`);
			setOpen(false);
		} else if (
			notification.type === "user_registered" &&
			notification.data?.userId
		) {
			navigate(`/admin/users/${notification.data.userId}`);
			setOpen(false);
		}
	};

	const handleMarkAllRead = async (e: React.MouseEvent) => {
		e.stopPropagation();
		await markAllAsRead();
	};

	const handleDelete = async (e: React.MouseEvent, id: string) => {
		e.stopPropagation();
		await deleteNotification(id);
	};

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger>
				<Button variant="ghost" size="icon" className="relative">
					<Bell className="h-5 w-5" />
					{unreadCount > 0 && (
						<Badge
							variant="destructive"
							className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
							{unreadCount > 9 ? "9+" : unreadCount}
						</Badge>
					)}
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-96">
				<DropdownMenuLabel className="flex items-center justify-between">
					<span>Notifications</span>
					{unreadCount > 0 && (
						<Button
							variant="ghost"
							size="sm"
							onClick={handleMarkAllRead}
							className="h-8 gap-1 text-xs">
							<CheckCheck className="h-3 w-3" />
							Mark all read
						</Button>
					)}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />

				<ScrollArea className="h-[400px]">
					{loading ? (
						<div className="p-8 text-center text-sm text-muted-foreground">
							Loading notifications...
						</div>
					) : notifications.length === 0 ? (
						<div className="p-8 text-center">
							<Bell className="h-12 w-12 mx-auto mb-2 text-muted-foreground/50" />
							<p className="text-sm text-muted-foreground">No notifications</p>
						</div>
					) : (
						<div className="space-y-1">
							{notifications.map((notification) => (
								<NotificationItem
									key={notification.id}
									notification={notification}
									onClick={() => handleNotificationClick(notification)}
									onDelete={(e) => handleDelete(e, notification.id)}
									getIcon={getNotificationIcon}
								/>
							))}
						</div>
					)}
				</ScrollArea>

				{notifications.length > 0 && (
					<>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => {
								navigate("/admin/notifications");
								setOpen(false);
							}}
							className="justify-center text-sm text-primary cursor-pointer">
							View all notifications
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
