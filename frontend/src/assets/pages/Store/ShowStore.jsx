import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import axios from 'axios';
import { Link } from 'react-router-dom';


const ShowStore = () => {
    const [Stores, setstore] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8077/Store')
            .then((response) => {
                setstore(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

  return (
    <div className='p-4'>
    <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>List</h1>

        <div className="flex justify-center items-center mt-8">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location.href='/Store/create'}>
                Add 
            </button>
        </div>
    </div>

    <table className='w-full border-separate border-spacing-2'>
        <thead>
            <tr>
                <th className='border px-4 py-2 text-left'>ID</th>
                <th className='border px-4 py-2 text-left'>Name</th>
                <th className='border px-4 py-2 text-left'>Quantity</th>
                <th className='border px-4 py-2 text-left'>Price</th>
                <th className='border px-4 py-2 text-left'>Actions</th>
            </tr>
        </thead>
        <tbody>
            {loading ? (
                <tr><td colSpan='9'>Loading...</td></tr>
            ) : (
                Stores.map((Store) => (
                    <tr key={Store._id}>
                        {/* <td className='border px-4 py-2 text-left'>{Store.EmpID}</td> */}
                        <td className='border px-4 py-2 text-left'>{Store.Name}</td>
                        <td className='border px-4 py-2 text-left'>{Store.Quantity}</td>
                        <td className='border px-4 py-2 text-left'>{Store.Price}</td>
                       
                        <td className='border border-slate-700 rounded-md text-center'>
                            <div className='flex justify-center gap-x-4'>
                                <Link to={`/Store/${Employee._id}`}>One Store
                                    {/* <BsInfoCircle className='text-2x1 text-green-800' /> */}
                                </Link>
                                <Link to={`/Store/edit/${Employee._id}`}>Edit
                                    {/* <AiOutlineEdit className='text-2x1 text-yellow-600' /> */}
                                </Link>
                                <Link to={`/Store/delete/${Employee._id}`}>Delete
                                    {/* <MdOutlineDelete className='text-2x1 text-red-600' /> */}
                                </Link>
                            </div>
                        </td>
                    </tr>
                ))
            )}
        </tbody>
    </table>
</div>
);
};

export default ShowStore