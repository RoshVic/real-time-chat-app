import { useEffect, useState } from "react";
import { useMutation, useLazyQuery } from "@apollo/client/react";

import { type ChatRoom } from "../types/chat";
import { CREATE_CHAT, FETCH_CHATS } from "../api/chatAPI";

export function useChats() {
    const [chats, setChats] = useState<ChatRoom[]>([]);
    const [loading, setLoading] = useState(false);

    const [fetchChatRooms] = useLazyQuery(FETCH_CHATS);
    const [createChatRoom] = useMutation(CREATE_CHAT);

    const fetchChats = async () => {
        setLoading(true);

        const { data } = await fetchChatRooms({
            context: {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                },
                credentials: "include",
            },
        });

        if (data) setChats(data.getChatRooms);

        setLoading(false);
    };

    const createChat = async (name: string) => {
        const mutationRes = await createChatRoom({
            variables: {
                data: {
                    roomname: name,
                },
            },
            context: {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
            },
        });

        const chat = mutationRes.data?.createChatRoom;
        if (chat) {
            setChats((prev) => [...prev, chat]);
        }
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
