import { socket } from "../socket";

export function ConnectionManager() {
    function connect() {
        socket.connect();
    }

    function disconnect() {
        socket.disconnect();
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
