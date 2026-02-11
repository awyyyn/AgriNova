import { prisma } from "../configs/prisma.js";
import { checkPassword, hashPassword } from "../utils/bcrypt.js";
import {
	generateAccessToken,
	generateRefreshToken,
	generateResetPasswordToken,
	verifyResetPasswordToken,
	verifyToken,
} from "../utils/jsonwebtoken.js";
import { Request, Response } from "express";
import { createUserRegisteredNotification } from "./notification.controller.js";

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

		const accessToken = generateAccessToken(
			{
				email: user.email,
				id: user.id,
				role: user.role,
			},
			"7d",
		);
		const refreshToken = generateAccessToken(
			{
				email: user.email,
				id: user.id,
				role: user.role,
			},
			"7d",
		);

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
				password: await hashPassword(password),
				firstName,
				role: "USER",
				lastName: lastName || "",
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

		await createUserRegisteredNotification(data);

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

export const verifyTokenController = async (req: Request, res: Response) => {
	try {
		const token = req.headers.authorization?.split(" ")[1] || "";

		const decoded = verifyToken(token);

		if (!decoded) {
			res.status(400).json({
				error: true,
				message: "Invalid or expired token!",
			});
			return;
		}

		const user = await prisma.user.findFirst({ where: { id: decoded.id } });

		if (!user) {
			res.status(400).json({
				error: true,
				message: "Session invalidated.",
			});
			return;
		}

		const accessToken = generateAccessToken({
			email: user.email,
			id: user.id,
			role: user.role,
		});

		const refreshToken = generateRefreshToken({
			email: user.email,
			id: user.id,
			role: user.role,
		});

		const { password: _, ...data } = user;

		res.status(200).json({
			error: false,
			data: {
				accessToken,
				refreshToken,
				user: data,
			},
		});
	} catch (error) {
		console.error(`Error in resetPasswordController:`);
		console.error(error);
		res.status(500).json({
			message: "Internal server error!",
		});
	}
};
