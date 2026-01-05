import { Navigate, RouteObject, useRoutes } from "react-router";
import AuthLayout from "./layouts/auth-layout";
import Login from "./pages/auth/login";
import Home from "./pages/home";
import AdminLayout from "./layouts/admin-layout";

export default function Routes() {
	const publicRoutes: RouteObject[] = [{ path: "/", element: <Home /> }];

	const authRoutes: RouteObject[] = [
		{
			path: "auth",
			element: <AuthLayout />,
			children: [
				{
					index: true,
					element: <Navigate to="/auth/login" replace />,
				},
				{ path: "login", element: <Login /> },
			],
		},
	];

	const protectedRoutes: RouteObject[] = [
		{
			path: "admin",
			element: <AdminLayout />,
			children: [
				{
					index: true,
					element: <Navigate to="/admin/dashboard" replace />,
				},
			],
		},
	];

	return useRoutes([...publicRoutes, ...authRoutes, ...protectedRoutes]);
}
