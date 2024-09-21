import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import Swal from 'sweetalert2';

const OneCustomerInquire = () => {
    const { cusID } = useParams(); // Get customer ID from URL params
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchInquiries = async () => {
            try {
                const response = await axios.get(`http://localhost:8077/inquire/${cusID}`);
                if (response.data) {
                    setInquiries(response.data); // Directly access the data
                } else {
                    setError("No inquiries found for this customer.");
                }
            } catch (error) {
                console.error(error);
                setError("Error fetching inquiries.");
            } finally {
                setLoading(false);
            }
        };
          console.log("Customer ID:", cusID);

        fetchInquiries();
    }, [cusID]);

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
                axios.delete(`http://localhost:8077/inquire/${id}`)
                    .then(() => {
                        setInquiries(inquiries.filter(inq => inq._id !== id));
                        Swal.fire('Deleted!', 'Your record has been deleted.', 'success');
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire('Error!', 'There was an error deleting the record.', 'error');
                    });
            }
        });
    };

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Inquiries for Customer ID: {cusID}</h2>
            {inquiries.length === 0 ? (
                <p>No inquiries found for this customer.</p>
            ) : (
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Number</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Service Type</th>
                            <th className="px-4 py-2 border">Vehicle Number</th>
                            <th className="px-4 py-2 border">Message</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inquiries.map((inq, index) => (
                            <tr key={inq._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                <td className="border px-4 py-2">{inq.Name}</td>
                                <td className="border px-4 py-2">{inq.Number}</td>
                                <td className="border px-4 py-2">{inq.Email}</td>
                                <td className="border px-4 py-2">{inq.ServiceType}</td>
                                <td className="border px-4 py-2">{inq.VehicleNumber}</td>
                                <td className="border px-4 py-2">{inq.Message}</td>
                                <td className="border px-4 py-2 flex justify-center items-center space-x-2">
                                    <button
                                        type="button"
                                        className="text-red-600"
                                        onClick={() => handleDelete(inq._id)}
                                    >
                                        <MdOutlineDelete />
                                    </button>
                                    <Link to={`/Inquire/edit/${inq._id}`} className="text-yellow-600">
                                        <AiOutlineEdit />
                                    </Link>
                                    <Link to={`/Inquire/${inq._id}`} className="text-blue-500">
                                        <BsInfoCircle />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OneCustomerInquire;
