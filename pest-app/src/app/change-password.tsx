import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Formik, FormikHelpers } from "formik";
import { ChangePasswordForm, changePasswordForm } from "@src/validations";
import { VStack } from "@src/components/ui/vstack";
import {
	FormControl,
	FormControlError,
	FormControlErrorText,
	FormControlHelper,
	FormControlHelperText,
	FormControlLabel,
	FormControlLabelText,
} from "@src/components/ui/form-control";
import {
	Input,
	InputField,
	InputIcon,
	InputSlot,
} from "@src/components/ui/input";
import { EyeIcon, EyeOffIcon, Key } from "lucide-react-native";
import { useAuthStore } from "@src/store/useAuthStore";
import { HStack } from "@src/components/ui/hstack";
import { formatDate } from "date-fns";
import { toast } from "sonner-native";
import { useRouter } from "expo-router";

export default function Password() {
	const { user, token, setUser } = useAuthStore();
	const router = useRouter();
	const [showPassword, setShowPassword] = React.useState({
		currentPassword: false,
		password: false,
		confirmPassword: false,
	});

	async function handleChangePassword(
		values: ChangePasswordForm,
		helpers: FormikHelpers<ChangePasswordForm>,
	) {
		try {
			console.log("Changing password...");
			const link = `${process.env.EXPO_PUBLIC_API_URL}/user/change-password`;

			const response = await fetch(link, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					currentPassword: values.currentPassword,
					newPassword: values.password,
				}),
			});

			const data = await response.json();

			if (response.status !== 200 || data.error) {
				throw new Error(data.message || "Failed to change password");
			}
			toast.success("Password Updated", {
				description: "Your password was changed successfully.",
				duration: 5000,
				richColors: true,
			});
			if (user) {
				setUser({ ...user, lastChangePassword: new Date().toISOString() });
			}
			router.dismissTo("/settings");
		} catch (error) {
			toast.error("Something went wrong.", {
				description: (error as Error).message,
			});
		} finally {
			helpers.setSubmitting(false);
		}
	}

	return (
		<View className="p-[4vw] flex-1 bg-[#ECFDF0]">
			<Text className="text-xl leading-tight">
				Choose a strong password and don&apos;t reuse it for other accounts
			</Text>

			{user?.lastChangePassword && (
				<HStack>
					<Text className="text-lg text-gray-600  ">
						Last changed password on:{" "}
					</Text>
					<Text className="font-semibold">
						{formatDate(user.lastChangePassword, "MMMM dd, yyyy")}
					</Text>
				</HStack>
			)}

			<Formik
				initialValues={{
					currentPassword: "",
					password: "",
					confirmPassword: "",
				}}
				validationSchema={changePasswordForm}
				onSubmit={handleChangePassword}>
				{({
					handleBlur,
					handleChange,
					values,
					errors,
					isSubmitting,
					touched,
					handleSubmit,
				}) => {
					return (
						<VStack space="lg" className="mt-5">
							<FormControl
								isInvalid={
									!!(errors.currentPassword && touched.currentPassword)
								}>
								<FormControlLabel>
									<FormControlLabelText className="text-xl">
										Current Password:
									</FormControlLabelText>
								</FormControlLabel>
								<Input
									className="bg-[#FEEDED]  rounded-full py-1 border border-[#2e7d32] active:border-[#2e7d32]"
									size="xl"
									isReadOnly={isSubmitting}>
									<InputSlot className="pl-3">
										<InputIcon color="#009951" as={Key} />
									</InputSlot>
									<InputField
										onChangeText={handleChange("currentPassword")}
										onBlur={handleBlur("currentPassword")}
										placeholder="********"
										placeholderTextColor="#2e7d3275"
										value={values.currentPassword}
										type={showPassword.currentPassword ? "text" : "password"}
									/>
									<InputSlot
										className="pr-3"
										onPress={() =>
											setShowPassword((p) => ({
												...p,
												currentPassword: !p.currentPassword,
											}))
										}>
										<InputIcon
											as={showPassword.currentPassword ? EyeIcon : EyeOffIcon}
										/>
									</InputSlot>
								</Input>
								<FormControlError>
									<FormControlErrorText className="text-xl">
										{errors.currentPassword}
									</FormControlErrorText>
								</FormControlError>
							</FormControl>
							<FormControl isInvalid={!!(errors.password && touched.password)}>
								<FormControlLabel>
									<FormControlLabelText className="text-xl">
										Current Password:
									</FormControlLabelText>
								</FormControlLabel>
								<Input
									className="bg-[#FEEDED] rounded-full py-1 border border-[#2e7d32] active:border-[#2e7d32]"
									size="xl"
									isReadOnly={isSubmitting}>
									<InputSlot className="pl-3">
										<InputIcon color="#009951" as={Key} />
									</InputSlot>
									<InputField
										onChangeText={handleChange("password")}
										onBlur={handleBlur("password")}
										placeholder="********"
										placeholderTextColor="#2e7d3275"
										value={values.password}
										type={showPassword.password ? "text" : "password"}
									/>
									<InputSlot
										className="pr-3"
										onPress={() =>
											setShowPassword((p) => ({
												...p,
												password: !p.password,
											}))
										}>
										<InputIcon
											as={showPassword.password ? EyeIcon : EyeOffIcon}
										/>
									</InputSlot>
								</Input>
								<FormControlHelper>
									<FormControlHelperText className="text-lg">
										Password strength: Use at least 8 characters. Don&apos;t use
										a password from another site, or something too obvious like
										your pet&apos;s name.
									</FormControlHelperText>
								</FormControlHelper>
								<FormControlError>
									<FormControlErrorText className="text-xl">
										{errors.password}
									</FormControlErrorText>
								</FormControlError>
							</FormControl>
							<FormControl
								isInvalid={
									!!(errors.confirmPassword && touched.confirmPassword)
								}>
								<FormControlLabel>
									<FormControlLabelText className="text-xl">
										Confirm Password:
									</FormControlLabelText>
								</FormControlLabel>
								<Input
									className="bg-[#FEEDED] rounded-full py-1 border border-[#2e7d32] active:border-[#2e7d32]"
									size="xl"
									isReadOnly={isSubmitting}>
									<InputSlot className="pl-3">
										<InputIcon color="#009951" as={Key} />
									</InputSlot>
									<InputField
										onChangeText={handleChange("confirmPassword")}
										onBlur={handleBlur("confirmPassword")}
										placeholder="********"
										placeholderTextColor="#2e7d3275"
										value={values.confirmPassword}
										type={showPassword.confirmPassword ? "text" : "password"}
									/>
									<InputSlot
										className="pr-3"
										onPress={() =>
											setShowPassword((p) => ({
												...p,
												confirmPassword: !p.confirmPassword,
											}))
										}>
										<InputIcon
											as={showPassword.confirmPassword ? EyeIcon : EyeOffIcon}
										/>
									</InputSlot>
								</Input>
								<FormControlError>
									<FormControlErrorText>
										{errors.confirmPassword}
									</FormControlErrorText>
								</FormControlError>
							</FormControl>

							<TouchableOpacity
								activeOpacity={0.8}
								className="rounded-full mt-5 min-w-[200px] disabled:bg-gray-800/20 group py-2 bg-[#2e7d32]  "
								onPress={() => handleSubmit()}
								// disabled={isSubmitting}
							>
								<Text
									className="text-xl disabled:text-gray-800/30 text-white text-center text-xl"
									disabled={isSubmitting}>
									{isSubmitting ? "Updating..." : "Update Password"}
								</Text>
							</TouchableOpacity>
						</VStack>
					);
				}}
			</Formik>
		</View>
	);
}
