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
    <div>
      <h2>All Bookings</h2>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location.href = '/Booking/create'}>
                    Add Booking
                </button>
      {bookings.length === 0 ? (
        <p>No bookings available.</p>

        
      ) : (
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Booking Date</th>
              <th>Customer Name</th>
              <th>Vehicle Type</th>
              <th>Vehicle Number</th>
              <th>Contact Number</th>
              <th>Email</th>
              <th>Selected Package</th>
              <th>Selected Services</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.Booking_Id}</td>
                <td>{new Date(booking.Booking_Date).toLocaleDateString()}</td>
                <td>{booking.Customer_Name}</td>
                <td>{booking.Vehicle_Type}</td>
                <td>{booking.Vehicle_Number}</td>
                <td>{booking.Contact_Number}</td>
                <td>{booking.Email}</td>
                <td>{booking.selectedPackage}</td>
                <td>{booking.selectedServices.join(", ")}</td>
                <td>
                  <Link to={`edit/${booking._id}`}>Edit</Link>
                  {" | "}
                  <button onClick={() => handleDelete(booking._id)}>
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
