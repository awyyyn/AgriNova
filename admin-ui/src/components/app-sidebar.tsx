import * as React from "react";
import {
	BookOpen,
	Bot,
	LayoutDashboard,
	Leaf,
	LifeBuoy,
	Send,
	Settings2,
	SquareTerminal,
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

const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
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
			title: "Users",
			url: "/admin/users#",
			icon: Users,
			items: [
				{
					title: "List",
					url: "/admin/users",
				},
				{
					title: "Get Started",
					url: "#",
				},
				{
					title: "Tutorials",
					url: "#",
				},
				{
					title: "Changelog",
					url: "#",
				},
			],
		},
	],
	navSecondary: [
		{
			title: "Support",
			url: "/admin/support",
			icon: LifeBuoy,
		},
		{
			title: "Feedback",
			url: "/feedback",
			icon: Send,
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
							<a href="#">
								<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square  size-8 items-center justify-center rounded-lg">
									<Leaf className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">AgriNova</span>
									<span className="truncate text-xs">Smart Agriculture</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className="custom-scrollbar">
				<NavMain items={data.navMain} />
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
