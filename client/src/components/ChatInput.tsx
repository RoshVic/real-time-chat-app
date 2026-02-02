import { useState } from "react";

export function ChatInput({ onSend }: { onSend: (text: string) => void }) {
    const [text, setText] = useState("");

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;
        onSend(text);
        setText("");
    };

    return (
        <form onSubmit={submit} className="flex gap-2">
            <input value={text} onChange={(e) => setText(e.target.value)} className="flex-1 p-2 text-black rounded" />
            <button className="bg-blue-500 px-4 rounded">Send</button>
        </form>
    );
}
