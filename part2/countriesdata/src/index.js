import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Utworzenie korzenia dla renderowania aplikacji
const root = ReactDOM.createRoot(document.getElementById("root"));

// Renderowanie głównego komponentu App w trybie StrictMode
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
