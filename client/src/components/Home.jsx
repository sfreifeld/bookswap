import React, { useState, useEffect } from "react";

function Home() {
    // Fetch all ongoing events
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
                setEvents(data);
            })
            .catch(error => {
                console.error("Error fetching events:", error);
            });
    }, []);

    return (
        <>
            <section id="hero" className="h-screen mx-10">
                <h1 className="text-8xl font-bold pt-60">Welcome to Book Swap</h1>
                <p className="text-2xl mt-8">Discover your new favorite read & connect with fellow book worms!</p>
            </section>

            <section className="container space-y-10 p-20">
            <h2 className="text-4xl text-center font-bold">Upcoming Book Swap Events</h2>
            
                {events.map(event => (
                    <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                            <p>Date: {event.date}</p>
                            <p>Address: {event.address}</p>
                            <p>Attendees: {event.attendees}</p>
                            <button>Click to view details</button>
                        </div>
                    </div>
                ))}
            </section>

            <button>Create New Event</button>
        </>
    );
}

export default Home;
