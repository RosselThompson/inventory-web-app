import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";

const AppSidebarButton = () => {
	const { toggleSidebar, open } = useSidebar();

	return (
		<Button variant='ghost' size='icon' onClick={toggleSidebar}>
			{open ? <PanelLeftClose /> : <PanelLeftOpen />}
		</Button>
	);
};

export default AppSidebarButton;
