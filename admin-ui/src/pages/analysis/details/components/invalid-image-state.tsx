import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { PlantAnalysis } from "@/types";
import { AlertTriangle, Info } from "lucide-react";
import { useNavigate } from "react-router";

export function InvalidImageState({ data }: { data: PlantAnalysis }) {
	const navigate = useNavigate();

	return (
		<div className="container mx-auto p-6 max-w-2xl">
			<div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
				<div className="rounded-full bg-amber-100 dark:bg-amber-950 p-6 mb-6">
					<AlertTriangle className="h-16 w-16 text-amber-600" />
				</div>

				<h2 className="text-2xl font-bold mb-2">Invalid Image</h2>
				<p className="text-muted-foreground mb-8 max-w-md">
					{data.message ||
						"The uploaded image is not valid for plant analysis."}
				</p>

				<Alert className="max-w-md mb-6">
					<Info className="h-4 w-4" />
					<AlertTitle>Tips for better results:</AlertTitle>
					<AlertDescription className="text-left mt-2">
						<ul className="list-disc list-inside space-y-1 text-sm">
							<li>Make sure the image contains a plant</li>
							<li>Use good lighting conditions</li>
							<li>Focus on the affected area</li>
							<li>Avoid blurry or low-quality images</li>
						</ul>
					</AlertDescription>
				</Alert>

				<div className="flex gap-3">
					<Button onClick={() => navigate("/upload")} variant="default">
						Upload New Image
					</Button>
					<Button onClick={() => navigate(-1)} variant="outline">
						Go Back
					</Button>
				</div>
			</div>
		</div>
	);
}
