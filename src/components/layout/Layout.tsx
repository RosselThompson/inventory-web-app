import { Outlet } from "react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Separator } from "../ui/separator";
import AppSidebarButton from "./AppSidebarButton";
import AppBreadcrumb from "./AppBreadcrumb";

export default function Layout() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="w-full p-4">
				<div className='flex h-5 items-center space-x-4 mb-8'>
                    <AppSidebarButton />
					<Separator orientation='vertical' />
					<AppBreadcrumb />
				</div>
				<Outlet />
			</main>
		</SidebarProvider>
	);
}
