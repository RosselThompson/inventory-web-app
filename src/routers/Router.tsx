import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import {
	DASHBOARD_PATH,
	PRODUCTS_PATH,
	REPORTS_PATH,
	RETURNS_PATH,
	SALES_PATH,
	SIGN_IN_PATH,
} from "@/constants/path";
import Dashboard from "@/pages/Dashboard";
import SignIn from "@/pages/SignIn";
import NotFound from "@/pages/NotFound";
import Layout from "@/components/layout/Layout";
import Products from "@/pages/Products";
import Sales from "@/pages/Sales";
import Returns from "@/pages/Returns";
import Reports from "@/pages/Reports";
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
					<Route index element={<Navigate to={DASHBOARD_PATH} replace />} />
					<Route path='/' element={<Layout />}>
						<Route path={DASHBOARD_PATH} element={<Dashboard />} />
						<Route path={PRODUCTS_PATH} element={<Products />} />
						<Route path={'/products/:id'} element={<Products />} />
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
