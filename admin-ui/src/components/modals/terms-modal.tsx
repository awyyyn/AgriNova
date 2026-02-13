"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

interface TermsModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function TermsModal({ open, onOpenChange }: TermsModalProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Terms of Service</DialogTitle>
				</DialogHeader>

				<div className="space-y-6 text-sm text-gray-600">
					<div>
						<h3 className="font-semibold text-gray-900 mb-2">
							1. Acceptance of Terms
						</h3>
						<p>
							By accessing and using AgriNova, you accept and agree to be bound
							by the terms and provision of this agreement. If you do not agree
							to abide by the above, please do not use this service.
						</p>
					</div>

					<div>
						<h3 className="font-semibold text-gray-900 mb-2">2. Use License</h3>
						<p>
							Permission is granted to temporarily download one copy of the
							materials (information or software) on AgriNova's website for
							personal, non-commercial transitory viewing only. This is the
							grant of a license, not a transfer of title, and under this
							license you may not:
						</p>
						<ul className="list-disc list-inside mt-2 space-y-1">
							<li>Modifying or copying the materials</li>
							<li>
								Using the materials for any commercial purpose or for any public
								display
							</li>
							<li>
								Attempting to decompile or reverse engineer any software
								contained on AgriNova
							</li>
							<li>
								Removing any copyright or other proprietary notations from the
								materials
							</li>
							<li>
								Transferring the materials to another person or "mirroring" the
								materials on any other server
							</li>
						</ul>
					</div>

					<div>
						<h3 className="font-semibold text-gray-900 mb-2">3. Disclaimer</h3>
						<p>
							The materials on AgriNova's website are provided on an 'as is'
							basis. AgriNova makes no warranties, expressed or implied, and
							hereby disclaims and negates all other warranties including,
							without limitation, implied warranties or conditions of
							merchantability, fitness for a particular purpose, or
							non-infringement of intellectual property or other violation of
							rights.
						</p>
					</div>

					<div>
						<h3 className="font-semibold text-gray-900 mb-2">4. Limitations</h3>
						<p>
							In no event shall AgriNova or its suppliers be liable for any
							damages (including, without limitation, damages for loss of data
							or profit, or due to business interruption) arising out of the use
							or inability to use the materials on AgriNova, even if AgriNova or
							an authorized representative has been notified orally or in
							writing of the possibility of such damage.
						</p>
					</div>

					<div>
						<h3 className="font-semibold text-gray-900 mb-2">
							5. Accuracy of Materials
						</h3>
						<p>
							The materials appearing on AgriNova could include technical,
							typographical, or photographic errors. AgriNova does not warrant
							that any of the materials on its website are accurate, complete,
							or current. AgriNova may make changes to the materials contained
							on its website at any time without notice.
						</p>
					</div>

					<div>
						<h3 className="font-semibold text-gray-900 mb-2">6. Links</h3>
						<p>
							AgriNova has not reviewed all of the sites linked to its website
							and is not responsible for the contents of any such linked site.
							The inclusion of any link does not imply endorsement by AgriNova
							of the site. Use of any such linked website is at the user's own
							risk.
						</p>
					</div>

					<div>
						<h3 className="font-semibold text-gray-900 mb-2">
							7. Modifications
						</h3>
						<p>
							AgriNova may revise these terms of service for its website at any
							time without notice. By using this website, you are agreeing to be
							bound by the then current version of these terms of service.
						</p>
					</div>

					<div>
						<h3 className="font-semibold text-gray-900 mb-2">
							8. Governing Law
						</h3>
						<p>
							These terms and conditions are governed by and construed in
							accordance with the laws of the jurisdiction in which AgriNova
							operates, and you irrevocably submit to the exclusive jurisdiction
							of the courts in that location.
						</p>
					</div>

					<div>
						<h3 className="font-semibold text-gray-900 mb-2">
							9. User Responsibilities
						</h3>
						<p>
							Users are responsible for maintaining the confidentiality of their
							account information and password and for restricting access to
							their computer. They agree to accept responsibility for all
							activities that occur under their account or password.
						</p>
					</div>

					<div>
						<h3 className="font-semibold text-gray-900 mb-2">
							10. Contact Information
						</h3>
						<p>
							If you have any questions about these Terms of Service, please
							contact us at support@agrinova.com.
						</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
