import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client/react";

import { socket } from "../socket";
import { ConnectionState } from "../components/ConnectionState";
import { ConnectionManager } from "../components/ConnectionManager";
import { Events } from "../components/Events";
import { MyForm } from "../components/MyForm";

import { useAuth } from "../hooks/useAuth";
import { LOGOUT_USER } from "../api/authAPI";
import "../css/style.css";

export default function ChatPage() {
    const { logout } = useAuth();

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState<String[]>([]);

    const [logoutMutate] = useMutation(LOGOUT_USER);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
            setFooEvents((previous) => [...previous, "New user connected!"]);
        }

        function onDisconnect() {
            setIsConnected(false);
            setFooEvents((previous) => [...previous, "User disconnected"]);
        }

        function onFooEvent(value: String) {
            setFooEvents((previous) => [...previous, value]);
        }

        socket.on("user-onnect", onConnect);
        socket.on("user-disconnect", onDisconnect);
        socket.on("foo-message", onFooEvent);

        return () => {
            socket.off("user-connect", onConnect);
            socket.off("user-disconnect", onDisconnect);
            socket.off("foo-message", onFooEvent);
        };
    }, []);

    const handleLogout = async () => {
        await logoutMutate();

        logout();
    };

    return (
        <div className="min-h-screen bg-gray-700 divide-y-1 divide-gray-200">
            <div className="flex items-center p-4">
                <button
                    type="button"
                    onClick={() => handleLogout()}
                    className="justify-start bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                    Logout
                </button>
                <h1 className="text-2xl text-white font-bold justify-center flex w-full">Real-Time Chat</h1>
            </div>

            <div className="chat-room text-white flex justify-center grid">
                <ConnectionState isConnected={isConnected} />
                <ConnectionManager />
                <Events events={fooEvents} />

                <MyForm />
            </div>
        </div>
    );
}
