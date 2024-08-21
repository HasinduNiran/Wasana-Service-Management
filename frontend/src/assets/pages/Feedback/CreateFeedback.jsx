import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateFeedback() {
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

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
        setError(null);

        axios
            .post('http://localhost:8077/feedback', feedback) // Adjust the API endpoint as necessary
            .then((response) => {
                console.log('Feedback created:', response.data);
                setLoading(false);
                setFeedback({
                    cusID: '',
                    name: '',
                    email: '',
                    phone_number: '',
                    employee: '',
                    message: '',
                    star_rating: 0,
                });
                navigate('/feedback'); // Redirect to the feedback list or another page after creation
            })
            .catch((error) => {
                console.error('Error creating feedback:', error);
                setError('Error creating feedback. Please try again.');
                setLoading(false);
            });
    };

    return (
        <div className='p-4'>
            <h1 className='text-3xl my-8'>Submit Feedback</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Customer ID</label>
                    <input
                        type="text"
                        name="cusID"
                        value={feedback.cusID}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                        required
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
                        {loading ? 'Submitting...' : 'Submit Feedback'}
                    </button>
                </div>
                {error && <div className="text-red-500 mt-2">{error}</div>}
            </form>
        </div>
    );
}

export default CreateFeedback;
