import { BrowserRouter } from "react-router";
import Routes from "./routes";
import { Toaster } from "sonner";
import { AuthProvider } from "./contexts/auth-context";
import { HelmetProvider } from "react-helmet-async";

export default function App() {
	return (
		<HelmetProvider>
			<AuthProvider>
				<BrowserRouter>
					<Routes />
				</BrowserRouter>
			</AuthProvider>
			<Toaster />
		</HelmetProvider>
	);
}
