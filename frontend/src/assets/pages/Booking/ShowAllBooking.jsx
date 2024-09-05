import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // For autoTable functionality

const ShowAllBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const componentRef = useRef();

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8077/Booking')
            .then((response) => {
                setBookings(response.data);
                setFilteredBookings(response.data); // Initialize filtered bookings
                setLoading(false);
            })
            .catch((error) => {
                console.error("There was an error fetching the bookings!", error);
                setLoading(false);
            });
    }, []);

    const handleSearch = () => {
        const filtered = bookings.filter((booking) =>
            booking.Booking_Id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.Customer_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.Vehicle_Number.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.Vehicle_Type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.Contact_Number.includes(searchQuery.toLowerCase()) ||
            booking.selectedPackage.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.selectedServices.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setFilteredBookings(filtered);
    };

    useEffect(() => {
        handleSearch();
    }, [searchQuery]);

    const generateBookingPDF = (bookings) => {
        const doc = new jsPDF(); // Initialize jsPDF document
        const tableColumn = [
            "Booking ID", "Booking Date", "Customer Name", "Vehicle Type", "Vehicle Number",
            "Contact Number", "Email", "Selected Package", "Selected Services"
        ];
        const tableRows = [];

        bookings.forEach((booking) => {
            const data = [
                booking.Booking_Id,
                new Date(booking.Booking_Date).toLocaleDateString(),
                booking.Customer_Name,
                booking.Vehicle_Type,
                booking.Vehicle_Number,
                booking.Contact_Number,
                booking.Email,
                booking.selectedPackage,
                booking.selectedServices.join(", ")
            ];
            tableRows.push(data);
        });

        const date = new Date().toLocaleDateString();

        doc.setFontSize(28).setTextColor("red").text("Booking Report", 60, 15);
        doc.setFontSize(20).setTextColor(0, 0, 0).text("Details", 65, 25);
        doc.setFontSize(15).setTextColor(100, 100, 100).text(`Date: ${date}`, 65, 35);
        
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 50,
            styles: { fontSize: 9 },
            headStyles: {
                fillColor: [31, 41, 55],
                textColor: [255, 255, 255],
                fontStyle: "bold",
            },
        });

        doc.save(`Booking-Report_${date}.pdf`);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this booking?")) {
            try {
                await axios.delete(`http://localhost:8077/Booking/${id}`);
                setBookings(bookings.filter((booking) => booking._id !== id));
                setFilteredBookings(filteredBookings.filter((booking) => booking._id !== id));
                alert("Booking deleted successfully!");
            } catch (error) {
                console.error("There was an error deleting the booking!", error);
                alert("Failed to delete booking. Please try again.");
            }
        }
    };

    return (
        <div className="container" ref={componentRef}>
            <style>{`
                /* Style omitted for brevity */
            `}</style>
            <h2>All Bookings</h2>
            <div className="mb-4">
                <div className="flex items-center mb-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="form-control"
                        style={{ marginRight: '10px' }}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
                <div className="flex justify-end items-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location.href = '/Booking/create'}>
                        Add Booking
                    </button>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4" onClick={() => generateBookingPDF(filteredBookings)}>
                        Generate Report
                    </button>
                </div>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                filteredBookings.length === 0 ? (
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
                            {filteredBookings.map((booking) => (
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
