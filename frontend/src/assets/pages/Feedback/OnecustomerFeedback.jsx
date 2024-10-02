import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert if it's not already imported
import Navbar from '../Navbar/Navbar';
import Footer from '../footer/Footer';
import backgroundImage from '../../images/mee.jpg'; // Ensure this path is correct
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit, AiFillStar, AiOutlineStar } from 'react-icons/ai'; // Add star icons
import { MdOutlineDelete } from 'react-icons/md';

const OneCustomerFeedback = () => {
    const { cusID } = useParams(); // Get the customer ID from the route parameters
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8077/feedback/${id}`)
                    .then(() => {
                        setFeedbacks(feedbacks.filter(feedback => feedback._id !== id));
                        Swal.fire('Deleted!', 'Your feedback has been deleted.', 'success');
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire('Error!', 'There was an error deleting the feedback.', 'error');
                    });
            }
        });
    };

    const renderStars = (starRating) => {
        const totalStars = 5;
        return (
            <div className="flex">
                {Array.from({ length: totalStars }, (v, i) => i + 1).map((star) =>
                    star <= starRating ? (
                        <AiFillStar key={star} className="text-yellow-500" /> // Filled star
                    ) : (
                        <AiOutlineStar key={star} className="text-yellow-500" /> // Empty star
                    )
                )}
            </div>
        );
    };

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get(`http://localhost:8077/feedback/${cusID}`); // Adjust the API endpoint as necessary
                if (response.data.length > 0) {
                    setFeedbacks(response.data);
                } else {
                    setError("No feedback found for this customer.");
                }
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
                setError('Error fetching feedbacks.');
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, [cusID]);

    if (loading) return <div className="text-xl font-bold text-center">Loading...</div>;
    if (error) return <div className="text-red-500 font-bold text-center">{error}</div>;

    return (
        <div className=''>
            <Navbar />
            <div 
                className="p-4 bg-cover bg-center min-h-screen flex flex-col items-center" 
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg hover:shadow-red-800 mt-[10%] p-6">
                    <div className="text-2xl font-bold text-gray-800 border-b pb-2 border-gray-200 mb-4">
                        Feedbacks for Customer ID: {cusID}
                    </div>
                    <div className="space-y-6">
                        {feedbacks.length === 0 ? (
                            <p className="text-gray-500 text-center">No feedbacks found for this customer.</p>
                        ) : (
                            feedbacks.map((feedback, index) => (
                                <div key={feedback._id} className={`p-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} rounded-lg shadow-md`}>
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <span className="font-semibold w-36 text-gray-700">Name:</span>
                                            <span className="text-gray-600">{feedback.name}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-semibold w-36 text-gray-700">Email:</span>
                                            <span className="text-gray-600">{feedback.email}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-semibold w-36 text-gray-700">Phone Number:</span>
                                            <span className="text-gray-600">{feedback.phone_number}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-semibold w-36 text-gray-700">Employee:</span>
                                            <span className="text-gray-600">{feedback.employee}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-semibold w-36 text-gray-700">Message:</span>
                                            <span className="text-gray-600">{feedback.message}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-semibold w-36 text-gray-700">Star Rating:</span>
                                            <span className="text-gray-600">
                                                {renderStars(feedback.star_rating)} {/* Display stars */}
                                            </span>
                                        </div>
                                        
                                        <div className="flex justify-center items-center mt-5 space-x-4 border-t border-gray-200 pt-4">
                                            <button
                                                type="button"
                                                className="text-red-600 hover:text-red-900"
                                                onClick={() => handleDelete(feedback._id)}
                                            >
                                                <MdOutlineDelete className="inline-block text-lg" />
                                            </button>
                                            <Link to={`/feedback/edit/${feedback._id}`} className="text-yellow-600 hover:text-yellow-900">
                                                <AiOutlineEdit className="inline-block text-lg" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default OneCustomerFeedback;
