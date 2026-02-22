import type { ChatMessage } from "../types/chat";

export function MessageList({ messages }: { messages: ChatMessage[] }) {
    return (
        <div className="bg-gray-800 p-3 h-96 w-full overflow-y-auto rounded">
            {messages.map((m, index) => (
                <div key={index}>
                    {!m.username ? (
                        <p>{m.text}</p>
                    ) : (
                        <p>
                            <b>{m.username}</b>: {m.text}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}
