"use client";

import React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Upload, Lock } from "lucide-react";
import { Link } from "react-router";
import { User } from "@/types";
import { storage } from "@/utils/appwrite";
import { ID } from "appwrite";
import { toast } from "sonner";

type UserProfile = Omit<User, "lastChangePassword" | "createdAt">;
type Data = {
	firstName: string;
	lastName: string;
	photo?: string;
};

interface ProfileFormProps {
	user: UserProfile;
	onSave: (formData: Data) => Promise<void>;
	isSaving: boolean;
	isEditing: boolean;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProfileForm({
	user,
	onSave,
	isSaving,
	isEditing,
	setIsEditing,
}: ProfileFormProps) {
	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName || "");
	const [photo, setPhoto] = useState(user.photo || "");
	const [photoFile, setPhotoFile] = useState<File | null>(null);

	const fileInputRef = useRef<HTMLInputElement>(null);
	const [photoPreview, setPhotoPreview] = useState<string | null>(
		photo ? photo : null,
	);

	const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setPhotoFile(file);
			const reader = new FileReader();
			reader.onload = (event) => {
				setPhotoPreview(event.target?.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		try {
			e.preventDefault();
			let photoUrl = "";

			const data: Data = {
				firstName,
				lastName,
				photo: "",
			};
			if (photoFile) {
				const response = await storage.createFile({
					bucketId: "plant-images",
					fileId: ID.unique(),
					file: photoFile as File,
				});

				if (!response) {
					throw new Error("Failed to upload photo");
				}

				photoUrl = `https://fra.cloud.appwrite.io/v1/storage/buckets/plant-images/files/${response.$id}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`;
				setPhoto(photoUrl);
			}

			if (photoUrl.trim()) {
				data.photo = photoUrl;
			}

			await onSave(data);
			setIsEditing(false);
			setPhotoFile(null);
		} catch (error) {
			toast.error("Something went wrong, please try again.", {
				description:
					error instanceof Error ? error.message : "An unknown error occurred",
				richColors: true,
				duration: 5000,
			});
		}

		// const formData = new FormData();
		// formData.append("firstName", firstName);
		// formData.append("lastName", lastName);

		// if (photoFile) {
		// 	formData.append("photo", photoFile);
		// }

		// try {
		// 	await onSave(formData);
		// 	setIsEditing(false);
		// 	setPhotoFile(null);
		// } catch (error) {
		// 	console.error("Error saving profile:", error);
		// }
	};

	const handleCancel = () => {
		setFirstName(user.firstName);
		setLastName(user.lastName || "");
		setPhotoPreview(photo ? photo : null);
		setPhotoFile(null);
		setIsEditing(false);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{/* Photo Section */}
			<Card className="border-slate-200">
				<CardHeader>
					<CardTitle className="text-lg">Profile Photo</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-center">
						<div className="relative">
							<div className="w-32 h-32 rounded-lg bg-slate-100 overflow-hidden border-2 border-slate-200 flex items-center justify-center">
								{photoPreview ? (
									<img
										src={photoPreview || "/placeholder.svg"}
										alt="Profile preview"
										width={128}
										height={128}
										className="w-full h-full object-cover"
									/>
								) : (
									<div className="text-slate-400 text-center">
										<Upload className="h-8 w-8 mx-auto mb-1" />
										<p className="text-xs">No photo</p>
									</div>
								)}
							</div>
							{isEditing && (
								<button
									type="button"
									onClick={() => fileInputRef.current?.click()}
									className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
									<Upload className="h-6 w-6 text-white" />
								</button>
							)}
						</div>
					</div>
					<input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						onChange={handlePhotoChange}
						className="hidden"
						disabled={!isEditing}
					/>
					{isEditing && (
						<button
							type="button"
							onClick={() => fileInputRef.current?.click()}
							className="w-full text-center text-sm text-slate-600 hover:text-slate-900 py-2 border border-dashed border-slate-300 rounded-lg hover:border-slate-400 transition-colors">
							Click to upload or drag and drop
						</button>
					)}
				</CardContent>
			</Card>

			{/* Personal Information Section */}
			<Card className="border-slate-200">
				<CardHeader>
					<CardTitle className="text-lg">Personal Information</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Read-only Email Field */}
					<div className="space-y-2">
						<Label htmlFor="email" className="text-slate-700 font-medium">
							Email Address
						</Label>
						<div className="relative">
							<Input
								id="email"
								type="email"
								value={user.email}
								disabled
								className="bg-slate-50 text-slate-600 border-slate-200 cursor-not-allowed"
							/>
							<span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 font-medium">
								Read-only
							</span>
						</div>
					</div>

					<Separator className="bg-slate-200" />

					{/* First Name Field */}
					<div className="space-y-2">
						<Label htmlFor="firstName" className="text-slate-700 font-medium">
							First Name
						</Label>
						<Input
							id="firstName"
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							disabled={!isEditing}
							className="border-slate-200 disabled:bg-slate-50 disabled:text-slate-600 disabled:cursor-not-allowed"
							placeholder="Enter your first name"
						/>
					</div>

					{/* Last Name Field */}
					<div className="space-y-2">
						<Label htmlFor="lastName" className="text-slate-700 font-medium">
							Last Name
						</Label>
						<Input
							id="lastName"
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							disabled={!isEditing}
							className="border-slate-200 disabled:bg-slate-50 disabled:text-slate-600 disabled:cursor-not-allowed"
							placeholder="Enter your last name"
						/>
					</div>

					<Separator className="bg-slate-200" />

					{/* Role Field (Read-only) */}
					<div className="space-y-2">
						<Label htmlFor="role" className="text-slate-700 font-medium">
							Role
						</Label>
						<div className="relative">
							<Input
								id="role"
								type="text"
								value={user.role.replace(/_/g, " ").toLowerCase()}
								disabled
								className="bg-slate-50 text-slate-600 border-slate-200 cursor-not-allowed capitalize"
							/>
							<span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 font-medium">
								Read-only
							</span>
						</div>
					</div>
				</CardContent>
			</Card>

			{!isEditing && (
				<Card className="border-slate-200">
					{/* Password and Action Buttons */}
					<CardHeader>
						<CardTitle className="text-lg">Security</CardTitle>
					</CardHeader>
					<CardContent>
						<Link to="/admin/profile/change-password" className="w-full block">
							<Button
								type="button"
								variant="outline"
								className="w-full gap-2 border-slate-200 text-slate-700 hover:bg-slate-50 bg-transparent">
								<Lock className="h-4 w-4" />
								Change Password
							</Button>
						</Link>
					</CardContent>
				</Card>
			)}

			{/* Form Action Buttons */}
			<div className="flex gap-3 pt-4">
				{isEditing && (
					<>
						<Button
							type="submit"
							disabled={isSaving || !isEditing}
							className="flex-1   disabled:opacity-50">
							{isSaving ? "Saving..." : "Save Changes"}
						</Button>
						<Button
							type="button"
							onClick={handleCancel}
							variant="outline"
							className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50 bg-transparent">
							Cancel
						</Button>
					</>
				)}
			</div>
		</form>
	);
}
