"use client";

import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Forbidden() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary flex items-center justify-center px-4">
			{/* Decorative plant element - top left */}
			<div className="absolute top-0 left-0 w-48 h-48 opacity-20 pointer-events-none">
				<svg viewBox="0 0 200 200" className="w-full h-full">
					<path
						d="M100 20 Q120 50 110 80 M100 20 Q80 50 90 80"
						stroke="currentColor"
						fill="none"
						strokeWidth="2"
					/>
					<path
						d="M100 40 Q130 60 120 90 M100 40 Q70 60 80 90"
						stroke="currentColor"
						fill="none"
						strokeWidth="2"
					/>
					<ellipse
						cx="100"
						cy="150"
						rx="60"
						ry="30"
						fill="currentColor"
						opacity="0.3"
					/>
				</svg>
			</div>

			{/* Decorative plant element - bottom right */}
			<div className="absolute bottom-0 right-0 w-56 h-56 opacity-20 pointer-events-none">
				<svg viewBox="0 0 200 200" className="w-full h-full">
					<path
						d="M150 180 Q140 140 130 100 M150 180 Q160 140 170 100"
						stroke="currentColor"
						fill="none"
						strokeWidth="2"
					/>
					<path
						d="M120 180 Q110 140 100 100 M120 180 Q130 140 140 100"
						stroke="currentColor"
						fill="none"
						strokeWidth="2"
					/>
					<ellipse
						cx="135"
						cy="50"
						rx="40"
						ry="20"
						fill="currentColor"
						opacity="0.3"
					/>
				</svg>
			</div>

			{/* Content */}
			<div className="relative z-10 text-center max-w-md">
				<div className="mb-8">
					<h1 className="text-8xl font-bold text-destructive mb-2">403</h1>
					<p className="text-sm text-muted-foreground uppercase tracking-widest">
						Access Forbidden
					</p>
				</div>

				<div className="mb-8">
					<h2 className="text-2xl font-semibold text-foreground mb-3">
						Access Denied
					</h2>
					<p className="text-muted-foreground mb-6">
						You don't have permission to access this resource. If you believe
						this is a mistake, please contact your account administrator.
					</p>
				</div>

				{/* Illustration - Lock icon */}
				<div className="mb-8 flex justify-center">
					<div className="relative w-24 h-24 bg-secondary rounded-full flex items-center justify-center">
						<svg
							className="w-12 h-12 text-destructive"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
							/>
						</svg>
					</div>
				</div>

				{/* Action buttons */}
				<div className="flex flex-col sm:flex-row gap-3 justify-center">
					<Link to="/">
						<Button className="w-full sm:w-auto">Back to Home</Button>
					</Link>
					<Link to="javascript:history.back()">
						<Button
							variant="outline"
							className="w-full sm:w-auto bg-transparent">
							Go Back
						</Button>
					</Link>
				</div>

				{/* Additional help text */}
				<p className="text-xs text-muted-foreground mt-8">
					Have questions?{" "}
					<Link
						to="mailto:support@agrinova.com"
						className="text-primary hover:underline">
						Contact support
					</Link>
				</p>
			</div>
		</div>
	);
}
