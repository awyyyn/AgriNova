import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Edit, Check } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Fab, FabIcon, FabLabel } from "@src/components/ui/fab";
import {
	Avatar,
	AvatarFallbackText,
	AvatarImage,
} from "@src/components/ui/avatar";
import { User } from "@src/types";
import { useAuthStore } from "@src/store/useAuthStore";
import { slugify } from "@src/utils";
import { handleUploadToAppwrite } from "@src/services/appwrite";
import { toast } from "sonner-native";

export default function ProfileScreen() {
	const insets = useSafeAreaInsets();
	const [isEditing, setIsEditing] = useState(false);
	const { user, token, setUser } = useAuthStore();
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);

	const [profile, setProfile] = useState<
		Pick<User, "photo" | "firstName" | "lastName">
	>({
		photo: user?.photo || "",
		firstName: user?.firstName || "",
		lastName: user?.lastName || "",
	});

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.8,
		});

		if (!result.canceled) {
			const file = result.assets[0];
			try {
				const data = await handleUploadToAppwrite({
					fileName: slugify(file.fileName || "uploaded-image"),
					size: file.fileSize || 0,
					uri: file.uri,
				});

				setProfile((p) => ({
					...p,
					// must use avatars bucket, upgrade subscription to use other bucket, replace plant-images once the subscription is upgraded
					photo: `https://fra.cloud.appwrite.io/v1/storage/buckets/plant-images/files/${data.$id}/view?project=${process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID}`,
				}));
			} catch (error) {
				console.error("Error uploading image:", error);
				toast.error("Error on uploading profile", {
					description: "Something went wrong while uploading your photo.",
					richColors: true,
					duration: 4000,
				});
			} finally {
				setLoading(false);
			}
		}
	};

	const handleSave = async () => {
		// 🔥 API / Zustand save here
		console.log("Saved profile:", profile);
		try {
			setSaving(true);

			await new Promise((resolve) => setTimeout(resolve, 3000));

			const response = await fetch(
				`${process.env.EXPO_PUBLIC_API_URL}/user/edit`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},

					body: JSON.stringify(profile),
				},
			);

			const data = await response.json();

			if (response.status !== 200 || !!data.error) {
				throw new Error(
					data.message ||
						"Error while updating your profile information, if this persists, please contact support.",
				);
			}

			setUser({
				photo: profile?.photo || "",
				firstName: profile.firstName,
				lastName: profile.lastName,
				createdAt: user?.createdAt || "",
				email: user?.email!,
				id: user?.id!,
				lastChangePassword: user?.lastChangePassword!,
				role: user?.role!,
			});
			setIsEditing(false);
		} catch (error) {
			toast.error("Something went wrong, please try again later.", {
				description: (error as Error).message,
				duration: 5000,
				richColors: true,
			});
		} finally {
			setSaving(false);
		}
	};

	return (
		<View className="flex-1 bg-white px-6 pt-8">
			<Text className="text-2xl font-bold mb-6">Personal Information</Text>

			{/* Profile Photo */}
			<View className="items-center mb-8">
				<TouchableOpacity
					onPress={isEditing && !loading ? pickImage : undefined}
					activeOpacity={isEditing ? 0.7 : 1}>
					<Avatar size="2xl" className="bg-[#DAFFD7]">
						<AvatarImage
							source={{ uri: profile.photo }}
							src={profile.photo}
							className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden  "
						/>
						{loading && (
							<View className="w-full z-50 bg-black/80 h-full rounded-full flex-1  items-center absolute  justify-center">
								<ActivityIndicator color="#FFF" />
								<Text className="text-white">Uploading...</Text>
							</View>
						)}
						{!profile?.photo && (
							<AvatarFallbackText className="text-black">
								{profile.firstName + " " + profile.lastName}
							</AvatarFallbackText>
						)}
					</Avatar>
				</TouchableOpacity>

				{isEditing && (
					<Text className="text-sm text-green-600 mt-2">
						Tap to change photo
					</Text>
				)}
			</View>

			{/* First Name */}
			<View className="mb-4">
				<Text className="text-gray-500 mb-1">First Name</Text>
				<TextInput
					editable={isEditing}
					value={profile.firstName}
					onChangeText={(text) =>
						setProfile((prev) => ({ ...prev, firstName: text }))
					}
					className={`rounded-lg px-4 py-3 ${
						isEditing
							? "border border-gray-300 bg-white"
							: "bg-gray-100 text-gray-700"
					}`}
				/>
			</View>

			{/* Last Name */}
			<View>
				<Text className="text-gray-500 mb-1">Last Name</Text>
				<TextInput
					editable={isEditing}
					value={profile.lastName ?? ""}
					onChangeText={(text) =>
						setProfile((prev) => ({ ...prev, lastName: text }))
					}
					className={`rounded-lg px-4 py-3 ${
						isEditing
							? "border border-gray-300 bg-white"
							: "bg-gray-100 text-gray-700"
					}`}
				/>
			</View>

			{/* Floating Action Button */}
			<Fab
				onPress={() => {
					if (isEditing) {
						handleSave();
					} else {
						setIsEditing(true);
					}
				}}
				size="lg"
				placement="bottom right"
				isHovered={false}
				isDisabled={saving}
				isPressed={false}
				style={{
					position: "absolute",
					bottom: insets.bottom + 12,
					right: 20,
					backgroundColor: isEditing ? "#16A34A" : "#52CE19",
				}}>
				{!saving ? (
					<FabIcon as={isEditing ? Check : Edit} />
				) : (
					<ActivityIndicator color="#FFF" />
				)}

				<FabLabel>
					{isEditing ? (saving ? "saving" : "Done") : "Edit Profile"}
				</FabLabel>
			</Fab>
		</View>
	);
}
