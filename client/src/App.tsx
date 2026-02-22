import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatsPage from "./pages/ChatsPage";
import ChatPage from "./pages/ChatPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
                path="/chats"
                element={
                    <ProtectedRoute>
                        <ChatsPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/chats/:id"
                element={
                    <ProtectedRoute>
                        <ChatPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;
