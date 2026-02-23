import { prisma } from "../configs/prisma.js";
import { Server } from "socket.io";
import { Request, Response } from "express";

// Socket.IO instance
let io: Server;

export function setSocketIO(socketIO: Server) {
	io = socketIO;
}

export async function getAllNotifications(req: Request, res: Response) {
	try {
		const notifications = await prisma.notification.findMany({
			where: {
				recipientRole: {
					has: req.role,
				},
			},
			orderBy: {
				createdAt: "desc",
			},
			take: 50, // Limit to recent 50
		});

		const unreadCount = await prisma.notification.count({
			where: {
				recipientRole: {
					has: req.role,
				},
				read: false,
			},
		});

		return res.json({
			success: true,
			notifications,
			unreadCount,
			total: notifications.length,
		});
	} catch (error) {
		console.error("Error fetching notifications:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to fetch notifications",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
}

export async function markAsRead(req: Request, res: Response) {
	try {
		const { id } = req.params;

		const notification = await prisma.notification.update({
			where: { id },
			data: { read: true },
		});

		return res.json({
			success: true,
			notification,
		});
	} catch (error) {
		console.error("Error marking notification as read:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to mark notification as read",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
}

export async function markAllAsRead(req: Request, res: Response) {
	try {
		await prisma.notification.updateMany({
			where: {
				recipientRole: {
					has: req.role,
				},
				read: false,
			},
			data: {
				read: true,
			},
		});

		return res.json({
			success: true,
			message: "All notifications marked as read",
		});
	} catch (error) {
		console.error("Error marking all as read:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to mark all as read",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
}

export async function deleteNotification(req: Request, res: Response) {
	try {
		const { id } = req.params;

		await prisma.notification.delete({
			where: { id },
		});

		return res.json({
			success: true,
			message: "Notification deleted",
		});
	} catch (error) {
		console.error("Error deleting notification:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to delete notification",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
}

export async function createUserRegisteredNotification(user: any) {
	try {
		const notification = await prisma.notification.create({
			data: {
				type: "user_registered",
				title: "New User Registered",
				message: `${user.firstName} ${user.lastName || ""} just registered`,
				data: {
					userId: user.id,
					userName: `${user.firstName} ${user.lastName || ""}`.trim(),
					userEmail: user.email,
				},
				recipientRole: ["ADMIN", "SUPER_ADMIN"],
				read: false,
			},
		});

		// Emit via Socket.IO to all connected admins
		if (io) {
			io.to("admins").emit("notification", notification);
		}

		return notification;
	} catch (error) {
		console.error("Error creating user notification:", error);
	}
}

export async function createPlantAnalyzedNotification(
	analysis: any,
	userId: any,
) {
	try {
		const notification = await prisma.$transaction(async (prsma) => {
			const user = await prsma.user.findUnique({
				where: { id: userId },
			});

			if (!user) return null;

			return await prsma.notification.create({
				data: {
					type: "plant_analyzed",
					title: analysis.hasPestFound
						? "⚠️ Pest Detected in Analysis"
						: "✅ Plant Analysis Completed",
					message: `${user.firstName} analyzed a ${analysis.type}${
						analysis.plantIdentification?.commonName
							? ` (${analysis.plantIdentification.commonName})`
							: ""
					}`,
					data: {
						userId: user.id,
						userName: `${user.firstName} ${user.lastName || ""}`.trim(),
						plantId: analysis.id,
						analysisId: analysis.id,
						plantType: analysis.type,
						hasPest: analysis.hasPestFound,
					},
					recipientRole: ["ADMIN", "SUPER_ADMIN"],
					read: false,
				},
			});
		});

		// Emit via Socket.IO to all connected admins
		if (io) {
			io.to("admins").emit("notification", notification);
		}

		return notification;
	} catch (error) {
		console.error("Error creating plant notification:", error);
	}
}

export async function createPlantAnalyzedDoneNotification(
	analysis: any,
	userId: any,
) {
	try {
		const notification = await prisma.$transaction(async (prsma) => {
			const user = await prsma.user.findUnique({
				where: { id: userId },
			});

			if (!user) return null;

			const message = `${user.firstName} completed an analysis.`;

			return await prsma.notification.create({
				data: {
					type: "plant_analyzed_done",
					title: "✅ Plant Analysis Completed",
					message,
					data: {
						userId: user.id,
						userName: `${user.firstName} ${user.lastName || ""}`.trim(),
						plantId: analysis.id,
						analysisId: analysis.id,
						plantType: analysis.type,
						hasPest: analysis.hasPestFound,
					},
					recipientRole: ["ADMIN", "SUPER_ADMIN"],
					read: false,
				},
			});
		});

		// Emit via Socket.IO to all connected admins
		if (io) {
			io.to("admins").emit("notification", notification);
		}

		return notification;
	} catch (error) {
		console.error("Error creating plant notification:", error);
	}
}

/**
 * Create system notification (for custom use)
 */
export async function createSystemNotification(
	title: string,
	message: string,
	data?: any,
) {
	try {
		const notification = await prisma.notification.create({
			data: {
				type: "system",
				title,
				message,
				data,
				recipientRole: ["ADMIN", "SUPER_ADMIN"],
				read: false,
			},
		});

		if (io) {
			io.to("admins").emit("notification", notification);
		}

		return notification;
	} catch (error) {
		console.error("Error creating system notification:", error);
	}
}
