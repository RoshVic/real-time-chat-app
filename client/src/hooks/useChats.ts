import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";

import { type ChatRoom } from "../types/chat";
import { CREATE_CHAT, FETCH_CHATS } from "../api/chatAPI";

export function useChats() {
    const [chats, setChats] = useState<ChatRoom[]>([]);
    const [loading, setLoading] = useState(false);
    const [roomname, setRoomName] = useState("");

    const { data } = useQuery(FETCH_CHATS, {
        context: {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
            credentials: "include",
        },
    });

    const [createChatRoom] = useMutation(CREATE_CHAT, {
        context: {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
        },
        variables: {
            data: {
                roomname,
            },
        },
    });

    const fetchChats = async () => {
        setLoading(true);

        console.log(data);

        if (data) setChats(data.getChatRooms);

        setLoading(false);
    };

    const createChat = async (name: string) => {
        setRoomName(name);

        const mutationRes = await createChatRoom();
        const chat = mutationRes.data?.createChatRoom;
        if (chat) {
            setChats((prev) => [...prev, chat]);
        }

        setRoomName("");
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
