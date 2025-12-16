export function Events({ events }: { events: Event[] }) {
    return (
        <ul>
            {events.map((event, index) => (
                <li key={index}>{event.toString()}</li>
            ))}
        </ul>
    );
}
