import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import {
	DASHBOARD_PATH,
	PRODUCTS_PATH,
	REPORTS_PATH,
	RETURNS_PATH,
	SALES_PATH,
	SIGN_IN_PATH,
} from "@/constants/path.constant";
import Dashboard from "@/pages/dashboard.page";
import SignIn from "@/pages/sign-in.page";
import NotFound from "@/pages/not-found.page";
import AppLayout from "@/components/layout/app-layout";
import Products from "@/pages/products.page";
import Sales from "@/pages/sales.page";
import Returns from "@/pages/returns.page";
import Reports from "@/pages/reports.page";
import { PrivateRoute } from "./private.route";
import { AuthRoute } from "./auth.route";

const Router = () => {
	return (
		<BrowserRouter>
				<Routes>
					<Route element={<AuthRoute />}>
						<Route path={SIGN_IN_PATH} element={<SignIn />} />
					</Route>
					<Route element={<PrivateRoute />}>
						<Route index element={<Navigate to={DASHBOARD_PATH} replace />} />
						<Route path='/' element={<AppLayout />}>
							<Route path={DASHBOARD_PATH} element={<Dashboard />} />
							<Route path={PRODUCTS_PATH} element={<Products />} />
							<Route path={SALES_PATH} element={<Sales />} />
							<Route path={RETURNS_PATH} element={<Returns />} />
							<Route path={REPORTS_PATH} element={<Reports />} />
						</Route>
					</Route>
					<Route path='*' element={<NotFound />} />
				</Routes>
		</BrowserRouter>
	);
};

export default Router;
