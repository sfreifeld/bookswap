import React from "react";

function Search({ events, setFilteredEvents }) {
const handleSearch = (sortBy) => {
    let sortedEvents = [...events];

    // Still figuring out bugs
    if (sortBy === "date") {
        sortedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    // Still figuring out bugs
    else if (sortBy === "status") {
        sortedEvents.sort((a, b) => {
            const statusOrder = {
                "filled": 3,
                "open": 2,
            };

            // Default to 1 if not "filled" or "open"
            const statusA = statusOrder[a.status] || 1; 
            const statusB = statusOrder[b.status] || 1;

            // If status is "filled", give it lowest priority
            if (statusA === 3 && statusB !== 3) return 1;
            if (statusB === 3 && statusA !== 3) return -1;

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
            <button onClick={() => handleSearch("date")}>Sort by Date</button>
            <button onClick={() => handleSearch("status")}>Sort by Status</button>
            <button onClick={() => handleSearch("alphabetical")}>Sort by Name</button>
        </div>
    );
}

export default Search;

