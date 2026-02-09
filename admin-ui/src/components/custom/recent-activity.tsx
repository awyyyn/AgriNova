import { Badge } from "@/components/ui/badge";
import { Bug, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Analysis {
	id: string;
	formattedId: string;
	type: string;
	hasPestFound: boolean;
	confidence: number;
	createdAtRelative: string;
	plantIdentification?: {
		commonName?: string;
		scientificName?: string;
	};
	user: {
		name: string;
		email: string;
	} | null;
}

interface RecentActivityProps {
	analyses: Analysis[];
}

export function RecentActivity({ analyses }: RecentActivityProps) {
	if (analyses.length === 0) {
		return (
			<div className="text-center py-8 text-muted-foreground">
				No recent activity
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{analyses.slice(0, 8).map((analysis) => (
				<div
					key={analysis.id}
					className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
					<div
						className={cn(
							"rounded-full p-2 mt-1",
							analysis.hasPestFound
								? "bg-red-100 dark:bg-red-950"
								: "bg-green-100 dark:bg-green-950",
						)}>
						{analysis.hasPestFound ? (
							<Bug className="h-4 w-4 text-red-600" />
						) : (
							<CheckCircle2 className="h-4 w-4 text-green-600" />
						)}
					</div>

					<div className="flex-1 space-y-1">
						<div className="flex items-center justify-between">
							<p className="text-sm font-medium">
								{analysis.plantIdentification?.commonName || analysis.type}
							</p>
							<Badge
								variant={analysis.hasPestFound ? "destructive" : "default"}
								className="text-xs">
								{analysis.hasPestFound ? "Pest" : "Healthy"}
							</Badge>
						</div>

						{analysis.user && (
							<p className="text-xs text-muted-foreground">
								by {analysis.user.name}
							</p>
						)}

						<div className="flex items-center gap-4 text-xs text-muted-foreground">
							<span className="flex items-center gap-1">
								<Clock className="h-3 w-3" />
								{analysis.createdAtRelative}
							</span>
							<span>Confidence: {analysis.confidence.toFixed(0)}%</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
