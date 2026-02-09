// ============================================================================
// DASHBOARD STATS CARDS
// File: src/components/dashboard/DashboardStats.tsx
// ============================================================================

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Users,
	FileText,
	Bug,
	TrendingUp,
	Activity,
	Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardStatsProps {
	data: {
		overview: {
			totalUsers: number;
			totalAnalyses: number;
			pestPercentage: string;
			averageConfidence: string;
		};
		weekly: {
			newUsers: number;
			weeklyAnalyses: number;
			activeUsers: number;
		};
		growthTrends: {
			userGrowth: string;
			analysisGrowth: string;
		};
	};
}

export function DashboardStats({ data }: DashboardStatsProps) {
	const stats = [
		{
			title: "Total Users",
			value: data.overview.totalUsers.toLocaleString(),
			change: data.growthTrends.userGrowth,
			subtitle: `+${data.weekly.newUsers} this period`,
			icon: Users,
			color: "text-blue-600",
			bgColor: "bg-blue-50 dark:bg-blue-950",
		},
		{
			title: "Total Analyses",
			value: data.overview.totalAnalyses.toLocaleString(),
			change: data.growthTrends.analysisGrowth,
			subtitle: `${data.weekly.weeklyAnalyses} this period`,
			icon: FileText,
			color: "text-green-600",
			bgColor: "bg-green-50 dark:bg-green-950",
		},
		{
			title: "Pest Detection Rate",
			value: `${data.overview.pestPercentage}%`,
			subtitle: "Of all analyses",
			icon: Bug,
			color: "text-red-600",
			bgColor: "bg-red-50 dark:bg-red-950",
		},
		{
			title: "Avg Confidence",
			value: data.overview.averageConfidence,
			subtitle: "Model accuracy",
			icon: Target,
			color: "text-purple-600",
			bgColor: "bg-purple-50 dark:bg-purple-950",
		},
		{
			title: "Active Users",
			value: data.weekly.activeUsers.toLocaleString(),
			subtitle: "Created analyses",
			icon: Activity,
			color: "text-orange-600",
			bgColor: "bg-orange-50 dark:bg-orange-950",
		},
	];

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
			{stats.map((stat, index) => {
				const Icon = stat.icon;
				const isPositive = stat.change && parseFloat(stat.change) >= 0;

				return (
					<Card key={index}>
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium text-muted-foreground">
								{stat.title}
							</CardTitle>
							<div className={cn("rounded-lg p-2", stat.bgColor)}>
								<Icon className={cn("h-4 w-4", stat.color)} />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{stat.value}</div>
							<div className="flex items-center gap-2 mt-1">
								{stat.change && (
									<span
										className={cn(
											"text-xs font-medium flex items-center gap-1",
											isPositive ? "text-green-600" : "text-red-600",
										)}>
										<TrendingUp
											className={cn("h-3 w-3", !isPositive && "rotate-180")}
										/>
										{stat.change}
									</span>
								)}
								<p className="text-xs text-muted-foreground">{stat.subtitle}</p>
							</div>
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
}
