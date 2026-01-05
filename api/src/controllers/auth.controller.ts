import { prisma } from "@src/configs/prisma.js";
import { checkPassword } from "@src/utils/bcrypt.js";
import {
	generateAccessToken,
	generateRefreshToken,
	verifyResetPasswordToken,
} from "@src/utils/jsonwebtoken.js";
import { Request, Response } from "express";

export const loginController = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const user = await prisma.user.findUnique({
			where: { email: email.trim() },
		});

		if (!user) {
			res
				.status(400)
				.json({ error: true, errorMessage: "User is not registered!" });
			return;
		}

		const isPasswordCorrect = await checkPassword(password, user.password);

		if (!isPasswordCorrect) {
			res.status(400).json({
				error: true,
				message: "Incorrect email or password!",
			});
			return;
		}

		const accessToken = generateAccessToken({
			email: user.email,
			id: user.id,
			role: user.role,
		});
		const refreshToken = generateAccessToken({
			email: user.email,
			id: user.id,
			role: user.role,
		});

		// eslint-disable-next-line
		const { password: _, ...data } = user;

		res.status(200).json({
			error: false,
			data: {
				accessToken,
				refreshToken,
				user: data,
			},
			message: "Success!",
		});
	} catch (error) {
		console.error(`Error in registerController:`);
		console.error(error);
		res.status(500).json({
			message: "Internal server error!",
		});
	}
};

export const registerController = async (req: Request, res: Response) => {
	try {
		const { email, password, firstName, lastName } = req.body;

		const existingUser = await prisma.user.findUnique({
			where: { email: email.trim() },
		});

		if (existingUser) {
			res
				.status(400)
				.json({ error: true, errorMessage: "User already exists!" });
			return;
		}

		const newUser = await prisma.user.create({
			data: {
				email: email.trim(),
				password,
				firstName,
				role: "USER",
				lastName,
			},
		});

		if (!newUser) {
			res
				.status(500)
				.json({ error: true, errorMessage: "Failed to create user!" });
			return;
		}

		// eslint-disable-next-line
		const { password: _, ...data } = newUser;

		const accessToken = generateAccessToken({
			email: newUser.email,
			id: newUser.id,
			role: newUser.role,
		});

		const refreshToken = generateRefreshToken({
			email: newUser.email,
			id: newUser.id,
			role: newUser.role,
		});

		res.status(201).json({
			error: false,
			data: {
				accessToken,
				user: data,
				refreshToken,
			},
			message: "User registered successfully!",
		});
	} catch (error) {
		console.error(`Error in loginController:`);
		console.error(error);
		res.status(500).json({
			message: "Internal server error!",
		});
	}
};

export const forgotPasswordController = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;

		if (!email) {
			res.status(400).json({
				error: true,
				message: "Email is required!",
			});
			return;
		}

		const alreadySentToken = await prisma.token.findFirst({
			where: { email: email.trim() },
		});

		if (alreadySentToken) {
			res.status(400).json({
				error: true,
				message: "A password reset token has already been sent to this email!",
			});
			return;
		}

		res.status(200).json({
			error: false,
			message: "Please check your email for password reset instructions!",
		});
	} catch (error) {
		console.error(`Error in forgotPasswordController:`);
		console.error(error);
		res.status(500).json({
			message: "Internal server error!",
		});
	}
};

export const resetPasswordController = async (req: Request, res: Response) => {
	try {
		const { token, password, email } = req.body;

		const decoded = verifyResetPasswordToken(token);

		if (!decoded) {
			res.status(400).json({
				error: true,
				message: "Invalid or expired token!",
			});
			return;
		}

		if (decoded.email !== email) {
			res.status(400).json({
				error: true,
				message: "Invalid or expired token!",
			});
			return;
		}

		await prisma.user.update({
			where: { email: email.trim() },
			data: { password },
		});

		res.status(200).json({
			error: false,
			message: "Password has been reset successfully!",
		});
	} catch (error) {
		console.error(`Error in resetPasswordController:`);
		console.error(error);
		res.status(500).json({
			message: "Internal server error!",
		});
	}
};
