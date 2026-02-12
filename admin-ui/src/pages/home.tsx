import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Leaf,
	Bug,
	TrendingUp,
	Microscope,
	Shield,
	ChevronRight,
	BarChart3,
	Sparkles,
	ArrowRight,
	AlertCircle,
	AlertTriangle,
} from "lucide-react";
import { PublicStats } from "@/types";
import { Helmet } from "react-helmet-async";
import { Progress } from "@/components/ui/progress";

interface Disease {
	name: string;
	count: number;
}

export default function LandingPage() {
	const navigate = useNavigate();
	const [stats, setStats] = useState<PublicStats | null>(null);
	const [loading, setLoading] = useState(true);
	const [diseases, setDiseases] = useState<Disease[]>([]);

	useEffect(() => {
		fetchLandingData();
	}, []);

	const fetchLandingData = async () => {
		try {
			setLoading(true);

			const [statsRes, diseasesRes] = await Promise.all([
				fetch(`${import.meta.env.VITE_API_URL}/stats`),
				fetch(`${import.meta.env.VITE_API_URL}/diseases`),
			]);

			const [statsData, diseasesData] = await Promise.all([
				statsRes.json(),
				diseasesRes.json(),
			]);

			if (statsData.success) setStats(statsData.data);
			if (diseasesData.success) setDiseases(diseasesData.data);
		} catch (error) {
			console.error("Error fetching landing data:", error);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <LoadingSkeleton />;
	}

	return (
		<>
			<Helmet>
				{/* Primary Meta Tags */}
				<title>AgriNova | Smart Farming Powered by AI</title>
				<meta
					name="description"
					content="AgriNova is an AI-powered smart farming platform that helps farmers monitor crop health, detect pests, and increase yields with real-time analytics."
				/>
				<meta
					name="keywords"
					content="smart farming, agriculture AI, crop monitoring, pest detection, farm analytics, AgriNova"
				/>
				<meta name="author" content="AgriNova" />

				{/* Open Graph / Facebook */}
				<meta property="og:type" content="website" />
				<meta
					property="og:title"
					content="AgriNova | Smart Farming Powered by AI"
				/>
				<meta
					property="og:description"
					content="Monitor, analyze, and optimize your crops using AI-powered insights with AgriNova."
				/>
				<meta property="og:url" content="https://agri-nova.xyz/" />
				<meta
					property="og:image"
					content="https://agri-nova.xyz/og-image.png"
				/>

				{/* Mobile */}
				<meta name="viewport" content="width=device-width, initial-scale=1" />

				{/* Canonical */}
				<link rel="canonical" href="https://agri-nova.xyz/" />
			</Helmet>
			<div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
				{/* Hero Section */}
				<section className="relative overflow-hidden py-20 lg:py-32">
					<div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

					<div className="container mx-auto px-4 max-w-6xl">
						<div className="text-center">
							<Badge variant="outline" className="mb-4">
								<Sparkles className="h-3 w-3 mr-1" />
								AI-Powered Plant Analysis
							</Badge>

							<h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
								Keep Your Plants Healthy
							</h1>

							<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
								Detect diseases, identify pests, and get instant treatment
								recommendations powered by AI
							</p>

							<div className="flex flex-wrap items-center justify-center gap-4">
								{/* <Button
									size="lg"
									onClick={() => navigate("/auth/register")}
									className="gap-2">
									Get Started Free
									<ChevronRight className="h-4 w-4" />
								</Button> */}
								<Button
									size="lg"
									variant="outline"
									onClick={() => navigate("/auth/login")}>
									Sign In
								</Button>
							</div>

							{/* Stats Preview */}
							{stats && (
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
									<StatsCard
										icon={<Microscope className="h-5 w-5" />}
										value={String(stats.overview?.totalPlants)}
										label="Total Plants"
									/>
									<StatsCard
										icon={<Leaf className="h-5 w-5 text-green-600" />}
										value={String(stats.overview?.healthyPlants)}
										label="Healthy"
									/>
									<StatsCard
										icon={<AlertCircle className="h-5 w-5 text-red-600" />}
										value={String(stats.overview?.totalDiseasesFound)}
										label="Diseases Found"
									/>
									<StatsCard
										icon={<TrendingUp className="h-5 w-5 text-blue-600" />}
										value={`${((stats.overview?.healthyPlants / stats.overview?.totalPlants) * 100).toFixed(0)}%`}
										label="Success Rate"
									/>
								</div>
							)}
						</div>
					</div>
				</section>

				{/* Plant Types Breakdown */}
				{stats && (
					<section className="py-20 bg-muted/30">
						<div className="container mx-auto px-4 max-w-6xl">
							<div className="text-center mb-12">
								<h2 className="text-3xl md:text-4xl font-bold mb-4">
									Analysis Breakdown
								</h2>
								<p className="text-muted-foreground">
									Plants analyzed by category
								</p>
							</div>

							<div className="grid md:grid-cols-3 gap-6">
								<TypeCard
									icon="🥬"
									label="Vegetables"
									count={stats.overview?.totalVegetables}
									color="text-green-600"
								/>
								<TypeCard
									icon="🍎"
									label="Fruits"
									count={stats.overview?.totalFruits}
									color="text-red-600"
								/>
								<TypeCard
									icon="🌿"
									label="Plants"
									count={stats.overview?.totalPlantsType}
									color="text-emerald-600"
								/>
							</div>
						</div>
					</section>
				)}

				{/* Features Section */}
				<section className="py-20">
					<div className="container mx-auto px-4 max-w-6xl">
						<div className="text-center mb-12">
							<h2 className="text-3xl md:text-4xl font-bold mb-4">
								Why Choose AgriNova?
							</h2>
							<p className="text-muted-foreground max-w-2xl mx-auto">
								Advanced AI technology to help you maintain healthy, thriving
								plants
							</p>
						</div>

						<div className="grid md:grid-cols-3 gap-8">
							<FeatureCard
								icon={<Microscope className="h-10 w-10 text-blue-600" />}
								title="AI Disease Detection"
								description="Upload a photo and get instant diagnosis with high accuracy rate"
							/>
							<FeatureCard
								icon={<Bug className="h-10 w-10 text-red-600" />}
								title="Pest Identification"
								description="Identify harmful pests and get targeted treatment recommendations"
							/>
							<FeatureCard
								icon={<Shield className="h-10 w-10 text-green-600" />}
								title="Prevention Tips"
								description="Proactive care advice to keep your plants healthy year-round"
							/>
						</div>
					</div>
				</section>

				{/* Top Diseases Section */}
				{diseases.length > 0 && (
					<section className="py-20 bg-muted/30">
						<div className="container mx-auto px-4 max-w-6xl">
							<div className="text-center mb-12">
								<h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
									<AlertTriangle className="h-8 w-8 text-amber-600" />
									Most Common Diseases
								</h2>
								<p className="text-muted-foreground">
									Top diseases detected by our system
								</p>
							</div>

							<Card className="max-w-4xl mx-auto">
								<CardHeader>
									<CardTitle>Disease Detection Statistics</CardTitle>
									<CardDescription>
										Based on{" "}
										{stats?.overview.totalDiseasesFound.toLocaleString()}{" "}
										detected cases
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-6">
										{diseases.slice(0, 10).map((disease, index) => {
											const maxCount = Math.max(
												...diseases.map((d) => d.count),
											);
											const percentage = (disease.count / maxCount) * 100;

											return (
												<div key={index} className="space-y-2">
													<div className="flex items-center justify-between">
														<div className="flex items-center gap-3">
															<div
																className={`
                              flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm
                              ${
																index === 0
																	? "bg-amber-100 text-amber-600 dark:bg-amber-950"
																	: index === 1
																		? "bg-orange-100 text-orange-600 dark:bg-orange-950"
																		: index === 2
																			? "bg-red-100 text-red-600 dark:bg-red-950"
																			: "bg-muted text-muted-foreground"
															}
                            `}>
																{index + 1}
															</div>
															<span className="font-medium">
																{disease.name}
															</span>
														</div>
														<Badge variant="secondary" className="gap-1">
															<Bug className="h-3 w-3" />
															{disease.count.toLocaleString()} cases
														</Badge>
													</div>
													<Progress value={percentage} className="h-2" />
												</div>
											);
										})}
									</div>
								</CardContent>
							</Card>
						</div>
					</section>
				)}

				{/* Growth Chart Section */}
				{stats && (stats?.monthlyGrowth || []).length > 0 && (
					<section className="py-20 bg-muted/30">
						<div className="container mx-auto px-4 max-w-6xl">
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<BarChart3 className="h-5 w-5" />
										Growing Community
									</CardTitle>
									<CardDescription>
										Monthly plant analyses over the past 6 months
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="flex items-end justify-between h-64 gap-2">
										{stats.monthlyGrowth.map((month, index) => {
											const maxCount = Math.max(
												...stats.monthlyGrowth.map((m) => m.count),
											);
											const height =
												maxCount > 0 ? (month.count / maxCount) * 100 : 20;

											return (
												<div
													key={index}
													className="flex flex-col items-center flex-1 gap-2">
													<div className="text-xs font-medium text-muted-foreground">
														{month.count}
													</div>
													<div
														className="w-full bg-primary rounded-t-lg transition-all hover:bg-primary/80"
														style={{ height: `${height}%`, minHeight: "20px" }}
													/>
													<div className="text-xs font-medium">
														{month.month}
													</div>
												</div>
											);
										})}
									</div>
								</CardContent>
							</Card>
						</div>
					</section>
				)}

				{/* CTA Section */}
				<section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
					<div className="container mx-auto px-4 max-w-4xl text-center">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							Ready to Start Protecting Your Plants?
						</h2>
						<p className="text-lg mb-8 text-green-50">
							Join thousands of users already using AgriNova
						</p>
						<Button
							size="lg"
							variant="secondary"
							onClick={() => navigate("/auth/register")}
							className="gap-2">
							Get Started Now
							<ArrowRight className="h-4 w-4" />
						</Button>
					</div>
				</section>

				{/* Footer */}
				<footer className="py-12 border-t">
					<div className="container mx-auto px-4 max-w-6xl">
						<div className="grid md:grid-cols-4 gap-8">
							<div>
								<h3 className="font-bold mb-4 flex items-center gap-2">
									<Leaf className="h-5 w-5 text-green-600" />
									AgriNova
								</h3>
								<p className="text-sm text-muted-foreground">
									AI-powered plant disease detection and care platform
								</p>
							</div>

							<div>
								<h4 className="font-semibold mb-3">Product</h4>
								<ul className="space-y-2 text-sm text-muted-foreground">
									<li>
										<a href="#features" className="hover:text-foreground">
											Features
										</a>
									</li>
									<li>
										<a href="#pricing" className="hover:text-foreground">
											Pricing
										</a>
									</li>
									<li>
										<a href="#about" className="hover:text-foreground">
											About
										</a>
									</li>
								</ul>
							</div>

							<div>
								<h4 className="font-semibold mb-3">Support</h4>
								<ul className="space-y-2 text-sm text-muted-foreground">
									<li>
										<a href="#help" className="hover:text-foreground">
											Help Center
										</a>
									</li>
									<li>
										<a href="#contact" className="hover:text-foreground">
											Contact
										</a>
									</li>
									<li>
										<a href="#faq" className="hover:text-foreground">
											FAQ
										</a>
									</li>
								</ul>
							</div>

							<div>
								<h4 className="font-semibold mb-3">Legal</h4>
								<ul className="space-y-2 text-sm text-muted-foreground">
									<li>
										<a href="#privacy" className="hover:text-foreground">
											Privacy
										</a>
									</li>
									<li>
										<a href="#terms" className="hover:text-foreground">
											Terms
										</a>
									</li>
									<li>
										<a href="#cookies" className="hover:text-foreground">
											Cookies
										</a>
									</li>
								</ul>
							</div>
						</div>

						<div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
							© 2026 AgriNova. All rights reserved.
						</div>
					</div>
				</footer>
			</div>
		</>
	);
}

function StatsCard({
	icon,
	value,
	label,
}: {
	icon: React.ReactNode;
	value: string;
	label: string;
}) {
	return (
		<div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card border">
			<div className="text-muted-foreground">{icon}</div>
			<div className="text-2xl font-bold">{value}</div>
			<div className="text-sm text-muted-foreground">{label}</div>
		</div>
	);
}

function TypeCard({
	icon,
	label,
	count,
	color,
}: {
	icon: string;
	label: string;
	count: number;
	color: string;
}) {
	return (
		<Card className="hover:shadow-lg transition-shadow">
			<CardHeader>
				<div className="text-5xl mb-4 text-center">{icon}</div>
				<CardTitle className="text-center">{label}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="text-center">
					<div className={`text-4xl font-bold mb-2 ${color}`}>{count}</div>
					<p className="text-sm text-muted-foreground">Analyzed</p>
				</div>
			</CardContent>
		</Card>
	);
}

function FeatureCard({
	icon,
	title,
	description,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
}) {
	return (
		<Card>
			<CardHeader>
				<div className="mb-4">{icon}</div>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-muted-foreground">{description}</p>
			</CardContent>
		</Card>
	);
}

function LoadingSkeleton() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="text-center">
				<Leaf className="h-12 w-12 text-green-600 animate-pulse mx-auto mb-4" />
				<p className="text-muted-foreground">Loading...</p>
			</div>
		</div>
	);
}
