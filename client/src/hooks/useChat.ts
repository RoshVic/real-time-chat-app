import { useEffect, useState } from "react";
import { socket } from "../socket/socket";
import { type ChatMessage } from "../types/chat";

export function useChat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [connected, setConnected] = useState(false);

    const urlString = window.location.href;
    const [_protocol, rest] = urlString.split("://");
    const [_domainAndPort, _path, chatId] = rest.split("/");

    const accessToken = sessionStorage.getItem("accessToken");

    useEffect(() => {
        socket.on("chat:room", (connection: boolean) => {
            setConnected(connection);
        });

        socket.on(`chat:receiveMessage`, (msg: ChatMessage) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off("chat:room");
            socket.off("chat:receiveMessage");
        };
    }, []);

    const sendMessage = (text: string) => {
        socket.emit(`chat:sendMessage`, { accessToken, chatId, text });
    };

    return {
        messages,
        connected,
        sendMessage,
        connect: async () => {
            socket.connect();

            socket.emit("chat:connection", { accessToken, chatId, connection: true });
        },
        disconnect: () => {
            socket.emit("chat:connection", { accessToken, chatId, connection: false });

            socket.disconnect();
        },
    };
}
