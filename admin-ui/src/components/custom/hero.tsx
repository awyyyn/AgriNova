import { Link } from "react-router";
import { TypeCard } from "./type-card";

interface HeroProps {
	stats: {
		totalPlantsType: number;
		totalFruits: number;
		totalVegetables: number;
		totalPestFound: number;
	};
}

export function Hero({ stats }: HeroProps) {
	return (
		<section className="relative min-h-screen bg-gradient-to-b from-white via-emerald-50 to-white">
			<div className="absolute inset-0 opacity-10">
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-600 via-transparent to-transparent" />
			</div>

			<div className="relative flex items-center justify-center min-h-screen px-4">
				<div className="max-w-4xl mx-auto text-center space-y-6">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 border border-green-300">
						<div className="w-2 h-2 rounded-full bg-green-600" />
						<span className="text-sm font-medium text-green-700">
							Revolutionizing Agriculture
						</span>
					</div>

					<h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight text-gray-900">
						Detect Plant Pests with
						<span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
							{" "}
							AI-Powered Precision
						</span>
					</h1>
					<p className="text-xl md:text-2xl text-gray-600 text-balance max-w-2xl mx-auto leading-relaxed">
						Snap a photo of your plant. Get instant pest identification,
						treatment plans, and DIY solutions powered by GPT AI. Protect your
						crops in seconds.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
						<Link to="/auth/login">
							<button className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors">
								Get Started
							</button>
						</Link>
						<Link to="#about">
							<button className="px-8 py-4 border-2 border-green-600 text-green-600 hover:bg-green-50 rounded-lg font-semibold transition-colors">
								Learn More
							</button>
						</Link>
					</div>

					<div className="pt-5 grid grid-cols-4 gap-x-8 gap-y-2 max-w-2xl mx-auto">
						<div className="col-span-4">
							<h2>Analyzed Data</h2>
						</div>
						<TypeCard
							icon="🥬"
							label="Vegetables"
							count={stats.totalVegetables}
							color="text-green-600"
						/>
						<TypeCard
							icon="🍎"
							label="Fruits"
							count={stats.totalFruits}
							color="text-red-600"
						/>
						<TypeCard
							icon="🌿"
							label="Plants"
							count={stats.totalPlantsType}
							color="text-emerald-600"
						/>
						<TypeCard
							icon="🌿"
							label="Pest Found"
							count={stats.totalPestFound}
							color="text-emerald-600"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
