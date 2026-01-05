export default function WorkInProgressPage() {
	return (
		<main className="flex min-h-screen items-center justify-center bg-background px-6">
			<div className="w-full max-w-md rounded-xl border bg-card p-8 text-center shadow-sm">
				{/* Icon */}
				<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
					🚧
				</div>

				{/* Title */}
				<h1 className="mb-2 text-2xl font-semibold tracking-tight">
					Work in Progress
				</h1>

				{/* Description */}
				<p className="mb-6 text-sm text-muted-foreground">
					This page is currently under development. We’re working hard to bring
					it to life.
				</p>

				{/* Status */}
				<div className="mb-6 rounded-lg bg-muted px-4 py-2 text-sm">
					Status: <span className="font-medium">In Development</span>
				</div>

				{/* Action */}
				<button
					disabled
					className="w-full cursor-not-allowed rounded-md bg-primary/50 px-4 py-2 text-sm font-medium text-primary-foreground">
					Coming Soon
				</button>
			</div>
		</main>
	);
}
