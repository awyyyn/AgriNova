import { verifyToken } from "../utils/jsonwebtoken.js";
import { Request, Response, NextFunction } from "express";

export async function middleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	const decoded = verifyToken(token);

	if (!decoded) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	next();
}
