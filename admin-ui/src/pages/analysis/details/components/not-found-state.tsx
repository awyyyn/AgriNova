import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router";

export function NotFoundState() {
	const navigate = useNavigate();

	return (
		<div className="container mx-auto p-6 max-w-2xl">
			<div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
				<div className="rounded-full bg-muted p-6 mb-6">
					<AlertCircle className="h-16 w-16 text-muted-foreground" />
				</div>

				<h2 className="text-2xl font-bold mb-2">Analysis Not Found</h2>
				<p className="text-muted-foreground mb-8 max-w-md">
					The analysis you're looking for doesn't exist or has been removed.
				</p>

				<Button onClick={() => navigate("/")} variant="default">
					Go Home
				</Button>
			</div>
		</div>
	);
}
