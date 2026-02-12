import * as React from "react";
import {
	Bell,
	CircleQuestionMark,
	LayoutDashboard,
	Leaf,
	LifeBuoy,
	Users,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";

const data = {
	navMain: [
		{
			title: "Dashboard",
			url: "/admin/dashboard",
			icon: LayoutDashboard,
			// items: [
			// 	{
			// 		title: "History",
			// 		url: "/admin/dashboard",
			// 	},
			// 	{
			// 		title: "Starred",
			// 		url: "#",
			// 	},
			// 	{
			// 		title: "Settings",
			// 		url: "#",
			// 	},
			// ],
		},
		{
			title: "Analysis",
			icon: Leaf,
			url: "/admin/analysis",
		},

		{
			title: "Users",
			url: "/admin/users#",
			icon: Users,
			// items: [
			// 	{
			// 		title: "List",
			// 		url: "/admin/users",
			// 	},
			// ],
		},
		{
			title: "Notifications",
			url: "/admin/notifications",
			icon: Bell,
			// items: [
			// 	{
			// 		title: "List",
			// 		url: "/admin/users",
			// 	},
			// ],
		},
	],
	navSecondary: [
		{
			title: "About",
			url: "/admin/about",
			icon: LifeBuoy,
		},
		{
			title: "FAQs",
			url: "/faqs",
			icon: CircleQuestionMark,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link to="/admin">
								<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square  size-8 items-center justify-center rounded-lg">
									<Leaf className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">AgriNova</span>
									<span className="truncate text-xs">Smart Agriculture</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className="custom-scrollbar">
				<NavMain items={data.navMain} />
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
