import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase'; // assuming you initialized Firebase in this file
import Swal from 'sweetalert2';

const CreateCustomer = () => {
    const [firstName, setFirstName] = useState('');
    const [image, setImage] = useState(null);
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

    // Initialize Firebase storage
    const storage = getStorage(app);

    const validateInputs = () => {
        const namePattern = /^[a-zA-Z]+$/;
        const nicPattern = /^\d{12}$|^\d{11}V$/;
        const phonePattern = /^0\d{9}$/;

        if (!namePattern.test(firstName)) {
            Swal.fire('Invalid First Name', 'First Name cannot contain spaces, numbers, or special characters.', 'error');
            return false;
        }
        if (!namePattern.test(lastName)) {
            Swal.fire('Invalid Last Name', 'Last Name cannot contain spaces, numbers, or special characters.', 'error');
            return false;
        }
        if (!nicPattern.test(NIC)) {
            Swal.fire('Invalid NIC', 'NIC should be 12 digits or 11 digits followed by letter "V".', 'error');
            return false;
        }
        if (!phonePattern.test(phone)) {
            Swal.fire('Invalid Phone Number', 'Phone Number should be a 10-digit number starting with 0.', 'error');
            return false;
        }
        if (password !== reEnteredPassword) {
            Swal.fire('Password Mismatch', 'Passwords do not match.', 'error');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!validateInputs()) return;

        // Check if image is selected
        if (!image) {
            Swal.fire('Image Required', 'Please select an image.', 'error');
            return;
        }

        setLoading(true);
        setError('');

        // Create a storage reference
        const storageRef = ref(storage, `customer_images/${image.name}`);

        // Create upload task
        const uploadTask = uploadBytesResumable(storageRef, image);

        // Monitor the upload process
        uploadTask.on('state_changed',
            (snapshot) => {
                // Optional: you can handle the progress here
            },
            (uploadError) => {
                console.error('Error uploading image:', uploadError);
                Swal.fire('Upload Error', 'Error uploading image.', 'error');
                setLoading(false);
            },
            async () => {
                // When the upload is complete
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                    // Prepare the customer data
                    const data = {
                        image: downloadURL,
                        cusID,
                        firstName,
                        lastName,
                        NIC,
                        phone,
                        email,
                        password,
                    };

                    // Send a POST request to create a new customer
                    await axios.post('http://localhost:8077/Customer', data);

                    setLoading(false);
                    navigate('/Customer'); // Redirect to customer page after successful creation
                } catch (error) {
                    console.error('Error:', error);
                    Swal.fire('Creation Failed', 'Failed to create customer.', 'error');
                    setLoading(false);
                }
            }
        );
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <style>
                {`
                    @keyframes slideLeftToRight {
                        0% { transform: translateX(-100%); }
                        50% { transform: translateX(0); }
                        100% { transform: translateX(100%); }
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
                <img src={logo} alt="logo" className="animated-image" />

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

                        {/* Image Input */}
                        <div>
                            <label className="block text-sm font-bold mb-2">Image</label>
                            <input
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
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
