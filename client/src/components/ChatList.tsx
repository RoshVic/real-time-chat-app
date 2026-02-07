import { type ChatRoom } from "../types/chat";
import { Link } from "react-router-dom";

export function ChatList({ chats }: { chats: ChatRoom[] }) {
    return (
        <div className="flex flex-col gap-2">
            {chats.map((chat) => (
                <Link key={chat.id} to={`/chats/${chat.id}`} className="bg-gray-800 p-3 rounded hover:bg-gray-700">
                    {chat.roomname}
                </Link>
            ))}
        </div>
    );
}
