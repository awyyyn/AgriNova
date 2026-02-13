import { Mail, MessageSquare } from "lucide-react";

export const metadata = {
	title: "Contact Us | AgriNova",
	description:
		"Get in touch with AgriNova support team. We are here to help with any questions about pest detection.",
};

export default function FAQsPage() {
	return (
		<main className="min-h-screen bg-gradient-to-b from-white to-emerald-50">
			{/* FAQ Section */}
			<section className="py-20 md:py-32 bg-gradient-to-b from-white to-emerald-50">
				<div className="max-w-4xl mx-auto px-4">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900">
							Frequently Asked Questions
						</h2>
						<p className="text-gray-600 mt-4">
							Find answers to common questions about AgriNova
						</p>
					</div>

					<div className="space-y-6">
						{[
							{
								question: "How accurate is the pest detection?",
								answer:
									"Our AI-powered detection system has 98% accuracy across 50+ pest species. However, accuracy depends on image quality and clarity. For best results, capture clear photos of affected plant areas in good lighting.",
							},
							{
								question: "Can I use AgriNova offline?",
								answer:
									"Currently, AgriNova requires an internet connection to process images through our AI models. We are working on an offline version for future releases.",
							},
							{
								question: "What image formats are supported?",
								answer:
									"We support JPG, PNG, WebP, and GIF formats. Images should be at least 480x480 pixels for optimal detection accuracy.",
							},
							{
								question: "Are my plant images stored permanently?",
								answer:
									"Images are processed through our AI and temporarily cached for analysis. They are automatically deleted after 30 days. You can manually delete images from your account anytime.",
							},
							{
								question: "How do I upgrade my account?",
								answer:
									"Visit your account settings to choose a plan that fits your needs. You can upgrade anytime and switch between plans monthly.",
							},
							{
								question: "What if I have a problem with a detection result?",
								answer:
									"If you believe a detection was inaccurate, please contact our support team with the image and details. Our agronomists review feedback to improve accuracy.",
							},
						].map((item, idx) => (
							<details
								key={idx}
								className="group border border-gray-200 rounded-lg">
								<summary className="flex cursor-pointer items-center justify-between bg-gray-50 p-4 font-semibold text-gray-900 group-open:bg-green-50">
									{item.question}
									<span className="transition group-open:rotate-180">
										<svg
											className="h-5 w-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 14l-7 7m0 0l-7-7m7 7V3"
											/>
										</svg>
									</span>
								</summary>
								<p className="p-4 text-gray-600">{item.answer}</p>
							</details>
						))}
					</div>
				</div>
			</section>

			{/* Help Resources */}
			<section className="py-20 md:py-32 bg-white">
				<div className="max-w-6xl mx-auto px-4">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900">
							Help Center Resources
						</h2>
						<p className="text-gray-600 mt-4">
							Explore our knowledge base and documentation
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{[
							{
								icon: MessageSquare,
								title: "Getting Started",
								description:
									"Learn how to set up your account and take your first pest detection.",
							},
							{
								icon: Mail,
								title: "User Guide",
								description:
									"Comprehensive guide on all features and how to use them effectively.",
							},
							{
								icon: MessageSquare,
								title: "API Documentation",
								description:
									"Integrate AgriNova into your own applications with our API.",
							},
						].map((item, idx) => (
							<a
								key={idx}
								href="#"
								className="group p-8 rounded-xl border border-green-200 bg-gradient-to-br from-white to-emerald-50 hover:shadow-lg hover:border-green-400 transition-all">
								<div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-100 group-hover:bg-green-200 transition-colors mb-4">
									<item.icon className="h-6 w-6 text-green-600" />
								</div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									{item.title}
								</h3>
								<p className="text-gray-600">{item.description}</p>
								<p className="text-green-600 font-semibold mt-4 group-hover:translate-x-1 transition-transform">
									Learn more →
								</p>
							</a>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
