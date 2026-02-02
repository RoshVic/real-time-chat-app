export function ConnectionBar({ connected, connect, disconnect }: { connected: boolean; connect: () => void; disconnect: () => void }) {
    return (
        <div className="flex gap-2">
            <span>{connected ? "🟢 Online" : "🔴 Offline"}</span>
            <button onClick={connect}>Connect</button>
            <button onClick={disconnect}>Disconnect</button>
        </div>
    );
}
