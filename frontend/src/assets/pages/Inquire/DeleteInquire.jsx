import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const DeleteInquire = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = () => {
      setLoading(true);
      axios.delete(`http://localhost:8077/Inquire/${id}`)
          .then(() => {
              setLoading(false);
              navigate('/Inquire'); // Redirect to the list page after deletion
          })
          .catch((error) => {
              setLoading(false);
              console.log(error);
          });
  };

  const handleCancel = () => {
      navigate('/Inquire'); // Navigate back without deleting
  };

  return (
      <div>
          {loading ? (
              <p>Deleting Inquire...</p>
          ) : (
              <>
                  <p>Are you sure you want to delete this?</p>
                  <button onClick={handleDelete}>Yes</button>
                  <button onClick={handleCancel}>No</button>
              </>
          )}
      </div>
  );
}


export default DeleteInquire