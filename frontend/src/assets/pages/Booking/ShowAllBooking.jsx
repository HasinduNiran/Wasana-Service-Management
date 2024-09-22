import React, { useState, useEffect } from 'react';
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import Swal from 'sweetalert2';
import CountUp from 'react-countup'; // Added import for CountUp
import jsPDF from 'jspdf'; // Added import for jsPDF
import 'jspdf-autotable'; // Added import for jsPDF autotable
import logo from '../../images/logo.png';

const ShowBooking = () => {
    // State initialization
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(false); // Added darkMode state
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState(""); // Added searchQuery state
    const [isCustomerOpen, setIsCustomerOpen] = useState(false);
    const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);
    const [isCompanyOpen, setIsCompanyOpen] = useState(false);
    
    // Styles for even and odd rows
    const styles = {
        tableRowEven: {
            backgroundColor: '#f9f9f9',
        },
        tableRowOdd: {
            backgroundColor: '#ffffff',
        },
        image: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
        },
        actionIcons: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
        },
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Initialize CountUp on mount for stats
    useEffect(() => {
        const numbers = document.querySelectorAll("[countTo]");

        numbers.forEach((number) => {
            const ID = number.getAttribute("id");
            const value = number.getAttribute("countTo");
            let countUp = new CountUp(ID, value);

            if (number.hasAttribute("data-decimal")) {
                const options = {
                    decimalPlaces: 1,
                };
                countUp = new CountUp(ID, value, options);
            }

            if (!countUp.error) {
                countUp.start();
            } else {
                console.error(countUp.error);
                number.innerHTML = value;
            }
        });
    }, []);

    // Initial fetch of Booking data
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

    // Search functionality
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
            "Contact Number", "Email", "Selected Package", "Selected Services", "Status"
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
                booking.selectedServices.join(", "),
                booking.status // Add status to the PDF report
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

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.put(`http://localhost:8077/Booking/${id}/status`, { status: newStatus });
            setBookings(bookings.map((booking) =>
                booking._id === id ? { ...booking, status: newStatus } : booking
            ));
            setFilteredBookings(filteredBookings.map((booking) =>
                booking._id === id ? { ...booking, status: newStatus } : booking
            ));
        } catch (error) {
            console.error("Error updating status", error);
        }
    };

    return (
        <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            {/* Sidebar */}
            {sidebarOpen && (
                <aside className="w-64 bg-gray-800 text-white flex flex-col">
                    <div className="flex items-center justify-center h-16 bg-gray-800">
                        <img src={logo} alt="logo" style={{ width: '60px', height: '60px' }} />
                    </div>
                    <nav className="flex-1">
                    </nav>
                    <div className="p-3">
                        <button className="w-full flex items-center p-3 bg-gray-800 rounded hover:bg-gray-700">
                            <i className="bx bx-cog text-xl"></i>
                            <span className="ml-4">Settings</span>
                        </button>
                    </div>
                </aside>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Navbar */}
                <header className="flex items-center justify-between bg-white h-16 px-4 shadow">
                    <div className="flex items-center">
                        <i className="bx bx-menu text-xl cursor-pointer" onClick={toggleSidebar}></i>
                        <input
                            type="search"
                            placeholder="Search..."
                            className="ml-4 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button 
                            className="mt-1 ml-3 inline-block px-8 py-2.5 text-white bg-gray-800 text-sm uppercase rounded-full shadow-lg transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg active:translate-y-px active:shadow-md"
                            onClick={toggleDarkMode}
                        >
                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>
                        <button 
                            className="mt-1 ml-3 inline-block px-8 py-2.5 text-white bg-red-500 text-sm uppercase rounded-full shadow-lg transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg active:translate-y-px active:shadow-md"
                            onClick={() => generateBookingPDF(filteredBookings)}
                        >
                            Generate Report
                        </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    </div>
                </header>

                {/* Table Section */}
                <section className="p-4 flex-1 overflow-y-auto">
                    {loading ? (
                        <Spinner />
                    ) : error ? (
                        <p className="text-red-500">Error: {error}</p>
                    ) : (
                        <table className="w-full text-left border-collapse mt-6 shadow-md bg-white">
                            <thead>
                                <tr className="bg-gray-800 text-white">
                                    <th className="py-2 px-4">ID</th>
                                    <th className="py-2 px-4">Date</th>
                                    <th className="py-2 px-4">Customer</th>
                                    <th className="py-2 px-4">Vehicle Type</th>
                                    <th className="py-2 px-4">Vehicle Number</th>
                                    <th className="py-2 px-4">Contact Number</th>
                                    <th className="py-2 px-4">Email</th>
                                    <th className="py-2 px-4">Package</th>
                                    <th className="py-2 px-4">Services</th>
                                    <th className="py-2 px-4">Status</th>
                                    <th className="py-2 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBookings.length > 0 ? (
                                    filteredBookings.map((booking, index) => (
                                        <tr
                                            key={booking._id}
                                            style={
                                                index % 2 === 0
                                                    ? styles.tableRowEven
                                                    : styles.tableRowOdd
                                            }
                                        >
                                            <td className="py-2 px-4">{booking.Booking_Id}</td>
                                            <td className="py-2 px-4">{new Date(booking.Booking_Date).toLocaleDateString()}</td>
                                            <td className="py-2 px-4">{booking.Customer_Name}</td>
                                            <td className="py-2 px-4">{booking.Vehicle_Type}</td>
                                            <td className="py-2 px-4">{booking.Vehicle_Number}</td>
                                            <td className="py-2 px-4">{booking.Contact_Number}</td>
                                            <td className="py-2 px-4">{booking.Email}</td>
                                            <td className="py-2 px-4">{booking.selectedPackage}</td>
                                            <td className="py-2 px-4">{booking.selectedServices.join(', ')}</td>
                                            <td className="py-2 px-4">
                                                <select
                                                    value={booking.status}
                                                    onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Confirmed">Confirmed</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                            <td className="py-2 px-4">
                                                <div style={styles.actionIcons}>
                                                    <Link to={`/editBooking/${booking._id}`}>
                                                        <AiOutlineEdit className="text-blue-500" />
                                                    </Link>
                                                    <MdOutlineDelete
                                                        className="text-red-500 cursor-pointer"
                                                        onClick={() => handleDelete(booking._id)}
                                                    />
                                                    <Link to={`/infoBooking/${booking._id}`}>
                                                        <BsInfoCircle className="text-green-500" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="10" className="py-4 px-4 text-center text-red-500">
                                            No bookings found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </section>
            </div>
        </div>
    );
};

export default ShowBooking;
