import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import Swal from 'sweetalert2';

const OneCustomerInquire = () => {
    const { cusID } = useParams();
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInquiries = async () => {
            try {
                const response = await axios.get(`http://localhost:8077/inquire/${cusID}`);
                if (response.data) {
                    setInquiries(response.data);
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
        <div className="bg-white max-w-2xl mx-auto shadow-md overflow-hidden sm:rounded-lg mt-6">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Inquiries for Customer ID: {cusID}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Details about the customer's inquiries are listed below.</p>
            </div>
            <div className="border-t border-gray-200">
                {inquiries.length === 0 ? (
                    <p className="px-4 py-5 text-gray-500">No inquiries found for this customer.</p>
                ) : (
                    <dl>
                        {inquiries.map((inq, index) => (
                            <div key={inq._id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                                <dt className="text-sm font-medium text-gray-500">Name</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{inq.Name}</dd>

                                <dt className="text-sm font-medium text-gray-500">Number</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{inq.Number}</dd>

                                <dt className="text-sm font-medium text-gray-500">Email</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{inq.Email}</dd>

                                <dt className="text-sm font-medium text-gray-500">Service Type</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{inq.ServiceType}</dd>

                                <dt className="text-sm font-medium text-gray-500">Vehicle Number</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{inq.VehicleNumber}</dd>

                                <dt className="text-sm font-medium text-gray-500">Message</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{inq.Message}</dd>

                                <div className="flex justify-center items-center sm:col-span-3 space-x-2">
                                    <button
                                        type="button"
                                        className="text-red-600 hover:text-red-900"
                                        onClick={() => handleDelete(inq._id)}
                                    >
                                        <MdOutlineDelete className="inline-block" />
                                    </button>
                                    <Link to={`/Inquire/edit/${inq._id}`} className="text-yellow-600 hover:text-yellow-900">
                                        <AiOutlineEdit className="inline-block" />
                                    </Link>
                                    <Link to={`/Inquire/${inq._id}`} className="text-blue-500 hover:text-blue-700">
                                        <BsInfoCircle className="inline-block" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </dl>
                )}
            </div>
        </div>
    );
};

export default OneCustomerInquire;
