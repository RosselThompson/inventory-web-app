import { Navigate, Outlet } from "react-router";
import { SIGN_IN_PATH } from "@/constants/path.constant";
import { isAuthenticated } from "@/helpers/auth";

export const PrivateRoute = () => {
	if (!isAuthenticated()) {
		return <Navigate to={SIGN_IN_PATH} replace />;
	}
	return <Outlet />;
};
