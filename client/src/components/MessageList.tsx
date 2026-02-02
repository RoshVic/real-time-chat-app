import type { ChatMessage } from "../types/chat";

export function MessageList({ messages }: { messages: ChatMessage[] }) {
    return (
        <div className="bg-gray-800 p-3 h-96 w-full overflow-y-auto rounded">
            {messages.map((m) => (
                <div key={m.id}>
                    <b>{m.username}</b>: {m.text}
                </div>
            ))}
        </div>
    );
}
