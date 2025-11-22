import { DASHBOARD_PATH } from "@/constants/path";
import { isAuthenticated } from "@/helpers/auth";
import { Navigate, Outlet } from "react-router";

export const AuthRoute = () => {
	if (isAuthenticated()) {
		return <Navigate to={DASHBOARD_PATH} replace />;
	}

    return <Outlet />
};
