import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { MdOutlineDelete } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import Swal from 'sweetalert2';
import Navbar from '../Navbar/Navbar';
import Footer from '../footer/Footer';

const ApplicantsList = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cusID } = useParams();

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(`http://localhost:8077/applicant/${cusID}`);
        console.log('Fetched data:', response.data); // Debugging line to see the response
        if (response.data && response.data.length > 0) {
          setApplicants(response.data);
        } else {
          setError('No applicants found.');
        }
      } catch (error) {
        console.error('Error fetching applicants:', error); // Debugging line to log errors
        setError('Error fetching applicants.');
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  },  [cusID]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won’t be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8077/applicant/${id}`)
          .then(() => {
            setApplicants(applicants.filter(applicant => applicant._id !== id));
            Swal.fire('Deleted!', 'The applicant record has been deleted.', 'success');
          })
          .catch((error) => {
            console.error('Error deleting applicant:', error); // Debugging line
            Swal.fire('Error!', 'Failed to delete the applicant.', 'error');
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
    <div className="">
      <Navbar />
      <div className="p-4 min-h-screen flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6">Applicants List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {applicants.length === 0 ? (
            <p className="p-4">No applicants found.</p>
          ) : (
            applicants.map((applicant) => (
              <div key={applicant._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src={applicant.image || 'https://via.placeholder.com/150'} // Use applicant.Image if available
                  alt={`${applicant.FirstName} ${applicant.LastName}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{`${applicant.FirstName} ${applicant.LastName}`}</h3>
                  <p className="text-gray-700"><strong>Email:</strong> {applicant.Email}</p>
                  <p className="text-gray-700"><strong>Job Type:</strong> {applicant.JobType}</p>
                  <div className="flex justify-between items-center mt-4">
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(applicant._id)}
                    >
                      <MdOutlineDelete className="inline-block" />
                    </button>
                    <Link to={`/applicant/edit/${applicant._id}`} className="text-yellow-600 hover:text-yellow-800">
                      <AiOutlineEdit className="inline-block" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ApplicantsList;
