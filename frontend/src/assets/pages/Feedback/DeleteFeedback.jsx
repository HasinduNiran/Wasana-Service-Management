import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function DeleteFeedback() {
    const { id } = useParams(); // Get the feedback ID from the route parameters
    const navigate = useNavigate();
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
                setError('Error fetching feedback.');
                setLoading(false);
            });
    }, [id]);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this feedback?')) {
            axios
                .delete(`http://localhost:8077/feedback/${id}`) // Adjust the API endpoint as necessary
                .then(() => {
                    alert('Feedback deleted successfully.');
                    navigate('/feedbacks'); // Redirect to the feedback list or another page after deletion
                })
                .catch((error) => {
                    console.error('Error deleting feedback:', error);
                    setError('Error deleting feedback.');
                });
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    if (!feedback) return <div>No feedback found.</div>;

    return (
        <div className='p-4'>
            <h1 className='text-3xl my-8'>Delete Feedback</h1>
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
                    <strong>Star Rating:</strong> {feedback.star_rating}
                </div>
                <div>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                        Delete Feedback
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteFeedback;
