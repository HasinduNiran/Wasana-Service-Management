import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';

function ShowFeedback() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get('http://localhost:8077/feedback') // Adjust the API endpoint as necessary
            .then((response) => {
                setFeedbacks(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching feedbacks:', error);
                setError('Error fetching feedbacks.');
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this feedback?')) {
            axios
                .delete(`http://localhost:8077/feedback/${id}`) // Adjust the API endpoint as necessary
                .then(() => {
                    setFeedbacks(feedbacks.filter(feedback => feedback._id !== id));
                })
                .catch((error) => {
                    console.error('Error deleting feedback:', error);
                    setError('Error deleting feedback.');
                });
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container">
        <style>{`
                  body {
                      font-family: Arial, sans-serif;
                      margin: 0;
                      padding: 0;
                      background-color: #f4f4f4;
                  }
  
                  .container {
                      max-width: 1200px;
                      margin: 0 auto;
                      padding: 20px;
                  }
  
                  h2 {
                      color: #333;
                      text-align: center;
                  }
  
                  table {
                      width: 100%;
                      border-collapse: collapse;
                      margin: 20px 0;
                  }
  
                  table, th, td {
                      border: 1px solid #ddd;
                  }
  
                  th, td {
                      padding: 12px;
                      text-align: left;
                  }
  
                  th {
                      background-color: #f2f2f2;
                      font-weight: bold;
                  }
  
                  tr:nth-child(even) {
                      background-color: #f9f9f9;
                  }
  
                  button {
                      background-color: #4CAF50;
                      color: white;
                      padding: 10px 20px;
                      margin: 10px 0;
                      border: none;
                      border-radius: 4px;
                      cursor: pointer;
                      transition: background-color 0.3s ease;
                  }
  
                  button:hover {
                      background-color: #45a049;
                  }
  
                  .text-center {
                      text-align: center;
                  }
  
                  .flex {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                  }
  
                  .gap-x-4 {
                      gap: 16px;
                  }
  
                  @media screen and (max-width: 768px) {
                      table {
                          font-size: 14px;
                      }
  
                      th, td {
                          padding: 8px;
                      }
  
                      button {
                          padding: 8px 16px;
                      }
                  }
              `}</style>
            <h1 className='text-3xl my-8'>Feedbacks</h1>

            <button
            className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => (window.location.href = "/Feedback/create")}
          >
            Add
          </button>
            <table className='min-w-full divide-y divide-gray-200'>
                <thead>
                    <tr>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Customer ID</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Phone Number</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Employee</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Message</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Star Rating</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                    {feedbacks.map((feedback) => (
                        <tr key={feedback._id}>
                            <td className='px-6 py-4 whitespace-nowrap'>{feedback.cusID}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{feedback.name}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{feedback.email}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{feedback.phone_number}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{feedback.employee}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{feedback.message}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{feedback.star_rating}</td>
                            <td className='px-6 py-4 whitespace-nowrap flex justify-center gap-x-4'>
                                <Link to={`/feedback/get/${feedback._id}`}>
                                    <BsInfoCircle className="text-2xl text-green-800" />
                                </Link>
                                <Link to={`/feedback/edit/${feedback._id}`}>
                                    <AiOutlineEdit className="text-2xl text-yellow-600" />
                                </Link>
                                <button onClick={() => handleDelete(feedback._id)}>
                                    <MdOutlineDelete className="text-2xl text-red-600" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ShowFeedback;
