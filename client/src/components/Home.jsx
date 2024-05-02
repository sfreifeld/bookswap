import React, { useState, useEffect } from "react";

function Home() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch("/api/events") 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("Received events:", data);
                setEvents(data);
            })
            .catch(error => {
                console.error("Error fetching events:", error);
            });
    }, []);

    return (
        <>
            <section id="hero">
                Welcome to Book Swap
            </section>
            <section id="event_list">
                <h2>Event List:</h2>
                <ul>
                    {events.map(event => (
                        <li key={event.id}>
                            <h3>{event.name}</h3>
                            <p>Date: {event.date}</p>
                            <p>Address: {event.address}</p>
                            <p>Details: {event.details}</p>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}

export default Home;

