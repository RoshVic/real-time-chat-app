import { useChats } from "../hooks/useChats";
import { ChatList } from "../components/ChatList";
import { CreateChatModal } from "../components/CreateChatModal";

export default function ChatsPage() {
    const { chats, loading, createChat } = useChats();

    return (
        <div className="min-h-screen bg-gray-700 text-white p-6">
            <h1 className="text-2xl mb-4">My chats</h1>

            {loading && <p>Loading...</p>}
            <ChatList chats={chats} />

            <CreateChatModal onCreate={createChat} />
        </div>
    );
}
