"use client";

import { flexRender, Table as ReactTable } from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";

interface DataTableProps<T> {
	table: ReactTable<T>;
	isLoading: boolean;
}

export function DataTable<T>({ table, isLoading }: DataTableProps<T>) {
	return (
		<div className="relative border rounded-lg overflow-hidden">
			{isLoading && (
				<div className="absolute inset-0 bg-white/50 dark:bg-black/50 z-10 flex items-center justify-center">
					<div className="flex items-center gap-2 text-foreground">
						<Loader2 className="h-4 w-4 animate-spin" />
						<span className="text-sm">Loading...</span>
					</div>
				</div>
			)}

			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={table.getVisibleLeafColumns().length}
								className="h-24 text-center text-muted-foreground">
								No results found.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
