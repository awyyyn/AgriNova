import { verifyToken } from "../utils/jsonwebtoken.js";
import { ExtendedError, Socket } from "socket.io";

export async function SocketIOMiddleware(
	socket: Socket,
	next: (err?: ExtendedError | undefined) => void,
) {
	const token = socket.handshake.auth.token;

	if (!token) {
		return next(new Error("Authentication error"));
	}

	try {
		const decoded = verifyToken(token);

		socket.data.user = decoded;

		next();
	} catch (error) {
		next(new Error("Authentication error"));
	}
}
