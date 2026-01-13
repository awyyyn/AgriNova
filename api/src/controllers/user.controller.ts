import { prisma } from "@src/configs/prisma.js";
import { Request, Response } from "express";

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
