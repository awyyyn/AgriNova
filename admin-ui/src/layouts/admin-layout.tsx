import { AppSidebar } from "@/components/app-sidebar";
import { NotificationBell } from "@/components/custom/notification-dropdown";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/auth-context";
import { Link, Navigate, Outlet, useLocation } from "react-router";

export default function AdminLayout() {
	const { isAuthenticated } = useAuth();
	const paths = useLocation();

	if (!isAuthenticated) {
		return <Navigate to={"/auth/login"} />;
	}

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 flex justify-between">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mr-2 data-[orientation=vertical]:h-4"
						/>
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink asChild>
										<Link to="/admin">AgriNova</Link>
									</BreadcrumbLink>
								</BreadcrumbItem>
								{paths.pathname.split("/").map((segment, index, arr) => {
									if (segment === "admin" || segment === "") {
										return null;
									}
									const path = `/${arr.slice(1, index + 1).join("/")}`;
									const isLast = index === arr.length - 1;
									return (
										<>
											<BreadcrumbSeparator
												key={`${path}-separator-${index}`}
												className="hidden md:block"
											/>
											<BreadcrumbItem key={path + index}>
												{isLast ? (
													<BreadcrumbPage
														key={`breadcrumbpage-${path}-${index}`}>
														{segment.charAt(0).toUpperCase() + segment.slice(1)}
													</BreadcrumbPage>
												) : (
													<>
														<BreadcrumbLink
															key={`breadcrumblink-${path}-${index}`}
															asChild>
															<Link to={path}>
																{segment.charAt(0).toUpperCase() +
																	segment.slice(1)}
															</Link>
														</BreadcrumbLink>
													</>
												)}
											</BreadcrumbItem>
										</>
									);
								})}
							</BreadcrumbList>
						</Breadcrumb>
					</div>
					<div className="pr-5">
						<NotificationBell />
					</div>
				</header>
				<div className="  p-4 pt-0">
					<Outlet />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
