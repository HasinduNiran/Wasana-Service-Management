import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditBooking = () => {
  const { id } = useParams(); // Get the booking ID from the URL
  const navigate = useNavigate();
  const [booking, setBooking] = useState({
    Booking_Date: "",
    Customer_Name: "",
    Vehicle_Type: "",
    Vehicle_Number: "",
    Contact_Number: "",
    Email: "",
    selectedPackage: "",
    selectedServices: []
  });

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`http://localhost:8077/Booking/${id}`);
        setBooking(response.data);
      } catch (error) {
        console.error("There was an error fetching the booking details!", error);
      }
    };

    fetchBooking();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking((prevBooking) => ({
      ...prevBooking,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8077/Booking/${id}`, booking);
      alert("Booking updated successfully!");
      navigate("/Booking"); // Redirect to the bookings list after updating
    } catch (error) {
      console.error("There was an error updating the booking!", error);
      alert("Failed to update booking. Please try again.");
    }
  };

  if (!booking.Booking_Id) {
    return <p>Loading booking details...</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Edit Booking</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Booking Date:</label>
          <input
            type="date"
            name="Booking_Date"
            value={new Date(booking.Booking_Date).toISOString().split("T")[0]}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Customer Name:</label>
          <input
            type="text"
            name="Customer_Name"
            value={booking.Customer_Name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Vehicle Type:</label>
          <input
            type="text"
            name="Vehicle_Type"
            value={booking.Vehicle_Type}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Vehicle Number:</label>
          <input
            type="text"
            name="Vehicle_Number"
            value={booking.Vehicle_Number}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Number:</label>
          <input
            type="text"
            name="Contact_Number"
            value={booking.Contact_Number}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            name="Email"
            value={booking.Email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Selected Package:</label>
          <input
            type="text"
            name="selectedPackage"
            value={booking.selectedPackage}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Selected Services:</label>
          <input
            type="text"
            name="selectedServices"
            value={booking.selectedServices.join(", ")}
            onChange={(e) =>
              setBooking({ ...booking, selectedServices: e.target.value.split(",") })
            }
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Update Booking
        </button>
      </form>
    </div>
  );
};

export default EditBooking;
