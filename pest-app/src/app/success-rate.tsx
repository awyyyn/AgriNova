import { useAuthStore } from "@src/store/useAuthStore";
import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	ActivityIndicator,
	Dimensions,
} from "react-native";
import {
	BarChart,
	LineChart,
	PieChart,
	RadarChart,
} from "react-native-gifted-charts";

const PRIMARY = "#2e7d32";
const PRIMARY_LIGHT = "#4caf50";
const PRIMARY_DARK = "#1b5e20";

const ACCENT = "#d7f0db";
const BG = "#f1f8f4";
const CARD_BG = "#ffffff";

const TEXT = "#2e7d32";
const TEXT_MUTED = "#5f8f6a";

const DANGER = "#d32f2f";
const WARNING = "#f57c00";
const INFO = "#0288d1";
const PURPLE = "#8e24aa";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 32;

interface StatsResponse {
	pieChart: {
		successRate: number;
		failureRate: number;
	};
	radarChart: { label: string; value: number }[];
	typeChart: { label: string; value: number }[];
	lineChart: { date: string; successRate: number }[];
}

const formatDate = (iso: string) => {
	const d = new Date(iso);
	return `${d.getDate()}/${d.getMonth() + 1}`;
};

function SectionTitle({ title, subtitle }: any) {
	return (
		<View style={styles.sectionHeader}>
			<Text style={styles.sectionTitle}>{title}</Text>
			{subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
		</View>
	);
}

function Card({ children }: any) {
	return <View style={styles.card}>{children}</View>;
}

function Legend({ items }: any) {
	return (
		<View style={styles.legend}>
			{items.map((item: any, i: number) => (
				<View key={i} style={styles.legendItem}>
					<View style={[styles.legendDot, { backgroundColor: item.color }]} />
					<Text style={styles.legendLabel}>{item.label}</Text>
					{item.value !== undefined && (
						<Text style={styles.legendValue}>{item.value}</Text>
					)}
				</View>
			))}
		</View>
	);
}

// ───────────────── Charts ─────────────────

function SuccessRatePieChart({ data }: any) {
	const pieData = [
		{
			value: Math.round(data.successRate),
			color: PRIMARY_LIGHT,
			text: `${Math.round(data.successRate)}%`,
			textColor: TEXT,
		},
		{
			value: Math.round(data.failureRate),
			color: "#b7d7bf",
			text: `${Math.round(data.failureRate)}%`,
			textColor: TEXT_MUTED,
		},
	];

	return (
		<Card>
			<SectionTitle
				title="Overall Success Rate"
				subtitle="Confidence-weighted across all scans"
			/>
			<View style={styles.pieWrapper}>
				<PieChart
					donut
					data={pieData}
					radius={90}
					innerRadius={60}
					innerCircleColor={CARD_BG}
					centerLabelComponent={() => (
						<View style={styles.pieCenterLabel}>
							<Text style={styles.pieCenterValue}>
								{Math.round(data.successRate)}%
							</Text>
							<Text style={styles.pieCenterSubtext}>Success</Text>
						</View>
					)}
				/>
			</View>
			<Legend
				items={[
					{
						color: PRIMARY_LIGHT,
						label: "Successful",
						value: `${Math.round(data.successRate)}%`,
					},
					{
						color: "#b7d7bf",
						label: "Unsuccessful",
						value: `${Math.round(data.failureRate)}%`,
					},
				]}
			/>
		</Card>
	);
}

function HealthDistributionBarChart({ data }: any) {
	const chartData = (data || []).map((d: any, i: number) => ({
		value: d.value,
		label: d.label,
		frontColor: [PRIMARY_LIGHT, DANGER, WARNING][i] ?? ACCENT,
	}));

	const max = Math.max(...chartData.map((d: any) => d.value), 1);

	return (
		<Card>
			<SectionTitle
				title="Health Distribution"
				subtitle="Plant health status breakdown"
			/>

			<BarChart
				data={chartData}
				barWidth={18}
				spacing={Dimensions.get("screen").width * 0.15}
				roundedTop
				roundedBottom
				hideRules={false}
				rulesColor="#e3efe6"
				xAxisColor="#e3efe6"
				yAxisTextStyle={{ color: TEXT_MUTED, fontSize: 11 }}
				xAxisLabelTextStyle={{ color: TEXT_MUTED, fontSize: 11 }}
				maxValue={max}
				noOfSections={4}
				width={CARD_WIDTH - 80}
				isAnimated
			/>

			<Legend
				items={chartData.map((d: any) => ({
					color: d.frontColor,
					label: d.label,
					value: d.value,
				}))}
			/>
		</Card>
	);
}

function PlantTypeChart({ data }: any) {
	const colors = [PRIMARY_LIGHT, INFO, WARNING, TEXT_MUTED];
	const total = data.reduce((a: any, b: any) => a + b.value, 0) || 1;

	const pieData = data.map((d: any, i: number) => ({
		value: d.value,
		color: colors[i] ?? ACCENT,
	}));

	return (
		<Card>
			<SectionTitle title="Plant Types" subtitle={`${total} total scans`} />
			<View style={styles.pieWrapper}>
				<PieChart
					donut
					data={pieData}
					radius={90}
					innerRadius={55}
					innerCircleColor={CARD_BG}
					centerLabelComponent={() => (
						<View style={styles.pieCenterLabel}>
							<Text style={styles.pieCenterValue}>{total}</Text>
							<Text style={styles.pieCenterSubtext}>Scans</Text>
						</View>
					)}
				/>
			</View>
			<Legend
				items={data.map((d: any, i: number) => ({
					color: colors[i] ?? ACCENT,
					label: d.label,
					value: d.value,
				}))}
			/>
		</Card>
	);
}

// ───────────────── Main ─────────────────

export default function PlantStatsDashboard() {
	const [stats, setStats] = useState<StatsResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const { token } = useAuthStore();
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch(
					`${process.env.EXPO_PUBLIC_API_URL}/plant/stats`,
					{
						headers: { Authorization: `Bearer ${token}` },
					},
				);
				const { data } = await res.json();
				setStats(data);
			} catch (e: any) {
				setError(e.message);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	if (loading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={PRIMARY_LIGHT} />
				<Text style={styles.loadingText}>Loading stats…</Text>
			</View>
		);
	}

	if (error || !stats) {
		return (
			<View style={styles.centered}>
				<Text style={styles.errorText}>⚠ {error ?? "No data"}</Text>
			</View>
		);
	}

	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.content}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Plant Analytics</Text>
				<Text style={styles.headerSubtitle}>
					Confidence-weighted insights from your scans
				</Text>
			</View>

			<SuccessRatePieChart data={stats.pieChart} />
			<HealthDistributionBarChart data={stats.radarChart} />
			<PlantTypeChart data={stats.typeChart} />
		</ScrollView>
	);
}

