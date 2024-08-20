import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ShowAllVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8077/Vehicle') // Replace with your actual API endpoint
            .then((response) => {
                setVehicles(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Vehicle List</h1>
                <div className="flex justify-center items-center mt-8">
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                        onClick={() => window.location.href='/vehicles/create'}
                    >
                        Add Vehicle
                    </button>
                </div>
            </div>

            <table className='w-full border-separate border-spacing-2'>
                <thead>
                    <tr>
                        <th className='border px-4 py-2 text-left'>Register Number</th>
                        <th className='border px-4 py-2 text-left'>Make</th>
                        <th className='border px-4 py-2 text-left'>Model</th>
                        <th className='border px-4 py-2 text-left'>Year</th>
                        <th className='border px-4 py-2 text-left'>Engine Details</th>
                        <th className='border px-4 py-2 text-left'>Transmission</th>
                        <th className='border px-4 py-2 text-left'>Color</th>
                        <th className='border px-4 py-2 text-left'>Owner</th>
                        <th className='border px-4 py-2 text-left'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan='9'>Loading...</td></tr>
                    ) : (
                        vehicles.map((vehicle) => (
                            <tr key={vehicle._id}>
                                <td className='border px-4 py-2 text-left'>{vehicle.Register_Number}</td>
                                <td className='border px-4 py-2 text-left'>{vehicle.Make}</td>
                                <td className='border px-4 py-2 text-left'>{vehicle.Model}</td>
                                <td className='border px-4 py-2 text-left'>{vehicle.Year}</td>
                                <td className='border px-4 py-2 text-left'>{vehicle.Engine_Details}</td>
                                <td className='border px-4 py-2 text-left'>{vehicle.Transmission_Details}</td>
                                <td className='border px-4 py-2 text-left'>{vehicle.Vehicle_Color}</td>
                                <td className='border px-4 py-2 text-left'>{vehicle.Owner}</td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/vehicles/${vehicle._id}`}>View</Link>
                                        <Link to={`/vehicles/edit/${vehicle._id}`}>Edit</Link>
                                        <Link to={`/vehicles/delete/${vehicle._id}`}>Delete</Link>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ShowAllVehicles;
