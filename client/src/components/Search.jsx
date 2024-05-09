import React, { useState, useEffect } from "react";

function Search({ events, setFilteredEvents, getStatus }) {
  const [sortBy, setSortBy] = useState("date");
  const [statusFilter, setStatusFilter] = useState("all");
  const [themedFilter, setThemedFilter] = useState("all");

  useEffect(() => {
    handleSearch();
  }, [events, sortBy, statusFilter, themedFilter]);

  const handleSearch = () => {
    let sortedEvents = [...events];

    // Filter events based on status
    if (statusFilter === "open") {
      sortedEvents = sortedEvents.filter(
        (event) =>
          getStatus(event.attendees) === "Open" 
      );
    } else if (statusFilter === "filled") {
      sortedEvents = sortedEvents.filter(
        (event) => getStatus(event.attendees) === "Filled"
      );
    }
    
     // Filter events based on theme
    if (themedFilter === "themed") {
      sortedEvents = sortedEvents.filter((event) => event.themed == 1 );
    }


    // Sort events based on sortBy option
    if (sortBy === "date") {
      sortedEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "alphabetical") {
      sortedEvents.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredEvents(sortedEvents); 
  };

  return (
    <div className="text-center pb-12">
      <label htmlFor="sortBy">Sort by:</label>
      <select
        id="sortBy"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="mr-12"
      >
        <option value="date">Date</option>
        <option value="alphabetical">Name</option>
      </select>

      <label htmlFor="statusFilter">Filter by status:</label>
      <select
        id="statusFilter"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="mr-12"
      >
        <option value="all">All</option>
        <option value="open">Open</option>
        <option value="filled">Filled</option>
      </select>
      
      <label htmlFor="themedFilter">Filter by themed:</label>
      <select
        id="themedFilter"
        value={themedFilter}
        onChange={(e) => setThemedFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="themed">Themed</option>
      </select>
    </div>
  );
}

export default Search;
