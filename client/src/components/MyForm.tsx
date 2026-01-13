import { useState, type FormEvent } from "react";
import { socket } from "../socket";

export function MyForm() {
    const [value, setValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function onSubmit(event: FormEvent) {
        event.preventDefault();
        setIsLoading(true);

        const username = sessionStorage.getItem("username");

        socket.timeout(1).emit("foo-message", `${username}: ` + value, () => {
            setIsLoading(false);
        });
    }

    return (
        <form onSubmit={onSubmit}>
            <input onChange={(e) => setValue(e.target.value)} />

            <button
                type="submit"
                disabled={isLoading}
                className="justify-start bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
                Submit
            </button>
        </form>
    );
}
