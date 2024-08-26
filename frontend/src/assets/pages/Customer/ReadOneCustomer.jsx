import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { BsArrowLeft } from 'react-icons/bs';

const ReadOneCustomer = () => {
    const { cusID } = useParams();
    const [customer, setCustomer] = useState(null);
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const customerResponse = await axios.get(`http://localhost:8077/Customer/${cusID}`);
                setCustomer(customerResponse.data);
                
                const bookingResponse = await axios.get(`http://localhost:8077/Booking/${cusID}`);
                setBooking(bookingResponse.data || null);
                
                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch data');
                setLoading(false);
            }
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
                                <span className="info-label">Booking ID:</span> {booking.Booking_Id}
                            </p>
                            {/* <p>
                                <span className="info-label">Booking Date:</span> {new Date(booking.Booking_Date).toLocaleDateString()}
                            </p> */}
                            <p>
                                <span className="info-label">Vehicle Type:</span> {booking.Vehicle_Type}
                            </p>
                            <p>
                                <span className="info-label">Vehicle Number:</span> {booking.Vehicle_Number}
                            </p>
                            <p>
                                <span className="info-label">Contact Number:</span> {booking.Contact_Number}
                            </p>
                            <p>
                                <span className="info-label">Email:</span> {booking.Email}
                            </p>
                            {booking.selectedPackage && (
                                <p>
                                    <span className="info-label">Selected Package:</span> {booking.selectedPackage}
                                </p>
                            )}
                            {booking.selectedServices && booking.selectedServices.length > 0 && (
                                <p>
                                    <span className="info-label">Selected Services:</span> {booking.selectedServices.join(', ')}
                                </p>
                            )}
                        </div>
                    ) : (
                        <div>No booking found</div>
                    )}
                </div>
            ) : (
                <div>No customer found</div>
            )}
        </div>
    );
};

export default ReadOneCustomer;
