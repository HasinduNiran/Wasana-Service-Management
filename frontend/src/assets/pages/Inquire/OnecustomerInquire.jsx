import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backgroundImage from '../../images/mee.jpg'; // Ensure this path is correct
import Navbar from '../Navbar/Navbar';
import Footer from '../footer/Footer';

const OnecustomerInquire = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all inquiries
  useEffect(() => {
    axios
      .get('http://localhost:8077/Inquire') // Adjust this URL to fetch all inquiries
      .then((response) => {
        setInquiries(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching inquiries:', error);
        setError('Error fetching inquiries.');
        setLoading(false);
      });
  }, []);

  const handleReply = (email) => {
    const subject = 'Reply to your inquiry';
    const body = 'Dear Customer,\n\nThank you for reaching out. \n\n\n\n\nBest regards,\nWasana Service Center';

    // Open Gmail with pre-filled fields using mailto
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (loading) return <div className="text-xl font-bold text-center">Loading...</div>;
  if (error) return <div className="text-red-500 font-bold text-center">{error}</div>;
  if (inquiries.length === 0) return <div className="text-gray-500 text-center">No inquiries found.</div>;

  return (
    <div>
      <Navbar />
      <div
        className="p-4 bg-cover bg-center min-h-screen flex flex-col items-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Customer Inquiries
        </h1>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {inquiries.map((inquire) => (
            <div
              key={inquire._id}
              className="w-full bg-white rounded-lg shadow-lg hover:shadow-red-800 p-6"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {inquire.Name}
              </h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="font-semibold w-48 text-gray-700">CusID:</span>
                  <span className="text-gray-600">{inquire.cusID}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-48 text-gray-700">Number:</span>
                  <span className="text-gray-600">{inquire.Number}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-48 text-gray-700">Email:</span>
                  <span className="text-gray-600">{inquire.Email}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-48 text-gray-700">Service Type:</span>
                  <span className="text-gray-600">{inquire.ServiceType}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-48 text-gray-700">Vehicle Number:</span>
                  <span className="text-gray-600">{inquire.VehicleNumber}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-48 text-gray-700">Message:</span>
                  <span className="text-gray-600">{inquire.Message}</span>
                </div>
              </div>

              {/* Reply Button */}
              <button
                onClick={() => handleReply(inquire.Email)}
                className="mt-6 px-4 py-2 bg-green-500 text-white font-bold rounded shadow hover:bg-green-600"
              >
                Reply
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OnecustomerInquire;


