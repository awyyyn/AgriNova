"use client";

import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface ColumnToggleProps<T> {
	table: Table<T>;
}

export function ColumnToggle<T>({ table }: ColumnToggleProps<T>) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button variant="outline">
					Columns <ChevronDown className="ml-2 h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end">
				{table
					.getAllLeafColumns()
					.filter((column) => column.getCanHide())
					.map((column) => (
						<DropdownMenuCheckboxItem
							key={column.id}
							checked={column.getIsVisible()}
							onCheckedChange={(value) => column.toggleVisibility(!!value)}>
							{typeof column.columnDef.header === "string"
								? column.columnDef.header
								: column.id}
						</DropdownMenuCheckboxItem>
					))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
