import { z } from "zod";

export const loginForm = z.object({
	email: z
		.email({ message: "Invalid email address" })
		.min(1, { message: "Email is required" }),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginForm = z.infer<typeof loginForm>;

export const emailForm = z.object({
	email: z
		.email({ message: "Invalid email address" })
		.min(1, { message: "Email is required" }),
});

export type EmailForm = z.infer<typeof emailForm>;
