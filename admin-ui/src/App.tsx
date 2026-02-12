import { BrowserRouter } from "react-router";
import Routes from "./routes";
import { Toaster } from "sonner";
import { AuthProvider } from "./contexts/auth-context";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "./components/ui/tooltip";
import { NotificationProvider } from "./contexts/notification-context";

export default function App() {
	return (
		<HelmetProvider>
			<TooltipProvider>
				<AuthProvider>
					<NotificationProvider>
						<BrowserRouter>
							<Routes />
						</BrowserRouter>
					</NotificationProvider>
				</AuthProvider>
				<Toaster />
			</TooltipProvider>
		</HelmetProvider>
	);
}
