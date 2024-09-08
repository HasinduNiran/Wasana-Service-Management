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

const ShowAllServiceHistory = () => {
    const [serviceHistories, setServiceHistories] = useState([]);
    const [filteredHistories, setFilteredHistories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isCustomerOpen, setIsCustomerOpen] = useState(false);
    const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);
    const [isCompanyOpen, setIsCompanyOpen] = useState(false);

    const styles = {
        tableRowEven: {
            backgroundColor: '#f9f9f9',
        },
        tableRowOdd: {
            backgroundColor: '#ffffff',
        },
        actionIcons: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
        },
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        const fetchServiceHistories = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8077/ServiceHistory');
                setServiceHistories(response.data.service);
                setFilteredHistories(response.data.service);
            } catch (error) {
                console.error("There was an error fetching the service histories!", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServiceHistories();
    }, []);

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = serviceHistories.filter((history) =>
            history.Customer_Name.toLowerCase().includes(query) ||
            history.Customer_Email.toLowerCase().includes(query) ||
            history.Vehicle_Number.toLowerCase().includes(query) ||
            history.Package.toLowerCase().includes(query) ||
            history.Booking_Id.toLowerCase().includes(query)
        );
        setFilteredHistories(filtered);
    };

    const generateReport = () => {
        const doc = new jsPDF();
        doc.text('Service History Report', 14, 16);

        const tableData = filteredHistories.map(history => [
            history.Customer_Name,
            history.Customer_Email,
            history.Allocated_Employee,
            history.Vehicle_Number,
            history.Service_History,
            new Date(history.Service_Date).toLocaleDateString(),
            history.Milage,
            history.Package,
            history.selectedServices.join(", "),
            history.Booking_Id,
            new Date(history.nextService).toLocaleDateString()
        ]);

        doc.autoTable({
            head: [['Customer Name', 'Email', 'Employee', 'Vehicle No', 'Service History', 'Service Date', 'Mileage', 'Package', 'Selected Services', 'Booking ID', 'Next Service']],
            body: tableData,
            startY: 30,
            margin: { horizontal: 10 },
            styles: { fontSize: 10 },
        });

        doc.save('service_history_report.pdf');
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this service history?")) {
            try {
                await axios.delete(`http://localhost:8077/ServiceHistory/${id}`);
                setServiceHistories(serviceHistories.filter((history) => history._id !== id));
                setFilteredHistories(filteredHistories.filter((history) => history._id !== id));
                alert("Service history deleted successfully!");
            } catch (error) {
                console.error("There was an error deleting the service history!", error);
                alert("Failed to delete service history. Please try again.");
            }
        }
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
                        </h3>
                        <span>Total Customers</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <h3 className="text-5xl font-extrabold text-dark-grey-900">
                            <CountUp id="countto2" end={120} />
                        </h3>
                        <span>Service History</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-5xl font-extrabold text-dark-grey-900">
                            <CountUp id="countto3" end={110} />
                        </h3>
                        <span>Employees</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <h3 className="text-5xl font-extrabold text-dark-grey-900">
                            <CountUp id="countto4" end={50} />
                        </h3>
                        <span>Total Services</span>
                    </div>
                </div>

                <div className="p-1 overflow-y-scroll max-w-7xl">
                    <table className="max-w-full table-auto border-collapse bg-white">
                        <thead>
                            <tr>
                                <th className="px-6 py-4 text-left">Customer Name</th>
                                <th className="px-6 py-4 text-left">Email</th>
                                <th className="px-6 py-4 text-left">Allocated Employee</th>
                                <th className="px-6 py-4 text-left">Vehicle Number</th>
                                <th className="px-6 py-4 text-left">Service History</th>
                                <th className="px-6 py-4 text-left">Service Date</th>
                                <th className="px-6 py-4 text-left">Mileage</th>
                                <th className="px-6 py-4 text-left">Package</th>
                                <th className="px-6 py-4 text-left">Selected Services</th>
                                <th className="px-6 py-4 text-left">Booking ID</th>
                                <th className="px-6 py-4 text-left">Next Service Date</th>
                                <th className="px-6 py-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredHistories.length === 0 ? (
                                <tr>
                                    <td colSpan="12" className="px-6 py-4 text-center">No Service Histories Found</td>
                                </tr>
                            ) : (
                                filteredHistories.map((history, index) => (
                                    <tr
                                        key={history._id}
                                        style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}
                                    >
                                        <td className="px-6 py-4">{history.Customer_Name}</td>
                                        <td className="px-6 py-4">{history.Customer_Email}</td>
                                        <td className="px-6 py-4">{history.Allocated_Employee}</td>
                                        <td className="px-6 py-4">{history.Vehicle_Number}</td>
                                        <td className="px-6 py-4">{history.Service_History}</td>
                                        <td className="px-6 py-4">{new Date(history.Service_Date).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">{history.Milage}</td>
                                        <td className="px-6 py-4">{history.Package}</td>
                                        <td className="px-6 py-4">{history.selectedServices.join(", ")}</td>
                                        <td className="px-6 py-4">{history.Booking_Id}</td>
                                        <td className="px-6 py-4">{new Date(history.nextService).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">
                                            <div style={styles.actionIcons}>
                                                 <Link to={`/ServiceHistory/${history._id}`}>
                                                <BsInfoCircle className="text-2xl text-green-800" />
                                            </Link>
                                            <Link to={`/ServiceHistory/edit/${history._id}`}>
                                                <AiOutlineEdit className="text-2xl text-yellow-600" />
                                            </Link>
                                            <button onClick={() => handleDelete(history._id)}>
                                                <MdOutlineDelete className="text-2xl text-red-600" />
                                            </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ShowAllServiceHistory;
