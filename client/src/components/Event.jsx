import React, { useState } from "react";

function Event({ event }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDetails = () => {
        setIsOpen(!isOpen);
    };

    const getStatus = (attendees) => {
        if (attendees >= 1 && attendees < 5) {
            const x = 5 - attendees;
            return `Needs ${x} Participant(s)`;
        } else if (attendees >= 5 && attendees <= 9) {
            return "Open";
        } else {
            return "Filled";
        }
    };

return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
                <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                <p>Status: {getStatus(event.attendees)}</p>
                <button onClick={toggleDetails}>Show Details</button>
                {isOpen && (
                    <div className="mt-4">
                        <p>Created by: {event.user_id}</p>
                        <p>Attendees: {event.attendees}</p>
                        <p>Date: {event.date}</p>
                        <p>Time: {event.time}</p>
                        <p>Address: {event.address}</p>
                        <p>Details: {event.details}</p>
                        <button>RSVP</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Event;
