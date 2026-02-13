export function Features() {
	const features = [
		{
			title: "Snap & Identify",
			description:
				"Take a photo of your affected plant. Our GPT AI instantly recognizes 50+ pest species and plant diseases.",
			icon: "📸",
		},
		{
			title: "Health Diagnosis",
			description:
				"Get a clear diagnosis: is your plant healthy or infected? Our AI provides confidence scores for accuracy.",
			icon: "🔍",
		},
		{
			title: "Treatment Plans",
			description:
				"Receive comprehensive treatment recommendations including chemicals, organic options, and professional solutions.",
			icon: "💊",
		},
		{
			title: "DIY Solutions",
			description:
				"Learn how to make eco-friendly pest treatments at home using common household ingredients.",
			icon: "🏡",
		},
		{
			title: "Prevention Tips",
			description:
				"Get actionable prevention strategies to stop pests before they become a problem on your farm.",
			icon: "🛡️",
		},
		{
			title: "Instant Results",
			description:
				"Get complete pest analysis and solutions in under 2 seconds. No waiting, no guesswork.",
			icon: "⚡",
		},
	];

	return (
		<section className="py-20 md:py-32 bg-white" id="features">
			<div className="max-w-6xl mx-auto px-4 space-y-16">
				<div className="max-w-3xl mx-auto text-center space-y-4">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900">
						How AgriNova Works
					</h2>
					<p className="text-lg text-gray-600">
						From pest identification to solution delivery in seconds
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{features.map((feature, idx) => (
						<div
							key={idx}
							className="p-8 rounded-xl bg-gradient-to-br from-emerald-50 to-white border border-green-200 hover:border-green-400 hover:shadow-lg transition-all group">
							<div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
								{feature.icon}
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-2">
								{feature.title}
							</h3>
							<p className="text-gray-600">{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
