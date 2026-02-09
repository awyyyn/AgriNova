import { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
	Download,
	FileText,
	FileSpreadsheet,
	Printer,
	File,
} from "lucide-react";
import {
	exportToExcel,
	exportToCSV,
	printHTMLReport,
} from "@/lib/exportDataUtil";

interface ExportDropdownProps {
	data: any;
	rangeName: string;
	onPrintPDF?: () => void;
}

export function ExportDropdown({
	data,
	rangeName,
	onPrintPDF,
}: ExportDropdownProps) {
	const [isExporting, setIsExporting] = useState(false);

	const handleExport = async (type: "excel" | "csv" | "print" | "pdf") => {
		try {
			setIsExporting(true);

			switch (type) {
				case "excel":
					exportToExcel(data, rangeName);
					break;
				case "csv":
					exportToCSV(data, rangeName);
					break;
				case "print":
					printHTMLReport(data, rangeName);
					break;
				case "pdf":
					if (onPrintPDF) {
						printHTMLReport(data, rangeName);
					}
					break;
			}
		} catch (error) {
			console.error("Export error:", error);
		} finally {
			setTimeout(() => setIsExporting(false), 1000);
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button variant="outline" className="gap-2" disabled={isExporting}>
					<Download className="h-4 w-4" />
					{isExporting ? "Exporting..." : "Export"}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuLabel>Export Options</DropdownMenuLabel>
				<DropdownMenuSeparator />

				{/* <DropdownMenuItem onClick={() => handleExport("pdf")} className="gap-2">
					<File className="h-4 w-4" />
					<div className="flex flex-col">
						<span>Export as PDF</span>
						<span className="text-xs text-muted-foreground">
							Print to PDF with charts
						</span>
					</div>
				</DropdownMenuItem> */}

				<DropdownMenuItem
					onClick={() => handleExport("excel")}
					className="gap-2">
					<FileSpreadsheet className="h-4 w-4 text-green-600" />
					<div className="flex flex-col">
						<span>Export to Excel</span>
						<span className="text-xs text-muted-foreground">
							Multiple sheets with data
						</span>
					</div>
				</DropdownMenuItem>

				<DropdownMenuItem onClick={() => handleExport("csv")} className="gap-2">
					<FileText className="h-4 w-4 text-blue-600" />
					<div className="flex flex-col">
						<span>Export to CSV</span>
						<span className="text-xs text-muted-foreground">
							Simple data export
						</span>
					</div>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					onClick={() => handleExport("print")}
					className="gap-2">
					<Printer className="h-4 w-4" />
					<div className="flex flex-col">
						<span>Print Report</span>
						<span className="text-xs text-muted-foreground">
							Formatted HTML report
						</span>
					</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
