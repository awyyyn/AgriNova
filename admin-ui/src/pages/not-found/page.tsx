import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";

export default function NotFound() {
	return (
		<>
			<Helmet>
				<title>404 | Not Found</title>
			</Helmet>
			<div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary flex items-center justify-center px-4">
				{/* Decorative plant element - top right */}
				<div className="absolute top-0 right-0 w-48 h-48 opacity-20 pointer-events-none">
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

				{/* Decorative plant element - bottom left */}
				<div className="absolute bottom-0 left-0 w-56 h-56 opacity-20 pointer-events-none">
					<svg viewBox="0 0 200 200" className="w-full h-full">
						<path
							d="M50 180 Q60 140 70 100 M50 180 Q40 140 30 100"
							stroke="currentColor"
							fill="none"
							strokeWidth="2"
						/>
						<path
							d="M80 180 Q90 140 100 100 M80 180 Q70 140 60 100"
							stroke="currentColor"
							fill="none"
							strokeWidth="2"
						/>
						<ellipse
							cx="65"
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
						<h1 className="text-8xl font-bold text-primary mb-2">404</h1>
						<p className="text-sm text-muted-foreground uppercase tracking-widest">
							Page Not Found
						</p>
					</div>

					<div className="mb-8">
						<h2 className="text-2xl font-semibold text-foreground mb-3">
							Looks like you've wandered off the farm
						</h2>
						<p className="text-muted-foreground mb-6">
							The page you're looking for doesn't exist. It might have been
							moved or deleted. Let's get you back on track.
						</p>
					</div>

					{/* Illustration - Simple error icon */}
					<div className="mb-8 flex justify-center">
						<div className="relative w-24 h-24 bg-secondary rounded-full flex items-center justify-center">
							<svg
								className="w-12 h-12 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
					</div>

					{/* Action buttons */}
					<div className="flex flex-col sm:flex-row gap-3 justify-center">
						<Link to="/">
							<Button className="w-full sm:w-auto">Back to Home</Button>
						</Link>
						<Link to="/admin/dashboard">
							<Button
								variant="outline"
								className="w-full sm:w-auto bg-transparent">
								Go to Dashboard
							</Button>
						</Link>
					</div>

					{/* Additional help text */}
					<p className="text-xs text-muted-foreground mt-8">
						Need help?{" "}
						<Link
							to="mailto:support@agrinova.com"
							className="text-primary hover:underline">
							Contact support
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}
