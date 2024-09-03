import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';

const CreateCustomer = () => {
    const [firstName, setFirstName] = useState('');
    const [cusID, setCusID] = useState('');
    const [lastName, setLastName] = useState('');
    const [NIC, setNIC] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnteredPassword, setReEnteredPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== reEnteredPassword) {
            setError('Passwords do not match');
            return;
        }
        const data = {
            cusID,
            firstName,
            lastName,
            NIC,
            phone,
            email,
            password,
        };
        setLoading(true);
        try {
            await axios.post('http://localhost:8077/Customer', data);
            setLoading(false);
            navigate('/Customer');
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
            setError('Failed to create customer');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <style>
                {`
                    @keyframes slideLeftToRight {
                        0% {
                            transform: translateX(-100%);
                        }
                        50% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(100%);
                        }
                    }

                    .animated-image {
                        animation: slideLeftToRight 5s ease-in-out infinite;
                        width: 80px;
                        height: 80px;
                        margin-right: 10px;
                    }
                `}
            </style>
           
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
            <img 
                src={logo} 
                alt="logo" 
                className="animated-image"
            />
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-bold mb-2" htmlFor="cusID">Customer ID</label>
                            <input
                                type="text"
                                id="cusID"
                                value={cusID}
                                onChange={(e) => setCusID(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2" htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2" htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2" htmlFor="NIC">NIC</label>
                            <input
                                type="text"
                                id="NIC"
                                value={NIC}
                                onChange={(e) => setNIC(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2" htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2" htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2" htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2" htmlFor="reEnteredPassword">Re-enter Password</label>
                            <input
                                type="password"
                                id="reEnteredPassword"
                                value={reEnteredPassword}
                                onChange={(e) => setReEnteredPassword(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateCustomer;
