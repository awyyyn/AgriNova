import { Role } from "@src/types/index.js";
import { verifyToken } from "@src/utils/jsonwebtoken.js";
import { Request, Response } from "express";

export function Authorize(allowedRoles: Role[] | "*") {
	return (req: Request, res: Response, next: Function) => {
		const token = req.headers.authorization?.split(" ")[1] || "";

		if (!token) {
			res.status(401).json({ message: "Unauthorized" });
			return;
		}

		const decoded = verifyToken(token);

		if (
			!decoded ||
			(!allowedRoles.includes(decoded.role) && allowedRoles !== "*")
		) {
			res.status(403).json({ message: "Forbidden" });
			return;
		}

		next();
	};
}
