import { Role } from "./enums";

export interface User {
	readonly id: string;
	email: string;
	firstName: string;
	lastName: string;
	role: Role;
	lastChangePassword: string | null;
	createdAt: string;
}
