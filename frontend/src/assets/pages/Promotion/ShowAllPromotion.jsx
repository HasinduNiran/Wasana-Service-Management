import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import Swal from 'sweetalert2';
import CountUp from 'react-countup';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../images/logo.png';

const ShowAllPromotion = () => {
    const [promotions, setPromotions] = useState([]);
    const [filteredPromotions, setFilteredPromotions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isCustomerOpen, setIsCustomerOpen] = useState(false);
    const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);
    const [isCompanyOpen, setIsCompanyOpen] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        const numbers = document.querySelectorAll("[countTo]");
        numbers.forEach((number) => {
            const ID = number.getAttribute("id");
            const value = number.getAttribute("countTo");
            let countUp = new CountUp(ID, value);
            if (number.hasAttribute("data-decimal")) {
                const options = {
                    decimalPlaces: 1,
                };
                countUp = new CountUp(ID, value, options);
            }
            if (!countUp.error) {
                countUp.start();
            } else {
                console.error(countUp.error);
                number.innerHTML = value;
            }
        });
    }, []);

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:8077/Promotion");
                setPromotions(response.data);
                setFilteredPromotions(response.data);
            } catch (error) {
                setError("Failed to fetch promotions.");
                console.error("Error fetching promotions", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPromotions();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = promotions.filter(
            (promo) =>
                new Date(promo.endDate) >= new Date() &&
                (promo.title.toLowerCase().includes(query.toLowerCase()) ||
                    promo.description.toLowerCase().includes(query.toLowerCase()))
        );
        setFilteredPromotions(filtered);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this promotion?")) {
            try {
                await axios.delete(`http://localhost:8077/Promotion/${id}`);
                setPromotions(promotions.filter((promotion) => promotion._id !== id));
                alert("Promotion deleted successfully!");
            } catch (error) {
                console.error("Error deleting promotion", error);
                alert("Failed to delete promotion. Please try again.");
            }
        }
    };

    const generateReport = () => {
        const doc = new jsPDF();
        doc.text("Promotion Report", 14, 16);

        doc.autoTable({
            startY: 22,
            head: [["Title", "Description", "Discount (%)", "Start Date", "End Date"]],
            body: filteredPromotions.map((promotion) => [
                promotion.title,
                promotion.description,
                promotion.discount,
                new Date(promotion.startDate).toLocaleDateString(),
                new Date(promotion.endDate).toLocaleDateString(),
            ]),
        });

        doc.save("promotion-report.pdf");
    };

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
    };

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
            <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3 flex items-center space-x-3">
                                <a href="/dashborad" className="flex items-center space-x-3">
                                   <i className="bx bx-home-alt text-xl"></i>
                                      <span>Dashboard</span>
                                      </a>
                                </li>
                
                {/* Customer Details Dropdown */}
                <li 
                    className="text-gray-400 hover:bg-gray-700 hover:text-white p-3 flex items-center justify-between cursor-pointer"
                    onClick={() => setIsCustomerOpen(!isCustomerOpen)}
                >
                    <div className="flex items-center space-x-3">
                        <i className="bx bx-user text-xl"></i>
                        <span>Customer :</span>
                    </div>
                    <i className={`bx bx-chevron-${isCustomerOpen ? 'up' : 'down'} text-xl`}></i>
                </li>
                {isCustomerOpen && (
                    <ul className="ml-8">
                        <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3">
                            <Link to="/Customer">Customer Details</Link>
                        </li>
                        <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3">
                            <Link to="/feedback">Feedback</Link>
                        </li>
                        <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3">
                            <Link to="/ServiceHistory">Service History</Link>
                        </li>
                        <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3">
                            <Link to="/Repair">Repair</Link>
                        </li>
                        <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3">
                            <Link to="/vehicles">Vehicle</Link>
                        </li>
                        <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3">
                            <Link to="/Inquire">Inquire</Link>
                        </li>
                    </ul>
                )}

                {/* Employee Details Dropdown */}
                <li 
                    className="text-gray-400 hover:bg-gray-700 hover:text-white p-3 flex items-center justify-between cursor-pointer"
                    onClick={() => setIsEmployeeOpen(!isEmployeeOpen)}
                >
                    <div className="flex items-center space-x-3">
                        <i className="bx bx-id-card text-xl"></i>
                        <span>Employee :</span>
                    </div>
                    <i className={`bx bx-chevron-${isEmployeeOpen ? 'up' : 'down'} text-xl`}></i>
                </li>
                {isEmployeeOpen && (
                    <ul className="ml-8">
                        <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3">
                            <Link to="/Employee">Employee Details</Link>
                        </li>
                        <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3">
                            <Link to="/EmployeeAttendence">Employee Attendances</Link>
                        </li>
                        <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3">
                            <Link to="/EmployeeSalary">Employee Salary</Link>
                        </li>
                        <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3">
                            <Link to="/applicant">Applicant</Link>
                        </li>
                    </ul>
                )}

                {/* Company Details Dropdown */}
                <li 
                    className="text-gray-400 hover:bg-gray-700 hover:text-white p-3 flex items-center justify-between cursor-pointer"
                    onClick={() => setIsCompanyOpen(!isCompanyOpen)}
                >
                    <div className="flex items-center space-x-3">
                        <i className="bx bx-id-card text-xl"></i>
                        <span>Company :</span>
                    </div>
                    <i className={`bx bx-chevron-${isCompanyOpen ? 'up' : 'down'} text-xl`}></i>
                </li>
                {isCompanyOpen && (
                    <ul className="ml-8">
                        <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3">
                            <Link to="/Promotion">Promotion</Link>
                        </li>
                        <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3">
                            <Link to="/Store">Store</Link>
                        </li>
                        <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3">
                            <Link to="/vacancy">Vacancy</Link>
                        </li>
                    </ul>
                )}
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
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        <button
                            className="mt-1 ml-3 inline-block px-8 py-2.5 text-white bg-gray-800 text-sm uppercase rounded-full shadow-lg transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg active:translate-y-px active:shadow-md"
                            onClick={generateReport}
                        >
                            Generate Report
                        </button>
                        {/* Dark Mode Toggle Button */}
                        <button
                            className="mt-1 ml-3 inline-block px-8 py-2.5 text-white bg-gray-800 text-sm uppercase rounded-full shadow-lg transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg active:translate-y-px active:shadow-md"
                            onClick={toggleDarkMode}
                        >
                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>
                    </div>
                </header>
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
                    <div className="flex flex-col items-center">
                        <h3 className="text-5xl font-extrabold text-dark-grey-900">
                            <CountUp id="countto1" end={250} />
                            +
                        </h3>
                        <p className="text-base font-medium text-dark-grey-600">Successful Projects</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-5xl font-extrabold text-dark-grey-900">
                            <CountUp id="countto2" end={1200} />
                            +
                        </h3>
                        <p className="text-base font-medium text-dark-grey-600">Happy Customers</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-5xl font-extrabold text-dark-grey-900">
                            <CountUp id="countto3" end={150} />
                            +
                        </h3>
                        <p className="text-base font-medium text-dark-grey-600">Employees</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-5xl font-extrabold text-dark-grey-900">
                            <CountUp id="countto4" end={350} />
                            +
                        </h3>
                        <p className="text-base font-medium text-dark-grey-600">Awards Won</p>
                    </div>
                </div>
                {/* Table Section */}
                <div className={`p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                    <h2 className="text-xl font-semibold mb-4">Promotions</h2>
                    <table className={`min-w-full ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">Title</th>
                                <th className="px-4 py-2 border">Description</th>
                                <th className="px-4 py-2 border">Discount (%)</th>
                                <th className="px-4 py-2 border">Start Date</th>
                                <th className="px-4 py-2 border">End Date</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPromotions.map((promotion, index) => (
                                <tr
                                    key={promotion._id}
                                    className={index % 2 === 0 ? (darkMode ? 'bg-gray-700' : 'bg-gray-100') : (darkMode ? 'bg-gray-800' : 'bg-white')}
                                >
                                    <td className='border px-4 py-2'>{promotion.title}</td>
                                    <td className='border px-4 py-2'>{promotion.description}</td>
                                    <td className='border px-4 py-2'>{promotion.discount}</td>
                                    <td className='border px-4 py-2'>{new Date(promotion.startDate).toLocaleDateString()}</td>
                                    <td className='border px-4 py-2'>{new Date(promotion.endDate).toLocaleDateString()}</td>
                                    <td className='border px-4 py-2 flex justify-center items-center space-x-2'>
                                        <Link to={`/Promotion/${promotion._id}`} className="text-blue-500">
                                            <BsInfoCircle />
                                        </Link>
                                        <Link to={`/Promotion/edit/${promotion._id}`} className="text-blue-500">
                                            <AiOutlineEdit />
                                        </Link>
                                        <button
                                            type="button"
                                            className="text-red-500"
                                            onClick={() => handleDelete(promotion._id)}
                                        >
                                            <MdOutlineDelete />
                                        </button>
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

export default ShowAllPromotion;
