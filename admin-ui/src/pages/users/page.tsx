"use client";

import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	VisibilityState,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useUsers } from "@/hooks/use-users";
import { usersColumns } from "@/components/tables/columns/users-columns";
import { SearchBar } from "@/components/tables/search-bar";
import { ColumnToggle } from "@/components/tables/column-toggle";
import { PaginationControls } from "@/components/tables/pagination-control";
import { Helmet } from "react-helmet-async";

export default function Home() {
	const {
		data,
		total,
		page,
		limit,
		query,
		isLoading,
		totalPages,
		handleSearch,
		handleClearSearch,
		handlePageChange,
		handleLimitChange,
	} = useUsers({ initialLimit: 10, loading: true });

	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

	const table = useReactTable({
		data,
		columns: usersColumns,
		getCoreRowModel: getCoreRowModel(),
		state: {
			columnVisibility,
		},
		manualPagination: true,
		pageCount: totalPages,
		onColumnVisibilityChange: setColumnVisibility,
	});

	return (
		<>
			<Helmet>
				<title>Users</title>
			</Helmet>
			<main className="min-h-screen bg-background">
				<div className="container mx-auto  p-2">
					<div className="space-y-6">
						{/* Header */}
						<div>
							<h1 className="text-3xl font-bold tracking-tight">Users</h1>
							<p className="text-muted-foreground mt-1">
								Manage and search through your users
							</p>
						</div>

						{/* Search and Controls */}
						<div className="  flex gap-2 items-center justify-between">
							<SearchBar
								query={query}
								isLoading={isLoading}
								onSearch={handleSearch}
								onClear={handleClearSearch}
								placeholder="Search by email, first name, or last name..."
							/>
							<ColumnToggle table={table} />
						</div>

						{/* Table */}
						<div className="relative border rounded-lg overflow-hidden">
							{isLoading && (
								<div className="absolute inset-0 bg-background/80 z-10 flex items-center justify-center backdrop-blur-sm">
									<div className="flex items-center gap-2 text-foreground">
										<Loader2 className="h-4 w-4 animate-spin" />
										<span className="text-sm font-medium">Loading...</span>
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
														{flexRender(
															cell.column.columnDef.cell,
															cell.getContext(),
														)}
													</TableCell>
												))}
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell
												colSpan={usersColumns.length}
												className="h-24 text-center text-muted-foreground">
												{query
													? "No users found matching your search."
													: "No users found."}
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</div>

						{/* Pagination */}
						<PaginationControls
							page={page}
							limit={limit}
							totalPages={totalPages}
							total={total}
							isLoading={isLoading}
							onPageChange={handlePageChange}
							onLimitChange={handleLimitChange}
						/>
					</div>
				</div>
			</main>
		</>
	);
}
