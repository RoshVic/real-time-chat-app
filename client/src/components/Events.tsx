interface EventProps {
    events: String[];
}

export function Events({ events }: EventProps) {
    return (
        <ul>
            {events.map((event, index) => (
                <li key={index}>{event}</li>
            ))}
        </ul>
    );
}
