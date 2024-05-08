import React, { useState, useEffect } from "react";

function Search({ events, setFilteredEvents }) {
    const [sortBy, setSortBy] = useState("date");
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        handleSearch();
    }, [sortBy, statusFilter]);

    const handleSearch = () => {
        let sortedEvents = [...events];

    // Filter events based on status
    if (statusFilter === "open") {
        // Include events with "open" status and "needs participants" status
        sortedEvents = sortedEvents.filter(event => event.getStatus() === "Open" ||event.getStatus() === "Needs Participants" );
    } else if (statusFilter === "filled") {
        sortedEvents = sortedEvents.filter(event => event.getStatus() === "Filled");
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
        <div>
            <label htmlFor="sortBy">Sort by:</label>
            <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="date">Date</option>
                <option value="alphabetical">Name</option>
            </select>

            <label htmlFor="statusFilter">Filter by status:</label>
            <select id="statusFilter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="open">Open</option>
                <option value="filled">Filled</option>
            </select>
        </div>
    );
}

export default Search;
