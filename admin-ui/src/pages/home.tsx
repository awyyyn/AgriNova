"use client";

import {
	ArrowRight,
	Leaf,
	BarChart3,
	Zap,
	Shield,
	Users,
	TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function LandingPage() {
	return (
		<div className="w-full bg-background text-foreground overflow-hidden">
			{/* Navigation */}
			<nav className="fixed top-0 w-full backdrop-blur-sm bg-background/80 border-b border-border z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Leaf className="w-8 h-8 text-primary" />
						<span className="text-2xl font-bold text-primary">AgriNova</span>
					</div>
					<div className="hidden md:flex items-center gap-8">
						<a
							href="#features"
							className="text-foreground/70 hover:text-foreground transition">
							Features
						</a>
						<a
							href="#benefits"
							className="text-foreground/70 hover:text-foreground transition">
							Benefits
						</a>
					</div>
					<div className="flex items-center gap-4">
						<Link to="/login">
							<Button variant="ghost">Sign In</Button>
						</Link>
						<Link to="/login">
							<Button>Get Started</Button>
						</Link>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
				{/* Decorative background elements */}
				<div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
				<div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>

				<div className="max-w-7xl mx-auto relative z-10">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div>
							<h1 className="text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6">
								Smart farming, <span className="text-primary">simplified</span>
							</h1>
							<p className="text-xl text-foreground/70 mb-8 text-balance">
								From detection to action — AgriNova is your intelligent farming
								partner. Monitor, analyze, and optimize your crops in real-time
								with AI-powered insights.
							</p>
							<div className="flex flex-col sm:flex-row gap-4">
								<Link to="/login">
									<Button size="lg" className="gap-2">
										Get Started <ArrowRight className="w-4 h-4" />
									</Button>
								</Link>
								<Button variant="outline" size="lg">
									Watch Demo
								</Button>
							</div>
						</div>

						{/* Hero visual */}
						<div className="relative h-96 lg:h-full flex items-center justify-center">
							<div className="w-full max-w-sm aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl border border-primary/20 flex items-center justify-center">
								<div className="text-center">
									<Leaf className="w-24 h-24 text-primary mx-auto mb-4 opacity-40" />
									<p className="text-foreground/60 text-sm">
										Crop monitoring dashboard
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border">
				<div className="max-w-7xl mx-auto">
					<div className="grid md:grid-cols-4 gap-8">
						<div>
							<p className="text-4xl font-bold text-primary mb-2">40%</p>
							<p className="text-foreground/70">Increase in crop yield</p>
						</div>
						<div>
							<p className="text-4xl font-bold text-primary mb-2">24/7</p>
							<p className="text-foreground/70">AI monitoring</p>
						</div>
						<div>
							<p className="text-4xl font-bold text-primary mb-2">500+</p>
							<p className="text-foreground/70">Active farmers</p>
						</div>
						<div>
							<p className="text-4xl font-bold text-primary mb-2">99.9%</p>
							<p className="text-foreground/70">Uptime guarantee</p>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl lg:text-5xl font-bold mb-4">
							Powerful features for modern farming
						</h2>
						<p className="text-xl text-foreground/70 max-w-2xl mx-auto">
							Everything you need to optimize your farm's performance and
							maximize yields.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{/* Feature 1 */}
						<div className="p-8 rounded-xl border border-border bg-card hover:border-primary/30 transition">
							<BarChart3 className="w-12 h-12 text-primary mb-4" />
							<h3 className="text-xl font-bold mb-3">Real-time Analytics</h3>
							<p className="text-foreground/70">
								Monitor soil moisture, temperature, and crop health with instant
								alerts and detailed analytics.
							</p>
						</div>

						{/* Feature 2 */}
						<div className="p-8 rounded-xl border border-border bg-card hover:border-primary/30 transition">
							<Zap className="w-12 h-12 text-primary mb-4" />
							<h3 className="text-xl font-bold mb-3">AI-Powered Detection</h3>
							<p className="text-foreground/70">
								Automatically detect diseases, pests, and nutrient deficiencies
								before they impact your crops.
							</p>
						</div>

						{/* Feature 3 */}
						<div className="p-8 rounded-xl border border-border bg-card hover:border-primary/30 transition">
							<Shield className="w-12 h-12 text-primary mb-4" />
							<h3 className="text-xl font-bold mb-3">Predictive Insights</h3>
							<p className="text-foreground/70">
								Get actionable recommendations based on weather forecasts and
								historical data patterns.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Benefits Section */}
			<section
				id="benefits"
				className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
				<div className="max-w-7xl mx-auto">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div>
							<h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
								Why farmers choose AgriNova
							</h2>
							<div className="space-y-6">
								<div className="flex gap-4">
									<div className="flex-shrink-0">
										<Users className="w-6 h-6 text-primary mt-1" />
									</div>
									<div>
										<h3 className="font-bold text-lg mb-2">
											Trusted by experts
										</h3>
										<p className="text-foreground/70">
											Join hundreds of successful farmers already using
											AgriNova.
										</p>
									</div>
								</div>

								<div className="flex gap-4">
									<div className="flex-shrink-0">
										<TrendingUp className="w-6 h-6 text-primary mt-1" />
									</div>
									<div>
										<h3 className="font-bold text-lg mb-2">Proven results</h3>
										<p className="text-foreground/70">
											Average 40% increase in yields within the first season.
										</p>
									</div>
								</div>

								<div className="flex gap-4">
									<div className="flex-shrink-0">
										<Leaf className="w-6 h-6 text-primary mt-1" />
									</div>
									<div>
										<h3 className="font-bold text-lg mb-2">
											Sustainable farming
										</h3>
										<p className="text-foreground/70">
											Reduce water usage by up to 30% while improving crop
											quality.
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="relative h-96">
							<div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl border border-primary/20 flex items-center justify-center">
								<TrendingUp className="w-32 h-32 text-primary opacity-20" />
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Pricing Section  */}

			{/* <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl lg:text-5xl font-bold mb-4">
							Simple, transparent pricing
						</h2>
						<p className="text-xl text-foreground/70">
							Start free. Scale as you grow.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">

						<div className="p-8 rounded-xl border border-border bg-card">
							<h3 className="text-2xl font-bold mb-2">Starter</h3>
							<p className="text-foreground/70 mb-6">Perfect for small farms</p>
							<div className="mb-6">
								<span className="text-4xl font-bold">Free</span>
							</div>
							<Button variant="outline" className="w-full mb-6 bg-transparent">
								Get Started
							</Button>
							<ul className="space-y-3 text-sm">
								<li className="flex gap-2">
									<span className="text-primary">✓</span> Up to 5 fields
								</li>
								<li className="flex gap-2">
									<span className="text-primary">✓</span> Basic monitoring
								</li>
								<li className="flex gap-2">
									<span className="text-primary">✓</span> Email support
								</li>
							</ul>
						</div>


						<div className="p-8 rounded-xl border-2 border-primary bg-card relative">
							<div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
								Popular
							</div>
							<h3 className="text-2xl font-bold mb-2">Professional</h3>
							<p className="text-foreground/70 mb-6">For growing operations</p>
							<div className="mb-6">
								<span className="text-4xl font-bold">$49</span>
								<span className="text-foreground/70">/month</span>
							</div>
							<Button className="w-full mb-6">Start Free Trial</Button>
							<ul className="space-y-3 text-sm">
								<li className="flex gap-2">
									<span className="text-primary">✓</span> Unlimited fields
								</li>
								<li className="flex gap-2">
									<span className="text-primary">✓</span> Advanced analytics
								</li>
								<li className="flex gap-2">
									<span className="text-primary">✓</span> AI pest detection
								</li>
								<li className="flex gap-2">
									<span className="text-primary">✓</span> Priority support
								</li>
							</ul>
						</div>


						<div className="p-8 rounded-xl border border-border bg-card">
							<h3 className="text-2xl font-bold mb-2">Enterprise</h3>
							<p className="text-foreground/70 mb-6">For large-scale farming</p>
							<div className="mb-6">
								<span className="text-4xl font-bold">Custom</span>
							</div>
							<Button variant="outline" className="w-full mb-6 bg-transparent">
								Contact Sales
							</Button>
							<ul className="space-y-3 text-sm">
								<li className="flex gap-2">
									<span className="text-primary">✓</span> Everything in Pro
								</li>
								<li className="flex gap-2">
									<span className="text-primary">✓</span> Custom integrations
								</li>
								<li className="flex gap-2">
									<span className="text-primary">✓</span> Dedicated support
								</li>
								<li className="flex gap-2">
									<span className="text-primary">✓</span> SLA guarantee
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section> */}

			{/* CTA Section */}
			<section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-4xl lg:text-5xl font-bold mb-6">
						Ready to grow smarter?
					</h2>
					<p className="text-lg mb-8 opacity-90">
						Start monitoring your farm today and see the difference AI-powered
						farming can make.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link to="/login">
							<Button size="lg" variant="secondary" className="gap-2">
								Start Free Today <ArrowRight className="w-4 h-4" />
							</Button>
						</Link>
						<Button
							size="lg"
							variant="outline"
							className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">
							Schedule Demo
						</Button>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="grid md:grid-cols-4 gap-8 mb-8">
						<div>
							<div className="flex items-center gap-2 mb-4">
								<Leaf className="w-6 h-6 text-primary" />
								<span className="font-bold text-primary">AgriNova</span>
							</div>
							<p className="text-foreground/70 text-sm">
								Smart farming partner for modern agriculture.
							</p>
						</div>
						<div>
							<h4 className="font-bold mb-4">Product</h4>
							<ul className="space-y-2 text-sm text-foreground/70">
								<li>
									<a
										href="#features"
										className="hover:text-foreground transition">
										Features
									</a>
								</li>
								<li>
									<a href="#">Documentation</a>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-bold mb-4">Company</h4>
							<ul className="space-y-2 text-sm text-foreground/70">
								<li>
									<a href="#">About</a>
								</li>
								<li>
									<a href="#">Blog</a>
								</li>
								<li>
									<a href="#">Contact</a>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-bold mb-4">Legal</h4>
							<ul className="space-y-2 text-sm text-foreground/70">
								<li>
									<a href="#">Privacy Policy</a>
								</li>
								<li>
									<a href="#">Terms of Service</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="border-t border-border pt-8 text-center text-foreground/70 text-sm">
						<p>&copy; 2025 AgriNova. All rights reserved.</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
