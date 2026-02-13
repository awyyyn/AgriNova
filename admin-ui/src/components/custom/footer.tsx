"use client";

import { useState } from "react";
import { TermsModal } from "@/components/modals/terms-modal";
import { PrivacyModal } from "@/components/modals/privacy-modal";
import { Link } from "react-router";

export function Footer() {
	const [termsOpen, setTermsOpen] = useState(false);
	const [privacyOpen, setPrivacyOpen] = useState(false);

	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gray-50 border-t border-gray-200">
			<div className="max-w-6xl mx-auto px-4 py-12">
				<div className="grid md:grid-cols-4 gap-8 mb-12">
					{/* Brand */}
					<div className="space-y-4">
						<div className="text-2xl font-bold text-green-600">AgriNova</div>
						<p className="text-gray-600 text-sm">
							AI-powered pest detection for modern farmers.
						</p>
						{/* <div className="flex gap-3">
							<a
								href="https://twitter.com/agrinova"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-400 hover:text-green-600 transition-colors">
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24">
									<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
								</svg>
							</a>
							<a
								href="https://facebook.com/agrinova"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-400 hover:text-green-600 transition-colors">
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24">
									<path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a1 1 0 011-1h3z" />
								</svg>
							</a>
						</div> */}
					</div>

					{/* Product */}
					<div className="space-y-4">
						<h4 className="font-semibold text-gray-900">Product</h4>
						<ul className="space-y-2">
							<li>
								<Link
									to="/#home"
									className="text-gray-600 hover:text-green-600 text-sm transition-colors">
									Home
								</Link>
							</li>
							<li>
								<Link
									to="/#about"
									className="text-gray-600 hover:text-green-600 text-sm transition-colors">
									About
								</Link>
							</li>
							<li>
								<Link
									to="/#features"
									className="text-gray-600 hover:text-green-600 text-sm transition-colors">
									Features
								</Link>
							</li>
						</ul>
					</div>

					{/* Support */}
					<div className="space-y-4">
						<h4 className="font-semibold text-gray-900">Support</h4>
						<ul className="space-y-2">
							{/* <li>
								<Link
									to="/contact"
									className="text-gray-600 hover:text-green-600 text-sm transition-colors">
									Contact Us
								</Link>
							</li> */}
							<li>
								<a
									href="/faqs"
									className="text-gray-600 hover:text-green-600 text-sm transition-colors">
									FAQ
								</a>
							</li>
							<li>
								<Link
									to="/faqs#help"
									className="text-gray-600 hover:text-green-600 text-sm transition-colors">
									Help Center
								</Link>
							</li>
							{/* <li>
								<a
									href="https://blog.agrinova.com"
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-600 hover:text-green-600 text-sm transition-colors">
									Blog
								</a>
							</li> */}
						</ul>
					</div>

					{/* Legal */}
					<div className="space-y-4">
						<h4 className="font-semibold text-gray-900">Legal</h4>
						<ul className="space-y-2">
							<li>
								<button
									onClick={() => setTermsOpen(true)}
									className="text-gray-600 hover:text-green-600 text-sm transition-colors text-left">
									Terms of Service
								</button>
							</li>
							<li>
								<button
									onClick={() => setPrivacyOpen(true)}
									className="text-gray-600 hover:text-green-600 text-sm transition-colors text-left">
									Privacy Policy
								</button>
							</li>
						</ul>
					</div>
				</div>

				{/* Divider */}
				<div className="border-t border-gray-200 pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
						<p>&copy; {currentYear} AgriNova. All rights reserved.</p>
						<div className="flex gap-6 mt-4 md:mt-0"></div>
					</div>
				</div>
			</div>

			{/* Modals */}
			<TermsModal open={termsOpen} onOpenChange={setTermsOpen} />
			<PrivacyModal open={privacyOpen} onOpenChange={setPrivacyOpen} />
		</footer>
	);
}
