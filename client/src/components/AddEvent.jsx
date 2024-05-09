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
    <form onSubmit={handleSubmit} className="w-1/2">
      <h2 className="text-center text-4xl font-semibold py-12">Add An Event</h2>
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
           <textarea
          name="details"
          placeholder="Event Details (i.e. guidelines regarding theme)"
          value={formData.details}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md p-2"
        />
          )}
        <button
          type="submit"
          className="px-5 py-2.5 font-medium bg-purple-50 hover:bg-purple-100 hover:text-purple-600 text-purple-500 rounded-lg self-center w-fit"
        >
          Add Event
        </button>
      </div>
    </form>
  );
}

export default AddEvent;
