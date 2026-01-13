import * as Yup from "yup";

export const changePasswordForm = Yup.object({
	currentPassword: Yup.string().required("Current password is required"),

	password: Yup.string()
		.min(6, "Password must be at least 6 characters")
		.required("Password is required"),

	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password")], "Passwords must match")
		.required("Confirm password is required"),
});

export type ChangePasswordForm = Yup.InferType<typeof changePasswordForm>;
