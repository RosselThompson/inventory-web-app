import { Link, useLocation } from "react-router";
import { Receipt, Box, LayoutDashboard, Undo, Sheet } from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";

import {
	DASHBOARD_PATH,
	PRODUCTS_PATH,
	REPORTS_PATH,
	RETURNS_PATH,
	SALES_PATH,
} from "@/constants/path";

const items = [
	{
		title: "Dashboard",
		url: DASHBOARD_PATH,
		icon: LayoutDashboard,
	},
	{
		title: "Products",
		url: PRODUCTS_PATH,
		icon: Box,
	},
	{
		title: "Sales",
		url: SALES_PATH,
		icon: Receipt,
	},
	{
		title: "Returns",
		url: RETURNS_PATH,
		icon: Undo,
	},
	{
		title: "Reports",
		url: REPORTS_PATH,
		icon: Sheet,
	},
];

export function AppSidebar() {
	const { pathname } = useLocation();
	const { isMobile, toggleSidebar } = useSidebar();

	const mappedItems = items.map((i) => ({
		...i,
		isActive: pathname.startsWith(i.url),
	}));

	const handleOpenStateForMobile = () => isMobile && toggleSidebar();

	return (
		<Sidebar variant='floating' collapsible='icon' onChange={toggleSidebar}>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>POS Express</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{mappedItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										isActive={item.isActive}
										onClick={handleOpenStateForMobile}
									>
										<Link to={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
