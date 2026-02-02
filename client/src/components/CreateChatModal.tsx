import { useState } from "react";

export function CreateChatModal({ onCreate }: { onCreate: (name: string) => void }) {
    const [name, setName] = useState("");

    const submit = () => {
        if (!name.trim()) return;
        onCreate(name);
        setName("");
    };

    return (
        <div className="flex gap-2 mt-4">
            <input value={name} onChange={(e) => setName(e.target.value)} className="p-2 text-black rounded" placeholder="Chat name" />
            <button onClick={submit} className="bg-blue-500 px-4 rounded">
                Create
            </button>
        </div>
    );
}
