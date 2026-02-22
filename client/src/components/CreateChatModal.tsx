import { useState } from "react";

export function CreateChatModal({ onCreate }: { onCreate: (name: string) => void }) {
    const [roomname, setRoomName] = useState("");

    const submit = () => {
        if (!roomname.trim()) return;

        onCreate(roomname);

        setRoomName("");
    };

    return (
        <div className="flex gap-2 mt-4">
            <input
                value={roomname}
                onChange={(e) => setRoomName(e.target.value)}
                className="p-2 text-white rounded"
                placeholder="Chat name"
            />
            <button onClick={submit} className="bg-blue-500 px-4 rounded">
                Create
            </button>
        </div>
    );
}
