import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ReadOneCustomer = () => {
  const { id :cusID } = useParams(); // Ensure `id` is destructured correctly from `useParams`
  const [customer, setCustomer] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomerAndBookings = async () => {
      if (!id) {
        setError('Customer ID is missing');
        setLoading(false);
        return;
      }

      try {
        // Fetch customer details
        const customerResponse = await axios.get(`http://localhost:8077/customer/${cusID}`);
        setCustomer(customerResponse.data);

        // Fetch bookings for the customer using cusID
        const bookingsResponse = await axios.get(`http://localhost:8077/booking/${cusID}`);
        setBookings(bookingsResponse.data);
      } catch (error) {
        setError('Error fetching customer or booking details');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerAndBookings(); // Ensure this function is called within the effect hook
  }, [id]); // Ensure `id` is included in the dependency array

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h1>Customer Details</h1>
      {customer ? (
        <div>
          <p><strong>Username:</strong> {customer.cusID}</p>
          <p><strong>First Name:</strong> {customer.firstName}</p>
          <p><strong>Last Name:</strong> {customer.lastName}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
          <p><strong>NIC:</strong> {customer.NIC}</p>
          <p><strong>Email:</strong> {customer.email}</p>
        </div>
      ) : (
        <p>No customer details available.</p>
      )}

      <h2>Booking Details</h2>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking._id}>
            <p><strong>Booking ID:</strong> {booking.Booking_Id}</p>
            <p><strong>Booking Date:</strong> {new Date(booking.Booking_Date).toLocaleDateString()}</p>
            <p><strong>Vehicle Type:</strong> {booking.Vehicle_Type}</p>
            <p><strong>Vehicle Number:</strong> {booking.Vehicle_Number}</p>
            <p><strong>Contact Number:</strong> {booking.Contact_Number}</p>
            <p><strong>Email:</strong> {booking.Email}</p>
            <p><strong>Selected Package:</strong> {booking.selectedPackage}</p>
            <p><strong>Selected Services:</strong> {booking.selectedServices.join(', ')}</p>
          </div>
        ))
      ) : (
        <p>No bookings available for this customer.</p>
      )}
    </div>
  );
}

export default ReadOneCustomer;
