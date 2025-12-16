import { useState, useEffect } from "react";
import { socket } from "../socket";
import { ConnectionState } from "../components/ConnectionState";
import { ConnectionManager } from "../components/ConnectionManager";
import { Events } from "../components/Events";
import { MyForm } from "../components/MyForm";

import { useAuth } from "../hooks/useAuth";
import "../css/style.css";

export default function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    const { logout } = useAuth();

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState<any[]>([]);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onFooEvent(value: any) {
            setFooEvents((previous) => [...previous, value]);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("foo", onFooEvent);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("foo", onFooEvent);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-700 divide-y-1 divide-gray-200">
            <div className="flex items-center p-4">
                <button
                    type="button"
                    onClick={() => logout()}
                    className="justify-start bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                    Logout
                </button>
                <h1 className="text-2xl text-white font-bold justify-center flex w-full">Real-Time Chat</h1>
            </div>

            <div className="chat-room">
                <ConnectionState isConnected={isConnected} />
                <Events events={fooEvents} />
                <ConnectionManager />
                <MyForm />
            </div>
        </div>
    );
}
