import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { BsArrowLeft } from 'react-icons/bs';

const ReadOneCustomer = () => {
    const { id: cusID } = useParams();
    const [customer, setCustomer] = useState(null);
    const [booking, setBooking] = useState([]);
    const [serviceHistory, setServiceHistory] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [vehicle, setVehicle] = useState([]);


    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const customerResponse = await axios.get(`http://localhost:8077/Customer/${cusID}`);
                setCustomer(customerResponse.data);
                console.log(customer);
            } catch (error) {
                console.error('Error fetching customer details:', error);
                setError('Error fetching customer details.');
            }
        };

        const fetchBookingData = async () => {
            try {
                const bookingResponse = await axios.get(`http://localhost:8077/Booking/${cusID}`);
                setBooking(bookingResponse.data);
                console.log(booking);
            } catch (error) {
                console.error('Error fetching booking details:', error);
                setError('Error fetching booking details.');
            }
        };

        const fetchServiceHistoryData = async () => {
            try {
                const serviceHistoryResponse = await axios.get(`http://localhost:8077/ServiceHistory/${cusID}`);
                setServiceHistory(serviceHistoryResponse.data || []);
            } catch (error) {
                console.error('Error fetching service history:', error);
                setError('Error fetching service history.');
            }
        };

        const fetchVehicleData = async () => {
            try {
                const vehicleResponse = await axios.get(`http://localhost:8077/Vehicle/${cusID}`);
                setVehicle(vehicleResponse.data); // Make sure this is correct
            } catch (error) {
                console.error('Error fetching vehicle details:', error);
                setError('Error fetching vehicle details.');
            }
        };
        

        const fetchData = async () => {
            setLoading(true);
            await fetchCustomerData();
            await fetchBookingData();
            await fetchServiceHistoryData();
            await fetchVehicleData();
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

            {customer ? (
                <div>
                    <h2>Customer Details</h2>
                    <div className="section">
                        <h3>Customer Information</h3>
                        <p>
                            <span className="info-label">Customer ID:</span> {customer.cusID}
                        </p>
                        <p>
                            <span className="info-label">First Name:</span> {customer.firstName}
                        </p>
                        <p>
                            <span className="info-label">Last Name:</span> {customer.lastName}
                        </p>
                        <p>
                            <span className="info-label">NIC:</span> {customer.NIC}
                        </p>
                        <p>
                            <span className="info-label">Phone:</span> {customer.phone}
                        </p>
                        <p>
                            <span className="info-label">Email:</span> {customer.email}
                        </p>
                    </div>

                    {booking ? (
                        <div className="section">
                            <h3>Booking Information</h3>
                            <p>
                                <span className="info-label">Booking ID:</span> {booking[0].Booking_Id}
                            </p>
                            <p>
                                <span className="info-label">Vehicle Type:</span> {booking[0].Vehicle_Type}
                            </p>
                            <p>
                                <span className="info-label">Vehicle Number:</span> {booking[0].Vehicle_Number}
                            </p>
                            <p>
                                <span className="info-label">Contact Number:</span> {booking[0].Contact_Number}
                            </p>
                            <p>
                                <span className="info-label">Email:</span> {booking[0].Email}
                            </p>
                            {booking[0].selectedPackage && (
                                <p>
                                    <span className="info-label">Selected Package:</span> {booking[0].selectedPackage}
                                </p>
                            )}
                            {booking[0].selectedServices && booking[0].selectedServices.length > 0 && (
                                <p>
                                    <span className="info-label">Selected Services:</span> {booking[0].selectedServices.join(', ')}
                                </p>
                            )}
                        </div>
                    ) : (
                        <div>No booking found</div>
                    )}

                    {vehicle ? (
                        <div className="section">
                            <h3>Vehicle Information</h3>
                            <p>
                                <span className="info-label">Vehicle ID:</span> {vehicle[0].Register_Number}
                            </p>
                            <p>
                                <span className="info-label">Model:</span> {vehicle[0].Model}
                            </p>
                            <p>
                                <span className="info-label">Year:</span> {vehicle[0].Year}
                            </p>
                            <p>
                                <span className="info-label">License Plate:</span> {vehicle[0].License_Plate}
                            </p>
                        </div>
                    ) : (
                        <div>No vehicle details found</div>
                    )}

                    {serviceHistory.length > 0 ? (
                        <div className="section">
                            <h3>Service History</h3>
                            {serviceHistory.map((service, index) => (
                                <div key={index} className="service-item">
                                    <p>
                                        <span className="info-label">Service Date:</span> {new Date(service.Service_Date).toLocaleDateString()}
                                    </p>
                                    <p>
                                        <span className="info-label">Service Details:</span> {service.Service_History}
                                    </p>
                                    <p>
                                        <span className="info-label">Service Employee:</span> {service.Allocated_Employee}
                                    </p>
                                    <p>
                                        <span className="info-label">Service Customer:</span> {service.Customer_Name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>No service history available</div>
                    )}
                </div>
            ) : (
                <div>No customer found</div>
            )}
        </div>
    );
};

export default ReadOneCustomer;
