import { useEffect, useState } from "react";
import { socket } from "../socket/socket";
import { type ChatMessage } from "../types/chat";

export function useChat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        socket.on("connect", () => setConnected(true));
        socket.on("disconnect", () => setConnected(false));

        socket.on("chat:message", (msg: ChatMessage) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off("chat:message");
        };
    }, []);

    const sendMessage = (text: string) => {
        socket.emit("chat:message", text);
    };

    return {
        messages,
        connected,
        sendMessage,
        connect: () => socket.connect(),
        disconnect: () => socket.disconnect(),
    };
}
