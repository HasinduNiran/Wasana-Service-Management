import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateServiceHistory() {
    const navigate = useNavigate();
    
    const [service, setService] = useState({
        cusID: '',
        Customer_Name: '',
        Customer_Email: '',
        Allocated_Employee: '',
        Vehicle_Number: '',
        Service_History: '',
        Service_Date: '',
        Milage: '',
        Package: '',
        selectedServices: [],
        Booking_Id: '',
        nextService: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setService({
                ...service,
                selectedServices: checked
                    ? [...service.selectedServices, value]
                    : service.selectedServices.filter((item) => item !== value),
            });
        } else {
            setService({
                ...service,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        axios
            .post('http://localhost:8077/ServiceHistory', service) // Adjust the API endpoint as necessary
            .then((response) => {
                console.log('Service history created:', response.data);
                navigate('/ServiceHistory'); // Redirect to the service history list or another page after creation
            })
            .catch((error) => {
                console.error('Error creating service history:', error);
                setError('Error creating service history.');
                setLoading(false);
            });
    };

    return (
        <div className='p-4'>
            <h1 className='text-3xl my-8'>Create Service History</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Customer ID</label>
                    <input
                        type="text"
                        name="cusID"
                        value={service.cusID}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                    <input
                        type="text"
                        name="Customer_Name"
                        value={service.Customer_Name}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Customer Email</label>
                    <input
                        type="email"
                        name="Customer_Email"
                        value={service.Customer_Email}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Allocated Employee</label>
                    <input
                        type="text"
                        name="Allocated_Employee"
                        value={service.Allocated_Employee}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Vehicle Number</label>
                    <input
                        type="text"
                        name="Vehicle_Number"
                        value={service.Vehicle_Number}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Service History</label>
                    <textarea
                        name="Service_History"
                        value={service.Service_History}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Service Date</label>
                    <input
                        type="date"
                        name="Service_Date"
                        value={service.Service_Date}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Milage</label>
                    <input
                        type="number"
                        name="Milage"
                        value={service.Milage}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Package</label>
                    <input
                        type="text"
                        name="Package"
                        value={service.Package}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Selected Services</label>
                    <div className="space-y-2">
                        <label>
                            <input
                                type="checkbox"
                                value="Service1"
                                checked={service.selectedServices.includes('Service1')}
                                onChange={handleChange}
                            />
                            Service1
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Service2"
                                checked={service.selectedServices.includes('Service2')}
                                onChange={handleChange}
                            />
                            Service2
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Service3"
                                checked={service.selectedServices.includes('Service3')}
                                onChange={handleChange}
                            />
                            Service3
                        </label>
                        {/* Add more services as needed */}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Booking ID</label>
                    <input
                        type="text"
                        name="Booking_Id"
                        value={service.Booking_Id}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Next Service Date</label>
                    <input
                        type="date"
                        name="nextService"
                        value={service.nextService}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Create Service History'}
                    </button>
                </div>
                {error && <div className="text-red-500 mt-2">{error}</div>}
            </form>
        </div>
    );
}

export default CreateServiceHistory;
