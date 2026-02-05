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
import { UsersTableProps } from "@/types";

export function UsersTable({
	users = [],
	isLoading = false,
	pagination,
	columnVisibility,
	onView,
	onEdit,
	onDelete,
	onPageChange,
}: UsersTableProps & { columnVisibility?: Record<string, boolean> }) {
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
		<div className="w-full space-y-4">
			<div className="overflow-x-auto rounded-lg border border-border">
				<Table>
					<TableHeader>
						<TableRow className="bg-muted/50">
							{columnVisibility?.photo !== false && (
								<TableHead className="w-12">Photo</TableHead>
							)}
							{columnVisibility?.name !== false && <TableHead>Name</TableHead>}
							{columnVisibility?.email !== false && (
								<TableHead>Email</TableHead>
							)}
							{columnVisibility?.role !== false && (
								<TableHead className="hidden md:table-cell">Role</TableHead>
							)}
							{columnVisibility?.dateJoined !== false && (
								<TableHead className="hidden lg:table-cell">
									Date Joined
								</TableHead>
							)}
							{columnVisibility?.actions !== false && (
								<TableHead className="w-12 text-right">Actions</TableHead>
							)}
						</TableRow>
					</TableHeader>
					<TableBody>
						{users.map((user) => (
							<TableRow
								key={user.id}
								className="hover:bg-muted/50 transition-colors">
								{columnVisibility?.photo !== false && (
									<TableCell className="font-medium">
										<Avatar className="h-8 w-8">
											<AvatarImage
												src={user.photo || ""}
												alt={user.firstName}
											/>
											<AvatarFallback>
												{getInitials(user.firstName, user.lastName)}
											</AvatarFallback>
										</Avatar>
									</TableCell>
								)}
								{columnVisibility?.name !== false && (
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
								)}
								{columnVisibility?.email !== false && (
									<TableCell className="hidden sm:table-cell">
										{user.email}
									</TableCell>
								)}
								{columnVisibility?.role !== false && (
									<TableCell className="hidden md:table-cell">
										<Badge className={getRoleColor(user.role)}>
											{user.role}
										</Badge>
									</TableCell>
								)}
								{columnVisibility?.dateJoined !== false && (
									<TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
										{format(new Date(user.createdAt), "MMM dd, yyyy")}
									</TableCell>
								)}
								{columnVisibility?.actions !== false && (
									<TableCell className="text-right">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant="ghost"
													size="sm"
													className="h-8 w-8 p-0">
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
								)}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			{pagination && (
				<div className="flex items-center justify-between">
					<p className="text-sm text-muted-foreground">
						Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
						{Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
						{pagination.total} users
					</p>
					<div className="flex gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => onPageChange?.(pagination.page - 1)}
							disabled={!pagination.hasPreviousPage}>
							Previous
						</Button>
						<div className="flex items-center gap-2">
							{Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
								.filter((p) => {
									const diff = Math.abs(p - pagination.page);
									return (
										diff === 0 ||
										diff === 1 ||
										p === 1 ||
										p === pagination.totalPages
									);
								})
								.map((p, i, arr) => {
									if (i > 0 && arr[i - 1] !== p - 1) {
										return (
											<span
												key={`ellipsis-${p}`}
												className="text-muted-foreground">
												...
											</span>
										);
									}
									return (
										<Button
											key={p}
											variant={p === pagination.page ? "default" : "outline"}
											size="sm"
											onClick={() => onPageChange?.(p)}>
											{p}
										</Button>
									);
								})}
						</div>
						<Button
							variant="outline"
							size="sm"
							onClick={() => onPageChange?.(pagination.page + 1)}
							disabled={!pagination.hasNextPage}>
							Next
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
