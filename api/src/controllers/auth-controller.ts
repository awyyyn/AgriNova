import { prisma } from "@src/configs/prisma.js";
import { checkPassword } from "@src/utils/bcrypt.js";
import { generateAccessToken } from "@src/utils/jsonwebtoken.js";
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

		// eslint-disable-next-line
		const { password: _, ...data } = user;

		res.status(200).json({
			error: false,
			data: {
				accessToken,
				user: data,
			},
			message: "Success!",
		});
	} catch (error) {
		console.error(`Error in loginController:`);
		console.error(error);
		res.status(500).json({
			message: "Internal server error!",
		});
	}
};
