import { PlantAnalysisTableData } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

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
];
