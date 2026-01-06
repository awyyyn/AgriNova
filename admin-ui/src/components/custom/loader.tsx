import { LoadingSpinnerLarge } from "./loading-spinner";

export function Loader() {
	return (
		<div className="flex items-center justify-center min-h-screen bg-background">
			<div className="text-center space-y-6">
				<LoadingSpinnerLarge />
				<div className="space-y-2">
					<h2 className="text-2xl font-semibold text-foreground">
						Loading AgriNova
					</h2>
					<p className="text-muted-foreground">Preparing your farm data...</p>
				</div>
			</div>
		</div>
	);
}
