import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";

const AppSidebarButton = () => {
	const { toggleSidebar } = useSidebar();

	return (
		<Button variant='ghost' onClick={toggleSidebar}>
			{/* {open ? <PanelLeftClose /> : <PanelLeftOpen />} */}
			<Menu />
		</Button>
	);
};

export default AppSidebarButton;
