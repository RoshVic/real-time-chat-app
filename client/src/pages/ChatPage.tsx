import { useNavigate } from "react-router-dom";

import { useChat } from "../hooks/useChat";
import { MessageList } from "../components/MessageList";
import { ChatInput } from "../components/ChatInput";
import { ConnectionBar } from "../components/ConnectionBar";

export default function ChatPage() {
    const { messages, connected, sendMessage, connect, disconnect } = useChat();
    const navigate = useNavigate();

    const handleBackButton = () => {
        disconnect();
        navigate("/chats");
    };

    return (
        <div className="min-h-screen bg-gray-700 text-white p-6">
            <div>
                <h1 className="text-2xl mb-4">Real Time Chat</h1>
                <button className="bg-blue-500 px-4 rounded hover:bg-blue-600" onClick={handleBackButton}>
                    All Chats
                </button>
            </div>

            <ConnectionBar connected={connected} connect={connect} disconnect={disconnect} />

            <MessageList messages={messages} />
            <ChatInput onSend={sendMessage} />
        </div>
    );
}
