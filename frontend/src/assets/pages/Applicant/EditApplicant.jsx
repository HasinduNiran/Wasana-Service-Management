import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase';

function EditApplicant() {
    const { id } = useParams(); // Extract the applicant ID from the URL parameters
    const navigate = useNavigate();

    const [applicant, setApplicant] = useState({
        image: '',
        FirstName: '',
        LastName: '',
        Number: '',
        Email: '',
        JobType: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:8077/applicant/${id}`) // Fetch the applicant details by ID
            .then((response) => {
                setApplicant(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching the applicant:', error);
                setError('Error fetching applicant details.');
                setLoading(false);
            });
    }, [id]);

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        // Validate First Name
        if (!/^[a-zA-Z]+$/.test(applicant.FirstName)) {
            errors.FirstName = 'First name cannot contain numbers, special characters, or spaces';
            isValid = false;
        }

        // Validate Last Name
        if (!/^[a-zA-Z]+$/.test(applicant.LastName)) {
            errors.LastName = 'Last name cannot contain numbers, special characters, or spaces';
            isValid = false;
        }

        

        setFormErrors(errors);
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setApplicant({
            ...applicant,
            [name]: value,
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0]; // Access the first file in the array
        const storage = getStorage(app);
        const storageRef = ref(storage, `vehicleImages/${file.name}`);

        try {
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Handle upload progress if needed
                },
                (error) => {
                    console.error('Error uploading image:', error);
                    alert('Error uploading image. Please try again.');
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setApplicant({ ...applicant, image: downloadURL });
                }
            );
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image. Please try again.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        axios
            .put(`http://localhost:8077/applicant/${id}`, applicant) // Update the applicant by ID
            .then((response) => {
                console.log('Applicant updated:', response.data);
                navigate('/applicant'); // Redirect to the applicant list page
            })
            .catch((error) => {
                console.error('Error updating the applicant:', error);
                setError('Error updating applicant.');
                setLoading(false);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const styles = {
        container: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "20px",
            fontFamily: '"Noto Sans", sans-serif',
        },
        form: {
            borderRadius: "30px",
            backgroundColor: "#1a1a1a",
            color: "#fff",
            maxWidth: "450px",
            padding: "20px",
            height: "auto",
            borderTopLeftRadius: "0px",
            borderBottomLeftRadius: "0px",
        },
        title: {
            color: "#6c1c1d",
            fontSize: "30px",
            fontWeight: "600",
            paddingLeft: "30px",
            position: "relative",
            display: "flex",
            alignItems: "center",
        },
        input: {
            backgroundColor: "#333",
            color: "#fff",
            border: "1px solid rgba(105, 105, 105, 0.397)",
            borderRadius: "10px",
            fontSize: "1rem",
            padding: "15px 8px",
            outline: "0",
            width: "100%",
            marginTop: "20px",
            marginBottom: "20px",
        },
        flex: {
            display: "flex",
            gap: "8px",
            marginTop: "15px",
        },
        submitButton: {
            border: "none",
            backgroundColor: "#6c1c1d",
            marginTop: "10px",
            outline: "none",
            padding: "10px",
            borderRadius: "10px",
            color: "#fff",
            fontSize: "16px",
            width: "100%",
            cursor: "pointer",
        },
        error: {
            color: 'red',
            fontSize: '0.875rem',
            marginTop: '10px',
        },
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h2 style={styles.title}>Edit Applicant</h2>
                <div style={styles.flex}>
                    <label>
                        <input
                            type="text"
                            name="FirstName"
                            placeholder="First Name"
                            value={applicant.FirstName}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                        {formErrors.FirstName && <div style={styles.error}>{formErrors.FirstName}</div>}
                    </label>
                    <label>
                        <input
                            type="text"
                            name="LastName"
                            placeholder="Last Name"
                            value={applicant.LastName}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                        {formErrors.LastName && <div style={styles.error}>{formErrors.LastName}</div>}
                    </label>
                </div>
                <label>
                    <input
                        type="email"
                        name="Email"
                        placeholder="Email"
                        value={applicant.Email}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </label>
                <label>
                    <input
                        type="text"
                        name="Number"
                        placeholder="Phone Number"
                        value={applicant.Number}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </label>
                <label>
                    <input
                        type="text"
                        name="JobType"
                        placeholder="Job Type"
                        value={applicant.JobType}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </label>
                <div>
                    <label>Applicant Image:</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="p-0 border border-gray-600 rounded-lg"
                    />
                </div>
                <button
                    type="submit"
                    style={styles.submitButton}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#661003f5")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#6c1c1d")}
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}

export default EditApplicant;
