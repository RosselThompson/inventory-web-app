export interface MenuItem {
	title: string;
	url: string;
	icon: React.FC;
	isActive?: boolean;
}