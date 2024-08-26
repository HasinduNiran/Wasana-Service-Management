import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import img1 from '../../images/bg02.jpg';
function EditFeedback() {
    const { id } = useParams(); // Get the feedback ID from the route parameters
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState({
        cusID: '',
        name: '',
        email: '',
        phone_number: '',
        employee: '',
        message: '',
        star_rating: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:8077/feedback/${id}`) // Adjust the API endpoint as necessary
            .then((response) => {
                setFeedback(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching feedback:', error);
                setError('Error fetching feedback.');
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeedback({
            ...feedback,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        axios
            .put(`http://localhost:8077/feedback/${id}`, feedback) // Adjust the API endpoint as necessary
            .then((response) => {
                console.log('Feedback updated:', response.data);
                navigate('/feedback'); // Redirect to the feedback list or another page after update
            })
            .catch((error) => {
                console.error('Error updating feedback:', error);
                setError('Error updating feedback.');
                setLoading(false);
            });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    const styles = {
        container: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "20px",
          fontFamily: '"Noto Sans", sans-serif',
        },
        backButton: {
          marginBottom: "50%",
          marginLeft: "-80%",
          position: "absolute",
        },
        image: {
          borderRadius: "30px",
          maxWidth: "240px",
          padding: "0px",
          height: "620px",
          borderTopRightRadius: "0px",
          borderBottomRightRadius: "0px",
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
        submitButtonHover: {
          backgroundColor: "#661003f5",
        },
      };


    return (
        <div style={styles.container}>
            <BackButton destination={`/vacancy`} style={styles.backButton} />
      <img
        src={img1}
        style={styles.image}
        alt="car"
      />
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Create Feedback</h2>
                <div style={styles.flex}>
                <input
                    type="text"
                    name="cusID"
                    placeholder="Customer ID"
                    value={feedback.cusID}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={feedback.name}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                </div>
                 <div style={styles.flex}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={feedback.email}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={feedback.phone_number}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                </div>
                <div style={styles.flex}>
                <input
                    type="text"
                    name="employee"
                    placeholder="Employee"
                    value={feedback.employee}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
               
            
                <input
                    type="number"
                    name="star_rating"
                
                    value={feedback.star_rating}
                    onChange={handleChange}
                    placeholder=" Star Rating"
                    required
                    style={styles.input}
                    min="0"
                    max="5"
                />
                </div>
                <textarea
                    name="message"
                    placeholder="Message"
                    value={feedback.message}
                    onChange={handleChange}
                    required
                    style={{ ...styles.input, height: '100px' }}
                />
                <button
                    type="submit"
                    style={styles.submitButton}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = styles.submitButtonHover.backgroundColor)
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = styles.submitButton.backgroundColor)
                    }
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}

export default EditFeedback;
