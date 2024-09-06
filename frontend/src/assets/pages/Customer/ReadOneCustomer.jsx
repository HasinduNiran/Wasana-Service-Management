import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { BsArrowLeft } from 'react-icons/bs';

const ReadOneCustomer = () => {
    const { id: cusID } = useParams();
    const [customer, setCustomer] = useState(null);
    const [booking, setBooking] = useState([]);
    const [serviceHistory, setServiceHistory] = useState([]);
    const [vehicle, setVehicle] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookingError, setBookingError] = useState(null); // Track booking errors separately
    const [serviceHistoryError, setServiceHistoryError] = useState(null); // Track service history errors separately

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const customerResponse = await axios.get(`http://localhost:8077/Customer/${cusID}`);
                setCustomer(customerResponse.data);
            } catch (error) {
                console.error('Error fetching customer details:', error);
                setError('Error fetching customer details.');
            }
        };

        const fetchBookingData = async () => {
            try {
                const bookingResponse = await axios.get(`http://localhost:8077/Booking/${cusID}`);
                setBooking(bookingResponse.data);
            } catch (error) {
                console.error('Error fetching booking details:', error);
                setBookingError('Booking data not available.'); // Handle booking error separately
            }
        };

        const fetchServiceHistoryData = async () => {
            try {
                const serviceHistoryResponse = await axios.get(`http://localhost:8077/ServiceHistory/${cusID}`);
                setServiceHistory(serviceHistoryResponse.data || []);
            } catch (error) {
                console.error('Error fetching service history:', error);
                setServiceHistoryError('Service history not available.'); // Handle service history error separately
            }
        };

        const fetchVehicleData = async () => {
            try {
                const vehicleResponse = await axios.get(`http://localhost:8077/Vehicle/${cusID}`);
                setVehicle(vehicleResponse.data);
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
            }
            setLoading(false);
        };

        fetchData();
    }, [cusID]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container">
            <style>{`
                .container {
                    max-width: 600px;
                    margin: 20px auto;
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

                p {
                    font-size: 16px;
                    line-height: 1.5;
                    margin: 10px 0;
                }

                .back-button {
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
                    text-decoration: none;
                    color: #007bff;
                }

                .back-button:hover {
                    text-decoration: underline;
                }

                .icon {
                    margin-right: 8px;
                }

                .info-label {
                    font-weight: bold;
                }

                .section {
                    margin-bottom: 20px;
                }

                .section h3 {
                    margin-bottom: 10px;
                }

                .service-item {
                    margin-bottom: 15px;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }
            `}</style>

            <Link to="/Customer" className="back-button">
                <BsArrowLeft className="icon" />
                Back to Customer List
            </Link>

            <h2>Customer Details</h2>

            {/* Customer Information */}
            {customer ? (
                <div className="section">
                    <h3>Customer Information</h3>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
                        <img src={customer.image} alt="Vehicle" style={{ maxWidth: '300px', height: '300px', borderRadius: '50%', border: '4px solid red', padding: '10px' }} />
                    </div>
                    <p>
                        <span className="info-label">Customer ID:</span> {customer.cusID || 'N/A'}
                    </p>
                    <p>
                        <span className="info-label">First Name:</span> {customer.firstName || 'N/A'}
                    </p>
                    <p>
                        <span className="info-label">Last Name:</span> {customer.lastName || 'N/A'}
                    </p>
                    <p>
                        <span className="info-label">NIC:</span> {customer.NIC || 'N/A'}
                    </p>
                    <p>
                        <span className="info-label">Phone:</span> {customer.phone || 'N/A'}
                    </p>
                    <p>
                        <span className="info-label">Email:</span> {customer.email || 'N/A'}
                    </p>
                </div>
            ) : (
                <div>No customer information available</div>
            )}

            {/* Booking Information */}
            {booking.length > 0 ? (
                <div className="section">
                    <h3>Booking Information</h3>
                    <p>
                        <span className="info-label">Booking ID:</span> {booking[0].Booking_Id || 'N/A'}
                    </p>
                    <p>
                        <span className="info-label">Vehicle Type:</span> {booking[0].Vehicle_Type || 'N/A'}
                    </p>
                    <p>
                        <span className="info-label">Vehicle Number:</span> {booking[0].Vehicle_Number || 'N/A'}
                    </p>
                    <p>
                        <span className="info-label">Contact Number:</span> {booking[0].Contact_Number || 'N/A'}
                    </p>
                    <p>
                        <span className="info-label">Email:</span> {booking[0].Email || 'N/A'}
                    </p>
                    {booking[0].selectedPackage && (
                        <p>
                            <span className="info-label">Selected Package:</span> {booking[0].selectedPackage || 'N/A'}
                        </p>
                    )}
                    {booking[0].selectedServices && booking[0].selectedServices.length > 0 && (
                        <p>
                            <span className="info-label">Selected Services:</span> {booking[0].selectedServices.join(', ') || 'N/A'}
                        </p>
                    )}
                </div>
            ) : (
                <div>{bookingError || 'No booking details available'}</div>
            )}

            {/* Vehicle Information */}
            {vehicle.length > 0 ? (
                <div className="section">
                    <h3>Vehicle Information</h3>
                    <p>
                        <span className="info-label">Vehicle ID:</span> {vehicle[0].Register_Number || 'N/A'}
                    </p>
                    <p>
                        <span className="info-label">Model:</span> {vehicle[0].Model || 'N/A'}
                    </p>
                    <p>
                        <span className="info-label">Year:</span> {vehicle[0].Year || 'N/A'}
                    </p>
                    <p>
                        <span className="info-label">License Plate:</span> {vehicle[0].License_Plate || 'N/A'}
                    </p>
                </div>
            ) : (
                <div>No vehicle details available</div>
            )}

            {/* Service History */}
            {serviceHistory.length > 0 ? (
                <div className="section">
                    <h3>Service History</h3>
                    {serviceHistory.map((service, index) => (
                        <div key={index} className="service-item">
                            <p>
                                <span className="info-label">Service Date:</span> {new Date(service.Service_Date).toLocaleDateString() || 'N/A'}
                            </p>
                            <p>
                                <span className="info-label">Service Details:</span> {service.Service_History || 'N/A'}
                            </p>
                            <p>
                                <span className="info-label">Service Employee:</span> {service.Allocated_Employee || 'N/A'}
                            </p>
                            <p>
                                <span className="info-label">Service Customer:</span> {service.Customer_Name || 'N/A'}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <div>{serviceHistoryError || 'No service history available'}</div>
            )}
        </div>
    );
};

export default ReadOneCustomer
