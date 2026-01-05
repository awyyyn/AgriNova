import { Role as UserRole } from "@src/types/index.js";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
export interface PayloadArgs {
	id: string;
	email: string;
	role: UserRole;
}

type JWTPayload = PayloadArgs & JwtPayload;

export const generateAccessToken = (
	payload: PayloadArgs,
	expiresIn: SignOptions["expiresIn"] = "2h"
) => {
	const accessSecret = process.env.ACCESS_TOKEN!;
	return jwt.sign(payload, accessSecret!, {
		expiresIn,
	});
};

export const generateRefreshToken = (payload: PayloadArgs) => {
	const refreshSecret = process.env.REFRESH_TOKEN!;
	return jwt.sign(payload, refreshSecret!, {
		expiresIn: "2h",
	});
};

export const verifyToken = (token: string): JWTPayload | null => {
	try {
		const accessSecret = process.env.ACCESS_TOKEN!;
		const decoded = <JWTPayload>jwt.verify(token, accessSecret!);
		return decoded;
		// return decoded;
	} catch (error) {
		console.error("Verifying Token Error");
		console.error(error);
		return null;
	}
};

export const generateResetPasswordToken = (payload: PayloadArgs) => {
	const resetSecret = process.env.RESET_TOKEN!;

	return jwt.sign(payload, resetSecret!, {
		expiresIn: "2h",
	});
};

export const verifyResetPasswordToken = (token: string): JWTPayload | null => {
	const resetSecret = process.env.RESET_TOKEN!;

	try {
		const decoded = <JWTPayload>jwt.verify(token, resetSecret!);
		return decoded;
	} catch (error) {
		console.error("Verifying Reset Password Token Error");
		console.error(error);
		return null;
	}
};
