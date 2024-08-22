import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';

const ShowAllBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8077/Booking')
            .then((response) => {
                setBookings(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("There was an error fetching the bookings!", error);
                setLoading(false);
            });
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
        <div className="container">
            <style>{`
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                }

                h2 {
                    color: #333;
                    text-align: center;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                }

                table, th, td {
                    border: 1px solid #ddd;
                }

                th, td {
                    padding: 12px;
                    text-align: left;
                }

                th {
                    background-color: #f2f2f2;
                    font-weight: bold;
                }

                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }

                button {
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px 20px;
                    margin: 10px 0;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                button:hover {
                    background-color: #45a049;
                }

                .text-center {
                    text-align: center;
                }

                .flex {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .gap-x-4 {
                    gap: 16px;
                }

                @media screen and (max-width: 768px) {
                    table {
                        font-size: 14px;
                    }

                    th, td {
                        padding: 8px;
                    }

                    button {
                        padding: 8px 16px;
                    }
                }
            `}</style>
            <h2>All Bookings</h2>
            <button onClick={() => window.location.href = '/Booking/create'}>
                Add Booking
            </button>
            {loading ? (
                <p>Loading...</p>
            ) : (
                bookings.length === 0 ? (
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
                                    <td className="text-center">
                                        <div className="flex gap-x-4">
                                            <Link to={`/Booking/${booking._id}`}>
                                                <BsInfoCircle className="text-2xl text-green-800" />
                                            </Link>
                                            <Link to={`/Booking/edit/${booking._id}`}>
                                                <AiOutlineEdit className="text-2xl text-yellow-600" />
                                            </Link>
                                            <button onClick={() => handleDelete(booking._id)}>
                                                <MdOutlineDelete className="text-2xl text-red-600" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            )}
        </div>
    );
};

export default ShowAllBooking;
