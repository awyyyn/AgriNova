import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton() {
	return (
		<div className="container mx-auto p-6 max-w-7xl">
			<Skeleton className="h-8 w-32 mb-6" />

			<div className="grid gap-6 lg:grid-cols-3">
				<div className="space-y-6">
					<Skeleton className="aspect-square rounded-lg" />
					<Card>
						<CardHeader>
							<Skeleton className="h-6 w-32" />
						</CardHeader>
						<CardContent className="space-y-4">
							{[1, 2, 3, 4].map((i) => (
								<div key={i} className="space-y-2">
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-2 w-full" />
								</div>
							))}
						</CardContent>
					</Card>
				</div>

				<div className="lg:col-span-2 space-y-6">
					{[1, 2, 3].map((i) => (
						<Card key={i}>
							<CardHeader>
								<Skeleton className="h-6 w-48" />
							</CardHeader>
							<CardContent className="space-y-3">
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-3/4" />
								<Skeleton className="h-4 w-5/6" />
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
