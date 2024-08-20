import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import axios from 'axios';
import { Link } from 'react-router-dom';

const ShowInquire = () => {
    const [inquire, setInquire] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      axios
          .get('http://localhost:8077/Inquire')
          .then((response) => {
              setInquire(response.data.data);
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
        <h1 className='text-3xl my-8'>Inquire List</h1>
        <div className="flex justify-center items-center mt-8">
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                onClick={() => window.location.href='/Inquire/create'}
            >
                Add 
            </button>
        </div>
    </div>

    <table className='w-full border-separate border-spacing-2'>
        <thead>
            <tr>
                {/* <th className='border px-4 py-2 text-left'>ID</th> */}
                <th className='border px-4 py-2 text-left'>Name</th>
                <th className='border px-4 py-2 text-left'>Number</th>
                <th className='border px-4 py-2 text-left'>Email</th>
                <th className='border px-4 py-2 text-left'>Service Type</th>
                <th className='border px-4 py-2 text-left'>Vehicle Number</th>
                <th className='border px-4 py-2 text-left'>Message</th>
      
                <th className='border px-4 py-2 text-left'>Actions</th>
            </tr>
        </thead>
        <tbody>
            {loading ? (
                <tr><td colSpan='9'>Loading...</td></tr>
            ) : (
                // inquire.length > 0 ? (
                    inquire.map((Inquire) => (
                        <tr key={Inquire._id}>
                          
                            <td className='border px-4 py-2 text-left'>{Inquire.Name}</td>
                            <td className='border px-4 py-2 text-left'>{Inquire.Number}</td>
                            <td className='border px-4 py-2 text-left'>{Inquire.Email}</td>
                            <td className='border px-4 py-2 text-left'>{Inquire.ServiceType}</td>
                            <td className='border px-4 py-2 text-left'>{Inquire.VehicleNumber}</td>
                            <td className='border px-4 py-2 text-left'>{Inquire.Message}</td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                <div className='flex justify-center gap-x-4'>
                                   <Link to={`/Inquire/${Inquire._id}`}>View</Link>
                                    <Link to={`/Inquire/edit/${Inquire._id}`}>Edit</Link>
                                    <Link to={`/Inquire/delete/${Inquire._id}`}>Delete</Link>
                                </div>
                            </td>
                        </tr>
                    ))
                // ) : (
                //     <tr><td colSpan='9'>No Inquiry found.</td></tr>
                // )
            )}
        </tbody>
    </table>
</div>
);
}

export default ShowInquire