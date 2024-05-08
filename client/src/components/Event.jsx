import React, { useState, useEffect } from "react";

function Event({ event }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isRSVPed, setIsRSVPed] = useState(false);
    const [attendees, setAttendees] = useState(event.attendees);

    useEffect(() => {
        setIsRSVPed(false);
    }, []);

    const toggleDetails = () => {
        setIsOpen(!isOpen);
    };

    const getStatus = (attendees) => {
        if (attendees >= 1 && attendees < 5) {
            return "Needs Participants";
        } else if (attendees >= 5 && attendees <= 9) {
            return "Open";
        } else {
            return "Filled";
        }
    };

    const handleRSVP = () => {

        setIsRSVPed(!isRSVPed);
     
        const newAttendeesCount = isRSVPed ? attendees - 1 : attendees + 1;
        setAttendees(newAttendeesCount);

        fetch(`/event/${event.id}/rsvp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rsvp_status: isRSVPed ? 'cancel' : 'rsvp' })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); 
            })
            .catch(error => {
                console.error('There was a problem with the RSVP operation:', error);
            });
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
                <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                <p>Status: {getStatus(attendees)}</p>
                <button onClick={toggleDetails}>{isOpen ? "Hide Details" : "Show Details"}</button>
                {isOpen && (
                    <div className="mt-4">
                        <p>Created by: {event.user_id}</p>
                        <p>Attendees: {attendees}</p>
                        <p>Date: {event.date}</p>
                        <p>Time: {event.time}</p>
                        <p>Address: {event.address}</p>
                        <p>Details: {event.details}</p>
                        <button onClick={handleRSVP}>{isRSVPed ? "Cancel RSVP" : "RSVP"}</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Event;
