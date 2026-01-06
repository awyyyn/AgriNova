import { Loader } from "@/components/custom/loader";
import { useAuth } from "@/contexts/auth-context";
import { Navigate, Outlet } from "react-router";

export default function AuthLayout() {
	const { isAuthenticated, role, loading } = useAuth();

	if (loading) return <Loader />;

	if (isAuthenticated)
		return <Navigate to={role === "USER" ? "/" : "/admin/dashboard"} />;

	return <Outlet />;
}
