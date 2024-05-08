import React, { useState, useEffect } from "react";
import Event from "./Event";
import Search from "./Search";
import NavBar from  "./NavBar"

function Home({user, setUser}) {
    // Fetch all ongoing events
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);

    // Fetch all events
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
                setFilteredEvents(data);
            })
            .catch(error => {
                console.error("Error fetching events:", error);
            });
    }, []);

    return (
        <>
            <NavBar user={user} setUser={setUser} />
            <section id="hero" className="h-screen mx-10">
                <h1 className="text-8xl font-bold pt-60">Welcome to Book Swap, {user.username}!</h1>
                <p className="text-2xl mt-8">Discover your new favorite read & connect with fellow book worms!</p>
            </section>

            
            <section id="tutorial" className="h-screen mx-12">  
                <h6 className="text-2xl font-semibold">Getting Started</h6>
                <div className="font-light space-y-8 my-8">
                    <p>Browse local book swap events based on location, date, and themes. Once you have found an event that interests you, you can RSVP for the event with a simple click. 
                    At the event, you can expect to connect with fellow book enthusiasts, exchange recommendations, and possibly stumble upon a new favorite read that you wouldn't have considered otherwise.
                    After attending a book swap event, take a moment to rate and review the books you've received. 
                    </p>
                    <p>Feeling inspired? Host your own book swap in minutes-- setting up event details and guidelines with ease. </p>
                </div>    
                <div className="flex flex-col p-2 sm:flex-row space-x-4">
                    <a href="#eventList" className="inline-flex items-center justify-center px-4 py-2.5 text-gray-600 text-center border border-gray-300 rounded-lg">
                        Browse Upcoming Events
                        <svg className="ml-2 -mr-1 w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 7 4 4 4-4m-8 6 4 4 4-4"/></svg>
                    </a>  
                    <button className="inline-flex items-center justify-center px-4 py-2.5 text-gray-600 text-center border border-gray-300 rounded-lg">
                        Create Event
                        <svg className="ml-2 -mr-1 w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clipRule="evenodd"/></svg>
                    </button>  
                </div>
            </section>

            <section id="search">
                <Search events={events} setFilteredEvents={setFilteredEvents} />
            </section>

            <section id="eventList" className="container space-y-10 mx-10">
                <h2 className="text-4xl text-center font-bold py-12">Upcoming Book Swap Events</h2>
                    {filteredEvents.map(event => (
                    <Event key={event.id} event={event} />
                ))}
            </section>
        </>
    );

}

export default Home;



