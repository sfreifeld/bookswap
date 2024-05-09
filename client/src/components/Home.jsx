import React, { useState, useEffect } from "react";
import Event from "./Event";
import Search from "./Search";
import NavBar from "./NavBar";
import AddEvent from "./AddEvent";
import Footer from "./Footer";

function Home({ user, setUser }) {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleAddEvent = () => {
    fetchEvents();
  };

  const handleSearch = (filteredEvents) => {
    setFilteredEvents(filteredEvents);
  };

  const getStatus = (attendees) => {
    return attendees >= 1 && attendees <= 10 ? "Open" : "Filled";
  };

  return (
    <>
      <NavBar user={user} setUser={setUser} />

      <section id="hero" className="flex items-center justify-center h-screen w-screen">
        <div className="flex-1 mx-20">
          <h1 className="text-8xl font-bold">Welcome to Book Swap, <span className="text-purple-200 hover:text-purple-300 transition ease-in-out duration-300">{user.username}</span></h1>
          <p className="text-xl pt-4">Discover your new favorite read & connect with fellow bookworms!</p>
        </div>
        <div className="flex-1 mx-24">
          <img src="https://t3.ftcdn.net/jpg/01/97/02/40/360_F_197024073_Kc1nAJ6T7hgFN808TgPi5LXFUSjxfIup.jpg" alt="Pixelized Books" className="w-full h-auto" />
        </div>
      </section>

      <section id="tutorial" className="flex flex-col items-center justify-center space-y-12 h-screen">
        <h2 className="text-4xl font-semibold">Getting Started</h2>
        <div className="space-y-4 w-3/4 text-center">
          <p>
            Browse local book swap gatherings tailored to your preferences—whether it's by location, date, or theme. Simply click to RSVP for the events that catch your eye. Immerse yourself in an intimate community of book lovers, where you can share recommendations, forge connections, and uncover literary gems you might never have encountered otherwise. 
          </p>
          <p>
            Feeling inspired? Create your own book swap in just minutes. Customize event details and guidelines to suit your vision with ease. 
          </p>
        </div>
        
        <div className="flex space-x-12">
          <button onClick={() => window.location.href = "#search"}
          className="px-5 py-2.5 font-medium bg-purple-50 hover:bg-purple-100 hover:text-purple-600 text-purple-500 rounded-lg"
          >
            Browse Events
          </button>
          <button onClick={() => window.location.href = "#addEvent"}
            className="px-5 py-2.5 font-medium bg-purple-50 hover:bg-purple-100 hover:text-purple-600 text-purple-500 rounded-lg"
          >
            Create Event
          </button>
        </div>

      </section>

      <section id="search" className="flex flex-col items-center justify-center">
         <h2 className="text-4xl font-semibold py-12">Book Swap Events</h2>
        <Search events={events} setFilteredEvents={handleSearch} getStatus={getStatus} />
      </section>

      <section id="eventList" className="flex flex-col items-center justify-center">
        <div className="w-1/2 space-y-12">
          {filteredEvents.map((event) => (
            <Event key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section id="addEvent" className="flex flex-col items-center justify-center h-screen">
          <AddEvent onAddEvent={handleAddEvent} />
      </section>

      <Footer/>
    </>
  );
}

export default Home;
