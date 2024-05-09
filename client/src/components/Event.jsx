import React, { useState} from "react";

function Event({ event }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isRSVPed, setIsRSVPed] = useState(false);
    const [attendees, setAttendees] = useState(event.attendees);


    const toggleDetails = () => {
        setIsOpen(!isOpen);
    };

    const getStatus = (attendees) => {
        if (attendees >= 1 && attendees <= 10) {
            return "Open";
        } else {
            return "Filled";
        }
    };

    const handleRSVP = () => {

        setIsRSVPed(!isRSVPed);
     
        const newAttendeesCount = isRSVPed ? attendees - 1 : attendees + 1;
        setAttendees(newAttendeesCount);

        fetch(`/api/event/${event.id}/rsvp`, {
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
                console.log(event)
                event.attendees = newAttendeesCount;
                
            })
            .catch(error => {
                console.error('There was a problem with the RSVP operation:', error);
            });
    };
return (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-4">{event.name}</h3>
      <p className="text-gray-700 mb-2">Status: {getStatus(attendees)}</p>
      <button onClick={toggleDetails} className="px-5 py-2.5 font-medium bg-purple-50 hover:bg-purple-100 hover:text-purple-600 text-purple-500 rounded-lg">
        {isOpen ? "Hide Details" : "Show Details"}
      </button>
      {isOpen && (
        <div className="mt-4">
          <p className="text-gray-700 mb-2">Attendees: {attendees}</p>
          <p className="text-gray-700 mb-2">Date: {event.date}</p>
          <p className="text-gray-700 mb-2">Time: {event.time}</p>
          <p className="text-gray-700 mb-2">Address: {event.address}</p>
          <p className="text-gray-700 mb-2">Details: {event.details}</p>
          <button onClick={handleRSVP} className="px-5 py-2.5 font-medium bg-purple-50 hover:bg-purple-100 hover:text-purple-600 text-purple-500 rounded-lg">
            {isRSVPed ? "Cancel RSVP" : "RSVP"}
          </button>
        </div>
      )}
    </div>
  </div>
);
}
export default Event;
