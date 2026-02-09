import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Disease {
	name: string;
	count: number;
}

interface TopDiseasesProps {
	diseases: Disease[];
}

export function TopDiseases({ diseases }: TopDiseasesProps) {
	if (diseases.length === 0) {
		return (
			<div className="text-center py-8 text-muted-foreground">
				No diseases detected
			</div>
		);
	}

	const maxCount = Math.max(...diseases.map((d) => d.count));

	return (
		<div className="space-y-4">
			{diseases.slice(0, 8).map((disease, index) => (
				<div key={index} className="space-y-2">
					<div className="flex items-center justify-between text-sm">
						<span className="font-medium">{disease.name}</span>
						<Badge variant="secondary">{disease.count}</Badge>
					</div>
					<Progress value={(disease.count / maxCount) * 100} className="h-2" />
				</div>
			))}
		</div>
	);
}
