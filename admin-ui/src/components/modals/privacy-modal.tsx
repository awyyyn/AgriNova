import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

interface PrivacyModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function PrivacyModal({ open, onOpenChange }: PrivacyModalProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Privacy Policy</DialogTitle>
				</DialogHeader>

				<div className="space-y-6 text-sm text-gray-600">
					<div>
						<h3 className="font-semibold text-gray-900 mb-2">Introduction</h3>
						<p>
							AgriNova ("we", "our", or "us") operates the AgriNova website and
							mobile application. This page informs you of our policies
							regarding the collection, use, and disclosure of personal data
							when you use our Service and the choices you have associated with
							that data.
						</p>
					</div>

					<div>
						<h3 className="font-semibold text-gray-900 mb-2">
							1. Information Collection and Use
						</h3>
						<p className="mb-2">
							We collect several different types of information for various
							purposes to provide and improve our Service to you.
						</p>
						<ul className="space-y-2">
							<li>
								<strong>Account Information:</strong> Email address, name,
								password, and profile information
							</li>
							<li>
								<strong>Image Data:</strong> Plant images submitted for analysis
								(processed by AI, not stored permanently)
							</li>
							<li>
								<strong>Usage Data:</strong> Browser type, IP address, pages
								visited, time and date of visit
							</li>
							<li>
								<strong>Device Information:</strong> Device type, OS, and unique
								device identifiers
							</li>
						</ul>
					</div>

					<div>
						<h3 className="font-semibold text-gray-900 mb-2">2. Use of Data</h3>
						<p>AgriNova uses the collected data for various purposes:</p>
						<ul className="list-disc list-inside mt-2 space-y-1">
							<li>To provide and maintain our Service</li>
							<li>To notify you about changes to our Service</li>
							<li>To allow you to participate in interactive features</li>
							<li>To provide customer support</li>
							<li>
								To gather analysis or valuable information for Service
								improvement
							</li>
							<li>To monitor usage patterns and detect technical issues</li>
						</ul>
					</div>

					<div>
						<h3 className="font-semibold text-gray-900 mb-2">
							3. Security of Data
						</h3>
						<p>
							The security of your data is important to us but remember that no
							method of transmission over the Internet or method of electronic
							storage is 100% secure. While we strive to use commercially
							acceptable means to protect your personal data, we cannot
							guarantee its absolute security.
						</p>
					</div>

					<div>
						<h3 className="font-semibold text-gray-900 mb-2">4. Cookies</h3>
						<p>
							We use cookies and similar tracking technologies to track activity
							on our Service and hold certain information. You can instruct your
							browser to refuse all cookies or to indicate when a cookie is
							being sent. However, if you do not accept cookies, you may not be
							able to use some portions of our Service.
						</p>
					</div>

					<div>
						<h3 className="font-semibold text-gray-900 mb-2">
							5. Third-Party Services
						</h3>
						<p>
							Our Service may contain links to third-party sites and services
							that are not operated by us. Please be aware that we are not
							responsible for the privacy practices of such other sites. We
							encourage you to read the privacy policy of any third-party
							service before providing any personal information.
						</p>
					</div>

					<div>
						<h3 className="font-semibold text-gray-900 mb-2">
							6. AI and Image Processing
						</h3>
						<p>
							Images you submit for pest detection are processed using AI
							models. These images are used solely for pest identification and
							are not used for training purposes without your explicit consent.
							Processed results are stored in your account history for your
							reference.
						</p>
					</div>

					<div>
						<h3 className="font-semibold text-gray-900 mb-2">7. Your Rights</h3>
						<p>You have the right to:</p>
						<ul className="list-disc list-inside mt-2 space-y-1">
							<li>Access the personal data we hold about you</li>
							<li>Request correction of inaccurate data</li>
							<li>Request deletion of your data (right to be forgotten)</li>
							<li>Export your data in a portable format</li>
							<li>Withdraw consent at any time</li>
						</ul>
					</div>

					<div>
						<h3 className="font-semibold text-gray-900 mb-2">
							8. Children's Privacy
						</h3>
						<p>
							Our Service does not address anyone under the age of 13. We do not
							knowingly collect personal information from children under 13. If
							we become aware that we have collected personal information from
							children under 13, we take steps to delete such information.
						</p>
					</div>

					<div>
						<h3 className="font-semibold text-gray-900 mb-2">
							9. Changes to This Privacy Policy
						</h3>
						<p>
							We may update our Privacy Policy from time to time. We will notify
							you of any changes by posting the new Privacy Policy on this page
							and updating the "effective date" at the top of this Privacy
							Policy.
						</p>
					</div>

					<div>
						<h3 className="font-semibold text-gray-900 mb-2">10. Contact Us</h3>
						<p>
							If you have any questions about this Privacy Policy, please
							contact us at privacy@agrinova.com or through our contact page.
						</p>
					</div>

					<p className="text-xs text-gray-500 pt-4">
						Last updated: {new Date().toLocaleDateString()}
					</p>
				</div>
			</DialogContent>
		</Dialog>
	);
}
