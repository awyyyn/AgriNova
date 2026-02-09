import { Navigate, RouteObject, useRoutes } from "react-router";
import AuthLayout from "./layouts/auth-layout";
import Login from "./pages/auth/login";
import Home from "./pages/home";
import AdminLayout from "./layouts/admin-layout";
import ForgotPasswordPage from "./pages/auth/forgot-password";
import ResetPasswordForm from "./pages/auth/reset-password";
import UsersPage from "./pages/users/page";
import NotFound from "./pages/not-found/page";
import Forbidden from "./pages/unauthorized/page";
import Analysis from "./pages/analysis/page";
import FAQsPage from "./pages/faqs/page";
import HelpPage from "./pages/help/page";
import Dashboard from "./pages/dashboard/page";
import UserDetailPage from "./pages/users/details/page";
import AnalysisDetailPage from "./pages/analysis/details/page";
import ProfilePage from "./pages/profile/page";
import PasswordPage from "./pages/profile/change-password/page";

export default function Routes() {
	const publicRoutes: RouteObject[] = [
		{ path: "/", element: <Home /> },
		{ path: "/faqs", element: <FAQsPage /> },
		{ path: "/help", element: <HelpPage /> },
		{ path: "/unauthorized", element: <Forbidden /> },
		{ path: "*", element: <NotFound /> },
	];

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
				{ path: "forgot-password", element: <ForgotPasswordPage /> },
				{ path: "reset-password", element: <ResetPasswordForm /> },
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
				{
					path: "dashboard",
					element: <Dashboard />,
				},
				{
					path: "users",
					children: [
						{
							index: true,

							element: <UsersPage />,
						},
						{
							path: ":id",
							element: <UserDetailPage />,
						},
					],
				},
				{
					path: "analysis",

					children: [
						{ index: true, element: <Analysis /> },
						{ path: ":id", element: <AnalysisDetailPage /> },
					],
				},
				{
					path: "profile",
					children: [
						{
							index: true,
							element: <ProfilePage />,
						},
						{
							path: "change-password",
							element: <PasswordPage />,
						},
					],
				},
			],
		},
	];

	return useRoutes([...publicRoutes, ...authRoutes, ...protectedRoutes]);
}
