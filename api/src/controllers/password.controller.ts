import { prisma } from "@src/configs/prisma.js";
import { resend } from "@src/configs/resend.js";
import { checkPassword, hashPassword } from "@src/utils/bcrypt.js";
import {
	canChangePassword,
	daysRemainingToChangePassword,
} from "@src/utils/date-fns.js";
import { forgotPasswordEmail } from "@src/utils/emails.js";
import {
	generateResetPasswordToken,
	verifyResetPasswordToken,
	verifyToken,
} from "@src/utils/jsonwebtoken.js";
import { Request, Response } from "express";

export const changePasswordController = async (req: Request, res: Response) => {
	try {
		const { currentPassword, newPassword, userId } = req.body;

		const user = await prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			res.status(401).json({
				error: true,
				message: "Unauthorized!",
			});
			return;
		}

		const isAllowedToChangePassword = canChangePassword(
			user.lastChangePassword
		);

		if (!isAllowedToChangePassword) {
			const daysRemaining = daysRemainingToChangePassword(
				user.lastChangePassword
			);

			res.status(400).json({
				error: true,
				message: `You can change your password after ${daysRemaining} day(s).`,
			});

			return;
		}

		const isCurrentPasswordValid = checkPassword(
			currentPassword,
			user.password
		);

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
			data: { password: hashedNewPassword },
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
			where: { email: email.trim() },
		});

		if (alreadySentToken) {
			res.status(400).json({
				error: true,
				message: "A password reset token has already been sent to this email!",
			});
			return;
		}

		const user = await prisma.user.findFirst({
			where: { email: email.trim() },
		});

		if (user) {
			const resetToken = generateResetPasswordToken({
				email: user.email.trim(),
				id: user.id,
				role: user.role,
			});

			const link = `${
				process.env.FRONTEND_URL
			}/auth/reset-password?token=${resetToken}&email=${user.email.trim()}`;

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
