import { formatSegment, getBreadcrumb } from "@/helpers/get-breadcrumb";
import { Link, useLocation } from "react-router";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "../ui/breadcrumb";

const AppBreadcrumb = () => {
	const location = useLocation();
	const pathnames = location.pathname.split("/").filter(Boolean);

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{pathnames.map((segment, index) => {
					const { to, isLast } = getBreadcrumb(pathnames, index);
					const pageName = formatSegment(segment);

					return (
						<BreadcrumbItem key={segment}>
							{isLast ? (
                                <BreadcrumbPage className="truncate w-30">{pageName}</BreadcrumbPage>
							) : (
                                <Link to={to}>{pageName}</Link>
							)}
                            {!isLast && <BreadcrumbSeparator />}

						</BreadcrumbItem>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default AppBreadcrumb;
