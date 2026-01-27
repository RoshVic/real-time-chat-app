import { type Dispatch, type SetStateAction } from "react";
import { socket } from "../socket";

export function ConnectionManager({ setIsConnected }: { setIsConnected: Dispatch<SetStateAction<boolean>> }) {
    function connect() {
        socket.connect();

        if (socket.connected) {
            setIsConnected(true);
        }
    }

    function disconnect() {
        socket.disconnect();

        if (!socket.connected) {
            setIsConnected(false);
        }
    }

    return (
        <>
            <button onClick={connect} className="justify-start bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                Connect
            </button>
            <button onClick={disconnect} className="justify-start bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                Disconnect
            </button>
        </>
    );
}
