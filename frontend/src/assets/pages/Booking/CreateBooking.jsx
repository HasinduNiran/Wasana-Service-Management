import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBooking = () => {
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
      await axios.post("http://localhost:8077/Booking", booking);
      alert("Booking created successfully!");
      navigate("/Booking"); // Redirect to the bookings list after creation
    } catch (error) {
      console.error("There was an error creating the booking!", error);
      alert("Failed to create booking. Please try again.");
    }
  };

  return (
    <div className="container">
      <style>{`
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }

        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
          color: #333;
          text-align: center;
          margin-bottom: 20px;
        }

        form {
          display: flex;
          flex-direction: column;
        }

        label {
          margin-bottom: 5px;
          color: #555;
          font-weight: bold;
        }

        input[type="text"],
        input[type="date"],
        input[type="email"] {
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 16px;
          width: 100%;
        }

        button {
          background-color: #4CAF50;
          color: white;
          padding: 10px 20px;
          margin-top: 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          font-size: 16px;
        }

        button:hover {
          background-color: #45a049;
        }

        @media screen and (max-width: 768px) {
          .container {
            padding: 10px;
          }

          input[type="text"],
          input[type="date"],
          input[type="email"] {
            padding: 8px;
            font-size: 14px;
          }

          button {
            padding: 8px 16px;
            font-size: 14px;
          }
        }
      `}</style>
      <h2>Create New Booking</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Booking Date:</label>
          <input
            type="date"
            name="Booking_Date"
            value={booking.Booking_Date}
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
        <button type="submit">Create Booking</button>
      </form>
    </div>
  );
};

export default CreateBooking;
