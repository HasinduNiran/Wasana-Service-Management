import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditShowHistory() {
    const { id } = useParams(); // Get the service history ID from the URL
    const navigate = useNavigate(); // Navigation hook to redirect after successful edit

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setService(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8077/ServiceHistory/${id}`, service);
            navigate('/serviceHistory'); // Redirect to service history list page
        } catch (err) {
            console.error('Error updating service history:', err);
            setError('Error updating service history.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className='p-4'>
            <h1 className='text-3xl my-8'>Edit Service History</h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Customer ID</label>
                    <input
                        type='text'
                        name='cusID'
                        value={service.cusID}
                        onChange={handleChange}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Customer Name</label>
                    <input
                        type='text'
                        name='Customer_Name'
                        value={service.Customer_Name}
                        onChange={handleChange}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Customer Email</label>
                    <input
                        type='email'
                        name='Customer_Email'
                        value={service.Customer_Email}
                        onChange={handleChange}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Allocated Employee</label>
                    <input
                        type='text'
                        name='Allocated_Employee'
                        value={service.Allocated_Employee}
                        onChange={handleChange}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Vehicle Number</label>
                    <input
                        type='text'
                        name='Vehicle_Number'
                        value={service.Vehicle_Number}
                        onChange={handleChange}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Service History</label>
                    <input
                        type='text'
                        name='Service_History'
                        value={service.Service_History}
                        onChange={handleChange}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Service Date</label>
                    <input
                        type='date'
                        name='Service_Date'
                        value={service.Service_Date}
                        onChange={handleChange}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Mileage</label>
                    <input
                        type='number'
                        name='Milage'
                        value={service.Milage}
                        onChange={handleChange}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Package</label>
                    <input
                        type='text'
                        name='Package'
                        value={service.Package}
                        onChange={handleChange}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Selected Services</label>
                    <input
                        type='text'
                        name='selectedServices'
                        value={service.selectedServices.join(', ')}
                        onChange={(e) => setService({ ...service, selectedServices: e.target.value.split(',').map(s => s.trim()) })}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Booking ID</label>
                    <input
                        type='text'
                        name='Booking_Id'
                        value={service.Booking_Id}
                        onChange={handleChange}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Next Service Date</label>
                    <input
                        type='date'
                        name='nextService'
                        value={service.nextService}
                        onChange={handleChange}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                    />
                </div>
                <div className='flex justify-end'>
                    <button
                        type='submit'
                        className='px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600'
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditShowHistory;
