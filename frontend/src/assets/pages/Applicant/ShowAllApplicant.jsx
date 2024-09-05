import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // To use autoTable

const ShowApplicant = () => {
    // State and refs initialization
    const [applicants, setApplicants] = useState([]);
    const [filteredApplicants, setFilteredApplicants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const componentRef = useRef();

    // Initial fetch of Applicant data
    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:8077/applicant")
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setApplicants(response.data);
                    setFilteredApplicants(response.data); // Set filtered applicants initially
                } else {
                    console.error("Unexpected response format:", response.data);
                    setApplicants([]);
                    setFilteredApplicants([]);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching applicants:", error);
                setLoading(false);
                setApplicants([]);
                setFilteredApplicants([]);
            });
    }, []);

    // Search functionality
    const handleSearch = () => {
        const filtered = applicants.filter((applicant) =>
            applicant.FirstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            applicant.LastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            applicant.Email.toLowerCase().includes(searchQuery.toLowerCase())||
            applicant.Number.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredApplicants(filtered);
    };

    useEffect(() => {
        handleSearch();
    }, [searchQuery]);

    // Function to generate a PDF report of applicants using jsPDF and autoTable
    const generateApplicantPDF = (applicants) => {
        const doc = new jsPDF(); // Initialize jsPDF document
        const tableColumn = [
            "No", "First Name", "Last Name", "Number", "Email", "Job Type"
        ]; // Define the columns for the PDF table
        const tableRows = [];

        // Loop through applicants and format the rows for the PDF
        applicants.forEach((applicant, index) => {
            const data = [
                index + 1,
                applicant.FirstName,
                applicant.LastName,
                applicant.Number,
                applicant.Email,
                applicant.JobType,
            ];
            tableRows.push(data); // Add each applicant's data as a row
        });

        const date = new Date().toLocaleDateString(); // Get the current date for the report

        // Add title and date to the PDF
        doc.setFontSize(28).setTextColor("red").text("Applicant Report", 60, 15);
        doc.setFontSize(20).setTextColor(0, 0, 0).text("Details", 65, 25);
        doc.setFontSize(15).setTextColor(100, 100, 100).text(`Date: ${date}`, 65, 35);
        
        // Add table to the PDF
        doc.autoTable({
            head: [tableColumn], // Table column headers
            body: tableRows, // Table rows (data)
            startY: 50, // Start position of the table
            styles: { fontSize: 9 }, // Table text styles
            headStyles: {
                fillColor: [31, 41, 55], // Header background color
                textColor: [255, 255, 255], // Header text color
                fontStyle: "bold",
            },
        });

        // Save the generated PDF
        doc.save(`Applicant-Report_${date}.pdf`);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8077/applicant/${id}`)
                    .then(response => {
                        if (response.status === 200) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "The applicant has been deleted.",
                                icon: "success"
                            }).then(() => {
                                // Refresh the page after successful deletion
                                window.location.reload();
                            });
                        } else {
                            Swal.fire({
                                title: "Error!",
                                text: "Failed to delete applicant.",
                                icon: "error"
                            });
                        }
                    })
                    .catch(error => {
                        console.error("Error deleting applicant:", error);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete applicant.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    // Inline styles for components
    const styles = {
        container: {
            color: 'black',
            border: '3px solid white',
            backgroundImage: 'url(${backgroundImage})',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        },
        navButton: {
            backgroundColor: 'red',
            color: 'white',
            padding: '0.5rem 2rem',
            borderRadius: '5px',
            width: '220px',
            textDecoration: 'none',
            height: '50px',
            marginTop: '15px'
        },
        logo: {
            width: '100%',
            height: '200px',
            border: '2px solid red'
        },
        table: {
            width: '300px',
            margin: '0 auto',
            padding: '20px',
            background: 'lightgray',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
            fontFamily: 'Arial, sans-serif',
            color: '#fff',
            background: '#1f1f1f',
        },
        tableHead: {
            background: '#333',
            color: 'red',
            textAlign: 'center',
        },
        tableHeader: {
            padding: '10px',
            textAlign: 'left',
            color: 'red',
            border: '1px solid red',
        },
        tableRowEven: {
            background: '#2f2f2f',
        },
        tableRowOdd: {
            background: '#1f1f1f',
        },
        tableCell: {
            padding: '10px',
            textAlign: 'left',
            borderLeft: '1px solid red', // Adding left border
            borderRight: '1px solid red',
            background: '#1f1f1f',
            color: 'white',
        },
        subHeading: {
            marginTop: '20px',
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#fff',
            textAlign: 'center',
            textTransform: 'uppercase',
        },
    };

    return (
        <div style={styles.container} className="p-4" ref={componentRef}>
            <h1 style={styles.subHeading} className="text-3xl mb-8">Applicant List</h1>
            <div className="mb-4">
                <div className="flex items-center mb-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="form-control"
                        style={{ marginRight: '10px' }}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
                <div className="flex justify-end items-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location.href = '/applicant/create'}>
                        Add Applicant
                    </button>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4" onClick={() => generateApplicantPDF(filteredApplicants)}>
                        Generate Report
                    </button>
                </div>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <table style={styles.table} className="w-full border-separate border-spacing-2" ref={componentRef}>
                    <thead>
                        <tr style={styles.tableHead}>
                            <th style={styles.tableHeader} className="border border-slate-600 rounded-md">No</th>
                            <th style={styles.tableHeader} className="border border-slate-600 rounded-md">First Name</th>
                            <th style={styles.tableHeader} className="border border-slate-600 rounded-md">Last Name</th>
                            <th style={styles.tableHeader} className="border border-slate-600 rounded-md">Number</th>
                            <th style={styles.tableHeader} className="border border-slate-600 rounded-md">Email</th>
                            <th style={styles.tableHeader} className="border border-slate-600 rounded-md">Job Type</th>
                            <th style={styles.tableHeader} className="border border-slate-600 rounded-md">Image</th>
                            <th style={styles.tableHeader} className="border border-slate-600 rounded-md">Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredApplicants.map((applicant, index) => (
                            <tr key={applicant._id} className="h-8" style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                                <td style={styles.tableCell}>{index + 1}</td>
                                <td style={styles.tableCell}>{applicant.FirstName}</td>
                                <td style={styles.tableCell}>{applicant.LastName}</td>
                                <td style={styles.tableCell}>{applicant.Number}</td>
                                <td style={styles.tableCell}>{applicant.Email}</td>
                                <td style={styles.tableCell}>{applicant.JobType}</td>
                                <td style={styles.tableCell}>
                                    {applicant.image ? (
                                        <img
                                            src={applicant.image}
                                            className='w-20 h-20 object-cover'
                                        />
                                    ) : (
                                        'No Image'
                                    )}
                                </td>
                                <td style={styles.tableCell}>
                                    <div className="flex justify-center gap-x-4">
                                        <Link to={`/applicant/get/${applicant._id}`}>
                                            <BsInfoCircle className="text-2xl text-green-800" />
                                        </Link>
                                        <Link to={`/applicant/edit/${applicant._id}`}>
                                            <AiOutlineEdit className="text-2xl text-yellow-600" />
                                        </Link>
                                        <button onClick={() => handleDelete(applicant._id)}>
                                            <MdOutlineDelete className="text-2xl text-red-600" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ShowApplicant;
