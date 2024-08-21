import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ReadOneFeedback() {
    const { id } = useParams(); // Get the feedback ID from the route parameters
    const [feedback, setFeedback] = useState(null);
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
                setError('Error fetching feedback. Please try again later.');
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    if (!feedback) {
        return <div className="text-center">No feedback found.</div>;
    }

    return (
        <div className='p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-10'>
            <h1 className='text-2xl font-bold mb-6'>Feedback Details</h1>
            <div className='space-y-4'>
                <div>
                    <strong>Customer ID:</strong> {feedback.cusID}
                </div>
                <div>
                    <strong>Name:</strong> {feedback.name}
                </div>
                <div>
                    <strong>Email:</strong> {feedback.email}
                </div>
                <div>
                    <strong>Phone Number:</strong> {feedback.phone_number}
                </div>
                <div>
                    <strong>Employee:</strong> {feedback.employee}
                </div>
                <div>
                    <strong>Message:</strong> {feedback.message}
                </div>
                <div>
                    <strong>Star Rating:</strong>
                    <span className='ml-2'>
                        {Array(feedback.star_rating).fill('⭐')}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ReadOneFeedback;
