import { Request, Response } from "express";
import { AppError } from "../utils/appError.js";

export const globalErrorHandler = (
	err: Error | AppError,
	req: Request,
	res: Response
	// next: NextFunction,
) => {
	const statusCode = err instanceof AppError ? err.statusCode : 500;
	const message = err.message || "Internal Server Error";

	// In 2025, it is standard practice to hide stack traces in production
	res.status(statusCode).json({
		status: "error",
		code: err instanceof AppError ? err.code : "INTERNAL_SERVER_ERROR",
		message,
		...(process.env.NODE_ENV === "development" && { stack: err.stack }),
	});
};
