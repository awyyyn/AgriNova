"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Edit2, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { User as UserT } from "@/types";

export type User = Omit<UserT, "lastChangePassword">;
//     {
// 	id: string;
// 	firstName: string;
// 	lastName?: string;
// 	email: string;
// 	photo?: string;
// 	role: string;
// 	createdAt: Date | string;
// }

interface UsersTableProps {
	users: User[];
	isLoading?: boolean;
	onView?: (user: User) => void;
	onEdit?: (user: User) => void;
	onDelete?: (userId: string) => void;
}

export function UsersTable({
	users,
	isLoading = false,
	onView,
	onEdit,
	onDelete,
}: UsersTableProps) {
	const getRoleColor = (role: string) => {
		const colors: Record<string, string> = {
			admin: "bg-red-100 text-red-800",
			user: "bg-blue-100 text-blue-800",
			moderator: "bg-purple-100 text-purple-800",
		};
		return colors[role.toLowerCase()] || "bg-gray-100 text-gray-800";
	};

	const getInitials = (firstName: string, lastName?: string) => {
		return `${firstName[0]}${lastName ? lastName[0] : ""}`.toUpperCase();
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-64">
				<p className="text-muted-foreground">Loading users...</p>
			</div>
		);
	}

	if (users.length === 0) {
		return (
			<div className="flex items-center justify-center h-64">
				<p className="text-muted-foreground">No users found</p>
			</div>
		);
	}

	return (
		<div className="w-full overflow-x-auto rounded-lg border border-border">
			<Table>
				<TableHeader>
					<TableRow className="bg-muted/50">
						<TableHead className="w-12">Photo</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead className="hidden md:table-cell">Role</TableHead>
						<TableHead className="hidden lg:table-cell">Date Joined</TableHead>
						<TableHead className="w-12 text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map((user) => (
						<TableRow
							key={user.id}
							className="hover:bg-muted/50 transition-colors">
							<TableCell className="font-medium">
								<Avatar className="h-8 w-8">
									<AvatarImage src={user.photo || ""} alt={user.firstName} />
									<AvatarFallback>
										{getInitials(user.firstName, user.lastName)}
									</AvatarFallback>
								</Avatar>
							</TableCell>
							<TableCell>
								<div className="flex flex-col">
									<p className="font-medium">
										{user.firstName} {user.lastName || ""}
									</p>
									<p className="md:hidden text-sm text-muted-foreground">
										{user.email}
									</p>
								</div>
							</TableCell>
							<TableCell className="hidden sm:table-cell">
								{user.email}
							</TableCell>
							<TableCell className="hidden md:table-cell">
								<Badge className={getRoleColor(user.role)}>{user.role}</Badge>
							</TableCell>
							<TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
								{format(new Date(user.createdAt), "MMM dd, yyyy")}
							</TableCell>
							<TableCell className="text-right">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" size="sm" className="h-8 w-8 p-0">
											<MoreHorizontal className="h-4 w-4" />
											<span className="sr-only">Open menu</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										{onView && (
											<DropdownMenuItem onClick={() => onView(user)}>
												<Eye className="mr-2 h-4 w-4" />
												View
											</DropdownMenuItem>
										)}
										{onEdit && (
											<DropdownMenuItem onClick={() => onEdit(user)}>
												<Edit2 className="mr-2 h-4 w-4" />
												Edit
											</DropdownMenuItem>
										)}
										{onDelete && (
											<DropdownMenuItem
												onClick={() => onDelete(user.id)}
												className="text-destructive">
												<Trash2 className="mr-2 h-4 w-4" />
												Delete
											</DropdownMenuItem>
										)}
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
