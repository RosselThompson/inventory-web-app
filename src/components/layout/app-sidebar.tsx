import { useLocation } from "react-router";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";

import { MENU_ITEMS } from "@/constants/menu.constant";
import AppSidebarMenuButton from "./app-sidebar-menu-button";

export function AppSidebar() {
	const { pathname } = useLocation();
	const { isMobile, toggleSidebar, open } = useSidebar();
	const isClose = !open;

	const mappedItems = MENU_ITEMS.map((i) => ({
		...i,
		isActive: pathname.startsWith(i.url),
	}));

	const handleOpenStateForMobile = () => isMobile && toggleSidebar();

	return (
		<Sidebar variant='floating' collapsible='icon' onChange={toggleSidebar}>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{mappedItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<AppSidebarMenuButton
										item={item}
										onClick={handleOpenStateForMobile}
										showTooltip={!isMobile ? isClose : false}
									/>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
