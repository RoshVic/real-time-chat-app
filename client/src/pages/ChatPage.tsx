import { useChat } from "../hooks/useChat";
import { MessageList } from "../components/MessageList";
import { ChatInput } from "../components/ChatInput";
import { ConnectionBar } from "../components/ConnectionBar";

export default function ChatPage() {
    const { messages, connected, sendMessage, connect, disconnect } = useChat();

    return (
        <div className="min-h-screen bg-gray-700 text-white p-6">
            <h1 className="text-2xl mb-4">Real Time Chat</h1>

            <ConnectionBar connected={connected} connect={connect} disconnect={disconnect} />

            <MessageList messages={messages} />
            <ChatInput onSend={sendMessage} />
        </div>
    );
}
