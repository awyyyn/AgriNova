import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import AgriNova from "../../components/agri-nova";
import { Formik } from "formik";
import { emailForm } from "@src/validations";
import { VStack } from "@src/components/ui/vstack";
import {
	FormControl,
	FormControlError,
	FormControlErrorText,
	FormControlLabel,
	FormControlLabelText,
} from "@src/components/ui/form-control";
import {
	Input,
	InputField,
	InputIcon,
	InputSlot,
} from "@src/components/ui/input";
import { Mail } from "lucide-react-native";
import { Button, ButtonText } from "@src/components/ui/button";
import { useRouter } from "expo-router";

export default function ForgotPassword() {
	const router = useRouter();
	return (
		<View
			style={{
				flex: 1,
				paddingTop: Dimensions.get("window").height * 0.3,
				paddingHorizontal: Dimensions.get("window").width * 0.1,
			}}>
			<AgriNova />

			<Formik
				initialValues={{ email: "" }}
				onSubmit={() => {}}
				enableReinitialize
				validationSchema={emailForm}>
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
								<TouchableOpacity
									// size="lg"
									activeOpacity={0.8}
									className="rounded-full mt-5 min-w-[200px] disabled:bg-gray-800/20 group py-2 bg-[#52CE19]  "
									onPress={() => handleSubmit()}
									disabled={isSubmitting}>
									<Text
										className="disabled:text-gray-800/30 text-center text-xl text-white"
										disabled={isSubmitting}>
										Submit
									</Text>
								</TouchableOpacity>
								<Button
									size="sm"
									variant="link"
									className="rounded-full mt-2 min-w-[200px]  "
									onPress={() => router.back()}
									disabled={isSubmitting}>
									<ButtonText
										className="disabled:text-gray-800/30 "
										disabled={isSubmitting}>
										Back to Log in
									</ButtonText>
								</Button>
							</FormControl>
						</VStack>
					);
				}}
			</Formik>
		</View>
	);
}
