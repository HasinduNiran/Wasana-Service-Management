import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ReadoneShowHistory() {
    const { id } = useParams(); // Get the service history ID from the URL
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await axios.get(`http://localhost:8077/ServiceHistory/${id}`);
                setService(response.data);
            } catch (err) {
                console.error('Error fetching service history:', err);
                setError('Error fetching service history.');
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!service) return <div>No service history found.</div>;

    return (
        <div className='p-4'>
            <h1 className='text-3xl my-8'>Service History Details</h1>
            <div className='space-y-4'>
                <div>
                    <span className='font-semibold'>Customer ID:</span> {service.cusID}
                </div>
                <div>
                    <span className='font-semibold'>Customer Name:</span> {service.Customer_Name}
                </div>
                <div>
                    <span className='font-semibold'>Customer Email:</span> {service.Customer_Email}
                </div>
                <div>
                    <span className='font-semibold'>Allocated Employee:</span> {service.Allocated_Employee}
                </div>
                <div>
                    <span className='font-semibold'>Vehicle Number:</span> {service.Vehicle_Number}
                </div>
                <div>
                    <span className='font-semibold'>Service History:</span> {service.Service_History}
                </div>
                <div>
                    <span className='font-semibold'>Service Date:</span> {service.Service_Date}
                </div>
                <div>
                    <span className='font-semibold'>Mileage:</span> {service.Milage}
                </div>
                <div>
                    <span className='font-semibold'>Package:</span> {service.Package || 'N/A'}
                </div>
                <div>
                    <span className='font-semibold'>Selected Services:</span> {service.selectedServices.join(', ')}
                </div>
                <div>
                    <span className='font-semibold'>Booking ID:</span> {service.Booking_Id}
                </div>
                <div>
                    <span className='font-semibold'>Next Service Date:</span> {service.nextService}
                </div>
                <div className='mt-4'>
                    <Link to="/serviceHistory" className='text-blue-500 hover:underline'>Back to Service History</Link>
                </div>
            </div>
        </div>
    );
}

export default ReadoneShowHistory;
