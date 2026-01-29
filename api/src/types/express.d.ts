import { User } from "../generated/prisma/client.ts";
import "express";

declare module "express-serve-static-core" {
	interface Request {
		userId?: string;
		role?: User["role"];
	}
}
