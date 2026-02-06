import { BrowserRouter } from "react-router";
import Routes from "./routes";
import { Toaster } from "sonner";
import { AuthProvider } from "./contexts/auth-context";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "./components/ui/tooltip";

export default function App() {
	return (
		<HelmetProvider>
			<TooltipProvider>
				<AuthProvider>
					<BrowserRouter>
						<Routes />
					</BrowserRouter>
				</AuthProvider>
				<Toaster />
			</TooltipProvider>
		</HelmetProvider>
	);
}
