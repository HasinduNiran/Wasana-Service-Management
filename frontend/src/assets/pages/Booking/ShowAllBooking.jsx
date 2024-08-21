import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ShowAllBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:8077/Booking");
        setBookings(response.data);
      } catch (error) {
        console.error("There was an error fetching the bookings!", error);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await axios.delete(`http://localhost:8077/Booking/${id}`);
        setBookings(bookings.filter((booking) => booking._id !== id));
        alert("Booking deleted successfully!");
      } catch (error) {
        console.error("There was an error deleting the booking!", error);
        alert("Failed to delete booking. Please try again.");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Bookings</h2>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => (window.location.href = '/Booking/create')}
      >
        Add Booking
      </button>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings available.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Booking ID</th>
              <th className="py-2 px-4 border-b">Booking Date</th>
              <th className="py-2 px-4 border-b">Customer Name</th>
              <th className="py-2 px-4 border-b">Vehicle Type</th>
              <th className="py-2 px-4 border-b">Vehicle Number</th>
              <th className="py-2 px-4 border-b">Contact Number</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Selected Package</th>
              <th className="py-2 px-4 border-b">Selected Services</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="text-center">
                <td className="py-2 px-4 border-b">{booking.Booking_Id}</td>
                <td className="py-2 px-4 border-b">{new Date(booking.Booking_Date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{booking.Customer_Name}</td>
                <td className="py-2 px-4 border-b">{booking.Vehicle_Type}</td>
                <td className="py-2 px-4 border-b">{booking.Vehicle_Number}</td>
                <td className="py-2 px-4 border-b">{booking.Contact_Number}</td>
                <td className="py-2 px-4 border-b">{booking.Email}</td>
                <td className="py-2 px-4 border-b">{booking.selectedPackage}</td>
                <td className="py-2 px-4 border-b">{booking.selectedServices.join(", ")}</td>
                <td className="py-2 px-4 border-b">
                  <Link to={`/Booking/edit/${booking._id}`} className="text-blue-500 hover:text-blue-700 mr-2">
                    Edit
                  </Link>
                  |
                  <Link to={`/Booking/get/${booking._id}`} className="text-blue-500 hover:text-blue-700 mr-2">
                    Readone
                  </Link>
                  |
                  <button
                    className="text-red-500 hover:text-red-700 ml-2"
                    onClick={() => handleDelete(booking._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowAllBooking;
