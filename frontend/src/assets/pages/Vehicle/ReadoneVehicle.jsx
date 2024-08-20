import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ReadOneVehicle() {
    const { id } = useParams(); // Extract the vehicle ID from the URL parameters
    const navigate = useNavigate();
    
    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:8077/Vehicle/${id}`) // Fetch the vehicle details by ID
            .then((response) => {
                setVehicle(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching the vehicle:', error);
                setError('Error fetching vehicle details.');
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!vehicle) {
        return <div>No vehicle found.</div>;
    }

    return (
        <div className='p-4'>
            <h1 className='text-3xl my-8'>Vehicle Details</h1>
            <div className='space-y-4'>
                <div>
                    <strong>Customer ID:</strong> {vehicle.cusID}
                </div>
                <div>
                    <strong>Image URL:</strong> <a href={vehicle.image} target="_blank" rel="noopener noreferrer">{vehicle.image}</a>
                </div>
                <div>
                    <strong>Register Number:</strong> {vehicle.Register_Number}
                </div>
                <div>
                    <strong>Make:</strong> {vehicle.Make}
                </div>
                <div>
                    <strong>Model:</strong> {vehicle.Model}
                </div>
                <div>
                    <strong>Year:</strong> {vehicle.Year}
                </div>
                <div>
                    <strong>Engine Details:</strong> {vehicle.Engine_Details}
                </div>
                <div>
                    <strong>Transmission Details:</strong> {vehicle.Transmission_Details}
                </div>
                <div>
                    <strong>Vehicle Color:</strong> {vehicle.Vehicle_Color}
                </div>
                <div>
                    <strong>Vehicle Features:</strong>
                    <ul className="list-disc pl-6">
                        {vehicle.Vehicle_Features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <strong>Condition Assessment:</strong> {vehicle.Condition_Assessment}
                </div>
                <div>
                    <strong>Owner:</strong> {vehicle.Owner}
                </div>
                <div className='mt-4'>
                    <Link 
                        to={`/vehicles/edit/${vehicle._id}`} 
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
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
