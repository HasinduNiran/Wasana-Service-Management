import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { BsArrowLeft } from 'react-icons/bs';
import backgroundImage from '../../images/cover.jpg';
import bg from '../../images/mee.jpg';

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

    if (loading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto p-6 rounded-lg shadow-lg w-full h-full bg-cover " style={{backgroundImage : `url(${bg})` }}>
            <Link to="/Customer" className="flex items-center text-blue-600 hover:underline mb-6">
                <BsArrowLeft className="mr-2 text-xl" />
                Back to Customer List
            </Link>

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
                                    <div className="flex flex-col pb-3">
                                        <dt className="mb-1 text-gray-500 text-lg">Customer ID</dt>
                                        <dd className="text-lg font-semibold">{customer.cusID || 'N/A'}</dd>
                                    </div>
                                    <div className="flex flex-col py-3">
                                        <dt className="mb-1 text-gray-500 text-lg">First Name</dt>
                                        <dd className="text-lg font-semibold">{customer.firstName || 'N/A'}</dd>
                                    </div>
                                    <div className="flex flex-col py-3">
                                        <dt className="mb-1 text-gray-500 text-lg">Last Name</dt>
                                        <dd className="text-lg font-semibold">{customer.lastName || 'N/A'}</dd>
                                    </div>
                                    <div className="flex flex-col py-3">
                                        <dt className="mb-1 text-gray-500 text-lg">NIC</dt>
                                        <dd className="text-lg font-semibold">{customer.NIC || 'N/A'}</dd>
                                    </div>
                                    <div className="flex flex-col py-3">
                                        <dt className="mb-1 text-gray-500 text-lg">Phone</dt>
                                        <dd className="text-lg font-semibold">{customer.phone || 'N/A'}</dd>
                                    </div>
                                    <div className="flex flex-col py-3">
                                        <dt className="mb-1 text-gray-500 text-lg">Email</dt>
                                        <dd className="text-lg font-semibold">{customer.email || 'N/A'}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='text-gray-200'>No customer information available</div>
            )}

            {/* Booking Information */}
            {booking.length > 0 ? (
                <div className="w-full flex flex-col gap-6 text-gray-100">
                    <h3 className="text-xl font-semibold">Booking Information</h3>
                    <dl className="text-gray-200 divide-y divide-gray-200">
                        {booking.map((book, index) => (
                            <div key={index} className="flex flex-col py-3">
                                <div className="flex flex-col py-3">
                                    <dt className="mb-1 text-gray-500 text-lg">Booking ID</dt>
                                    <dd className="text-lg font-semibold">{book.Booking_Id || 'N/A'}</dd>
                                </div>
                                <div className="flex flex-col py-3">
                                    <dt className="mb-1 text-gray-500 text-lg">Vehicle Type</dt>
                                    <dd className="text-lg font-semibold">{book.Vehicle_Type || 'N/A'}</dd>
                                </div>
                                <div className="flex flex-col py-3">
                                    <dt className="mb-1 text-gray-500 text-lg">Vehicle Number</dt>
                                    <dd className="text-lg font-semibold">{book.Vehicle_Number || 'N/A'}</dd>
                                </div>
                                <div className="flex flex-col py-3">
                                    <dt className="mb-1 text-gray-500 text-lg">Contact Number</dt>
                                    <dd className="text-lg font-semibold">{book.Contact_Number || 'N/A'}</dd>
                                </div>
                                <div className="flex flex-col py-3">
                                    <dt className="mb-1 text-gray-500 text-lg">Email</dt>
                                    <dd className="text-lg font-semibold">{book.Email || 'N/A'}</dd>
                                </div>
                                {book.selectedPackage && (
                                    <div className="flex flex-col py-3">
                                        <dt className="mb-1 text-gray-500 text-lg">Selected Package</dt>
                                        <dd className="text-lg font-semibold">{book.selectedPackage || 'N/A'}</dd>
                                    </div>
                                )}
                                {book.selectedServices && book.selectedServices.length > 0 && (
                                    <div className="flex flex-col py-3">
                                        <dt className="mb-1 text-gray-500 text-lg">Selected Services</dt>
                                        <dd className="text-lg font-semibold">{book.selectedServices.join(', ') || 'N/A'}</dd>
                                    </div>
                                )}
                            </div>
                        ))}
                    </dl>
                </div>
            ) : (
                <div className='text-gray-200'>{bookingError || 'No booking details available'}</div>
            )}

            {/* Vehicle Information */}
            {vehicle.length > 0 ? (
                <div className="w-full flex flex-col gap-6 text-gray-100">
                    <h3 className="text-xl font-semibold">Vehicle Information</h3>
                    <dl className="text-gray-200 divide-y divide-gray-200">
                        {vehicle.map((veh, index) => (
                            <div key={index} className="flex flex-col py-3">
                                <div className="flex flex-col py-3">
                                    <dt className="mb-1 text-gray-100 text-lg">Vehicle ID</dt>
                                    <dd className="text-lg font-semibold">{veh.Register_Number || 'N/A'}</dd>
                                </div>
                                <div className="flex flex-col py-3">
                                    <dt className="mb-1 text-gray-100 text-lg">Model</dt>
                                    <dd className="text-lg font-semibold">{veh.Model || 'N/A'}</dd>
                                </div>
                                <div className="flex flex-col py-3">
                                    <dt className="mb-1 text-gray-100 text-lg">Year</dt>
                                    <dd className="text-lg font-semibold">{veh.Year || 'N/A'}</dd>
                                </div>
                                <div className="flex flex-col py-3">
                                    <dt className="mb-1 text-gray-100 text-lg">License Plate</dt>
                                    <dd className="text-lg font-semibold">{veh.License_Plate || 'N/A'}</dd>
                                </div>
                            </div>
                        ))}
                    </dl>
                </div>
            ) : (
                <div className='text-gray-200'>No vehicle details available</div>
            )}

            {/* Service History */}
            {serviceHistory.length > 0 ? (
                <div className="w-full flex flex-col gap-6 text-gray-100">
                    <h3 className="text-xl font-semibold">Service History</h3>
                    {serviceHistory.map((service, index) => (
                        <div key={index} className="flex flex-col py-3">
                            <div className="flex flex-col py-3">
                                <dt className="mb-1 text-gray-100 text-lg">Service Date</dt>
                                <dd className="text-lg font-semibold">{new Date(service.Service_Date).toLocaleDateString() || 'N/A'}</dd>
                            </div>
                            <div className="flex flex-col py-3">
                                <dt className="mb-1 text-gray-100 text-lg">Service Details</dt>
                                <dd className="text-lg font-semibold">{service.Service_Details || 'N/A'}</dd>
                            </div>
                            <div className="flex flex-col py-3">
                                <dt className="mb-1 text-gray-100 text-lg">Service Employee</dt>
                                <dd className="text-lg font-semibold">{service.Allocated_Employee || 'N/A'}</dd>
                            </div>
                            <div className="flex flex-col py-3">
                                <dt className="mb-1 text-gray-100 text-lg">Service Customer</dt>
                                <dd className="text-lg font-semibold">{service.Customer_Name || 'N/A'}</dd>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='text-gray-200'>{serviceHistoryError || 'No service history available'}</div>
            )}
        </div>
    );
};

export default ReadOneCustomer;
