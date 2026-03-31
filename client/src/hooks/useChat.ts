import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react";

import { socket } from "../socket/socket";
import { type ChatMessage } from "../types/chat";
import { FETCH_MESSAGES } from "../api/chatAPI";

export function useChat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [connected, setConnected] = useState(false);
    const { id: chatId } = useParams<{ id: string }>();

    const { data } = useQuery(FETCH_MESSAGES, {
        variables: {
            data: {
                chatRoomId: chatId || "",
            },
        },
        context: {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
            credentials: "include",
        },
        skip: !chatId,
    });

    useEffect(() => {
        if (data?.getMessages) {
            console.log(data.getMessages);
            setMessages(data.getMessages);
        }
    }, [data]);

    useEffect(() => {
        socket.connect();

        socket.on("chat:room", (message: { connection: boolean }) => {
            setConnected(message.connection);
        });

        socket.on(`chat:receiveMessage`, (msg: ChatMessage) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off("chat:room");
            socket.off("chat:receiveMessage");

            socket.disconnect();
        };
    }, []);

    const sendMessage = (text: string) => {
        const accessToken = sessionStorage.getItem("accessToken");

        socket.emit(`chat:sendMessage`, { accessToken, chatId, text });
    };

    return {
        messages,
        connected,
        sendMessage,
        connect: () => {
            const accessToken = sessionStorage.getItem("accessToken");

            socket.emit("chat:connection", { accessToken, chatId, connection: true });
        },
        disconnect: () => {
            const accessToken = sessionStorage.getItem("accessToken");

            socket.emit("chat:connection", { accessToken, chatId, connection: false });
        },
    };
}
