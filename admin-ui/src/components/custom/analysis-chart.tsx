// ============================================================================
// ANALYSIS CHART
// File: src/components/dashboard/AnalysisChart.tsx
// ============================================================================

import { useState, useEffect } from "react";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface ChartData {
	date: string;
	total: number;
	withPest: number;
	withoutPest: number;
	avgConfidence: string;
}

interface AnalysisChartProps {
	startDate: string;
	endDate: string;
}

export function AnalysisChart({ startDate, endDate }: AnalysisChartProps) {
	const [data, setData] = useState<ChartData[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchChartData();
	}, [startDate, endDate]);

	const fetchChartData = async () => {
		try {
			setLoading(true);
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/analytics/daily?start=${startDate}&end=${endDate}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
				},
			);

			const result = await response.json();

			if (result.success) {
				setData(result.data);
			}
		} catch (error) {
			console.error("Chart data error:", error);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <Skeleton className="h-[300px] w-full" />;
	}

	return (
		<ResponsiveContainer width="100%" height={300}>
			<AreaChart data={data}>
				<defs>
					<linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
						<stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
					</linearGradient>
					<linearGradient id="colorPest" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
						<stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
					</linearGradient>
					<linearGradient id="colorNoPest" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
						<stop offset="95%" stopColor="#10b981" stopOpacity={0} />
					</linearGradient>
				</defs>
				<CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
				<XAxis
					dataKey="date"
					className="text-xs"
					tickFormatter={(value) => {
						try {
							return format(new Date(value), "MMM dd");
						} catch {
							return value;
						}
					}}
				/>
				<YAxis className="text-xs" />
				<Tooltip
					content={<CustomTooltip />}
					cursor={{ stroke: "hsl(var(--muted))", strokeWidth: 1 }}
				/>
				<Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" />
				<Area
					type="monotone"
					dataKey="total"
					stroke="#3b82f6"
					strokeWidth={2}
					fill="url(#colorTotal)"
					name="Total Analyses"
				/>
				<Area
					type="monotone"
					dataKey="withPest"
					stroke="#ef4444"
					strokeWidth={2}
					fill="url(#colorPest)"
					name="With Pest"
				/>
				<Area
					type="monotone"
					dataKey="withoutPest"
					stroke="#10b981"
					strokeWidth={2}
					fill="url(#colorNoPest)"
					name="Without Pest"
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
}

// Custom tooltip
export function CustomTooltip({ active, payload, label }: any) {
	if (active && payload && payload.length) {
		return (
			<div className="bg-background border border-border rounded-lg shadow-lg p-3">
				<p className="font-medium mb-2">
					{format(new Date(label), "MMM dd, yyyy")}
				</p>
				<div className="space-y-1">
					{payload.map((entry: any, index: number) => (
						<div
							key={index}
							className="flex items-center justify-between gap-4 text-sm">
							<span className="flex items-center gap-2">
								<div
									className="w-3 h-3 rounded-full"
									style={{ backgroundColor: entry.color }}
								/>
								{entry.name}:
							</span>
							<span className="font-medium">{entry.value}</span>
						</div>
					))}
					{payload[0]?.payload?.avgConfidence && (
						<div className="flex items-center justify-between gap-4 text-sm pt-1 border-t border-border mt-1">
							<span>Avg Confidence:</span>
							<span className="font-medium">
								{payload[0].payload.avgConfidence}
							</span>
						</div>
					)}
				</div>
			</div>
		);
	}

	return null;
}
