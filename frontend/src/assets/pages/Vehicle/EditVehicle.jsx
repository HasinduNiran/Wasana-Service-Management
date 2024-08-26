import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase';
import backgroundImage from '../t.jpg'; // Ensure this path is correct

function EditVehicle() {
    const { id } = useParams(); // Extract the vehicle ID from the URL parameters
    const navigate = useNavigate();

    const [vehicle, setVehicle] = useState({
        cusID: '',
        image: '',
        Register_Number: '',
        Make: '',
        Model: '',
        Year: '',
        Engine_Details: '',
        Transmission_Details: '',
        Vehicle_Color: '',
        Vehicle_Features: [],
        Condition_Assessment: '',
        Owner: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:8077/Vehicle/${id}`) // Fetch the vehicle details by ID
            .then((response) => {
                setVehicle(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching the vehicle:', error);
                setError('Error fetching vehicle details.');
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicle({
            ...vehicle,
            [name]: value,
        });
    };

    const handleFeatureChange = (index, event) => {
        const newFeatures = vehicle.Vehicle_Features.slice();
        newFeatures[index] = event.target.value;
        setVehicle({ ...vehicle, Vehicle_Features: newFeatures });
    };

    const addFeature = () => {
        setVehicle({
            ...vehicle,
            Vehicle_Features: [...vehicle.Vehicle_Features, '']
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0]; // Access the first file in the array
        const storage = getStorage(app);
        const storageRef = ref(storage, `vehicleImages/${file.name}`);

        try {
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    // Progress tracking
                },
                (error) => {
                    console.error('Error uploading image:', error);
                    alert('Error uploading image. Please try again.');
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setVehicle({ ...vehicle, image: downloadURL });
                }
            );
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image. Please try again.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        axios
            .put(`http://localhost:8077/Vehicle/${id}`, vehicle) // Update the vehicle by ID
            .then((response) => {
                console.log('Vehicle updated:', response.data);
                navigate('/vehicles'); // Redirect to the vehicle list page
            })
            .catch((error) => {
                console.error('Error updating the vehicle:', error);
                setError('Error updating vehicle.');
                setLoading(false);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Edit Vehicle</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="cusID" style={styles.label}>Customer ID</label>
                    <input
                        type="text"
                        name="cusID"
                        value={vehicle.cusID}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="image" style={styles.label}>Vehicle Image</label>
                    <input
                        type="file"
                        id="image"
                        onChange={handleImageChange}
                        style={styles.input}
                    />
                    {vehicle.image && (
                        <img src={vehicle.image} alt="Vehicle" style={{ maxWidth: '200px', marginTop: '10px' }} />
                    )}
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="Register_Number" style={styles.label}>Register Number</label>
                    <input
                        type="text"
                        name="Register_Number"
                        value={vehicle.Register_Number}
                        onChange={handleChange}
                        style={styles.input}
                        maxLength={8}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="Make" style={styles.label}>Make</label>
                    <input
                        type="text"
                        name="Make"
                        value={vehicle.Make}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="Model" style={styles.label}>Model</label>
                    <input
                        type="text"
                        name="Model"
                        value={vehicle.Model}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="Year" style={styles.label}>Year</label>
                    <input
                        type="text"
                        name="Year"
                        value={vehicle.Year}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="Engine_Details" style={styles.label}>Engine Details</label>
                    <input
                        type="text"
                        name="Engine_Details"
                        value={vehicle.Engine_Details}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="Transmission_Details" style={styles.label}>Transmission Details</label>
                    <input
                        type="text"
                        name="Transmission_Details"
                        value={vehicle.Transmission_Details}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="Vehicle_Color" style={styles.label}>Vehicle Color</label>
                    <input
                        type="text"
                        name="Vehicle_Color"
                        value={vehicle.Vehicle_Color}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="Vehicle_Features" style={styles.label}>Vehicle Features</label>
                    {vehicle.Vehicle_Features.map((feature, index) => (
                        <input
                            key={index}
                            type="text"
                            value={feature}
                            onChange={(e) => handleFeatureChange(index, e)}
                            style={styles.input}
                        />
                    ))}
                    <button
                        type="button"
                        onClick={addFeature}
                        style={styles.button}
                    >
                        Add Feature
                    </button>
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="Condition_Assessment" style={styles.label}>Condition Assessment</label>
                    <input
                        type="text"
                        name="Condition_Assessment"
                        value={vehicle.Condition_Assessment}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="Owner" style={styles.label}>Owner</label>
                    <input
                        type="text"
                        name="Owner"
                        value={vehicle.Owner}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
                <div style={styles.buttonContainer}>
                    <button
                        type="submit"
                        style={styles.button}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px'
    },
    heading: {
        fontSize: '3rem',
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: '20px'
    },
    form: {
        width: '100%',
        maxWidth: '600px',
        backgroundColor: 'rgba(5, 4, 2, 0.8)',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.8)',
        padding: '20px',
        color: 'red'
    },
    formGroup: {
        marginBottom: '15px'
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold'
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        boxSizing: 'border-box'
    },
    buttonContainer: {
        textAlign: 'center'
    },
    button: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer'
    }
};

export default EditVehicle;
