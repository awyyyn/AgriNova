import { BrowserRouter } from "react-router";
import Routes from "./routes";
import { Toaster } from "sonner";
import { AuthProvider } from "./contexts/auth-context";

export default function App() {
	return (
		<>
			<AuthProvider>
				<BrowserRouter>
					<Routes />
				</BrowserRouter>
			</AuthProvider>
			<Toaster />
		</>
	);
}
