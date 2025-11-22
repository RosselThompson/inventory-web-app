import { BrowserRouter, Route, Routes } from "react-router";
import { DASHBOARD_PATH, SIGN_IN_PATH } from "@/constants/path";
import Dashboard from "@/pages/Dashboard";
import SignIn from "@/pages/SignIn";
import NotFound from "@/pages/NotFound";
import { PrivateRoute } from "./PrivateRoute";
import { AuthRoute } from "./AuthRoute";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
                <Route element={<AuthRoute />}>
				    <Route path={SIGN_IN_PATH} element={<SignIn />} />
				</Route>
				<Route element={<PrivateRoute />}>
					<Route path={DASHBOARD_PATH} element={<Dashboard />} />
				</Route>
				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
