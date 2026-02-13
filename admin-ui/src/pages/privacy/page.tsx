export const metadata = {
	title: "Privacy Policy | AgriNova",
	description:
		"Read our privacy policy to understand how AgriNova handles your data.",
};

export default function PrivacyPage() {
	return (
		<main className="min-h-screen bg-gradient-to-b from-white to-emerald-50">
			<div className="max-w-4xl mx-auto px-4 py-20 md:py-32">
				<div className="mb-12">
					<h1 className="text-5xl font-bold text-gray-900 mb-4">
						Privacy Policy
					</h1>
					<p className="text-gray-600 text-lg">
						Last updated: {new Date().toLocaleDateString()}
					</p>
				</div>

				<div className="space-y-8 text-gray-600 leading-relaxed">
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">
							Introduction
						</h2>
						<p>
							AgriNova ("we", "our", or "us") operates the AgriNova website and
							mobile application. This page informs you of our policies
							regarding the collection, use, and disclosure of personal data
							when you use our Service and the choices you have associated with
							that data.
						</p>
					</div>

					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">
							1. Information Collection and Use
						</h2>
						<p className="mb-4">
							We collect several different types of information for various
							purposes to provide and improve our Service to you.
						</p>
						<div className="space-y-4">
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">
									Account Information
								</h3>
								<p>
									Email address, name, password, and profile information needed
									to create and manage your account.
								</p>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Image Data</h3>
								<p>
									Plant images submitted for analysis are processed by our AI
									models. These images are not stored permanently and are
									deleted after processing unless you choose to save them to
									your account history.
								</p>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">Usage Data</h3>
								<p>
									Browser type, IP address, pages visited, time and date of
									visit, and other diagnostic data to help us understand how you
									use AgriNova.
								</p>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-2">
									Device Information
								</h3>
								<p>
									Device type, operating system, unique device identifiers, and
									mobile network information.
								</p>
							</div>
						</div>
					</div>

					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">
							2. Use of Data
						</h2>
						<p className="mb-4">
							AgriNova uses the collected data for various purposes:
						</p>
						<ul className="list-disc list-inside space-y-2">
							<li>To provide and maintain our Service</li>
							<li>To notify you about changes to our Service</li>
							<li>
								To allow you to participate in interactive features of our
								Service
							</li>
							<li>To provide customer support and respond to your inquiries</li>
							<li>
								To gather analysis or valuable information so we can improve our
								Service
							</li>
							<li>To monitor the usage of our Service</li>
							<li>To detect, prevent and address technical issues and fraud</li>
						</ul>
					</div>

					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">
							3. Security of Data
						</h2>
						<p>
							The security of your data is important to us but remember that no
							method of transmission over the Internet or method of electronic
							storage is 100% secure. While we strive to use commercially
							acceptable means to protect your personal data, we cannot
							guarantee its absolute security.
						</p>
					</div>

					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">
							4. Cookies
						</h2>
						<p>
							We use cookies and similar tracking technologies to track activity
							on our Service and hold certain information. You can instruct your
							browser to refuse all cookies or to indicate when a cookie is
							being sent. However, if you do not accept cookies, you may not be
							able to use some portions of our Service.
						</p>
					</div>

					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">
							5. Third-Party Services
						</h2>
						<p>
							Our Service may contain links to third-party sites and services
							that are not operated by us. Please be aware that we are not
							responsible for the privacy practices of such other sites. We
							encourage you to read the privacy policy of any third-party
							service before providing any personal information.
						</p>
					</div>

					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">
							6. AI and Image Processing
						</h2>
						<p>
							Images you submit for pest detection are processed using
							GPT-powered AI models. These images are used solely for pest
							identification and analysis. We do not use submitted images to
							train our models without your explicit written consent. Your
							analysis history is stored in your account for your reference and
							can be deleted anytime.
						</p>
					</div>

					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">
							7. Your Rights
						</h2>
						<p className="mb-4">
							You have the following rights regarding your personal data:
						</p>
						<ul className="list-disc list-inside space-y-2">
							<li>Access the personal data we hold about you</li>
							<li>Request correction of inaccurate data</li>
							<li>Request deletion of your data (right to be forgotten)</li>
							<li>Export your data in a portable format</li>
							<li>Withdraw consent at any time</li>
							<li>Object to processing of your data</li>
						</ul>
					</div>

					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">
							8. Data Retention
						</h2>
						<p>
							We will retain your personal information for as long as your
							account is active or as necessary to provide you services. Images
							processed for pest detection are typically deleted after 30 days
							unless saved to your account history. You can request deletion of
							your account and associated data at any time.
						</p>
					</div>

					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">
							9. Children's Privacy
						</h2>
						<p>
							Our Service does not address anyone under the age of 13. We do not
							knowingly collect personal information from children under 13. If
							we become aware that we have collected personal information from
							children under 13, we take steps to delete such information
							immediately.
						</p>
					</div>

					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">
							10. Changes to This Privacy Policy
						</h2>
						<p>
							We may update our Privacy Policy from time to time. We will notify
							you of any changes by posting the new Privacy Policy on this page
							and updating the "effective date" at the top of this Privacy
							Policy.
						</p>
					</div>

					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">
							11. International Data Transfers
						</h2>
						<p>
							Your information may be transferred to, and maintained on,
							computers located outside of your state, province, country or
							other governmental jurisdiction where the data protection laws may
							differ. We will ensure appropriate safeguards are in place when
							transferring data internationally.
						</p>
					</div>

					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-4">
							12. Contact Us
						</h2>
						<p>
							If you have any questions about this Privacy Policy, please
							contact us at:
						</p>
						<p className="mt-4">
							<strong>Email:</strong> privacy@agrinova.com
							<br />
							<strong>Website:</strong>{" "}
							<a
								href="/contact"
								className="text-green-600 hover:text-green-700">
								Visit our contact page
							</a>
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
