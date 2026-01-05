import { BrowserRouter } from "react-router";
import Routes from "./routes";
import { Toaster } from "sonner";

export default function App() {
	return (
		<>
			<BrowserRouter>
				<Routes />
			</BrowserRouter>
			<Toaster />
		</>
	);
}
