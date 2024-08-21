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
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Booking Details</h2>
      <div className="space-y-4">
        <p><strong className="text-gray-700">Booking ID:</strong> {booking.Booking_Id}</p>
        <p><strong className="text-gray-700">Booking Date:</strong> {new Date(booking.Booking_Date).toLocaleDateString()}</p>
        <p><strong className="text-gray-700">Customer Name:</strong> {booking.Customer_Name}</p>
        <p><strong className="text-gray-700">Vehicle Type:</strong> {booking.Vehicle_Type}</p>
        <p><strong className="text-gray-700">Vehicle Number:</strong> {booking.Vehicle_Number}</p>
        <p><strong className="text-gray-700">Contact Number:</strong> {booking.Contact_Number}</p>
        <p><strong className="text-gray-700">Email:</strong> {booking.Email}</p>
        <p><strong className="text-gray-700">Selected Package:</strong> {booking.selectedPackage}</p>
        <p><strong className="text-gray-700">Selected Services:</strong> {booking.selectedServices.join(", ")}</p>
      </div>
    </div>
  );
};

export default ReadOneBooking;
