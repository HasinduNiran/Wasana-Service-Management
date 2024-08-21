import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ReadOneBooking = () => {
  const { id } = useParams(); // Get the booking ID from the URL
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`http://localhost:8077/Booking/${id}`);
        setBooking(response.data);
      } catch (error) {
        console.error("There was an error fetching the booking!", error);
      }
    };

    fetchBooking();
  }, [id]);

  if (!booking) {
    return <p>Loading booking details...</p>;
  }

  return (
    <div>
      <h2>Booking Details</h2>
      <p><strong>Booking ID:</strong> {booking.Booking_Id}</p>
      <p><strong>Booking Date:</strong> {new Date(booking.Booking_Date).toLocaleDateString()}</p>
      <p><strong>Customer Name:</strong> {booking.Customer_Name}</p>
      <p><strong>Vehicle Type:</strong> {booking.Vehicle_Type}</p>
      <p><strong>Vehicle Number:</strong> {booking.Vehicle_Number}</p>
      <p><strong>Contact Number:</strong> {booking.Contact_Number}</p>
      <p><strong>Email:</strong> {booking.Email}</p>
      <p><strong>Selected Package:</strong> {booking.selectedPackage}</p>
      <p><strong>Selected Services:</strong> {booking.selectedServices.join(", ")}</p>
    </div>
  );
};

export default ReadOneBooking;
