import type { JSX } from "react";
import type { MenuItem } from "@/interfaces/common/menu.interface";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { SidebarMenuButton } from "../ui/sidebar";
import { Link } from "react-router";

interface AppSidebarMenuButtonProps {
	item: MenuItem;
	onClick: () => void;
	showTooltip: boolean;
}

const AppSidebarMenuButton = ({
	item,
	onClick,
	showTooltip,
}: AppSidebarMenuButtonProps): JSX.Element => {
	if (showTooltip) {
		return (
			<Tooltip>
				<TooltipTrigger>
					<SidebarMenuButton asChild isActive={item.isActive} onClick={onClick}>
						<Link to={item.url}>
							<item.icon />
							<span>{item.title}</span>
						</Link>
					</SidebarMenuButton>
				</TooltipTrigger>
				<TooltipContent side='right'>
					<p>{item.title}</p>
				</TooltipContent>
			</Tooltip>
		);
	}
	return (
		<SidebarMenuButton asChild isActive={item.isActive} onClick={onClick}>
			<Link to={item.url}>
				<item.icon />
				<span>{item.title}</span>
			</Link>
		</SidebarMenuButton>
	);
};

export default AppSidebarMenuButton;
