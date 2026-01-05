import { BrowserRouter } from "react-router";
import Routes from "./routes";

export default function App() {
	return (
		<>
			<BrowserRouter>
				<Routes />
			</BrowserRouter>
		</>
	);
}
