import { FAQS } from "@/constants";
import { Database, HelpCircle, Shield } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";

export const metadata = {
	title: "Contact Us | AgriNova",
	description:
		"Get in touch with AgriNova support team. We are here to help with any questions about pest detection.",
};

export default function FAQsPage() {
	return (
		<>
			<Helmet>
				<title>FAQs</title>
			</Helmet>
			<main
				className="min-h-screen bg-gradient-to-b from-white to-emerald-50"
				id="home">
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
							{FAQS.map((item, idx) => (
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
				<section className="py-20 md:py-32 bg-white" id="help">
					<div className="max-w-6xl mx-auto px-4">
						<div className="text-center mb-16">
							<h2 className="text-4xl font-bold text-gray-900">
								Admin Help Resources
							</h2>
							<p className="text-gray-600 mt-4">
								Tools and references for managing the system
							</p>
						</div>

						<div className="grid md:grid-cols-3 gap-8">
							{[
								{
									icon: HelpCircle,
									title: "Dashboard Overview",
									description:
										"Understand admin metrics, charts, and system monitoring tools.",
								},
								{
									icon: Database,
									title: "Data Management",
									description:
										"Manage plant records, reports, and detection results.",
								},
								{
									icon: Shield,
									title: "System Controls",
									description:
										"Configure thresholds, models, and detection settings.",
								},
							].map((item, idx) => (
								<Link
									key={idx}
									to="/auth/login"
									className="group p-8 rounded-xl border border-green-200 bg-gradient-to-br from-white to-emerald-50 hover:shadow-lg hover:border-green-400 transition-all">
									<div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-100 group-hover:bg-green-200 transition-colors mb-4">
										<item.icon className="h-6 w-6 text-green-600" />
									</div>
									<h3 className="text-lg font-semibold text-gray-900 mb-2">
										{item.title}
									</h3>
									<p className="text-gray-600">{item.description}</p>
									<p className="text-green-600 font-semibold mt-4 group-hover:translate-x-1 transition-transform">
										Open →
									</p>
								</Link>
							))}
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
