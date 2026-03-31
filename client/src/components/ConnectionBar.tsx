export function ConnectionBar({ connected, connect, disconnect }: { connected: boolean; connect: () => void; disconnect: () => void }) {
    const handleConnectButton = () => {
        connect();

        if (connected) {
            const connectButton = document.getElementById("connect-button") as HTMLButtonElement;
            const disconnectButton = document.getElementById("disconnect-button") as HTMLButtonElement;
            const chatInput = document.getElementById("chat-input") as HTMLButtonElement;

            connectButton.disabled = true;
            disconnectButton.disabled = false;
            chatInput.disabled = false;
        }
    };

    const handleDisconnectButton = () => {
        disconnect();

        const connectButton = document.getElementById("connect-button") as HTMLButtonElement;
        const disconnectButton = document.getElementById("disconnect-button") as HTMLButtonElement;
        const chatInput = document.getElementById("chat-input") as HTMLButtonElement;

        connectButton.disabled = false;
        disconnectButton.disabled = true;
        chatInput.disabled = true;
    };

    return (
        <div className="flex gap-2">
            <span>{connected ? "🟢 Online" : "🔴 Offline"}</span>
            <button id="connect-button" onClick={handleConnectButton} className="bg-green-500 px-4 rounded hover:bg-green-600">
                Connect
            </button>
            <button id="disconnect-button" onClick={handleDisconnectButton} className="bg-red-500 px-4 rounded hover:bg-red-600">
                Disconnect
            </button>
        </div>
    );
}
