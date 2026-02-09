// ============================================================================
// DISTRIBUTION CHARTS
// File: src/components/dashboard/DistributionCharts.tsx
// ============================================================================

import {
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer,
	Legend,
	Tooltip,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DistributionChartsProps {
	data: {
		analysisByType: Array<{ type: string; count: number }>;
		confidence: { low: number; medium: number; high: number };
		severity: Record<string, number>;
	};
}

const COLORS = {
	primary: ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"],
	confidence: {
		low: "#ef4444",
		medium: "#f59e0b",
		high: "#10b981",
	},
};

export function DistributionCharts({ data }: DistributionChartsProps) {
	// Format data for charts
	const typeData = data.analysisByType.map((item) => ({
		name: item.type.charAt(0).toUpperCase() + item.type.slice(1),
		value: item.count,
	}));

	const confidenceData = [
		{
			name: "High (>0.8)",
			value: data.confidence.high,
			color: COLORS.confidence.high,
		},
		{
			name: "Medium (0.5-0.8)",
			value: data.confidence.medium,
			color: COLORS.confidence.medium,
		},
		{
			name: "Low (<0.5)",
			value: data.confidence.low,
			color: COLORS.confidence.low,
		},
	];

	const severityData = Object.entries(data.severity).map(([name, value]) => ({
		name: name.charAt(0).toUpperCase() + name.slice(1),
		value,
	}));

	return (
		<Tabs defaultValue="type" className="w-full">
			<TabsList className="grid w-full grid-cols-3">
				<TabsTrigger value="type">By Type</TabsTrigger>
				<TabsTrigger value="confidence">Confidence</TabsTrigger>
				<TabsTrigger value="severity">Severity</TabsTrigger>
			</TabsList>

			<TabsContent value="type" className="space-y-4">
				<ResponsiveContainer width="100%" height={250}>
					<PieChart>
						<Pie
							data={typeData}
							cx="50%"
							cy="50%"
							labelLine={false}
							label={renderCustomLabel}
							outerRadius={80}
							fill="#8884d8"
							dataKey="value">
							{typeData.map((_, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS.primary[index % COLORS.primary.length]}
								/>
							))}
						</Pie>
						<Tooltip content={<CustomTooltip />} />
						<Legend
							verticalAlign="bottom"
							height={36}
							formatter={(value, entry: any) =>
								`${value}: ${entry.payload.value}`
							}
						/>
					</PieChart>
				</ResponsiveContainer>
			</TabsContent>

			<TabsContent value="confidence" className="space-y-4">
				<ResponsiveContainer width="100%" height={250}>
					<PieChart>
						<Pie
							data={confidenceData}
							cx="50%"
							cy="50%"
							labelLine={false}
							label={renderCustomLabel}
							outerRadius={80}
							fill="#8884d8"
							dataKey="value">
							{confidenceData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={entry.color} />
							))}
						</Pie>
						<Tooltip content={<CustomTooltip />} />
						<Legend
							verticalAlign="bottom"
							height={36}
							formatter={(value, entry: any) =>
								`${value}: ${entry.payload.value}`
							}
						/>
					</PieChart>
				</ResponsiveContainer>
			</TabsContent>

			<TabsContent value="severity" className="space-y-4">
				{severityData.length > 0 ? (
					<ResponsiveContainer width="100%" height={250}>
						<PieChart>
							<Pie
								data={severityData}
								cx="50%"
								cy="50%"
								labelLine={false}
								label={renderCustomLabel}
								outerRadius={80}
								fill="#8884d8"
								dataKey="value">
								{severityData.map((_, index) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS.primary[index % COLORS.primary.length]}
									/>
								))}
							</Pie>
							<Tooltip content={<CustomTooltip />} />
							<Legend
								verticalAlign="bottom"
								height={36}
								formatter={(value, entry: any) =>
									`${value}: ${entry.payload.value}`
								}
							/>
						</PieChart>
					</ResponsiveContainer>
				) : (
					<div className="h-[250px] flex items-center justify-center text-muted-foreground">
						No severity data available
					</div>
				)}
			</TabsContent>
		</Tabs>
	);
}

// Custom label renderer
const renderCustomLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
}: any) => {
	const RADIAN = Math.PI / 180;
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	if (percent < 0.05) return null; // Don't show label if too small

	return (
		<text
			x={x}
			y={y}
			fill="white"
			textAnchor={x > cx ? "start" : "end"}
			dominantBaseline="central"
			className="text-xs font-medium">
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

// Custom tooltip
function CustomTooltip({ active, payload }: any) {
	if (active && payload && payload.length) {
		return (
			<div className="bg-background border border-border rounded-lg shadow-lg p-3">
				<p className="font-medium">{payload[0].name}</p>
				<p className="text-sm text-muted-foreground">
					Count:{" "}
					<span className="font-medium text-foreground">
						{payload[0].value}
					</span>
				</p>
			</div>
		);
	}
	return null;
}
