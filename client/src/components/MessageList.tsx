import type { ChatMessage } from "../types/chat";

export function MessageList({ messages }: { messages: ChatMessage[] }) {
    return (
        <div className="bg-gray-800 p-3 max-h-[calc(100vh-200px)] w-full overflow-y-auto rounded overflow-auto">
            {messages?.length ? (
                messages.map((m, index) => (
                    <div key={m.id ?? `messageList-${index}`}>
                        {!m.username ? (
                            <p className="text-green-400">{m.text}</p>
                        ) : (
                            <p>
                                <b>{m.username}</b>: {m.text}
                            </p>
                        )}
                    </div>
                ))
            ) : (
                <p className="text-gray-400">No messages yet...</p>
            )}
        </div>
    );
}
