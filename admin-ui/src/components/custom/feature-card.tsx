import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function FeatureCard({
	icon,
	title,
	description,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
}) {
	return (
		<Card className="bg-gradient-to-b from-white to-emerald-50">
			<CardHeader>
				<div className="mb-4">{icon}</div>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-muted-foreground">{description}</p>
			</CardContent>
		</Card>
	);
}
