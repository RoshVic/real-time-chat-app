import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <AuthProvider>
            <StrictMode>
                <App />
            </StrictMode>
        </AuthProvider>
    </BrowserRouter>
);
