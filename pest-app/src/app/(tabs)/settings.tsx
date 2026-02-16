import React from "react";
import ScrollViewLayout from "@src/layouts/scrollview-layout";
import { Card } from "@src/components/ui/card";
import { HStack } from "@src/components/ui/hstack";
import { VStack } from "@src/components/ui/vstack";
import { Dimensions, Text } from "react-native";
import {
	Avatar,
	AvatarFallbackText,
	AvatarImage,
} from "@src/components/ui/avatar";
import SettingsButton from "@src/components/settings-button";
import {
	BadgeQuestionMark,
	CircleQuestionMark,
	Info,
	Leaf,
	Lock,
	LogOut,
	User2,
	X,
} from "lucide-react-native";
import { Divider } from "@src/components/ui/divider";
import { useAuthStore } from "@src/store/useAuthStore";
import { useRouter } from "expo-router";
import DeleteAccountModal from "@src/components/delete-account-modal";

export default function Settings() {
	const router = useRouter();
	const { user, logout } = useAuthStore();
	const name = user ? `${user.firstName} ${user.lastName}` : "User";
	const [showModal, setShowModal] = React.useState(false);

	return (
		<>
			<ScrollViewLayout>
				<VStack space="lg">
					<Card size="lg">
						<HStack space="lg" className="items-center">
							<Avatar size="xl" className="bg-[#DAFFD7]">
								<AvatarImage source={{ uri: user?.photo }} />
								{!user?.photo && (
									<AvatarFallbackText className="text-black">
										{name}
									</AvatarFallbackText>
								)}
							</Avatar>
							<VStack style={{}}>
								<Text
									numberOfLines={0}
									ellipsizeMode="tail"
									className="text-xl font-semibold ">
									{name}
								</Text>
								<Text className="text-[#2e7d32] text-lg">{user?.email}</Text>
							</VStack>
						</HStack>
					</Card>

					<Card size="lg" className="flex gap-y-5">
						<SettingsButton
							onPress={() => router.push("/profile")}
							text="Personal Info"
							icon={<User2 />}
						/>
						<Divider />
						{/* <Text className="text-xl font-semibold ">Password</Text> */}
						<SettingsButton
							onPress={() => router.push("/change-password")}
							icon={<Lock />}
							text="Change Password"
						/>
						<Divider />
						<SettingsButton
							icon={<Leaf />}
							text="Analysis History"
							onPress={() => router.push("/history")}
						/>
					</Card>

					<Card size="lg" className="flex gap-y-5">
						<SettingsButton
							text="Help & Support"
							icon={<CircleQuestionMark />}
							onPress={() => router.push("/help")}
						/>
						<Divider />
						<SettingsButton
							icon={<Info />}
							text="About"
							onPress={() => router.push("/about")}
						/>
						<Divider />
						<SettingsButton
							icon={<BadgeQuestionMark />}
							text="FAQ's"
							onPress={() => router.push("/faqs")}
						/>
						<Divider />
						<SettingsButton
							icon={<X />}
							text="Delete Account"
							onPress={() => setShowModal(true)}
						/>
						<Divider />
						<SettingsButton onPress={logout} icon={<LogOut />} text="Logout" />
					</Card>
				</VStack>
			</ScrollViewLayout>
			<DeleteAccountModal showModal={showModal} setShowModal={setShowModal} />
		</>
	);
}
