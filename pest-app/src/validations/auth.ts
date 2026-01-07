import * as Yup from "yup";

/* =========================
   Login Form
========================= */

export const loginForm = Yup.object({
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),

	password: Yup.string()
		.min(6, "Password must be at least 6 characters")
		.required("Password is required"),
});

export type LoginForm = Yup.InferType<typeof loginForm>;

/* =========================
   Email Only Form
========================= */

export const emailForm = Yup.object({
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
});

export type EmailForm = Yup.InferType<typeof emailForm>;