// ───────────────── Styles ─────────────────

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: BG },
	content: { padding: 16, paddingBottom: 40, gap: 16 },

	centered: {
		flex: 1,
		backgroundColor: BG,
		alignItems: "center",
		justifyContent: "center",
		gap: 12,
	},

	header: {
		paddingBottom: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#e3efe6",
		marginBottom: 8,
	},

	headerTitle: { fontSize: 26, fontWeight: "700", color: TEXT },
	headerSubtitle: { fontSize: 13, color: TEXT_MUTED, marginTop: 4 },

	card: {
		backgroundColor: CARD_BG,
		borderRadius: 16,
		padding: 22,
		borderWidth: 1,
		borderColor: "#e3efe6",
		shadowColor: "#000",
		shadowOpacity: 0.06,
		shadowRadius: 10,
		shadowOffset: { width: 0, height: 4 },
		elevation: 3,
	},

	sectionHeader: { marginBottom: 16 },
	sectionTitle: { fontSize: 16, fontWeight: "600", color: TEXT },
	sectionSubtitle: { fontSize: 12, color: TEXT_MUTED, marginTop: 2 },

	pieWrapper: { alignItems: "center", marginVertical: 16 },
	pieCenterLabel: { alignItems: "center" },
	pieCenterValue: { fontSize: 22, fontWeight: "700", color: TEXT },
	pieCenterSubtext: { fontSize: 11, color: TEXT_MUTED },

	radarWrapper: { alignItems: "center", marginVertical: 12 },

	legend: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 12 },
	legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
	legendDot: { width: 8, height: 8, borderRadius: 4 },
	legendLabel: { fontSize: 12, color: TEXT_MUTED },
	legendValue: { fontSize: 12, fontWeight: "600", color: TEXT },

	loadingText: { color: TEXT_MUTED, fontSize: 14 },
	errorText: { color: DANGER, fontSize: 14 },
});
