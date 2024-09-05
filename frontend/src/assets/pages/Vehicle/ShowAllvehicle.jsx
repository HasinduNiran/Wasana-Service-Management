import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ShowAllVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8077/Vehicle') // Replace with your actual API endpoint
            .then((response) => {
                setVehicles(response.data.data);
                setFilteredVehicles(response.data.data); // Initialize filtered data
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    // Search functionality
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = vehicles.filter((vehicle) =>
            vehicle.Register_Number.toLowerCase().includes(query) ||
            vehicle.Make.toLowerCase().includes(query) ||
            vehicle.Model.toLowerCase().includes(query) ||
            vehicle.Owner.toLowerCase().includes(query)
        );
        setFilteredVehicles(filtered);
    };

    // Report generation functionality
    const generateReport = () => {
        const doc = new jsPDF();
        doc.text("Vehicle Report", 14, 16);

        const tableData = filteredVehicles.map((vehicle, index) => [
            index + 1,
            vehicle.Register_Number,
            vehicle.Make,
            vehicle.Model,
            vehicle.Year,
            vehicle.Engine_Details,
            vehicle.Transmission_Details,
            vehicle.Vehicle_Color,
            vehicle.Owner,
        ]);

        doc.autoTable({
            head: [["No", "Register Number", "Make", "Model", "Year", "Engine Details", "Transmission", "Color", "Owner"]],
            body: tableData,
            startY: 30,
            margin: { horizontal: 10 },
            styles: { fontSize: 10 },
        });

        doc.save("vehicle_report.pdf");
    };

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Vehicle List</h1>
                <div className="flex justify-between items-center mt-8 gap-4">
                    <input 
                        type="text" 
                        placeholder="Search vehicles..." 
                        value={searchQuery} 
                        onChange={handleSearch} 
                        className="border border-gray-300 p-2 rounded"
                    />
                    <button 
                        onClick={generateReport} 
                        className="bg-green-500 text-white py-2 px-4 rounded"
                    >
                        Generate Report
                    </button>
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
                        <th className='border px-4 py-2 text-left'>Image</th>
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
                        <tr><td colSpan='10'>Loading...</td></tr>
                    ) : (
                        filteredVehicles.map((vehicle) => (
                            <tr key={vehicle._id}>
                                <td className='border px-4 py-2 text-left'>
                                    {vehicle.image ? (
                                        <img 
                                            src={vehicle.image} 
                                            alt={vehicle.Register_Number} 
                                            className='w-20 h-20 object-cover' 
                                        />
                                    ) : (
                                        'No Image'
                                    )}
                                </td>
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
                                        <Link to={`/vehicles/${vehicle.Register_Number}`}>View</Link>
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
