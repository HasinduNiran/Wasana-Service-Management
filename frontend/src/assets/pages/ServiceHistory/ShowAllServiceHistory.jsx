import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';

function ShowAllServiceHistory() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:8077/ServiceHistory');
                
                if (Array.isArray(response.data)) {
                    setServices(response.data); // Ensure the response is an array
                } else {
                    throw new Error('Data format error');
                }
            } catch (err) {
                setError('Error fetching service history.');
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service history?')) {
            try {
                await axios.delete(`http://localhost:8077/ServiceHistory/${id}`);
                setServices(services.filter(service => service._id !== id));
            } catch (err) {
                setError('Error deleting service history.');
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!Array.isArray(services)) return <div>Error: Unexpected data format</div>;

    return (
        <div className='p-4'>
            <h1 className='text-3xl my-8'>Service History</h1>
            <table className='min-w-full divide-y divide-gray-200'>
                <thead>
                    <tr>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Customer ID</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Customer Name</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Customer Email</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Allocated Employee</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Vehicle Number</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Service History</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Service Date</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Mileage</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Package</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Selected Services</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Booking ID</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Next Service Date</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                    {services.map((service) => (
                        <tr key={service._id}>
                            <td className='px-6 py-4 whitespace-nowrap'>{service.cusID}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{service.Customer_Name}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{service.Customer_Email}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{service.Allocated_Employee}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{service.Vehicle_Number}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{service.Service_History}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{service.Service_Date}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{service.Milage}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{service.Package}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{service.selectedServices.join(', ')}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{service.Booking_Id}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{service.nextService}</td>
                            <td className='px-6 py-4 whitespace-nowrap flex justify-center gap-x-4'>
                                <Link to={`/serviceHistory/get/${service._id}`}>
                                    <BsInfoCircle className="text-2xl text-green-800" />
                                </Link>
                                <Link to={`/serviceHistory/edit/${service._id}`}>
                                    <AiOutlineEdit className="text-2xl text-yellow-600" />
                                </Link>
                                <button onClick={() => handleDelete(service._id)}>
                                    <MdOutlineDelete className="text-2xl text-red-600" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ShowAllServiceHistory;
