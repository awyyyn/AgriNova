import { Bug, Microscope, Shield } from "lucide-react";
import { FeatureCard } from "./feature-card";

export function Mission() {
	return (
		<section
			className="py-20 md:py-32 bg-gradient-to-b from-white to-emerald-50"
			id="about">
			<div className="max-w-6xl mx-auto px-4 space-y-16">
				<div className="max-w-3xl mx-auto text-center space-y-4">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900">
						Why AgriNova?
					</h2>
					<p className="text-lg text-gray-600">
						Empower farmers with instant pest detection and actionable solutions
						right in their pocket.
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-12">
					<div className="space-y-4">
						<div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 border border-green-300">
							<svg
								className="w-6 h-6 text-green-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 10V3L4 14h7v7l9-11h-7z"
								/>
							</svg>
						</div>
						<h3 className="text-2xl font-bold text-gray-900">
							Instant Identification
						</h3>
						<p className="text-gray-600 leading-relaxed">
							Upload a photo of your plant and get instant pest identification
							within seconds. Our GPT-powered AI analyzes leaf damage,
							discoloration, and pest characteristics to identify the exact pest
							affecting your crop.
						</p>
						<ul className="space-y-2 pt-4">
							{[
								"AI-powered image recognition",
								"Real-time identification",
								"Confidence scores",
							].map((item) => (
								<li
									key={item}
									className="flex items-center gap-3 text-gray-600">
									<span className="w-2 h-2 rounded-full bg-green-600" />
									{item}
								</li>
							))}
						</ul>
					</div>

					<div className="space-y-4">
						<div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 border border-green-300">
							<svg
								className="w-6 h-6 text-green-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M20.354 15.354A9 9 0 015.646 5.646 9 9 0 1020.354 15.354z"
								/>
							</svg>
						</div>
						<h3 className="text-2xl font-bold text-gray-900">
							Complete Solutions
						</h3>
						<p className="text-gray-600 leading-relaxed">
							Get comprehensive treatment options including professional
							chemical treatments, organic solutions, and DIY remedies you can
							make at home. Prevent future infestations with actionable
							prevention tips tailored to your crop.
						</p>
						<ul className="space-y-2 pt-4">
							{[
								"Multiple treatment options",
								"DIY solutions",
								"Prevention strategies",
							].map((item) => (
								<li
									key={item}
									className="flex items-center gap-3 text-gray-600">
									<span className="w-2 h-2 rounded-full bg-green-600" />
									{item}
								</li>
							))}
						</ul>
					</div>
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
	);
}
