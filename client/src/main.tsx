import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth.tsx";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

import App from "./App.tsx";

export const client = new ApolloClient({
    link: new HttpLink({ uri: "http://localhost:3000/graphql" }),
    cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <AuthProvider>
                <StrictMode>
                    <App />
                </StrictMode>
            </AuthProvider>
        </ApolloProvider>
    </BrowserRouter>
);
