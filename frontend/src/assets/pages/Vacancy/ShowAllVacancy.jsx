import React, { useState, useEffect } from 'react';
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import Swal from 'sweetalert2';
import CountUp from 'react-countup'; 
import jsPDF from 'jspdf'; 
import 'jspdf-autotable'; 
import logo from '../../images/logo.png';

const ShowVacancy = () => {
    const [vacancy, setVacancy] = useState([]);
    const [filteredVacancy, setFilteredVacancy] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const styles = {
        tableRowEven: {
            backgroundColor: '#f9f9f9',
        },
        tableRowOdd: {
            backgroundColor: '#ffffff',
        },
        image: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
        },
        actionIcons: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
        },
        tableCell: {
            padding: '16px',
            textAlign: 'left',
            borderBottom: '1px solid #e5e7eb',
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:8077/vacancy")
            .then((response) => {
                setVacancy(response.data);
                setFilteredVacancy(response.data); // Initialize filtered data
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = vacancy.filter(
            (item) =>
                item.Name.toLowerCase().includes(query) ||
                item.Description.toLowerCase().includes(query)
        );
        setFilteredVacancy(filtered);
    };

    useEffect(() => {
        handleSearch({ target: { value: searchQuery } });
    }, [searchQuery]);

    const generateReport = () => {
        const doc = new jsPDF();
        doc.text("Vacancy Report", 14, 16);

        const tableData = filteredVacancy.map((item, index) => [
            index + 1,
            item.Name,
            item.Description,
        ]);

        doc.autoTable({
            head: [["No", "Name", "Description"]],
            body: tableData,
            startY: 30,
            margin: { horizontal: 10 },
            styles: { fontSize: 10 },
        });

        doc.save("vacancy_report.pdf");
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`http://localhost:8077/vacancy/${id}`)
                    .then((response) => {
                        if (response.status === 200) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                            }).then(() => {
                                setVacancy((prevVacancies) =>
                                    prevVacancies.filter((vacancyItem) => vacancyItem._id !== id)
                                );
                                setFilteredVacancy((prevVacancies) =>
                                    prevVacancies.filter((vacancyItem) => vacancyItem._id !== id)
                                );
                            });
                        } else {
                            Swal.fire({
                                title: "Error!",
                                text: "Failed to delete item.",
                                icon: "error",
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error deleting item:", error);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete item.",
                            icon: "error",
                        });
                    });
            }
        });
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            {/* Sidebar */}
            {sidebarOpen && (
                <aside className="w-64 bg-gray-800 text-white flex flex-col">
                    <div className="flex items-center justify-center h-16 bg-gray-800">
                        <img src={logo} alt="logo" style={{ width: '60px', height: '60px' }} />
                    </div>
                    <nav className="flex-1">
                        <ul className="mt-2">
                            {/* Sidebar items */}
                            {/* Use similar structure for other sidebar items */}
                            <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3 flex items-center space-x-3">
                                <i className="bx bx-home-alt text-xl"></i>
                                <span>Dashboard</span>
                            </li>
                            <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3 flex items-center space-x-3">
                                <i className="bx bx-group text-xl"></i>
                                <span>Team</span>
                            </li>
                            {/* Add more items as needed */}
                        </ul>
                    </nav>
                    <div className="p-3">
                        <button className="w-full flex items-center p-3 bg-gray-800 rounded hover:bg-gray-700">
                            <i className="bx bx-cog text-xl"></i>
                            <span className="ml-4">Settings</span>
                        </button>
                    </div>
                </aside>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Navbar */}
                <header className="flex items-center justify-between bg-white h-16 px-4 shadow">
                    <div className="flex items-center">
                        <i className="bx bx-menu text-xl cursor-pointer" onClick={toggleSidebar}></i>
                        <input
                            type="search"
                            placeholder="Search..."
                            className="ml-4 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <button
                            className="mt-1 ml-3 inline-block px-8 py-2.5 text-white bg-gray-800 text-sm uppercase rounded-full shadow-lg transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg active:translate-y-px active:shadow-md"
                            onClick={generateReport}
                        >
                            Generate Report
                        </button>
                        <button
                            className="mt-1 ml-3 inline-block px-8 py-2.5 text-white bg-gray-800 text-sm uppercase rounded-full shadow-lg transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg active:translate-y-px active:shadow-md"
                            onClick={toggleDarkMode}
                        >
                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <i className="bx bx-bell text-xl"></i>
                        <div className="flex items-center space-x-2">
                            <img
                                src="https://randomuser.me/api/portraits/men/11.jpg"
                                alt="user"
                                className="h-8 w-8 rounded-full"
                            />
                            <span>Tom Cook</span>
                            <i className="bx bx-chevron-down text-xl"></i>
                        </div>
                    </div>
                </header>
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
                    <div className="flex flex-col items-center">
                        <h3 className="text-5xl font-extrabold text-dark-grey-900">
                            <CountUp id="countto1" end={250} />
                            +
                        </h3>
                        <p className="text-base font-medium text-dark-grey-600">Total Vacancies</p>
                    </div>
                    {/* Add similar components for other counters */}
                </div>

                <div className="flex-1 p-6 overflow-x-auto">
                    <table className="w-full border-collapse bg-white shadow-md">
                        <thead className="bg-gray-200">
                            <tr>
                                <th style={styles.tableCell}>ID</th>
                                <th style={styles.tableCell}>Name</th>
                                <th style={styles.tableCell}>Description</th>
                                <th style={styles.tableCell}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVacancy.map((vacancyItem, index) => (
                                <tr key={vacancyItem._id} style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                                    <td style={styles.tableCell}>{vacancyItem._id}</td>
                                    <td style={styles.tableCell}>{vacancyItem.Name}</td>
                                    <td style={styles.tableCell}>{vacancyItem.Description}</td>
                                    <td style={styles.tableCell}>
                                        <div style={styles.actionIcons}>
                                             <Link to={`/vacancy/get/${vacancyItem._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/vacancy/edit/${vacancyItem._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600" />
                    </Link>
                    <button onClick={() => handleDelete(vacancyItem._id)}>
                      <MdOutlineDelete className="text-2xl text-red-600" />
                    </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ShowVacancy;
