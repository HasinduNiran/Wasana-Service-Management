import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteEmployee = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleDelete = () => {
        setLoading(true);
        axios.delete(`http://localhost:8077/Employee/${id}`)
            .then(() => {
                setLoading(false);
                navigate('/Employee'); // Redirect to the list page after deletion
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    };

    const handleCancel = () => {
        navigate('/Employee'); // Navigate back without deleting
    };

    return (
        <div>
            {loading ? (
                <p>Deleting employee...</p>
            ) : (
                <>
                    <p>Are you sure you want to delete this employee?</p>
                    <button onClick={handleDelete}>Yes</button>
                    <button onClick={handleCancel}>No</button>
                </>
            )}
        </div>
    );
}

export default DeleteEmployee;
