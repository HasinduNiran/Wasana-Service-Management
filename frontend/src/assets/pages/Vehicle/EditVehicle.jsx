import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditVehicle() {
    const { id } = useParams(); // Extract the vehicle ID from the URL parameters
    const navigate = useNavigate();

    const [vehicle, setVehicle] = useState({
        cusID: '',
        image: '',
        Register_Number: '',
        Make: '',
        Model: '',
        Year: '',
        Engine_Details: '',
        Transmission_Details: '',
        Vehicle_Color: '',
        Vehicle_Features: [],
        Condition_Assessment: '',
        Owner: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicle({
            ...vehicle,
            [name]: value,
        });
    };

    const handleFeatureChange = (index, event) => {
        const newFeatures = vehicle.Vehicle_Features.slice();
        newFeatures[index] = event.target.value;
        setVehicle({ ...vehicle, Vehicle_Features: newFeatures });
    };

    const addFeature = () => {
        setVehicle({
            ...vehicle,
            Vehicle_Features: [...vehicle.Vehicle_Features, '']
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        axios
            .put(`http://localhost:8077/Vehicle/${id}`, vehicle) // Update the vehicle by ID
            .then((response) => {
                console.log('Vehicle updated:', response.data);
                navigate('/vehicles'); // Redirect to the vehicle list page
            })
            .catch((error) => {
                console.error('Error updating the vehicle:', error);
                setError('Error updating vehicle.');
                setLoading(false);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='p-4'>
            <h1 className='text-3xl my-8'>Edit Vehicle</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Customer ID</label>
                    <input
                        type="text"
                        name="cusID"
                        value={vehicle.cusID}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={vehicle.image}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Register Number</label>
                    <input
                        type="text"
                        name="Register_Number"
                        value={vehicle.Register_Number}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Make</label>
                    <input
                        type="text"
                        name="Make"
                        value={vehicle.Make}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Model</label>
                    <input
                        type="text"
                        name="Model"
                        value={vehicle.Model}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Year</label>
                    <input
                        type="text"
                        name="Year"
                        value={vehicle.Year}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Engine Details</label>
                    <input
                        type="text"
                        name="Engine_Details"
                        value={vehicle.Engine_Details}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Transmission Details</label>
                    <input
                        type="text"
                        name="Transmission_Details"
                        value={vehicle.Transmission_Details}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Vehicle Color</label>
                    <input
                        type="text"
                        name="Vehicle_Color"
                        value={vehicle.Vehicle_Color}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Vehicle Features</label>
                    {vehicle.Vehicle_Features.map((feature, index) => (
                        <input
                            key={index}
                            type="text"
                            value={feature}
                            onChange={(e) => handleFeatureChange(index, e)}
                            className="mt-1 block w-full border-gray-300 rounded-md mb-2"
                        />
                    ))}
                    <button
                        type="button"
                        onClick={addFeature}
                        className="mt-1 px-4 py-2 bg-green-500 text-white rounded-md"
                    >
                        Add Feature
                    </button>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Condition Assessment</label>
                    <input
                        type="text"
                        name="Condition_Assessment"
                        value={vehicle.Condition_Assessment}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Owner</label>
                    <input
                        type="text"
                        name="Owner"
                        value={vehicle.Owner}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditVehicle;
