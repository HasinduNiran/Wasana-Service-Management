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
                setError('Error fetching feedback.');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    if (!feedback) return <div>No feedback found.</div>;

    return (
        <div className="container">
        <style>{`
            .container {
                max-width: 600px;
                position: center;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            
            h1 {
                text-align: center;
                color: #333;
                margin-bottom: 20px;
            }
            
            .store-field {
                margin-bottom: 10px;
            }
            
            .label {
                font-weight: bold;
                margin-right: 10px;
            }
            
            .value {
                font-size: 16px;
                color: #555;
            }
        `}</style>
            <h1 className='text-3xl my-8'>Feedback Details</h1>
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
            </div>
        </div>
    );
}

export default ReadOneFeedback;
