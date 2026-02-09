"use client";

import React from "react";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";
import { useAuth } from "@/contexts/auth-context";

export default function ChangePasswordPage() {
	const [currentPassword, setCurrentPassword] = useState("");
	const { loading, user } = useAuth();
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [lastChangePasswordDate, setLastChangePasswordDate] = useState<
		string | null
	>(null);
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Validation
		if (!currentPassword) {
			toast.error("Input Error", {
				description: "Please enter your current password",
				richColors: true,
			});
			return;
		}

		if (!newPassword) {
			toast.error("Input Error", {
				description: "Please enter a new password",
				richColors: true,
			});
			return;
		}

		if (newPassword.length < 8) {
			toast.error("Input Error", {
				description: "New password must be at least 8 characters",
				richColors: true,
			});
			return;
		}

		if (newPassword !== confirmPassword) {
			toast.error("Input Error", {
				description: "Passwords do not match",
				richColors: true,
			});
			return;
		}

		if (currentPassword === newPassword) {
			toast.error("New password must be different from current password", {
				richColors: true,
			});
			return;
		}

		setIsLoading(true);

		try {
			const link = `${import.meta.env.VITE_API_URL}/user/change-password`;
			const response = await fetch(link, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				},
				body: JSON.stringify({
					currentPassword,
					newPassword,
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

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || "Failed to change password");
			}

			setCurrentPassword("");
			setNewPassword("");
			setConfirmPassword("");
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Failed to change password";
			toast.error(message, {
				description:
					"Please try again later or contact support if the issue persists.",
				richColors: true,
				duration: 5000,
			});
		} finally {
			setIsLoading(false);
		}
	};

	if (!user || loading) {
		return (
			<main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
				<div className="container mx-auto px-4 py-8 max-w-2xl">
					<div className="animate-pulse space-y-4">
						<div className="h-10 bg-slate-200 rounded w-20" />
						<div className="h-12 bg-slate-200 rounded w-64" />
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
			<div className="container mx-auto px-4 py-8 max-w-2xl">
				{/* Header */}
				<div className="mb-8">
					<Link to="/admin/profile">
						<Button
							variant="ghost"
							size="sm"
							className="mb-6 gap-2 text-slate-600 hover:text-slate-900">
							<ArrowLeft className="h-4 w-4" />
							Back
						</Button>
					</Link>
					<div>
						<h1 className="text-3xl font-bold text-slate-900 mb-2">
							Change Password
						</h1>
						<p className="text-slate-600">
							Update your password to keep your account secure
						</p>
					</div>
				</div>

				{/* Last Change Password Info */}
				{lastChangePasswordDate && (
					<Card className="mb-6 border-slate-200 bg-blue-50">
						<CardContent className="pt-6">
							<p className="text-sm text-slate-600">
								<span className="font-medium text-slate-900">
									Last password change:
								</span>{" "}
								{new Date(lastChangePasswordDate).toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</p>
						</CardContent>
					</Card>
				)}

				{/* Change Password Form */}
				<Card className="border-slate-200">
					<CardHeader>
						<CardTitle className="text-lg">Password</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-6">
							{/* Current Password */}
							<div className="space-y-2">
								<Label
									htmlFor="currentPassword"
									className="text-slate-700 font-medium">
									Current Password
								</Label>
								<div className="relative">
									<Input
										id="currentPassword"
										type={showCurrentPassword ? "text" : "password"}
										value={currentPassword}
										onChange={(e) => setCurrentPassword(e.target.value)}
										disabled={isLoading}
										className="border-slate-200 pr-10"
										placeholder="Enter your current password"
									/>
									<button
										type="button"
										onClick={() => setShowCurrentPassword(!showCurrentPassword)}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
										{showCurrentPassword ? "👁️" : "👁️‍🗨️"}
									</button>
								</div>
							</div>

							<Separator className="bg-slate-200" />

							{/* New Password */}
							<div className="space-y-2">
								<Label
									htmlFor="newPassword"
									className="text-slate-700 font-medium">
									New Password
								</Label>
								<div className="relative">
									<Input
										id="newPassword"
										type={showNewPassword ? "text" : "password"}
										value={newPassword}
										onChange={(e) => setNewPassword(e.target.value)}
										disabled={isLoading}
										className="border-slate-200 pr-10"
										placeholder="Enter your new password (min. 8 characters)"
									/>
									<button
										type="button"
										onClick={() => setShowNewPassword(!showNewPassword)}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
										{showNewPassword ? "👁️" : "👁️‍🗨️"}
									</button>
								</div>
							</div>

							{/* Confirm Password */}
							<div className="space-y-2">
								<Label
									htmlFor="confirmPassword"
									className="text-slate-700 font-medium">
									Confirm Password
								</Label>
								<div className="relative">
									<Input
										id="confirmPassword"
										type={showConfirmPassword ? "text" : "password"}
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										disabled={isLoading}
										className="border-slate-200 pr-10"
										placeholder="Confirm your new password"
									/>
									<button
										type="button"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
										{showConfirmPassword ? "👁️" : "👁️‍🗨️"}
									</button>
								</div>
							</div>

							{/* Form Actions */}
							<div className="flex gap-3 pt-6">
								<Button
									type="submit"
									disabled={isLoading}
									className="flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50">
									{isLoading ? "Updating..." : "Change Password"}
								</Button>
								<Link to="/admin/profile" className="flex-1">
									<Button
										type="button"
										variant="outline"
										className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 bg-transparent">
										Cancel
									</Button>
								</Link>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
