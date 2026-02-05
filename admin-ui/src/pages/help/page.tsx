"use client";

import { HelpCircle, Camera, Upload, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface HelpItemProps {
	icon: React.ElementType;
	children: React.ReactNode;
}

function HelpItem({ icon: Icon, children }: HelpItemProps) {
	return (
		<div className="flex items-start gap-3">
			<Icon className="h-5 w-5 text-green-700 mt-0.5" />
			<p className="text-sm text-muted-foreground leading-6">{children}</p>
		</div>
	);
}

export default function HelpPage() {
	return (
		<div className="container max-w-3xl py-8">
			{/* Header */}
			<h1 className="text-3xl font-bold text-green-700 mb-2">Help & Support</h1>
			<p className="text-muted-foreground mb-8">
				Learn how to use AgriNova effectively
			</p>

			{/* How to Use */}
			<Card className="mb-8">
				<CardContent className="pt-6 space-y-4">
					<h2 className="text-xl font-semibold">How to Analyze a Plant</h2>

					<HelpItem icon={Camera}>
						Open the Scan page and take a clear photo of the plant. Make sure
						the affected area is visible.
					</HelpItem>

					<HelpItem icon={Upload}>
						Alternatively, upload an existing image from your device.
					</HelpItem>

					<HelpItem icon={RefreshCw}>
						Wait for the analysis result showing plant health, pest detection,
						severity, and confidence level.
					</HelpItem>
				</CardContent>
			</Card>

			{/* Tips */}
			<Card className="mb-8">
				<CardContent className="pt-6 space-y-3">
					<h2 className="text-xl font-semibold">Tips for Better Results</h2>

					<ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
						<li>Take photos in good lighting</li>
						<li>Avoid blurry or distant images</li>
						<li>Focus on leaves, fruits, or affected areas</li>
					</ul>
				</CardContent>
			</Card>

			{/* Troubleshooting */}
			<Card className="mb-10">
				<CardContent className="pt-6 space-y-4">
					<h2 className="text-xl font-semibold">Common Issues</h2>

					<HelpItem icon={HelpCircle}>
						If no plant is detected, ensure the image clearly shows a plant,
						fruit, or vegetable.
					</HelpItem>

					<HelpItem icon={HelpCircle}>
						If results seem inaccurate, try retaking the photo from a closer
						angle.
					</HelpItem>
				</CardContent>
			</Card>

			{/* Footer */}
			<p className="text-center text-xs text-muted-foreground">
				Need more help? Contact your local agricultural expert 🌾
			</p>
		</div>
	);
}
