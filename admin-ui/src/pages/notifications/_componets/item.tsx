import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NotificationType } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Bug, Leaf, Trash2 } from "lucide-react";

interface NotificationItemProps {
	notification: NotificationType;
	onClick: () => void;
	onDelete: (e: React.MouseEvent) => void;
	getIcon: (type: NotificationType["type"]) => React.ReactNode;
}

export function NotificationItem({
	notification,
	onClick,
	onDelete,
	getIcon,
}: NotificationItemProps) {
	return (
		<div
			onClick={onClick}
			className={cn(
				"flex items-start gap-3 p-3 cursor-pointer hover:bg-muted/50 transition-colors relative group",
				!notification.read && "bg-muted/30",
			)}>
			{/* Icon */}
			<div
				className={cn(
					"rounded-full p-2 mt-1",
					notification.type === "user_registered" &&
						"bg-blue-100 dark:bg-blue-950",
					notification.type === "plant_analyzed" &&
						"bg-green-100 dark:bg-green-950",
					notification.type === "system" && "bg-amber-100 dark:bg-amber-950",
				)}>
				{getIcon(notification.type)}
			</div>

			{/* Content */}
			<div className="flex-1 space-y-1 min-w-0">
				<div className="flex items-start justify-between gap-2">
					<p className="text-sm font-medium leading-none">
						{notification.title}
					</p>
					{!notification.read && (
						<div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1" />
					)}
				</div>

				<p className="text-sm text-muted-foreground line-clamp-2">
					{notification.message}
				</p>

				{/* Additional data badges */}
				{notification.data && (
					<div className="flex flex-wrap gap-1 mt-2">
						{notification.data.hasPest !== undefined && (
							<Badge
								variant={
									notification.data.hasPest ? "destructive" : "secondary"
								}
								className="text-xs h-5 gap-1">
								{notification.data.hasPest ? (
									<>
										<Bug className="h-3 w-3" />
										Pest Found
									</>
								) : (
									<>
										<Leaf className="h-3 w-3" />
										Healthy
									</>
								)}
							</Badge>
						)}
						{notification.data.plantType && (
							<Badge variant="outline" className="text-xs h-5 capitalize">
								{notification.data.plantType}
							</Badge>
						)}
					</div>
				)}

				<p className="text-xs text-muted-foreground">
					{formatDistanceToNow(new Date(notification.createdAt), {
						addSuffix: true,
					})}
				</p>
			</div>

			{/* Delete button (shows on hover) */}
			<Button
				variant="ghost"
				size="icon"
				onClick={onDelete}
				className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
				<Trash2 className="h-3 w-3" />
			</Button>
		</div>
	);
}
