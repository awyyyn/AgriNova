import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
	Leaf,
	Bug,
	AlertCircle,
	CheckCircle2,
	Clock,
	Sparkles,
	Info,
	ArrowLeft,
	Calendar,
	Activity,
	Shield,
	AlertTriangle,
	Microscope,
	Pill,
	Sprout,
	FlaskConical,
	Home,
} from "lucide-react";
import { PlantAnalysis } from "@/types";
import { LoadingSkeleton } from "./components/loading-skeleton";
import { ErrorState } from "./components/error-state";
import { NotFoundState } from "./components/not-found-state";
import { InvalidImageState } from "./components/invalid-image-state";
import { Helmet } from "react-helmet-async";

export default function PlantAnalysisResult() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const [data, setData] = useState<PlantAnalysis | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (id) {
			fetchAnalysis();
		}
	}, [id]);

	const fetchAnalysis = async () => {
		try {
			setLoading(true);
			setError(null);

			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/plant/list/${id}`,
				{
					headers: {
						authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						"Content-Type": "application/json",
					},
				},
			);

			if (!response.ok) {
				throw new Error("Failed to fetch analysis");
			}

			const result = await response.json();
			setData(result.data);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to load analysis");
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <LoadingSkeleton />;
	}

	if (error) {
		return <ErrorState error={error} onRetry={fetchAnalysis} />;
	}

	if (!data) {
		return <NotFoundState />;
	}

	// Invalid image validation
	if (data.imageValidation === "invalid") {
		return <InvalidImageState data={data} />;
	}

	// Valid analysis result
	return (
		<>
			<Helmet>
				<title>Analysis Details</title>
			</Helmet>
			<div className="container mx-auto p-6 max-w-7xl">
				{/* Header */}
				<div className="mb-6">
					<Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
						<ArrowLeft className="h-4 w-4 mr-2" />
						Back
					</Button>

					<div className="flex items-start justify-between">
						<div>
							<h1 className="text-3xl font-bold tracking-tight mb-2">
								Analysis Results
							</h1>
							{data.formattedId && (
								<p className="text-muted-foreground">ID: {data.formattedId}</p>
							)}
						</div>

						{data.createdAt && (
							<div className="text-right text-sm text-muted-foreground">
								<div className="flex items-center gap-2">
									<Calendar className="h-4 w-4" />
									{new Date(data.createdAt).toLocaleDateString("en-US", {
										month: "long",
										day: "numeric",
										year: "numeric",
										hour: "2-digit",
										minute: "2-digit",
									})}
								</div>
							</div>
						)}
					</div>
				</div>

				<div className="grid gap-6 lg:grid-cols-3">
					{/* Left Column - Image & Quick Info */}
					<div className="space-y-6">
						{/* Plant Image */}
						{data.img && (
							<Card>
								<CardContent className="p-0">
									<img
										src={data.img}
										alt="Plant analysis"
										className="w-full h-auto rounded-lg"
									/>
								</CardContent>
							</Card>
						)}

						{/* Quick Stats */}
						<Card>
							<CardHeader>
								<CardTitle className="text-lg flex items-center gap-2">
									<Activity className="h-5 w-5" />
									Quick Summary
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								{/* Health Status */}
								<div className="flex items-center justify-between">
									<span className="text-sm text-muted-foreground">
										Health Status
									</span>
									<Badge
										variant={
											data.healthStatus === "healthy"
												? "default"
												: "destructive"
										}
										className="gap-1">
										{data.healthStatus === "healthy" ? (
											<CheckCircle2 className="h-3 w-3" />
										) : (
											<AlertCircle className="h-3 w-3" />
										)}
										{data.healthStatus}
									</Badge>
								</div>

								{/* Pest Detection */}
								<div className="flex items-center justify-between">
									<span className="text-sm text-muted-foreground">
										Pest Found
									</span>
									<Badge
										variant={data.hasPestFound ? "destructive" : "secondary"}
										className="gap-1">
										{data.hasPestFound ? (
											<Bug className="h-3 w-3" />
										) : (
											<Shield className="h-3 w-3" />
										)}
										{data.hasPestFound ? "Yes" : "No"}
									</Badge>
								</div>

								{/* Type */}
								<div className="flex items-center justify-between">
									<span className="text-sm text-muted-foreground">Type</span>
									<Badge variant="outline" className="capitalize">
										{data.type}
									</Badge>
								</div>

								{/* Confidence */}
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<span className="text-sm text-muted-foreground">
											Confidence
										</span>
										<span className="text-sm font-medium">
											{data.confidence}%
										</span>
									</div>
									<Progress value={data.confidence} className="h-2" />
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Right Column - Detailed Information */}
					<div className="lg:col-span-2 space-y-6">
						{/* Plant Identification */}
						{data.plantIdentification && (
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Leaf className="h-5 w-5 text-green-600" />
										Plant Identification
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-3">
									{data.plantIdentification.commonName && (
										<div>
											<p className="text-sm text-muted-foreground mb-1">
												Common Name
											</p>
											<p className="text-lg font-semibold">
												{data.plantIdentification.commonName}
											</p>
										</div>
									)}
									{data.plantIdentification.scientificName && (
										<div>
											<p className="text-sm text-muted-foreground mb-1">
												Scientific Name
											</p>
											<p className="text-base italic text-muted-foreground">
												{data.plantIdentification.scientificName}
											</p>
										</div>
									)}
								</CardContent>
							</Card>
						)}

						{/* Diagnosis */}
						{data.diagnosis && (
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Microscope className="h-5 w-5 text-blue-600" />
										Diagnosis
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex items-start justify-between">
										<div>
											<h3 className="text-xl font-semibold mb-1">
												{data.diagnosis.name}
											</h3>
											{data.diagnosis.confidence && (
												<p className="text-sm text-muted-foreground">
													Diagnosis confidence: {data.diagnosis.confidence}%
												</p>
											)}
										</div>
										<Badge
											variant={
												data.diagnosis.severity === "severe"
													? "destructive"
													: data.diagnosis.severity === "moderate"
														? "default"
														: "secondary"
											}
											className="capitalize">
											{data.diagnosis.severity}
										</Badge>
									</div>

									{data.diagnosis.symptoms &&
										data.diagnosis.symptoms.length > 0 && (
											<div>
												<h4 className="font-semibold mb-3 flex items-center gap-2">
													<AlertTriangle className="h-4 w-4" />
													Symptoms
												</h4>
												<ul className="space-y-2">
													{data.diagnosis.symptoms.map((symptom, index) => (
														<li key={index} className="flex items-start gap-2">
															<div className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
															<span className="text-sm">{symptom}</span>
														</li>
													))}
												</ul>
											</div>
										)}
								</CardContent>
							</Card>
						)}

						{/* Treatment */}
						{data.treatment && (
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Pill className="h-5 w-5 text-purple-600" />
										Treatment Options
									</CardTitle>
								</CardHeader>
								<CardContent>
									<Tabs defaultValue="organic" className="w-full">
										<TabsList className="grid w-full grid-cols-3">
											{data.treatment.organic &&
												data.treatment.organic.length > 0 && (
													<TabsTrigger value="organic">
														<Sprout className="h-4 w-4 mr-2" />
														Organic
													</TabsTrigger>
												)}
											{data.treatment.chemical &&
												data.treatment.chemical.length > 0 && (
													<TabsTrigger value="chemical">
														<FlaskConical className="h-4 w-4 mr-2" />
														Chemical
													</TabsTrigger>
												)}
											{data.treatment.diy && data.treatment.diy.length > 0 && (
												<TabsTrigger value="diy">
													<Home className="h-4 w-4 mr-2" />
													DIY
												</TabsTrigger>
											)}
										</TabsList>

										{data.treatment.organic &&
											data.treatment.organic.length > 0 && (
												<TabsContent value="organic" className="space-y-3 mt-4">
													<ul className="space-y-2">
														{data.treatment.organic.map((item, index) => (
															<li
																key={index}
																className="flex items-start gap-2">
																<CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
																<span className="text-sm">{item}</span>
															</li>
														))}
													</ul>
												</TabsContent>
											)}

										{data.treatment.chemical &&
											data.treatment.chemical.length > 0 && (
												<TabsContent
													value="chemical"
													className="space-y-3 mt-4">
													<Alert>
														<AlertCircle className="h-4 w-4" />
														<AlertDescription className="text-xs">
															Always follow safety instructions and local
															regulations when using chemical treatments.
														</AlertDescription>
													</Alert>
													<ul className="space-y-2">
														{data.treatment.chemical.map((item, index) => (
															<li
																key={index}
																className="flex items-start gap-2">
																<CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
																<span className="text-sm">{item}</span>
															</li>
														))}
													</ul>
												</TabsContent>
											)}

										{data.treatment.diy && data.treatment.diy.length > 0 && (
											<TabsContent value="diy" className="space-y-3 mt-4">
												<ul className="space-y-2">
													{data.treatment.diy.map((item, index) => (
														<li key={index} className="flex items-start gap-2">
															<CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
															<span className="text-sm">{item}</span>
														</li>
													))}
												</ul>
											</TabsContent>
										)}
									</Tabs>

									{data.treatment.notes && (
										<Alert className="mt-4">
											<Info className="h-4 w-4" />
											<AlertDescription>
												{data.treatment.notes}
											</AlertDescription>
										</Alert>
									)}
								</CardContent>
							</Card>
						)}

						{/* Prevention Tips */}
						{data.preventionTips && data.preventionTips.length > 0 && (
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Shield className="h-5 w-5 text-emerald-600" />
										Prevention Tips
									</CardTitle>
									<CardDescription>
										Follow these tips to prevent future issues
									</CardDescription>
								</CardHeader>
								<CardContent>
									<ul className="space-y-3">
										{data.preventionTips.map((tip, index) => (
											<li key={index} className="flex items-start gap-3">
												<div className="h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center flex-shrink-0 mt-0.5">
													<Sparkles className="h-3 w-3 text-emerald-600" />
												</div>
												<span className="text-sm">{tip}</span>
											</li>
										))}
									</ul>
								</CardContent>
							</Card>
						)}

						{/* Recovery Timeline */}
						{data.recoveryTimeline && (
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Clock className="h-5 w-5 text-amber-600" />
										Recovery Timeline
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-sm">{data.recoveryTimeline}</p>
								</CardContent>
							</Card>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
