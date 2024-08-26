import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ReadOneVehicle() {
    const { id:Register_Number } = useParams(); // Extract the vehicle ID from the URL parameters
    const navigate = useNavigate();
    
    const [vehicle, setVehicle] = useState(null);
    const [serviceHistory, setServiceHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVehicleData = async () => {
            try {
                const vehicleResponse = await axios.get(`http://localhost:8077/Vehicle/${Register_Number}`);
                setVehicle(vehicleResponse.data);
            } catch (error) {
                console.error('Error fetching the vehicle:', error);
                setError('Error fetching vehicle details.');
            }
        };

        const fetchServiceHistory = async () => {
            try {
                const serviceHistoryResponse = await axios.get(`http://localhost:8077/ServiceHistory/${Register_Number}`);
                setServiceHistory(serviceHistoryResponse.data || []);
            } catch (error) {
                console.error('Error fetching the service history:', error);
                setError('Error fetching service history.');
            }
        };

        const fetchData = async () => {
            setLoading(true);
            await fetchVehicleData();
            await fetchServiceHistory();
            setLoading(false);
        };

        fetchData();
    }, [Register_Number]);

    if (loading) {
        return <div className='p-4 text-center'>Loading...</div>;
    }

    if (error) {
        return <div className='p-4 text-center text-red-500'>{error}</div>;
    }

    if (!vehicle) {
        return <div className='p-4 text-center'>No vehicle found.</div>;
    }

    return (
        <div className='p-4'>
            <h1 className='text-3xl my-8'>Vehicle Details</h1>
            <div className='space-y-4'>
                <div className='flex items-center'>
                    <strong className='w-32'>Customer ID:</strong> {vehicle.cusID}
                </div>
                <div className='flex items-center'>
                    <strong className='w-32'>Image:</strong>
                    {vehicle.image ? (
                        <img 
                            src={vehicle.image} 
                            alt={vehicle.Register_Number} 
                            className='w-40 h-40 object-cover ml-4'
                        />
                    ) : (
                        <span>No Image Available</span>
                    )}
                </div>
                <div className='flex items-center'>
                    <strong className='w-32'>Register Number:</strong> {vehicle.Register_Number}
                </div>
                <div className='flex items-center'>
                    <strong className='w-32'>Make:</strong> {vehicle.Make}
                </div>
                <div className='flex items-center'>
                    <strong className='w-32'>Model:</strong> {vehicle.Model}
                </div>
                <div className='flex items-center'>
                    <strong className='w-32'>Year:</strong> {vehicle.Year}
                </div>
                <div className='flex items-center'>
                    <strong className='w-32'>Engine Details:</strong> {vehicle.Engine_Details}
                </div>
                <div className='flex items-center'>
                    <strong className='w-32'>Transmission Details:</strong> {vehicle.Transmission_Details}
                </div>
                <div className='flex items-center'>
                    <strong className='w-32'>Vehicle Color:</strong> {vehicle.Vehicle_Color}
                </div>
                <div className='flex items-center'>
                    <strong className='w-32'>Vehicle Features:</strong>
                    <ul className="list-disc pl-6">
                        {vehicle.Vehicle_Features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </div>
                <div className='flex items-center'>
                    <strong className='w-32'>Condition Assessment:</strong> {vehicle.Condition_Assessment}
                </div>
                <div className='flex items-center'>
                    <strong className='w-32'>Owner:</strong> {vehicle.Owner}
                </div>

                <h2 className='text-2xl my-8'>Service History</h2>
                {serviceHistory.length > 0 ? (
                    <table className='min-w-full bg-white'>
                        <thead>
                            <tr>
                                <th className='py-2 px-4 border-b border-gray-200'>Service Date</th>
                                <th className='py-2 px-4 border-b border-gray-200'>Service History</th>
                                <th className='py-2 px-4 border-b border-gray-200'>Service Employee</th>
                                <th className='py-2 px-4 border-b border-gray-200'>Service Customer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {serviceHistory.map((service, index) => (
                                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}>
                                    <td className='py-2 px-4 border-b border-gray-200'>{service.Service_Date}</td>
                                    <td className='py-2 px-4 border-b border-gray-200'>{service.Service_History}</td>
                                    <td className='py-2 px-4 border-b border-gray-200'>{service.Allocated_Employee}</td>
                                    <td className='py-2 px-4 border-b border-gray-200'>{service.Customer_Name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className='p-4 text-center'>No service history available for this vehicle.</div>
                )}

                <div className='mt-4 flex gap-2'>
                    <Link 
                        to={`/vehicles/edit/${vehicle._id}`} 
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Edit
                    </Link>
                    <button 
                        onClick={() => navigate(-1)} 
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReadOneVehicle;
