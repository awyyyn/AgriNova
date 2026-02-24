import { useState } from "react";
import { toast } from "sonner";
import SkeletonLoading from "./__components/skeleton-loading";
import ProfileHeader from "./__components/header";
import ProfileForm from "./__components/form";
import { useAuth } from "@/contexts/auth-context";
import { User } from "@/types";
import { Helmet } from "react-helmet-async";

export default function ProfilePage() {
	const { user, loading, setUser } = useAuth();
	const [isSaving, setIsSaving] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const handleSaveProfile = async (values: {
		firstName: string;
		lastName: string;
		photo?: string;
	}) => {
		setIsSaving(true);

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/user/edit`,
				{
					method: "POST",
					body: JSON.stringify({
						...values,
						photo: values.photo || user?.photo || "",
					}),
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						"Content-Type": "application/json", // Ensure this is set for file uploads
					},
				},
			);

			const data = await response.json();

			if (response.status !== 200 || !!data.error) {
				throw new Error(
					data.message ||
						"Error while updating your profile information, if this persists, please contact support.",
				);
			}
			// setUser(updatedUser);
			toast.success("Profile updated successfully", {
				description: "Your profile information has been updated.",
				duration: 5000,
				richColors: true,
			});
			setUser({
				...user,
				firstName: values.firstName,
				lastName: values.lastName,
				photo: values.photo || user?.photo || "",
				role: user?.role as User["role"],
				createdAt: user?.createdAt || "",
				email: user?.email || "",
				id: user?.id || "",
				lastChangePassword: user?.lastChangePassword || "",
			});
		} catch (error) {
			console.error("Error saving profile:", error);
			toast.error("Failed to save profile");
		} finally {
			setIsSaving(false);
		}
	};

	if (loading || !user) {
		return <SkeletonLoading />;
	}

	return (
		<>
			<Helmet>
				<title>Profile</title>
			</Helmet>
			<main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
				<div className="container mx-auto px-4 py-8 max-w-2xl">
					<ProfileHeader isEditing={isEditing} setIsEditing={setIsEditing} />
					{user && (
						<ProfileForm
							user={user}
							onSave={handleSaveProfile}
							isSaving={isSaving}
							isEditing={isEditing}
							setIsEditing={setIsEditing}
						/>
					)}
				</div>
			</main>
		</>
	);
}
