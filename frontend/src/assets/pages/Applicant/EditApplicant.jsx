import React, { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import BackButton from "../../components/BackButton";
import img1 from "../../images/bg02.jpg";

const EditApplicant = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [jobType, setJobType] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8077/applicant/${id}`)
      .then((response) => {
        const data = response.data;
        setFirstName(data.FirstName);
        setLastName(data.LastName);
        setNumber(data.Number);
        setEmail(data.Email);
        setJobType(data.JobType);
        setMessage(data.Message);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error happened. Please check the console.",
        });
        console.log(error);
      });
  }, [id]);

  const validateForm = () => {
    const errors = [];
    if (!firstName.trim()) {
      errors.push("First name is required");
    }
    if (!lastName.trim()) {
      errors.push("Last name is required");
    }
    if (!number.trim()) {
      errors.push("Phone number is required");
    } else if (!/^0\d{9}$/.test(number)) {
      errors.push("Phone number must start with 0 and be 10 digits");
    }
    if (!email.trim()) {
      errors.push("Email is required");
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      errors.push("Invalid email format");
    }
    if (!jobType.trim()) {
      errors.push("Job type is required");
    }
    if (!message.trim()) {
      errors.push("Message is required");
    }
    if (errors.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        html: errors.map((error) => `<p>${error}</p>`).join(""),
      });
      return false;
    }
    return true;
  };

  const handleEditApplicant = () => {
    if (!validateForm()) {
      return;
    }

    const data = {
      FirstName: firstName,
      LastName: lastName,
      Number: number,
      Email: email,
      JobType: jobType,
      Message: message,
    };

    setLoading(true);

    axios
      .put(`http://localhost:8077/applicant/${id}`, data)
      .then(() => {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Applicant data updated successfully!",
        }).then(() => {
          navigate("/applicant");
        });
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error happened. Please check the console.",
        });
        console.log(error);
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.backButton}>
        <BackButton destination="/applicant" />
      </div>
      <img src={img1} style={styles.image} alt="car" />
      <form style={styles.form}>
       
        <h2 style={styles.title}>Edit Applicant</h2>
        <div style={styles.flex}>
          <label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              style={styles.input}
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              style={styles.input}
            />
          </label>
        </div>
        <label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </label>
        <label>
          <input
            type="number"
            placeholder="Phone Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
            style={styles.input}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Job Type"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            required
            style={styles.input}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            style={styles.input}
          />
        </label>
        <button style={styles.submitButton} onClick={handleEditApplicant}>
          Submit
        </button>
      </form>
    </div>
  );
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
    height: "632px",
    borderTopRightRadius: "0px",
    borderBottomRightRadius: "0px",
  },
  form: {
    borderRadius: "30px",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    maxWidth: "360px",
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

export default EditApplicant;
