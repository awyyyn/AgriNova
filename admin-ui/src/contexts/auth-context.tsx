import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
	Dispatch,
	SetStateAction,
} from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { toast } from "sonner";
import { Role, User } from "@/types";

interface AuthContextProps {
	role: Role | null;
	user: User | null;
	loading: boolean;
	login: (token: string, user: User | null, isAuthenticated?: boolean) => void;
	logout: () => void;
	setUser: Dispatch<SetStateAction<User | null>>;
	isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [role, setRole] = useState<Role | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			setLoading(true);
			const token = localStorage.getItem("accessToken");
			const isLoggedIn = localStorage.getItem("isLoggedIn");

			if (isLoggedIn === "false") {
				setIsAuthenticated(false);
				localStorage.clear();

				return;
			}

			if (!token) {
				setIsAuthenticated(false);
				setLoading(false);
				setRole(null);

				return;
			}

			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/auth/verify-token`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
						method: "POST",
					}
				);

				if (response.status !== 200) {
					throw new Error("Session expired");
				}

				const data = await response.json();

				setIsAuthenticated(true);
				setRole(data.data.user.role as Role);
				localStorage.setItem("accessToken", data.data.accessToken);
			} catch (err) {
				toast.error((err as Error).message, {
					position: "top-center",
					richColors: true,
				});
				setIsAuthenticated(false);
				setRole(null);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	const login = (
		token: string,
		user: User | null = null,
		isAuthenticated = true
	) => {
		localStorage.setItem("accessToken", token);

		const decoded = jwtDecode<
			{ role: string; exp: number; office: string } & JwtPayload
		>(token);

		if (decoded.exp * 1000 > Date.now()) {
			setRole(decoded.role as Role);
			setIsAuthenticated(isAuthenticated);
			setUser(user);
		} else {
			localStorage.removeItem("accessToken");
			setRole(null);
			setIsAuthenticated(false);
		}
	};

	const logout = () => {
		localStorage.clear();
		setRole(null);
		setIsAuthenticated(false);
		setLoading(false);
	};

	return (
		<AuthContext.Provider
			value={{
				role,
				loading,
				login,
				logout,
				isAuthenticated,
				user,
				setUser,
			}}>
			{children}
		</AuthContext.Provider>
	);
};
