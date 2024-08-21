import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditFeedback() {
    const { id } = useParams(); // Get the feedback ID from the route parameters
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState({
        cusID: '',
        name: '',
        email: '',
        phone_number: '',
        employee: '',
        message: '',
        star_rating: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:8077/feedback/${id}`) // Adjust the API endpoint as necessary
            .then((response) => {
                setFeedback(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching feedback:', error);
                setError('Error fetching feedback.');
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeedback({
            ...feedback,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Reset error state before submission

        axios
            .put(`http://localhost:8077/feedback/${id}`, feedback) // Adjust the API endpoint as necessary
            .then((response) => {
                console.log('Feedback updated:', response.data);
                navigate('/feedback'); // Redirect to the feedback list or another page after update
            })
            .catch((error) => {
                console.error('Error updating feedback:', error);
                setError('Error updating feedback. Please try again.');
                setLoading(false);
            });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className='p-4'>
            <h1 className='text-3xl my-8'>Edit Feedback</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Customer ID</label>
                    <input
                        type="text"
                        name="cusID"
                        value={feedback.cusID}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                        disabled // Assuming customer ID should not be edited
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={feedback.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={feedback.email}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="text"
                        name="phone_number"
                        value={feedback.phone_number}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Employee</label>
                    <input
                        type="text"
                        name="employee"
                        value={feedback.employee}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                        name="message"
                        value={feedback.message}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Star Rating</label>
                    <input
                        type="number"
                        name="star_rating"
                        value={feedback.star_rating}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                        min="1"
                        max="5"
                        required
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Feedback'}
                    </button>
                </div>
                {error && <div className="text-red-500 mt-2">{error}</div>}
            </form>
        </div>
    );
}

export default EditFeedback;
