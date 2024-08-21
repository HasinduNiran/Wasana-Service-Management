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
      navigate("/bookings"); // Redirect to the bookings list after updating
    } catch (error) {
      console.error("There was an error updating the booking!", error);
      alert("Failed to update booking. Please try again.");
    }
  };

  if (!booking.Booking_Id) {
    return <p>Loading booking details...</p>;
  }

  return (
    <div>
      <h2>Edit Booking</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Booking Date:</label>
          <input
            type="date"
            name="Booking_Date"
            value={new Date(booking.Booking_Date).toISOString().split("T")[0]}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Customer Name:</label>
          <input
            type="text"
            name="Customer_Name"
            value={booking.Customer_Name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Vehicle Type:</label>
          <input
            type="text"
            name="Vehicle_Type"
            value={booking.Vehicle_Type}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Vehicle Number:</label>
          <input
            type="text"
            name="Vehicle_Number"
            value={booking.Vehicle_Number}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contact Number:</label>
          <input
            type="text"
            name="Contact_Number"
            value={booking.Contact_Number}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="Email"
            value={booking.Email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Selected Package:</label>
          <input
            type="text"
            name="selectedPackage"
            value={booking.selectedPackage}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Selected Services:</label>
          <input
            type="text"
            name="selectedServices"
            value={booking.selectedServices.join(", ")}
            onChange={(e) =>
              setBooking({ ...booking, selectedServices: e.target.value.split(",") })
            }
          />
        </div>
        <button type="submit">Update Booking</button>
      </form>
    </div>
  );
};

export default EditBooking;
