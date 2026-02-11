"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { toast } from "sonner";

export default function ResetPasswordForm() {
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token");

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		if (password.length < 8) {
			setError("Password must be at least 8 characters long");
			return;
		}

		try {
			const link = `${import.meta.env.VITE_API_URL}/auth/reset-password`;

			// setParams(new URLSearchParams());
			const response = await fetch(link, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					token,
					password,
					email: searchParams.get("email"),
				}),
			});

			const data = await response.json();

			if (response.status !== 200 || !!data.error) {
				throw new Error(
					data.message ||
						"Failed to reset password. Please try again later or contact support if the issue persists.",
				);
			}

			toast.success("Password reset successfully", {
				description: "You can now log in with your new password.",
				duration: 5000,
				richColors: true,
			});

			setIsSuccess(true);
		} catch (error) {
			toast.error("Failed to reset password. Please try again.", {
				description:
					error instanceof Error
						? error.message
						: "An unexpected error occurred.",
				richColors: true,
				duration: 5000,
			});
		}
	};

	if (!token) {
		return (
			<div className="min-h-screen bg-linear-to-b from-primary/20 via-background to-background flex items-center justify-center p-4">
				<div className="w-full max-w-md text-center">
					<h1 className="text-2xl font-bold text-foreground mb-4">
						Invalid Link
					</h1>
					<p className="text-muted-foreground mb-6">
						This password reset link is invalid or has expired.
					</p>
					<Link to="/login">
						<Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-2 font-semibold">
							Back to Login
						</Button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-linear-to-b from-primary/20 via-background to-background flex items-center justify-center p-4 relative overflow-hidden">
			{/* Top plant decoration */}
			<div className="absolute top-0 right-0 w-40 h-40 opacity-70">
				<svg viewBox="0 0 200 200" className="w-full h-full">
					<path
						d="M100,20 Q120,50 130,80 Q135,100 125,120 Q115,140 100,150"
						stroke="currentColor"
						strokeWidth="2"
						fill="none"
						className="text-primary/40"
					/>
					<path
						d="M90,30 Q110,60 115,90"
						stroke="currentColor"
						strokeWidth="2"
						fill="none"
						className="text-primary/30"
					/>
					<path
						d="M110,40 Q125,70 128,100"
						stroke="currentColor"
						strokeWidth="2"
						fill="none"
						className="text-primary/30"
					/>
				</svg>
			</div>

			{/* Bottom plant decoration */}
			<div className="absolute bottom-0 left-0 w-48 h-48 opacity-70">
				<svg viewBox="0 0 200 200" className="w-full h-full">
					<path
						d="M100,180 Q80,150 70,120 Q65,100 75,80 Q85,60 100,50"
						stroke="currentColor"
						strokeWidth="2"
						fill="none"
						className="text-primary/40"
					/>
					<path
						d="M110,170 Q90,140 85,110"
						stroke="currentColor"
						strokeWidth="2"
						fill="none"
						className="text-primary/30"
					/>
					<path
						d="M90,160 Q75,130 72,100"
						stroke="currentColor"
						strokeWidth="2"
						fill="none"
						className="text-primary/30"
					/>
				</svg>
			</div>

			<div className="w-full max-w-md relative z-10">
				{/* Logo and heading */}
				<div className="text-center mb-8">
					<div className="inline-flex items-center gap-2 mb-4">
						<div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
							<span className="text-primary-foreground font-bold text-lg">
								A
							</span>
						</div>
						<h1 className="text-2xl font-bold text-primary">AgriNova</h1>
					</div>
					<h2 className="text-2xl font-bold text-foreground mb-2">
						Create New Password
					</h2>
					<p className="text-muted-foreground text-sm">
						Enter your new password below
					</p>
				</div>

				{!isSuccess ? (
					<form
						onSubmit={handleSubmit}
						className="bg-card rounded-2xl p-8 shadow-lg space-y-6">
						{error && (
							<div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30">
								<p className="text-sm text-destructive">{error}</p>
							</div>
						)}

						<div className="space-y-2">
							<label
								htmlFor="password"
								className="block text-sm font-medium text-foreground">
								New Password
							</label>
							<div className="relative">
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									placeholder="••••••••"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="bg-secondary border-border pr-10"
									required
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition">
									{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
								</button>
							</div>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="confirmPassword"
								className="block text-sm font-medium text-foreground">
								Confirm Password
							</label>
							<div className="relative">
								<Input
									id="confirmPassword"
									type={showConfirmPassword ? "text" : "password"}
									placeholder="••••••••"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									className="bg-secondary border-border pr-10"
									required
								/>
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition">
									{showConfirmPassword ? (
										<EyeOff size={18} />
									) : (
										<Eye size={18} />
									)}
								</button>
							</div>
						</div>

						<div className="text-sm text-muted-foreground">
							<p>Password must be at least 8 characters long</p>
						</div>

						<Button
							type="submit"
							className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-2 font-semibold">
							Reset Password
						</Button>
					</form>
				) : (
					<div className="bg-card rounded-2xl p-8 shadow-lg text-center space-y-4">
						<div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
							<svg
								className="w-6 h-6 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>
						<h2 className="text-xl font-bold text-foreground">
							Password Reset
						</h2>
						<p className="text-muted-foreground">
							Your password has been successfully reset. You can now sign in
							with your new password.
						</p>
						<Link to="/login">
							<Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-2 font-semibold">
								Back to Login
							</Button>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
