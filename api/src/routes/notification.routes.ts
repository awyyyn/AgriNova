import { Router } from "express";
import {
	deleteNotification,
	getAllNotifications,
	markAllAsRead,
	markAsRead,
} from "../controllers/notification.controller.js";

const router = Router();

// router.get("/unread-count", getUnreadCount);
router.get("/", getAllNotifications);
router.patch("/:id/read", markAsRead);
router.patch("/read-all", markAllAsRead);
router.delete("/:id", deleteNotification);

export default router;
