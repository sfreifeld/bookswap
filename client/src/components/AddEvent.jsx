import React, { useState } from "react";

function AddEvent({ onAddEvent }) {
  const [formData, setFormData] = useState({
    name: "",
    themed: "",
    date: "",
    time: "",
    address: "",
    details: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: val
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        // Event created successfully, update the event list
        onAddEvent();
        // Reset the form
        setFormData({
          name: "",
          themed: "",
          date: "",
          time: "",
          address: "",
          details: ""
        });
        alert("Event successfully added!!")
      } else {
        console.error("Failed to add event:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to add event:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="m-24">
      <h2 className="text-2xl font-semibold mb-4">Add Event</h2>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md p-2"
        />
        <label>
          Themed Event?
          <input
            type="checkbox"
            name="themed"
            checked={formData.themed}
            onChange={handleChange}
            className="ml-2"
          />
        </label>
        {formData.themed && (
          <p className="text-xs">Include guidelines regarding theme in details section below</p>
        )}
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md p-2"
        />
        <textarea
          name="address"
          placeholder="Event Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md p-2"
        />
        <textarea
          name="details"
          placeholder="Event Details"
          value={formData.details}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add Event
        </button>
      </div>
    </form>
  );
}

export default AddEvent;
