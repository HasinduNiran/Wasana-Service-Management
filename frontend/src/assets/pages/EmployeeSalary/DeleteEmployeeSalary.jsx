import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteEmployeeSalary = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleDelete = () => {
        setLoading(true);
        axios.delete(`http://localhost:8077/EmployeeSalary/${id}`)
            .then(() => {
                setLoading(false);
                navigate('/EmployeeSalary'); // Redirect to the list page after deletion
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    };

    const handleCancel = () => {
        navigate('/EmployeeSalary'); // Navigate back without deleting
    };

    return (
        <div>
            {loading ? (
                <p>Deleting employee salary...</p>
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

export default DeleteEmployeeSalary