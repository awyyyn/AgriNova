import { Pagination } from ".";
import { Role } from "./enums";

export interface User {
	readonly id: string;
	email: string;
	firstName: string;
	lastName: string;
	photo?: string;
	role: Role;

	lastChangePassword?: string;

	createdAt: string;
}

export type UserTableData = Omit<User, "lastChangePassword">;

export interface UsersTableProps {
	users: UserTableData[];
	isLoading?: boolean;
	onView?: (user: UserTableData) => void;
	onEdit?: (user: UserTableData) => void;
	pagination?: Pagination;
	onDelete?: (userId: string) => void;
	onPageChange?: (page: number) => void;
}
