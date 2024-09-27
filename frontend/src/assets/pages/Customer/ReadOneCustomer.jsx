import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { BsArrowLeft } from 'react-icons/bs';
import backgroundImage from '../../images/cover.jpg';
import bg from '../../images/mee.jpg';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ReadOneCustomer = () => {
    const { id: cusID } = useParams();
    const [customer, setCustomer] = useState(null);
    const [booking, setBooking] = useState([]);
    const [serviceHistory, setServiceHistory] = useState([]);
    const [vehicle, setVehicle] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookingError, setBookingError] = useState(null);
    const [serviceHistoryError, setServiceHistoryError] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [showAllVehicles, setShowAllVehicles] = useState(false);
    const [showAllServices, setShowAllServices] = useState(false);

    const visibleServices = showAllServices ? serviceHistory : serviceHistory.slice(0, 4);
    const visibleVehicles = showAllVehicles ? vehicle : vehicle.slice(0, 4);
    const visibleBookings = showAll ? booking : booking.slice(0, 4);

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await axios.get(`http://localhost:8077/Customer/${cusID}`);
                setCustomer(response.data);
            } catch (error) {
                console.error('Error fetching customer details:', error);
                setError('Error fetching customer details.');
            }
        };

        const fetchBookingData = async () => {
            try {
                const response = await axios.get(`http://localhost:8077/Booking/${cusID}`);
                setBooking(response.data);
            } catch (error) {
                console.error('Error fetching booking details:', error);
                setBookingError('Booking data not available.');
            }
        };

        const fetchServiceHistoryData = async () => {
            try {
                const response = await axios.get(`http://localhost:8077/ServiceHistory/${cusID}`);
                setServiceHistory(response.data || []);
            } catch (error) {
                console.error('Error fetching service history:', error);
                setServiceHistoryError('Service history not available.');
            }
        };

        const fetchVehicleData = async () => {
            try {
                const response = await axios.get(`http://localhost:8077/Vehicle/${cusID}`);
                setVehicle(response.data);
            } catch (error) {
                console.error('Error fetching vehicle details:', error);
                setError('Error fetching vehicle details.');
            }
        };

        const fetchData = async () => {
            setLoading(true);
            try {
                await Promise.all([
                    fetchCustomerData(),
                    fetchBookingData(),
                    fetchServiceHistoryData(),
                    fetchVehicleData()
                ]);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError('An error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [cusID]);

    // Function to generate Service History Report PDF
    const generateServiceHistoryReport = () => {
        const doc = new jsPDF();
        doc.text("Service History Report", 14, 16);

        const tableData = serviceHistory.map((service, index) => [
            index + 1,
            new Date(service.Service_Date).toLocaleDateString(),
            service.Service_Details,
            service.Allocated_Employee,
            service.Customer_Name
        ]);

        doc.autoTable({
            head: [["No", "Service Date", "Service Details", "Allocated Employee", "Customer Name"]],
            body: tableData,
            startY: 30,
            margin: { horizontal: 10 },
            styles: { fontSize: 10 },
        });

        doc.save("service_history_report.pdf");
    };

    if (loading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto p-6 rounded-lg shadow-lg w-full h-full bg-cover " style={{ backgroundImage: `url(${bg})` }}>
            <h2 className="text-2xl font-bold text-gray-200 mb-4">Customer Details</h2>

            {customer ? (
                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-100 mb-2">Customer Information</h3>

                    {/* Cover Photo Section */}
                    <div className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem]" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
                        <div className="w-full h-full bg-cover" />
                    </div>

                    <div className="sm:w-[80%] xs:w-[90%] mx-auto flex">
                        <img src={customer.image} alt="Customer" className="rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-blue-500 relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem]" />
                    </div>

                    {/* Customer Information */}
                    <div className="w-full flex flex-col gap-6 text-gray-100">
                        <div className="w-full flex sm:flex-row xs:flex-col gap-4">
                            <div className="w-full">
                                <dl className="text-gray-200 divide-y divide-gray-200">
                                    {/* Customer details */}
                                    <div className="flex flex-col pb-3">
                                        <dt className="mb-1 text-gray-500 text-lg">Customer ID</dt>
                                        <dd className="text-lg font-semibold">{customer.cusID || 'N/A'}</dd>
                                    </div>
                                    {/* Other details */}
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='text-gray-200'>No customer information available</div>
            )}

            {/* Button to download service history report */}
            <div className="mb-6">
                <button
                    onClick={generateServiceHistoryReport}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Download Service History Report
                </button>
            </div>

            {booking.length > 0 ? (
                <div className="w-full flex flex-col gap-6 text-gray-100">
                    <h3 className="text-xl font-semibold">Booking Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {visibleBookings.map((book, index) => (
                            <div
                                key={index}
                                className="bg-gray-900 p-4 rounded-md shadow-md"
                            >
                                <dl className="text-gray-200 space-y-2">
                                    <div>
                                        <dt className="text-gray-500 text-sm">Booking ID</dt>
                                        <dd className="text-sm font-medium">{book.Booking_Id || 'N/A'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-gray-500 text-sm">Vehicle Type</dt>
                                        <dd className="text-sm font-medium">{book.Vehicle_Type || 'N/A'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-gray-500 text-sm">Vehicle Number</dt>
                                        <dd className="text-sm font-medium">{book.Vehicle_Number || 'N/A'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-gray-500 text-sm">Contact Number</dt>
                                        <dd className="text-sm font-medium">{book.Contact_Number || 'N/A'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-gray-500 text-sm">Email</dt>
                                        <dd className="text-sm font-medium">{book.Email || 'N/A'}</dd>
                                    </div>
                                    {book.selectedPackage && (
                                        <div>
                                            <dt className="text-gray-500 text-sm">Selected Package</dt>
                                            <dd className="text-sm font-medium">{book.selectedPackage || 'N/A'}</dd>
                                        </div>
                                    )}
                                    {book.selectedServices && book.selectedServices.length > 0 && (
                                        <div>
                                            <dt className="text-gray-500 text-sm">Selected Services</dt>
                                            <dd className="text-sm font-medium">
                                                {book.selectedServices.join(', ') || 'N/A'}
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                            </div>
                        ))}
                    </div>
                    {!showAll && booking.length > 4 && (
                        <button
                            onClick={() => setShowAll(true)}
                            className="mt-4 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded max-w-20"
                        >
                            See More...
                        </button>
                    )}
                </div>
            ) : (
                <div className="text-gray-200">{bookingError || 'No booking details available'}</div>
            )}




            {/* Vehicle Information */}
            {vehicle.length > 0 ? (
                <div className="w-full flex flex-col gap-6 text-gray-100">
                    <h3 className="text-xl font-semibold">Vehicle Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {visibleVehicles.map((veh, index) => (
                            <div
                                key={index}
                                className="bg-gray-800 p-4 rounded-md shadow-md"
                            >
                                <dl className="text-gray-200 space-y-2">
                                    <div>
                                        <dt className="text-gray-500 text-sm">Vehicle ID</dt>
                                        <dd className="text-sm font-medium">{veh.Register_Number || 'N/A'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-gray-500 text-sm">Model</dt>
                                        <dd className="text-sm font-medium">{veh.Model || 'N/A'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-gray-500 text-sm">Year</dt>
                                        <dd className="text-sm font-medium">{veh.Year || 'N/A'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-gray-500 text-sm">License Plate</dt>
                                        <dd className="text-sm font-medium">{veh.License_Plate || 'N/A'}</dd>
                                    </div>
                                </dl>
                            </div>
                        ))}
                    </div>

                    {!showAllVehicles && vehicle.length > 4 && (
                        <button
                            onClick={() => setShowAllVehicles(true)}
                            className="mt-4 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded"
                        >
                            See More...
                        </button>
                    )}
                </div>
            ) : (
                <div className="text-gray-200">No vehicle details available</div>
            )}


            {/* Service History */}
            {serviceHistory.length > 0 ? (
                <div className="w-full flex flex-col gap-6 text-gray-100">
                    <h3 className="text-xl font-semibold">Service History</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {visibleServices.map((service, index) => (
                            <div
                                key={index}
                                className="bg-gray-800 p-4 rounded-md shadow-md"
                            >
                                <dl className="text-gray-200 space-y-2">
                                    <div>
                                        <dt className="text-gray-500 text-sm">Service Date</dt>
                                        <dd className="text-sm font-medium">
                                            {new Date(service.Service_Date).toLocaleDateString() || 'N/A'}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-gray-500 text-sm">Service Details</dt>
                                        <dd className="text-sm font-medium">{service.Service_Details || 'N/A'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-gray-500 text-sm">Service Employee</dt>
                                        <dd className="text-sm font-medium">{service.Allocated_Employee || 'N/A'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-gray-500 text-sm">Service Customer</dt>
                                        <dd className="text-sm font-medium">{service.Customer_Name || 'N/A'}</dd>
                                    </div>
                                </dl>
                            </div>
                        ))}
                    </div>

                    {!showAllServices && serviceHistory.length > 4 && (
                        <button
                            onClick={() => setShowAllServices(true)}
                            className="mt-4 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded max-w-20"
                        >
                            See More...
                        </button>
                    )}
                </div>
            ) : (
                <div className="text-gray-200">{serviceHistoryError || 'No service history available'}</div>
            )}

        </div>
    );
};

export default ReadOneCustomer;
