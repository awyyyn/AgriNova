import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { loginForm, LoginForm } from "@/form-schemas";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const { login } = useAuth();
	const form = useForm<LoginForm>({
		resolver: zodResolver(loginForm),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleSubmit = async (values: LoginForm) => {
		try {
			await new Promise((resolve) => setTimeout(resolve, 4000)); // Simulate network delay
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/auth/login`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(values),
				}
			);

			const data = await response.json();

			if (response.status !== 200) {
				throw new Error(data.errorMessage || "Login failed");
			}

			console.log("========= Login Response =========");
			toast.success("Login successful!", {
				description: "Welcome back!",
				richColors: true,
			});
			login(data.data.accessToken, data.data.user);
		} catch (error) {
			toast.error("Login failed. Please try again.", {
				description:
					(error as Error)?.message || "An unexpected error occurred.",
				richColors: true,
			});
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
					<p className="text-muted-foreground text-sm">
						From detection to action - your smart farming partner
					</p>
				</div>

				{/* Login form */}
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="bg-card rounded-2xl p-8 shadow-lg space-y-6">
						<div className="space-y-2">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email Address</FormLabel>
										<FormControl>
											<Input
												readOnly={form.formState.isSubmitting}
												type="email"
												placeholder="you@example.com"
												className="bg-secondary border-border"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="space-y-2">
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													readOnly={form.formState.isSubmitting}
													placeholder="••••••••"
													className="bg-secondary border-border pr-10"
													type={showPassword ? "text" : "password"}
													{...field}
												/>
												<button
													type="button"
													disabled={form.formState.isSubmitting}
													onClick={() => setShowPassword(!showPassword)}
													className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition">
													{showPassword ? (
														<EyeOff size={18} />
													) : (
														<Eye size={18} />
													)}
												</button>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="flex items-center justify-between">
							<label className="flex items-center gap-2 cursor-pointer">
								<input
									disabled={form.formState.isSubmitting}
									type="checkbox"
									className="w-4 h-4 rounded border-border"
								/>
								<span className="text-sm text-muted-foreground">
									Remember me
								</span>
							</label>
							<Link
								to={form.formState.isSubmitting ? "#" : "/auth/forgot-password"}
								className="text-sm text-primary hover:text-primary/80 transition">
								Forgot password?
							</Link>
						</div>

						<Button
							disabled={form.formState.isSubmitting}
							type="submit"
							className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-2 font-semibold">
							{form.formState.isSubmitting ? "Logging in..." : "Login"}
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
