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
import { Leaf, Bug, ArrowRight, AlertTriangle } from "lucide-react";
import { PublicStats } from "@/types";
import { Helmet } from "react-helmet-async";
import { Progress } from "@/components/ui/progress";
import { Hero } from "@/components/custom/hero";
import { Mission } from "@/components/custom/mission";
import { Features } from "@/components/custom/features";

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
			<div
				className="min-h-screen bg-gradient-to-b from-background to-muted/20 "
				id="home">
				<Hero
					stats={{
						totalFruits: stats?.overview.totalFruits || 0,
						totalPlantsType: stats?.overview.totalPlantsType || 0,
						totalVegetables: stats?.overview.totalVegetables || 0,
						totalPestFound: stats?.overview.totalDiseasesFound || 0,
					}}
				/>

				<Mission />

				<Features />

				{/* Top Diseases Section */}
				{diseases.length > 0 && (
					<section className="py-20 bg-gradient-to-b from-white to-emerald-50  ">
						<div className="container mx-auto px-4 max-w-6xl">
							<div className="text-center mb-12">
								<h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
									<AlertTriangle className="h-8 w-8 text-green-600" />
									Most Common Diseases
								</h2>
								<p className="text-muted-foreground">
									Top diseases detected by our system
								</p>
							</div>

							<Card className="max-w-4xl mx-auto border-green-200 dark:border-green-900">
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
															? "bg-green-200 text-green-700 "
															: index === 1
																? "bg-green-100 text-green-600  "
																: index === 2
																	? "bg-emerald-100 text-emerald-600  "
																	: "bg-muted text-muted-foreground"
													}
                        `}>
																{index + 1}
															</div>

															<span className="font-medium">
																{disease.name}
															</span>
														</div>

														<Badge
															variant="secondary"
															className="gap-1 bg-green-100 text-green-700">
															<Bug className="h-3 w-3" />
															{disease.count.toLocaleString()} cases
														</Badge>
													</div>

													<Progress
														value={percentage}
														className="h-2 bg-white"
													/>
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
							Identify pests in seconds. Get solutions immediately.
						</p>
						<Button
							size="lg"
							variant="secondary"
							onClick={() => navigate("/auth/login")}
							className="gap-2">
							Get Started Now
							<ArrowRight className="h-4 w-4" />
						</Button>
					</div>
				</section>
			</div>
		</>
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
