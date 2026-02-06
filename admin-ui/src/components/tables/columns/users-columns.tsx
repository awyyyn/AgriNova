import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/user";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "date-fns";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Eye } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const getRoleColor = (role: User["role"]) => {
	switch (role) {
		case "ADMIN":
			return "bg-red-100 text-red-800";
		case "SUPER_ADMIN":
			return "bg-blue-100 text-blue-800";
		case "USER":
			return "bg-gray-100 text-gray-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};

const getInitials = (firstName: string, lastName: string) => {
	return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

export const usersColumns: ColumnDef<User>[] = [
	{
		accessorKey: "id",
		header: "#",
		cell: ({ row }) => (
			<span className="text-sm text-muted-foreground">{row.index + 1}</span>
		),
		enableHiding: false,
	},
	{
		accessorKey: "email",
		header: "Email",
		cell: ({ row }) => {
			const user = row.original;
			return (
				<div className="flex items-center gap-3">
					<Avatar className="h-8 w-8">
						<AvatarImage
							src={user.photo || "/placeholder.svg"}
							alt={`${user.firstName} ${user.lastName}`}
						/>
						<AvatarFallback>
							{getInitials(user.firstName, user.lastName)}
						</AvatarFallback>
					</Avatar>
					<span className="text-sm">{row.getValue("email")}</span>
				</div>
			);
		},
		enableHiding: false,
	},
	{
		accessorKey: "firstName",
		header: "First Name",
		cell: ({ row }) => (
			<span className="text-sm">{row.getValue("firstName")}</span>
		),
	},
	{
		accessorKey: "lastName",
		header: "Last Name",
		cell: ({ row }) => (
			<span className="text-sm">{row.getValue("lastName")}</span>
		),
	},
	{
		accessorKey: "role",
		header: "Role",
		cell: ({ row }) => {
			const role = row.getValue("role") as User["role"];
			const label = (
				(row.getValue("role") as User["role"]) === "USER"
					? "Farmer"
					: (row.getValue("role") as string)
			).replace("_", " ");
			return (
				<Badge className={`capitalize ${getRoleColor(role)}`}>
					{label.toLowerCase()}
				</Badge>
			);
		},
	},
	{
		accessorKey: "createdAt",
		header: "Joined on",
		cell: ({ row }) => {
			const date = new Date(row.getValue("createdAt") as string);
			return (
				<span className="text-sm text-muted-foreground">
					{formatDate(date, "MMM dd, yyyy")}
				</span>
			);
		},
	},
	{
		accessorKey: "id",
		header: "Actions",
		cell: ({ row }) => {
			const userId = row.getValue("id") as string;
			return (
				<Tooltip>
					<TooltipTrigger>
						<Button asChild size="icon-sm" variant="outline">
							<Link to={`/admin/users/${userId}`}>
								<Eye />
							</Link>
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<span>View User Details</span>
					</TooltipContent>
				</Tooltip>
			);
		},
		enableSorting: false,
		enableHiding: false,
	},
];
