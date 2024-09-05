import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ShowStore = () => {
    const [store, setStore] = useState([]);
    const [filteredStore, setFilteredStore] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8077/Store')
            .then((response) => {
                console.log('API Response:', response.data); 
                const data = response.data;
                if (Array.isArray(data)) {
                    setStore(data);
                    setFilteredStore(data); // Initialize filtered data
                } else {
                    console.warn('Data is not an array:', data);
                    setStore([]);
                    setFilteredStore([]);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching store data:', error);
                setStore([]);
                setFilteredStore([]);
                setLoading(false);
            });
    }, []);

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = store.filter((item) =>
            item.Name.toLowerCase().includes(query) ||
            item.Quantity.toString().includes(query) ||
            item.Price.toString().includes(query)
        );
        setFilteredStore(filtered);
    };

    const generateReport = () => {
        const doc = new jsPDF();
        doc.text('Store Report', 14, 16);
        
        const tableData = filteredStore.map(item => [
            item.Name,
            item.Quantity,
            item.Price
        ]);

        doc.autoTable({
            head: [['Name', 'Quantity', 'Price']],
            body: tableData,
            startY: 30,
            margin: { horizontal: 10 },
            styles: { fontSize: 10 },
        });

        doc.save('store_report.pdf');
    };

    return (
        <div className="container">
            <style>{`
                // Add your existing styles here...
            `}</style>
            <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Store List</h1>
                <div className="flex justify-center items-center mt-8">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => (window.location.href = "/Store/create")}
                    >
                        Add
                    </button>
                </div>
            </div>
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search store..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="border border-gray-300 p-2 rounded"
                />
                <button onClick={generateReport} className="bg-green-500 text-white py-2 px-4 rounded">
                    Generate Report
                </button>
            </div>
            <table className='w-full border-separate border-spacing-2'>
                <thead>
                    <tr>
                        <th className='border px-4 py-2 text-left'>Name</th>
                        <th className='border px-4 py-2 text-left'>Quantity</th>
                        <th className='border px-4 py-2 text-left'>Price</th>
                        <th className='border px-4 py-2 text-left'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan='4'>Loading...</td></tr>
                    ) : (
                        filteredStore.length > 0 ? (
                        filteredStore.map((Store) => (
                            <tr key={Store._id}>
                                <td className='border px-4 py-2 text-left'>{Store.Name}</td>
                                <td className='border px-4 py-2 text-left'>{Store.Quantity}</td>
                                <td className='border px-4 py-2 text-left'>{Store.Price}</td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/Store/${Store._id}`}>
                                            <BsInfoCircle className='text-2x1 text-green-800' />
                                        </Link>
                                        <Link to={`/Store/edit/${Store._id}`}>
                                            <AiOutlineEdit className='text-2x1 text-yellow-600' />
                                        </Link>
                                        <Link to={`/Store/delete/${Store._id}`}>
                                            <MdOutlineDelete className='text-2x1 text-red-600' />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan='4'>No store data found.</td></tr>
                    )
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ShowStore;
