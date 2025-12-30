import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ThemeProvider from "./context/theme-provider.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
