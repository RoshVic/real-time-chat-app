import { useNavigate } from "react-router-dom";

import { useChats } from "../hooks/useChats";
import { ChatList } from "../components/ChatList";
import { CreateChatModal } from "../components/CreateChatModal";

export default function ChatsPage() {
    const { chats, loading, createChat } = useChats();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-700 text-white p-6">
            <div>
                <h1 className="text-2xl mb-4">My chats</h1>
                <button className="bg-blue-500 px-4 rounded hover:bg-blue-600" onClick={() => navigate("/")}>
                    Home
                </button>
            </div>

            {loading && <p>Loading...</p>}
            <ChatList chats={chats} />

            <CreateChatModal onCreate={createChat} />
        </div>
    );
}
