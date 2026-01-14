import React from "react";
import ScrollViewLayout from "@src/layouts/scrollview-layout";
import { Card } from "@src/components/ui/card";
import { HStack } from "@src/components/ui/hstack";
import { VStack } from "@src/components/ui/vstack";
import { Text } from "react-native";
import { Avatar, AvatarFallbackText } from "@src/components/ui/avatar";
import SettingsButton from "@src/components/settings-button";
import {
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
							<Avatar size="lg" className="bg-[#DAFFD7]">
								<AvatarFallbackText className="text-black">
									{name}
								</AvatarFallbackText>
							</Avatar>
							<VStack>
								<Text className="text-2xl font-semibold">{name}</Text>
								<Text className="text-[#25AF1B]">{user?.email}</Text>
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
						<SettingsButton icon={<Leaf />} text="Analysis History" />
					</Card>

					<Card size="lg" className="flex gap-y-5">
						<SettingsButton text="Help" icon={<CircleQuestionMark />} />
						<Divider />
						<SettingsButton icon={<Info />} text="About" />
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
