import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface User {
	id: string;
	email: string;
	name: string;
	role: string;
	analysisCount: number;
}

interface ActiveUsersProps {
	users: User[];
}

export function ActiveUsers({ users }: ActiveUsersProps) {
	if (users.length === 0) {
		return (
			<div className="text-center py-8 text-muted-foreground">
				No active users
			</div>
		);
	}

	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	return (
		<div className="space-y-4">
			{users.slice(0, 8).map((user) => (
				<div key={user.id} className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Avatar className="h-9 w-9">
							<AvatarFallback className="text-xs">
								{getInitials(user.name)}
							</AvatarFallback>
						</Avatar>
						<div className="space-y-1">
							<p className="text-sm font-medium leading-none">{user.name}</p>
							<p className="text-xs text-muted-foreground">{user.email}</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Badge variant="outline" className="text-xs">
							{user.analysisCount}
						</Badge>
					</div>
				</div>
			))}
		</div>
	);
}
