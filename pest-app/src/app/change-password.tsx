import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Formik } from "formik";
import { changePasswordForm } from "@src/validations";
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

export default function Password() {
	const [showPassword, setShowPassword] = React.useState({
		currentPassword: false,
		password: false,
		confirmPassword: false,
	});

	return (
		<View className="p-[4vw] flex-1 bg-[#ECFDF0]">
			<Text className="text-lg leading-loose">
				Choose a strong password and don&apos; reuse it for other accounts
			</Text>

			<Formik
				initialValues={{
					currentPassword: "",
					password: "",
					confirmPassword: "",
				}}
				validationSchema={changePasswordForm}
				onSubmit={() => {}}>
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
									<FormControlLabelText className="text-lg">
										Current Password:
									</FormControlLabelText>
								</FormControlLabel>
								<Input
									className="bg-[#FEEDED] rounded-full py-1 border border-[#52CE19] active:border-[#52CE19]"
									size="xl"
									isReadOnly={isSubmitting}>
									<InputSlot className="pl-3">
										<InputIcon color="#009951" as={Key} />
									</InputSlot>
									<InputField
										onChangeText={handleChange("currentPassword")}
										onBlur={handleBlur("currentPassword")}
										placeholder="********"
										placeholderTextColor="#52CE1975"
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
									<FormControlErrorText>
										{errors.currentPassword}
									</FormControlErrorText>
								</FormControlError>
							</FormControl>
							<FormControl isInvalid={!!(errors.password && touched.password)}>
								<FormControlLabel>
									<FormControlLabelText>Current Password:</FormControlLabelText>
								</FormControlLabel>
								<Input
									className="bg-[#FEEDED] rounded-full py-1 border border-[#52CE19] active:border-[#52CE19]"
									size="xl"
									isReadOnly={isSubmitting}>
									<InputSlot className="pl-3">
										<InputIcon color="#009951" as={Key} />
									</InputSlot>
									<InputField
										onChangeText={handleChange("password")}
										onBlur={handleBlur("password")}
										placeholder="********"
										placeholderTextColor="#52CE1975"
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
									<FormControlHelperText>
										Password strength: Use at least 8 characters. Don&apos;t use
										a password from another site, or something too obvious like
										your pet&apos;s name.
									</FormControlHelperText>
								</FormControlHelper>
								<FormControlError>
									<FormControlErrorText>{errors.password}</FormControlErrorText>
								</FormControlError>
							</FormControl>
							<FormControl
								isInvalid={
									!!(errors.confirmPassword && touched.confirmPassword)
								}>
								<FormControlLabel>
									<FormControlLabelText>Confirm Password:</FormControlLabelText>
								</FormControlLabel>
								<Input
									className="bg-[#FEEDED] rounded-full py-1 border border-[#52CE19] active:border-[#52CE19]"
									size="xl"
									isReadOnly={isSubmitting}>
									<InputSlot className="pl-3">
										<InputIcon color="#009951" as={Key} />
									</InputSlot>
									<InputField
										onChangeText={handleChange("confirmPassword")}
										onBlur={handleBlur("confirmPassword")}
										placeholder="********"
										placeholderTextColor="#52CE1975"
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
								className="rounded-full mt-5 min-w-[200px] disabled:bg-gray-800/20 group py-2 bg-[#52CE19]  "
								onPress={() => handleSubmit()}
								disabled={isSubmitting}>
								<Text
									className="disabled:text-gray-800/30 text-white text-center text-xl"
									disabled={isSubmitting}>
									Save
								</Text>
							</TouchableOpacity>
						</VStack>
					);
				}}
			</Formik>
		</View>
	);
}
