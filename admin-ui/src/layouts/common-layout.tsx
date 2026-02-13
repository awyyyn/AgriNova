import { Footer } from "@/components/custom/footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { Leaf } from "lucide-react";
import { Link, Outlet } from "react-router";

export default function CommonLayout() {
	const { isAuthenticated } = useAuth();
	return (
		<div>
			<nav className="fixed top-0 w-full  backdrop-blur-lg bg-white/10    z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Leaf className="w-8 h-8 text-primary" />
						<span className="text-2xl font-bold text-primary">AgriNova</span>
					</div>
					<div className="hidden md:flex items-center gap-8">
						<Link
							to="/#home"
							className="text-foreground/70 hover:text-foreground transition">
							Home
						</Link>
						<Link
							to="/#about"
							className="text-foreground/70 hover:text-foreground transition">
							About
						</Link>
						<Link
							to={{
								hash: "features",
								pathname: "/",
							}}
							className="text-foreground/70 hover:text-foreground transition">
							Features
						</Link>
						<Link
							to="faqs"
							className="text-foreground/70 hover:text-foreground transition">
							FAQs
						</Link>
					</div>
					<div className="flex items-center gap-4">
						{/* <Link to="/auth/login">
							<Button variant="ghost">Sign In</Button>
						</Link> */}
						<Link to={isAuthenticated ? "/admin/dashboard" : "/auth/login"}>
							<Button>
								{isAuthenticated ? "Go to Dashboard" : "Get Started"}
							</Button>
						</Link>
					</div>
				</div>
			</nav>

			<main>
				<Outlet />
			</main>

			<Footer />
		</div>
	);
}
