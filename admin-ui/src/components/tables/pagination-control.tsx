"use client";

import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
	page: number;
	limit: number;
	totalPages: number;
	total: number;
	isLoading: boolean;
	onPageChange: (page: number) => void;
	onLimitChange: (limit: number) => void;
}

export function PaginationControls({
	page,
	limit,
	totalPages,
	total,
	isLoading,
	onPageChange,
	onLimitChange,
}: PaginationControlsProps) {
	const start = page * limit + 1;
	const end = Math.min((page + 1) * limit, total);

	return (
		<div className="space-y-4 border-t px-4 py-4">
			{/* Stats Summary */}
			{/* <div className="grid grid-cols-4 gap-4">
				<div className="rounded-lg border bg-card p-3">
					<div className="text-xs text-muted-foreground">Total Records</div>
					<div className="text-xl font-bold text-foreground">{total}</div>
				</div>
				<div className="rounded-lg border bg-card p-3">
					<div className="text-xs text-muted-foreground">Current Page</div>
					<div className="text-xl font-bold text-foreground">
						{total > 0 ? page + 1 : 0}
					</div>
				</div>
				<div className="rounded-lg border bg-card p-3">
					<div className="text-xs text-muted-foreground">Total Pages</div>
					<div className="text-xl font-bold text-foreground">{totalPages}</div>
				</div>
				<div className="rounded-lg border bg-card p-3">
					<div className="text-xs text-muted-foreground">Per Page</div>
					<div className="text-xl font-bold text-foreground">{limit}</div>
				</div>
			</div> */}

			{/* Controls */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<span className="text-sm text-muted-foreground">Rows per page:</span>
					<Select
						value={limit.toString()}
						onValueChange={(value) => onLimitChange(Number(value))}>
						<SelectTrigger className="w-20">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{[10, 15, 50, 100].map((value) => (
								<SelectItem key={value} value={value.toString()}>
									{value}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="text-sm text-muted-foreground">
					{total > 0 ? `Showing ${start}-${end} of ${total}` : "No results"}
				</div>

				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => onPageChange(page - 1)}
						disabled={page === 0 || isLoading}>
						<ChevronLeft className="h-4 w-4" />
						Previous
					</Button>
					<div className="text-sm text-muted-foreground">
						Page {total > 0 ? page + 1 : 0} of {totalPages}
					</div>
					<Button
						variant="outline"
						size="sm"
						onClick={() => onPageChange(page + 1)}
						disabled={page >= totalPages - 1 || isLoading}>
						Next
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
