import { useState, useEffect, useRef } from "react";
import { format, parseISO } from "date-fns";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { getRangeName } from "@/lib/utils";
import { DashboardStats } from "@/components/custom/dashboard-stats";
import { AnalysisChart } from "@/components/custom/analysis-chart";
import { DistributionCharts } from "@/components/custom/distribution-chart";
import { TopDiseases } from "@/components/custom/disease-component";
import { ActiveUsers } from "@/components/custom/active-users";
import { RecentActivity } from "@/components/custom/recent-activity";
import { useReactToPrint } from "react-to-print";
import { ExportDropdown } from "@/components/custom/export-dropdown";
import { Helmet } from "react-helmet-async";

// Types
interface DashboardData {
	overview: {
		totalUsers: number;
		totalAnalyses: number;
		totalWithPest: number;
		totalWithoutPest: number;
		pestPercentage: string;
		averageConfidence: string;
	};
	weekly: {
		dateRange: { start: string; end: string };
		newUsers: number;
		weeklyAnalyses: number;
		activeUsers: number;
		weeklyPestPercentage: string;
		daysInPeriod: number;
	};
	distributions: {
		usersByRole: Record<string, number>;
		analysisByType: Array<{ type: string; count: number }>;
		severity: Record<string, number>;
		healthStatus: Record<string, number>;
		confidence: { low: number; medium: number; high: number };
	};
	topDiseases: Array<{ name: string; count: number }>;
	growthTrends: {
		userGrowth: string;
		analysisGrowth: string;
	};
	activeUsers: Array<{
		id: string;
		email: string;
		name: string;
		role: string;
		analysisCount: number;
	}>;
	recentAnalyses: Array<any>;
}

type DateRange = {
	from: Date;
	to: Date;
};

