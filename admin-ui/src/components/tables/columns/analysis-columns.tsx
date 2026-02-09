import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { PlantAnalysisTableData } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { Eye } from "lucide-react";
import { Link } from "react-router";

export const analysisColumns: ColumnDef<PlantAnalysisTableData>[] = [
	{
		accessorKey: "id",
		header: "#",
		cell: ({ row }) => row.index + 1,
		enableHiding: false,
	},
	{
		accessorKey: "img",
		header: "Image",
		cell: ({ row }) => (
			<img
				src={row.getValue("img")}
				alt="Analysis"
				loading="lazy"
				className="h-12 w-12 object-cover rounded-md"
			/>
		),
	},
	{
		accessorKey: "type",
		header: "Type",
		cell: ({ row }) => {
			const type = (row.getValue("type") as string) || "unknown";
			return (
				<span
					className={`px-2 py-1 capitalize rounded-full text-xs font-medium ${
						type === "fruit"
							? "bg-green-100 text-green-800"
							: type === "vegetable"
								? "bg-yellow-100 text-yellow-800"
								: type === "plant"
									? "bg-blue-100 text-blue-800"
									: "bg-gray-100 text-gray-800"
					}`}>
					{type}
				</span>
			);
		},
	},
	{
		accessorKey: "confidence",
		header: "Confidence",
		cell: ({ row }) => {
			const confidence = row.getValue("confidence") as number;
			return (
				<span
					className={`px-2 py-1 rounded-full text-xs font-medium ${
						confidence >= 80
							? "bg-green-100 text-green-800"
							: confidence >= 50
								? "bg-yellow-100 text-yellow-800"
								: "bg-red-100 text-red-800"
					}`}>
					{confidence}%
				</span>
			);
		},
	},
	{
		accessorKey: "createdAt",
		header: "Analyzed on",
		cell: ({ row }) =>
			`${formatDate(
				new Date(row.getValue("createdAt")),
				"MMM d, yyyy",
			)}, at ${formatDate(new Date(row.getValue("createdAt")), "h:mm a")}
		`,
	},
	{
		accessorKey: "id",
		header: "Actions",
		cell: ({ row }) => {
			const userId = row.getValue("id") as string;
			return (
				<Tooltip>
					<TooltipTrigger>
						<Button asChild size="icon-sm" variant="outline">
							<Link to={`/admin/analysis/${userId}`}>
								<Eye />
							</Link>
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<span>View User Details</span>
					</TooltipContent>
				</Tooltip>
			);
		},
		enableSorting: false,
		enableHiding: false,
	},
];
