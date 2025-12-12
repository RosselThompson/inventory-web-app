import type { MenuItem } from "@/interfaces/common/menu.interface";
import {
	BILLING_PATH,
	DASHBOARD_PATH,
	PRODUCTS_PATH,
	REPORTS_PATH,
	RETURNS_PATH,
	SALES_PATH,
} from "./path.constant";
import {
	BadgeDollarSign,
	Box,
	LayoutDashboard,
	Receipt,
	Sheet,
	Undo,
} from "lucide-react";

export const MENU_ITEMS: MenuItem[] = [
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
		title: "Billing",
		url: BILLING_PATH,
		icon: Receipt,
	},
	{
		title: "Sales",
		url: SALES_PATH,
		icon: BadgeDollarSign,
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