export default function Dashboard() {
	const [data, setData] = useState<DashboardData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedRange, setSelectedRange] = useState("last7Days");
	const [customDateRange] = useState<DateRange | undefined>();
	const componentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		fetchDashboard();
	}, [selectedRange, customDateRange]);

	const fetchDashboard = async () => {
		try {
			setLoading(true);
			setError(null);

			let url = `${import.meta.env.VITE_API_URL}/analytics?range=${selectedRange}`;

			if (
				selectedRange === "custom" &&
				customDateRange?.from &&
				customDateRange?.to
			) {
				url += `&start=${format(customDateRange.from, "yyyy-MM-dd")}`;
				url += `&end=${format(customDateRange.to, "yyyy-MM-dd")}`;
			}

			const response = await fetch(url, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				},
			});

			if (!response.ok) {
				throw new Error("Failed to fetch dashboard data");
			}

			const result = await response.json();

			if (result.success) {
				setData(result.data);
			} else {
				throw new Error(result.message || "Failed to load dashboard");
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unknown error");
			console.error("Dashboard error:", err);
		} finally {
			setLoading(false);
		}
	};

	const handlePrint = useReactToPrint({
		// content: () => componentRef.current,
		contentRef: componentRef,
		documentTitle: `Dashboard-Report-${format(new Date(), "yyyy-MM-dd")}`,
		pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .no-print {
          display: none !important;
        }
        .print-break {
          page-break-after: always;
        }
        .print-avoid-break {
          page-break-inside: avoid;
        }
      }
    `,
	});

	if (loading) {
		return <DashboardSkeleton />;
	}

	if (error) {
		return (
			<div className="container mx-auto p-6">
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			</div>
		);
	}

	if (!data) {
		return null;
	}

	return (
		<>
			<Helmet>
				<title>Dashboard</title>
			</Helmet>
			<div className="container mx-auto p-6 space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
						<p className="text-muted-foreground">
							Plant analysis overview and statistics
						</p>
					</div>

					{/* Date Range Selector */}
					<div className="flex items-center gap-2">
						{/* Export PDF Button */}
						<ExportDropdown
							data={data}
							rangeName={getRangeName(selectedRange)}
							onPrintPDF={handlePrint}
						/>

						<Select value={selectedRange} onValueChange={setSelectedRange}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Select range" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="today">Today</SelectItem>
								<SelectItem value="yesterday">Yesterday</SelectItem>
								<SelectItem value="last7Days">Last 7 Days</SelectItem>
								<SelectItem value="last30Days">Last 30 Days</SelectItem>
								<SelectItem value="thisWeek">This Week</SelectItem>
								<SelectItem value="lastWeek">Last Week</SelectItem>
								<SelectItem value="thisMonth">This Month</SelectItem>
								<SelectItem value="lastMonth">Last Month</SelectItem>
								{/* <SelectItem value="custom">Custom Range</SelectItem> */}
							</SelectContent>
						</Select>

						{/* {selectedRange === "custom" && (
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									className={cn(
										"w-[280px] justify-start text-left font-normal",
									)}>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{customDateRange?.from ? (
										customDateRange.to ? (
											<>
												{format(customDateRange.from, "LLL dd, y")} -{" "}
												{format(customDateRange.to, "LLL dd, y")}
											</>
										) : (
											format(customDateRange.from, "LLL dd, y")
										)
									) : (
										<span>Pick a date range</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0" align="start">
								<Calendar
									mode="range"
									defaultMonth={customDateRange?.from}
									selected={customDateRange}
									onSelect={setCustomDateRange}
									numberOfMonths={2}
								/>
							</PopoverContent>
						</Popover>
					)} */}
					</div>
				</div>

				{/* Printable Content */}
				<div ref={componentRef} className="container mx-auto p-6 space-y-6">
					{/* Print Header - Only visible when printing */}
					<div className="hidden print:block mb-8">
						<div className="text-center mb-4">
							<h1 className="text-3xl font-bold">AgriNova Dashboard Report</h1>
							<p className="text-lg text-gray-600 mt-2">
								{getRangeName(selectedRange)} - Generated on{" "}
								{format(new Date(), "MMMM dd, yyyy")}
							</p>
							{data.weekly.dateRange && (
								<p className="text-sm text-gray-500 mt-1">
									Period:{" "}
									{format(
										parseISO(data.weekly.dateRange.start),
										"MMM dd, yyyy",
									)}{" "}
									-{" "}
									{format(parseISO(data.weekly.dateRange.end), "MMM dd, yyyy")}
								</p>
							)}
						</div>
						<hr className="border-2 border-gray-300 mb-6" />
					</div>

					{/* Stats Cards */}
					<div className="print-avoid-break">
						<h2 className="text-xl font-semibold mb-4 hidden print:block">
							Overview Metrics
						</h2>
						<DashboardStats data={data} />
					</div>

					{/* Charts Row */}
					<div className="grid gap-6 lg:grid-cols-7">
						{/* Main Chart */}
						<Card className="lg:col-span-4">
							<CardHeader>
								<CardTitle>Analysis Trends</CardTitle>
								<CardDescription>
									Daily analysis count for the selected period
								</CardDescription>
							</CardHeader>
							<CardContent>
								<AnalysisChart
									startDate={data.weekly.dateRange.start}
									endDate={data.weekly.dateRange.end}
								/>
							</CardContent>
						</Card>

						{/* Distribution Charts */}
						<Card className="lg:col-span-3">
							<CardHeader>
								<CardTitle>Distributions</CardTitle>
								<CardDescription>
									Analysis type and confidence breakdown
								</CardDescription>
							</CardHeader>
							<CardContent>
								<DistributionCharts data={data.distributions} />
							</CardContent>
						</Card>
					</div>

					{/* Bottom Row */}
					<div className="grid gap-6 lg:grid-cols-3">
						{/* Top Diseases */}
						<Card>
							<CardHeader>
								<CardTitle>Top Diseases</CardTitle>
								<CardDescription>
									Most frequently detected diseases
								</CardDescription>
							</CardHeader>
							<CardContent>
								<TopDiseases diseases={data.topDiseases} />
							</CardContent>
						</Card>

						{/* Active Users */}
						<Card>
							<CardHeader>
								<CardTitle>Most Active Users</CardTitle>
								<CardDescription>Users with most analyses</CardDescription>
							</CardHeader>
							<CardContent>
								<ActiveUsers users={data.activeUsers} />
							</CardContent>
						</Card>

						{/* Recent Activity */}
						<Card>
							<CardHeader>
								<CardTitle>Recent Activity</CardTitle>
								<CardDescription>Latest plant analyses</CardDescription>
							</CardHeader>
							<CardContent>
								<RecentActivity analyses={data.recentAnalyses} />
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</>
	);
}

// Loading skeleton
function DashboardSkeleton() {
	return (
		<div className="container mx-auto p-6 space-y-6">
			<div className="flex items-center justify-between">
				<div className="space-y-2">
					<Skeleton className="h-8 w-[200px]" />
					<Skeleton className="h-4 w-[300px]" />
				</div>
				<Skeleton className="h-10 w-[180px]" />
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				{[1, 2, 3, 4].map((i) => (
					<Card key={i}>
						<CardHeader className="pb-3">
							<Skeleton className="h-4 w-[100px]" />
						</CardHeader>
						<CardContent>
							<Skeleton className="h-8 w-[80px]" />
							<Skeleton className="h-3 w-[120px] mt-2" />
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid gap-6 lg:grid-cols-7">
				<Card className="lg:col-span-4">
					<CardHeader>
						<Skeleton className="h-6 w-[150px]" />
					</CardHeader>
					<CardContent>
						<Skeleton className="h-[300px] w-full" />
					</CardContent>
				</Card>

				<Card className="lg:col-span-3">
					<CardHeader>
						<Skeleton className="h-6 w-[120px]" />
					</CardHeader>
					<CardContent>
						<Skeleton className="h-[300px] w-full" />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
