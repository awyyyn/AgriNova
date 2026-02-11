import { addMinutes, format, isBefore } from "date-fns";
import { prisma, resend } from "../configs/index.js";
import {
	checkPassword,
	hashPassword,
	canChangePassword,
	daysRemainingToChangePassword,
	forgotPasswordEmail,
	generateResetPasswordToken,
	verifyResetPasswordToken,
} from "../utils/index.js";
import { Request, Response } from "express";

export const changePasswordController = async (req: Request, res: Response) => {
	try {
		const { currentPassword, newPassword } = req.body;

		const user = await prisma.user.findUnique({
			where: { id: req.userId },
		});

		if (!user) {
			res.status(401).json({
				error: true,
				message: "Unauthorized!",
			});
			return;
		}

		const isAllowedToChangePassword = canChangePassword(
			user?.lastChangePassword,
		);

		if (!isAllowedToChangePassword) {
			const daysRemaining = daysRemainingToChangePassword(
				user?.lastChangePassword,
			);

			res.status(400).json({
				error: true,
				message: `You can change your password after ${daysRemaining} day(s).`,
			});

			return;
		}

		const isCurrentPasswordValid = await checkPassword(
			currentPassword,
			user.password,
		);

		console.log(isCurrentPasswordValid, "qqq");

		if (!isCurrentPasswordValid) {
			res.status(400).json({
				error: true,
				message: "Current password is incorrect!",
			});
			return;
		}

		const hashedNewPassword = await hashPassword(newPassword);

		await prisma.user.update({
			where: { id: user.id },
			data: { password: hashedNewPassword, lastChangePassword: new Date() },
		});

		res.status(200).json({
			error: false,
			message: "Password has been changed successfully!",
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
			where: { email: String(email).trim() },
			orderBy: { createdAt: "desc" },
		});

		if (alreadySentToken) {
			const expiresAt = addMinutes(new Date(alreadySentToken.createdAt), 5);

			const now = new Date();
			const isExpired = isBefore(expiresAt, now);

			// ❌ Token still valid → block resend
			if (!isExpired) {
				res.status(400).json({
					error: true,
					message:
						"A password reset token has already been sent to this email. Please wait 5 minutes.",
				});
				return;
			}
		}

		const user = await prisma.user.findFirst({
			where: { email: String(email).trim() },
		});

		if (user) {
			const resetToken = generateResetPasswordToken({
				email: String(user.email).trim(),
				id: user.id,
				role: user.role,
			});

			const link = `${
				process.env.CLIENT_URL
			}/auth/reset-password?token=${resetToken}&email=${String(
				user.email,
			).trim()}`;

			const response = await resend.emails.send({
				to: user.email,
				subject: "Password Reset Instructions",
				from: process.env.EMAIL!,
				html: forgotPasswordEmail(link, user.firstName),
			});

			if (response.error) {
				res.status(400).json({
					error: true,
					message: "Failed to send password reset email!",
				});
				return;
			}

			await prisma.token.deleteMany({
				where: { email: String(user.email).trim() },
			});

			await prisma.token.create({
				data: {
					email: user.email,
					token: resetToken,
				},
			});
		}

		res.status(200).json({
			error: false,
			message: `If the email address ${email} is associated with an account, you’ll receive a password reset link shortly.`,
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
				message:
					"Your link is expired, please request a new password reset link.",
			});
			return;
		}

		if (decoded.email !== email) {
			res.status(400).json({
				error: true,
				message: "Unauthorized!",
			});
			return;
		}

		const isTokenExists = await prisma.token.findFirst({
			where: { email: String(email).trim(), token },
			orderBy: { createdAt: "desc" },
		});

		if (!isTokenExists) {
			res.status(400).json({
				error: true,
				message:
					"Your link is expired, please request a new password reset link.",
			});
			return;
		}

		const isExpired = addMinutes(new Date(isTokenExists.createdAt), 5);

		if (isBefore(isExpired, new Date())) {
			res.status(400).json({
				error: true,
				message:
					"Your link is expired, please request a new password reset link.",
			});
			return;
		}

		const hashedPassword = await hashPassword(password);

		await prisma.token.deleteMany({
			where: { email: String(email).trim() },
		});

		await prisma.user.update({
			where: { email: String(email).trim() },
			data: { password: hashedPassword, lastChangePassword: new Date() },
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
