import React, { Dispatch, SetStateAction, useState } from "react";
import {
	Modal,
	ModalBackdrop,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@src/components/ui/modal";
import { Button, ButtonText } from "@src/components/ui/button";
import { Heading } from "@src/components/ui/heading";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import {
	FormControl,
	FormControlError,
	FormControlErrorText,
	FormControlHelper,
	FormControlHelperText,
} from "./ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "./ui/input";
import { Text } from "react-native";
import { useAuthStore } from "@src/store/useAuthStore";
import { toast } from "sonner-native";

interface DeleteAccountModalProps {
	showModal: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteAccountModal({
	showModal,
	setShowModal,
}: DeleteAccountModalProps) {
	const [showPassword, setShowPassword] = useState(false);
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { token, logout } = useAuthStore();
	const [loading, setLoading] = useState(false);
	const handleDeleteAccount = async () => {
		setLoading(true);
		setError("");
		try {
			if (!password) {
				setError("Password is required to delete account.");
			}

			const response = await fetch(
				`${process.env.EXPO_PUBLIC_API_URL}/user/delete`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ password }),
				}
			);

			const data = await response.json();

			console.log(data);

			if (response.status !== 200 || data.error) {
				throw new Error(data.message || "Failed to delete account.");
			}
			setError("");
			logout();
			toast.success("Account deleted successfully.", {
				description: "We're sorry to see you go.",
			});
			// Handle successful account deletion (e.g., logout, redirect)
		} catch (error) {
			setError(
				(error as Error).message || "An error occurred. Please try again."
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal
			isOpen={showModal}
			onClose={() => {
				setShowModal(false);
			}}
			closeOnOverlayClick={false}
			size="md">
			<ModalBackdrop />
			<ModalBackdrop />
			<ModalContent className="max-w-[305px]  ">
				<ModalHeader>
					<Heading size="md" className="text-typography-950 mb-2">
						Delete account
					</Heading>
				</ModalHeader>
				<ModalBody className="mt-0 mb-4">
					<Text className="mb-2">
						Enter password to confirm account deletion.
					</Text>
					<FormControl isInvalid={!!error} isReadOnly={loading}>
						<Input
							className="bg-[#FEEDED] rounded-xl py-1 border"
							size="xl"
							// isReadOnly={isSubmitting}
						>
							<InputField
								onChangeText={setPassword}
								placeholder="********"
								placeholderTextColor="#52CE1975"
								value={password}
								type={showPassword ? "text" : "password"}
							/>
							<InputSlot
								className="pr-3"
								onPress={() => setShowPassword(!showPassword)}>
								<InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
							</InputSlot>
						</Input>
						<FormControlError>
							<FormControlErrorText>{error}</FormControlErrorText>
						</FormControlError>
						<FormControlHelper>
							<FormControlHelperText>
								Are you sure you want to delete this account? This action cannot
								be undone.
							</FormControlHelperText>
						</FormControlHelper>
					</FormControl>
				</ModalBody>
				<ModalFooter className="w-full flex flex-col">
					<Button
						onPress={handleDeleteAccount}
						size="lg"
						disabled={loading}
						className="flex-grow  w-full bg-error-600 disabled:bg-error-200  ">
						<ButtonText>{loading ? "Deleting..." : "Delete"}</ButtonText>
					</Button>
					<Button
						disabled={loading}
						variant="outline"
						action="secondary"
						size="lg"
						onPress={() => {
							setShowModal(false);
							setError("");
							setPassword("");
						}}
						className="flex-grow w-full">
						<ButtonText>Cancel</ButtonText>
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
