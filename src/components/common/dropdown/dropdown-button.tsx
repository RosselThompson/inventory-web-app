import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface DropdownButtonItem {
	key: string;
	text: string;
	onClick: () => void;
}

interface DropdownButtonProps {
	icon: ReactNode;
	items: DropdownButtonItem[];
}

const DropdownButton = (props: DropdownButtonProps) => {
	const { icon, items } = props;
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline'>{icon}</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				{items.map((e) => (
					<DropdownMenuItem key={e.key} onClick={e.onClick}>
						{e.text}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DropdownButton;
