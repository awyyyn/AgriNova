import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { useNavigate } from "react-router";

export function ErrorState({
	error,
	onRetry,
}: {
	error: string;
	onRetry: () => void;
}) {
	const navigate = useNavigate();

	return (
		<div className="container mx-auto p-6 max-w-2xl">
			<div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
				<div className="rounded-full bg-destructive/10 p-6 mb-6">
					<XCircle className="h-16 w-16 text-destructive" />
				</div>

				<h2 className="text-2xl font-bold mb-2">Failed to Load Analysis</h2>
				<p className="text-muted-foreground mb-8 max-w-md">{error}</p>

				<div className="flex gap-3">
					<Button onClick={onRetry} variant="default">
						Try Again
					</Button>
					<Button onClick={() => navigate("/")} variant="outline">
						Go Home
					</Button>
				</div>
			</div>
		</div>
	);
}
