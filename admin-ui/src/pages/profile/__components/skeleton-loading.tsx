import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonLoading() {
	return (
		<main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
			<div className="container mx-auto px-4 py-8 max-w-2xl">
				{/* Header Skeleton */}
				<div className="mb-8">
					<Skeleton className="h-10 w-16 mb-6" />
					<Skeleton className="h-9 w-48 mb-2" />
					<Skeleton className="h-5 w-96" />
				</div>

				{/* Photo Section Skeleton */}
				<Card className="mb-6 border-slate-200">
					<CardHeader>
						<Skeleton className="h-6 w-32" />
					</CardHeader>
					<CardContent>
						<div className="flex justify-center mb-4">
							<Skeleton className="h-32 w-32 rounded-lg" />
						</div>
						<Skeleton className="h-10 w-full" />
					</CardContent>
				</Card>

				{/* Form Section Skeleton */}
				<Card className="mb-6 border-slate-200">
					<CardHeader>
						<Skeleton className="h-6 w-48" />
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="space-y-2">
							<Skeleton className="h-4 w-20" />
							<Skeleton className="h-10 w-full" />
						</div>
						<div className="space-y-2">
							<Skeleton className="h-4 w-20" />
							<Skeleton className="h-10 w-full" />
						</div>
						<div className="space-y-2">
							<Skeleton className="h-4 w-20" />
							<Skeleton className="h-10 w-full" />
						</div>
					</CardContent>
				</Card>

				{/* Button Skeleton */}
				<Skeleton className="h-10 w-full" />
			</div>
		</main>
	);
}
