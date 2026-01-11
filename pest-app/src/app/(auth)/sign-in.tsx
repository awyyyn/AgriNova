import {
	View,
	Text,
	ScrollView,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import React from "react";
import AgriNova from "../../components/agri-nova";
import { loginForm, LoginForm } from "@src/validations";
import {
	FormControl,
	FormControlError,
	FormControlErrorText,
	FormControlLabel,
	FormControlLabelText,
} from "@src/components/ui/form-control";
import { Formik, FormikHelpers } from "formik";
import {
	Input,
	InputField,
	InputIcon,
	InputSlot,
} from "@src/components/ui/input";
import { EyeIcon, EyeOffIcon } from "@src/components/ui/icon";
import { Key, Mail } from "lucide-react-native";
import { toast } from "sonner-native";
import { VStack } from "@src/components/ui/vstack";
import { useRouter } from "expo-router";
import { HStack } from "@src/components/ui/hstack";
import { Center } from "@src/components/ui/center";
import { useAuthStore } from "@src/store/useAuthStore";

export default function SignIn() {
	const [showPassword, setShowPassword] = React.useState(false);
	const { login } = useAuthStore();
	const router = useRouter();
	const handleSignIn = async (
		values: LoginForm,
		helpers: FormikHelpers<LoginForm>
	) => {
		const apiUrl = process.env.EXPO_PUBLIC_API_URL;
		try {
			const response = await fetch(`${apiUrl}/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});

			const data = await response.json();

			console.log(data, "qqqqq");
			if (response.status !== 200) {
				throw new Error(data.errorMessage || "Failed to sign in");
			}
			login(data.data.accessToken, data.data.user);
			toast.success("Signed in successfully!", {
				description: `Welcome back, ${data.data.user.firstName}!`,
			});
		} catch (error) {
			console.log("Error signing in:", error);
			toast.error("Error occurred!", {
				description: (error as Error).message,
			});
		} finally {
			helpers.setSubmitting(false);
		}
	};

	return (
		<ScrollView
			bounces={false}
			contentContainerStyle={{
				flexGrow: 1,
				paddingTop: 16,
				paddingHorizontal: Dimensions.get("window").width * 0.1,
			}}>
			<View
				style={{
					paddingTop: Dimensions.get("window").height * 0.2,
				}}>
				<AgriNova />
			</View>

			<Formik
				initialValues={{ email: "", password: "" }}
				onSubmit={handleSignIn}
				enableReinitialize
				validationSchema={loginForm}>
				{({
					handleChange,
					handleBlur,
					handleSubmit,
					values,
					errors,
					touched,
					isSubmitting,
					status,
				}) => {
					console.log(status);
					return (
						<VStack space="lg" className=" mt-10">
							<FormControl isInvalid={!!(errors.email && touched.email)}>
								<FormControlLabel>
									<FormControlLabelText>Email Address</FormControlLabelText>
								</FormControlLabel>
								<Input
									className="bg-[#FEEDED] rounded-full py-1 border border-[#52CE19] "
									size="lg"
									isReadOnly={isSubmitting}>
									<InputSlot className="pl-3">
										<InputIcon color="#009951" as={Mail} />
									</InputSlot>
									<InputField
										onChangeText={handleChange("email")}
										onBlur={handleBlur("email")}
										value={values.email}
										placeholderTextColor="#red"
										placeholderClassName="text-red-500"
										style={{ textTransform: "lowercase" }}
										placeholder="example@gmail.com"
									/>
								</Input>
								<FormControlError>
									<FormControlErrorText>{errors.email}</FormControlErrorText>
								</FormControlError>
							</FormControl>

							<VStack>
								<FormControl
									isInvalid={!!(errors.password && touched.password)}>
									<FormControlLabel>
										<FormControlLabelText>Password</FormControlLabelText>
									</FormControlLabel>

									<Input
										className="bg-[#FEEDED] rounded-full py-1 border border-[#52CE19]"
										size="lg"
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
											type={showPassword ? "text" : "password"}
										/>
										<InputSlot
											className="pr-3"
											onPress={() => setShowPassword(!showPassword)}>
											<InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
										</InputSlot>
									</Input>
									<FormControlError>
										{/* <FormControlErrorIcon /> */}
										<FormControlErrorText>
											{errors.password}
										</FormControlErrorText>
									</FormControlError>
								</FormControl>

								<TouchableOpacity
									onPress={() => router.push("/(auth)/forgot-password")}>
									<Text className="ml-auto   mt-1  text-gray-600 font-medium">
										Forgot Password?
									</Text>
								</TouchableOpacity>
							</VStack>

							<Center>
								<TouchableOpacity
									// size="lg"
									activeOpacity={0.8}
									className="rounded-full mt-5 min-w-[200px] disabled:bg-gray-800/20 group py-2 bg-[#52CE19]  "
									onPress={() => handleSubmit()}
									disabled={isSubmitting}>
									<Text
										className="disabled:text-gray-800/30 text-white text-center text-xl"
										disabled={isSubmitting}>
										Submit
									</Text>
								</TouchableOpacity>
							</Center>
							<HStack space="sm" className="justify-center">
								<Text className="text-gray-600">
									Don&apos;t have an account?
								</Text>
								<TouchableOpacity
									onPress={() => router.push("/(auth)/create-account")}>
									<Text className="text-gray-600 font-medium">
										Create Account here
									</Text>
								</TouchableOpacity>
							</HStack>
						</VStack>
					);
				}}
			</Formik>
		</ScrollView>
	);
}
