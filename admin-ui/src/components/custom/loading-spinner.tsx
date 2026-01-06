export function LoadingSpinner() {
	return (
		<div className="flex items-center justify-center">
			<div className="relative w-12 h-12">
				{/* Outer rotating ring */}
				<div className="absolute inset-0 rounded-full border-4 border-muted border-t-primary animate-spin" />

				{/* Inner pulsing circle */}
				<div className="absolute inset-3 rounded-full bg-primary/20 animate-pulse" />

				{/* Center leaf icon */}
				<div className="absolute inset-0 flex items-center justify-center">
					<svg
						className="w-5 h-5 text-primary animate-pulse"
						fill="currentColor"
						viewBox="0 0 24 24">
						<path d="M17.92 7.02C17.45 4.18 14.97 2 12 2c-2.97 0-5.45 2.18-5.92 5.02C3.97 7.55 2 9.88 2 12.5C2 15.57 4.43 18 7.5 18h10c3.07 0 5.5-2.43 5.5-5.5 0-2.62-1.97-4.85-4.58-5.48zM10 15l-2.5-2.5 1.41-1.41L10 12.17l4.09-4.09L15.5 9.5 10 15z" />
					</svg>
				</div>
			</div>
		</div>
	);
}

export function LoadingSpinnerLarge() {
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<div className="relative w-20 h-20">
				<div className="absolute inset-0 rounded-full border-4 border-muted border-t-primary animate-spin" />
				<div className="absolute inset-2 rounded-full bg-primary/20 animate-pulse" />
				<div className="absolute inset-0 flex items-center justify-center">
					<svg
						className="w-8 h-8 text-primary animate-pulse"
						fill="currentColor"
						viewBox="0 0 24 24">
						<path d="M17.92 7.02C17.45 4.18 14.97 2 12 2c-2.97 0-5.45 2.18-5.92 5.02C3.97 7.55 2 9.88 2 12.5C2 15.57 4.43 18 7.5 18h10c3.07 0 5.5-2.43 5.5-5.5 0-2.62-1.97-4.85-4.58-5.48zM10 15l-2.5-2.5 1.41-1.41L10 12.17l4.09-4.09L15.5 9.5 10 15z" />
					</svg>
				</div>
			</div>
			<p className="text-sm text-muted-foreground font-medium">Loading...</p>
		</div>
	);
}
