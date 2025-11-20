import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* <Route path='/' element={<Layout />}> */}
					<Route index element={<Navigate to='/sign-in' replace />} />
					<Route path='/sign-in' element={<SignIn />} />
					<Route path='*' element={<NotFound />} />
				{/* </Route> */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
