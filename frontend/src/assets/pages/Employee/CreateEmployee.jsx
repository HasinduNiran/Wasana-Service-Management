import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import BackButton from "../../components/BackButton";
import img1 from '../../images/bg02.jpg';
import Navbar from '../Navbar/Navbar'
import Footer from '../footer/Footer'
const CreateEmployee = () => {
    const [EmpID, setEmpID] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [DOB, setDOB] = useState("");
    const [NIC, setNIC] = useState("");
    const [Address, setAddress] = useState("");
    const [BasicSalary, setBasicSalary] = useState("");
    const [ContactNo, setContactNo] = useState("");
    const [Email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        // NIC validation
        const nicRegex = /^(\d{12}|\d{11}V)$/;
        if (!nicRegex.test(NIC)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid NIC',
                text: 'NIC should contain exactly 12 digits or 11 digits followed by the letter "V", with no spaces or special characters.',
            });
            return false;
        }

        // Phone number validation
        const phoneRegex = /^0\d{9}$/;
        if (!phoneRegex.test(ContactNo)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Phone Number',
                text: 'Phone number should be a 10-digit number starting with 0.',
            });
            return false;
        }

        // Employee name validation
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(employeeName)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Employee Name',
                text: 'Employee name cannot contain numbers or special characters (spaces are allowed).',
            });
            return false;
        }

        // Date of Birth validation
        const dob = new Date(DOB);
        const today = new Date();
        if (dob >= today) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Date of Birth',
                text: 'Date of Birth should be a previous day.',
            });
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const data = {
            EmpID,
            employeeName,
            DOB,
            NIC,
            Address,
            BasicSalary,
            ContactNo,
            Email,
        };

        setLoading(true);
        try {
            await axios.post("http://localhost:8077/Employee", data);
            setLoading(false);
            navigate("/Employee");
        } catch (error) {
            setLoading(false);
            console.error("Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while creating the employee.',
            });
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
            height: "585px",
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
        <div className=""><Navbar/>
        <div style={styles.container}>
           
            <img
                src={img1}
                style={styles.image}
                alt="background"
            />
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Add Employee</h2>
                <div style={styles.flex}>
                    <input
                        type="text"
                        placeholder="Employee ID"
                        value={EmpID}
                        onChange={(e) => setEmpID(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Employee Name"
                        value={employeeName}
                        onChange={(e) => setEmployeeName(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.flex}>
                    <input
                        type="email"
                        value={Email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="NIC"
                        value={NIC}
                        onChange={(e) => setNIC(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.flex}>
                    <input
                        type="text"
                        placeholder="Address"
                        value={Address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="number"
                        value={BasicSalary}
                        placeholder="Basic Salary"
                        onChange={(e) => setBasicSalary(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.flex}>
                    <input
                        type="text"
                        placeholder="Contact Number"
                        value={ContactNo}
                        onChange={(e) => setContactNo(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="date"
                        placeholder="DOB"
                        value={DOB}
                        onChange={(e) => setDOB(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
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
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
        <Footer/>
        </div>
    );
};

export default CreateEmployee;
