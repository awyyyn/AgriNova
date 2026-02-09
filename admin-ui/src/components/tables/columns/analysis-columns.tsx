import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { PlantAnalysisTableData } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
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
