import { readUser, readUsers } from "../services/user.service.js";
import { prisma } from "../configs/prisma.js";
import { checkPassword } from "../utils/bcrypt.js";
import { Request, Response } from "express";
import { User } from "../types/index.js";

export const updateProfileController = async (req: Request, res: Response) => {
	try {
		const { firstName, lastName, userId } = req.body;

		const updatedUser = await prisma.user.update({
			where: { id: userId },
			data: {
				firstName,
				lastName,
			},
			omit: {
				password: true,
			},
		});

		if (!updatedUser) {
			res.status(400).json({ error: true, message: "Profile update failed" });
			return;
		}

		res.status(200).json({
			error: false,
			data: updatedUser,
			message: "Profile updated successfully",
		});
	} catch (error) {
		console.error(`Error in updateProfileController:`);
		console.error(error);
		res.status(500).json({
			message: "Internal server error!",
		});
	}
};

export const deleteUserController = async (req: Request, res: Response) => {
	try {
		const { userId, password } = req.body;

		const user = await prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			res.status(400).json({ error: true, message: "UnAuthorized!" });
			return;
		}

		const isPasswordCorrect = await checkPassword(password, user.password);

		if (!isPasswordCorrect) {
			res.status(400).json({
				error: true,
				message: "Incorrect password!",
			});
			return;
		}

		await prisma.user.delete({
			where: { id: userId },
		});

		res.status(200).json({
			error: false,
			message: "User deleted successfully",
		});
	} catch (error) {
		console.error(`Error in deleteUserController:`);
		console.error(error);
		res.status(500).json({
			message: "Internal server error!",
		});
	}
};

export const readUsersController = async (req: Request, res: Response) => {
	try {
		const {
			page,
			limit,
			query,
		}: { page?: number; limit?: number; query?: string } = req.query;
		const roles: User["role"][] | undefined = req.body?.roles;

		const response = await readUsers({
			query,
			pagination: page && limit ? { page, limit } : undefined,
			roles: roles || [],
		});

		res.status(200).json(response);
	} catch (error) {
		console.error(`Error in readUsersController:`);
		console.error(error);
		res.status(500).json({
			message: "Internal server error!",
		});
	}
};

export const readUserController = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!id) {
			res.status(400).json({
				message: "ID or email is required!",
			});
			return;
		}

		const data = await readUser(id);

		res.status(200).json({
			data,
		});
	} catch (error) {
		console.error(`Error in readUserController:`);
		console.error(error);
		res.status(500).json({
			message: "Internal server error!",
		});
	}
};
