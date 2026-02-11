import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import Router from "./routes/index.js";
import { setSocketIO } from "./controllers/notification.controller.js";
import { SocketIOMiddleware } from "./middlewares/socket-middleware.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
	cors: {
		origin: process.env.CLIENT_URL,
		credentials: true,
		methods: ["GET", "POST"],
	},
});

setSocketIO(io);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.use(SocketIOMiddleware);

io.on("connection", (socket) => {
	const user = socket.data.user;

	console.log(`Client connected: ${socket.id} (${user.email})`);

	// Join admin room if user is admin
	if (user.role === "ADMIN" || user.role === "SUPER_ADMIN") {
		socket.join("admins");
		console.log(`Admin ${user.email} joined admins room`);
	}

	// Send connection confirmation
	socket.emit("connected", {
		message: "Connected to notification server",
		userId: user.id,
		role: user.role,
	});

	// Handle disconnection
	socket.on("disconnect", () => {
		console.log(`Client disconnected: ${socket.id}`);
	});

	// Optional: Handle manual notification request
	socket.on("request-notifications", async () => {
		// Could fetch and send latest notifications here
		socket.emit("notifications-sent");
	});
});

app.get("/health-check", (req: Request, res: Response) => {
	res.status(200).json({ status: "ok" });
});

app.use("/api", Router);

httpServer.listen(3333, () => {
	console.log(`🚀 Server running on http://localhost:${3333}`);
	console.log(`🔌 Socket.IO server ready`);
	console.log(`📡 Frontend URL: ${process.env.CLIENT_URL}`);
});
