import React, { useState } from "react";

function Search({ events, setFilteredEvents }) {
    const [sortBy, setSortBy] = useState("date");

    const handleSearch = () => {
        let sortedEvents = [...events];

        if (sortBy === "date") {
            sortedEvents.sort((a, b) => {
                const dateA = a.date;
                const dateB = b.date;
                return dateB.localeCompare(dateA);
            });
        }
        else if (sortBy === "status") {
            sortedEvents.sort((a, b) => {
                const statusOrder = {
                    "open": 2,
                    "filled": 3,
                };

                const statusA = statusOrder[a.status] || 1;
                const statusB = statusOrder[b.status] || 1;

                return statusA - statusB;
            });
        }
        else if (sortBy === "alphabetical") {
            sortedEvents.sort((a, b) => a.name.localeCompare(b.name));
        }
        setFilteredEvents(sortedEvents);
    };

    return (
        <div>
            <label htmlFor="sortBy">Sort by:</label>
            <select id="sortBy" onChange={(e) => setSortBy(e.target.value)}>
                <option value="date">Date</option>
                <option value="status">Status</option>
                <option value="alphabetical">Name</option>
            </select>
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default Search;

