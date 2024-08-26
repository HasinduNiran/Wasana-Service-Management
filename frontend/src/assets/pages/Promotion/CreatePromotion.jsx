import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import img1 from '../../images/bg02.jpg';

const CreatePromotion = () => {
  const [promotion, setPromotion] = useState({
    title: "",
    description: "",
    discount: '',
    startDate: "",
    endDate: ""
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromotion((prevPromotion) => ({
      ...prevPromotion,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8077/Promotion', promotion);
      alert("Promotion created successfully!");
      setPromotion({
        title: "",
        description: "",
        discount: '',
        startDate: "",
        endDate: ""
      });
      navigate('/Promotion'); // Navigate to promotions page after success
    } catch (error) {
      console.error("There was an error creating the promotion!", error);
      alert("Failed to create promotion. Please try again.");
    }
  };

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
      height: "540px",
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
      <div style={styles.backButton}>
        <BackButton destination="/promotion" />
      </div>
      <img src={img1} style={styles.image} alt="promotion" />
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Create Promotion</h2>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={promotion.title}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={promotion.description}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <div style={styles.flex}>
        <input
          type="date"
          name="endDate"
          value={promotion.endDate}
          onChange={handleChange}
          required
          style={styles.input}
        />
        
          <input
            type="date"
            name="startDate"
            value={promotion.startDate}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <input
            type="number"
            placeholder="Discount"
            name="discount"
            value={promotion.discount}
            onChange={handleChange}
            required
            style={styles.input}
          />
        
        <button
          type="submit"
          style={styles.submitButton}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.submitButtonHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.submitButton.backgroundColor)
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePromotion;
