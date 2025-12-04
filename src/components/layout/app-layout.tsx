import { Outlet } from "react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Separator } from "../ui/separator";
import AppSidebarButton from "./app-sidebar-button";
import AppBreadcrumb from "./app-breadcrumb";

export default function AppLayout() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className='w-full p-4'>
				<div className='flex h-5 items-center space-x-4 mb-4'>
					<AppSidebarButton />
					<Separator orientation='vertical' />
					<AppBreadcrumb />
				</div>
				<Outlet />
			</main>
		</SidebarProvider>
	);
}
