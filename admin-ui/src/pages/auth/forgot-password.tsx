"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/auth/forgot-password`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email }),
				}
			);
			const data = await response.json();

			console.log("Forgot Password Response:", data);

			if (response.status !== 200 || data.error) {
				throw new Error(data.message);
			}

			setSubmitted(true);
			toast.success("Reset link sent!", {
				description: data.message,
				richColors: true,
			});
		} catch (error) {
			console.error("Error submitting forgot password request:", error);
			toast.error(
				(error as Error)?.message ||
					"Failed to send reset link. Please try again later.",
				{
					richColors: true,
					description: "An unexpected error occurred.",
				}
			);
		} finally {
			setLoading(false);
		}
	};

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
				{/* Header */}
				<div className="mb-8">
					<Link
						to="/auth/login"
						className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition mb-6">
						<ArrowLeft size={18} />
						<span className="text-sm font-medium">Back to Login</span>
					</Link>

					<div className="text-center">
						<h1 className="text-3xl font-bold text-foreground mb-2">
							Reset Password
						</h1>
						<p className="text-muted-foreground">
							Enter your email address and we'll send you a link to reset your
							password
						</p>
					</div>
				</div>

				{!submitted ? (
					<form
						onSubmit={handleSubmit}
						className="bg-card rounded-2xl p-8 shadow-lg space-y-6">
						<div className="space-y-2">
							<label
								htmlFor="email"
								className="block text-sm font-medium text-foreground">
								Email Address
							</label>
							<Input
								readOnly={loading}
								id="email"
								type="email"
								placeholder="you@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="bg-secondary border-border"
								required
							/>
						</div>

						<Button
							disabled={loading}
							type="submit"
							className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-2 font-semibold">
							{loading ? "Sending..." : "Send Reset Link"}
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
							Check Your Email
						</h2>
						<p className="text-muted-foreground">
							We've sent a password reset link to {email}. Click the link in the
							email to reset your password.
						</p>
						{/* <Button
							onClick={() => setSubmitted(false)}
							variant="outline"
							className="w-full rounded-full">
							Didn't receive it? Try again
						</Button> */}
					</div>
				)}
			</div>
		</div>
	);
}
