import { useEffect, useState } from "react";
import { type ChatRoom } from "../types/chat";

export function useChats() {
    const [chats, setChats] = useState<ChatRoom[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchChats = async () => {
        setLoading(true);

        const res = await fetch("http://localhost:3001/chats", {
            credentials: "include",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });

        const data = await res.json();
        setChats(data);

        setLoading(false);
    };

    const createChat = async (name: string) => {
        const res = await fetch("http://localhost:3001/chats", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ name }),
        });

        const chat = await res.json();
        setChats((prev) => [...prev, chat]);
    };

    useEffect(() => {
        fetchChats();
    }, []);

    return {
        chats,
        loading,
        createChat,
    };
}
