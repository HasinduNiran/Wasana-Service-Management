import React, { useState, useEffect } from 'react';
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import Swal from 'sweetalert2';
import CountUp from 'react-countup'; // Added import for CountUp
import jsPDF from 'jspdf'; // Added import for jsPDF
import 'jspdf-autotable'; // Added import for jsPDF autotable
import logo from '../../images/logo.png';

const ShowService = () => {
    // State initialization
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(false); // Added darkMode state
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState(""); // Added searchQuery state
    const [isCustomerOpen, setIsCustomerOpen] = useState(false);
    const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);
    const [isCompanyOpen, setIsCompanyOpen] = useState(false);
    // Styles for even and odd rows
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

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Initialize CountUp on mount for stats
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
        setLoading(true);
        fetchServices();
      }, []);
      const fetchServices = () => {
        axios
          .get('http://localhost:8077/Service')
          .then((response) => {
            setServices(response.data.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error.message);
            setLoading(false);
          });
      };

 

    

      const handleDeleteService = (id) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`http://localhost:8076/Service/${id}`)
              .then(response => {
                if (response.status === 200) {
                  Swal.fire({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    icon: 'success'
                  }).then(() => {
                    // Update the service list after successful deletion
                    fetchServices();
                  });
                } else {
                  Swal.fire({
                    title: 'Error!',
                    text: 'Failed to delete service.',
                    icon: 'error'
                  });
                }
              })
              .catch(error => {
                console.error('Error deleting service:', error);
                Swal.fire({
                  title: 'Error!',
                  text: 'Failed to delete service.',
                  icon: 'error'
                });
              });
          }
        });
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
                       
                        <button 
                            className="mt-1 ml-3 inline-block px-8 py-2.5 text-white bg-gray-800 text-sm uppercase rounded-full shadow-lg transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg active:translate-y-px active:shadow-md"
                            onClick={toggleDarkMode}
                        >
                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>
                       
                            <button class="mt-1 ml-3 inline-block px-8 py-2.5 text-white bg-gray-800 text-sm uppercase rounded-full shadow-lg transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg active:translate-y-px active:shadow-md"  >
                                <Link to="/Booking/create">Create Booking</Link>
                             </button>   
                    </div>
                </header>

                {/* Main Content */}
                  {/* Stats Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6">
                    <div className="flex flex-col items-center">
                        <h3 className="text-5xl font-extrabold text-dark-grey-900">
                            <CountUp id="countto1" end={250} />
                            +
                        </h3>
                        <p className="text-base font-medium text-dark-grey-600">Successful Projects</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-5xl font-extrabold text-dark-grey-900">
                            $<CountUp id="countto2" end={12} />
                            m
                        </h3>
                        <p className="text-base font-medium text-dark-grey-600">Annual Revenue Growth</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-5xl font-extrabold text-dark-grey-900">
                            <CountUp id="countto3" end={2600} />
                            k+
                        </h3>
                        <p className="text-base font-medium text-dark-grey-600">Global Partners</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-5xl font-extrabold text-dark-grey-900">
                            <CountUp id="countto4" end={18000} />
                            +
                        </h3>
                        <p className="text-base font-medium text-dark-grey-600">Daily Website Visitors</p>
                    </div>
                </div>
                <main className="flex-1 p-6">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-gray-200">Booking List</div>
                            
                        </div> 
                        <div className="bg-white shadow-lg hover:shadow-xl rounded overflow-hidden">
                            <table className="table table-auto min-w-full leading-normal">
                                <thead className="uppercase font-semibold text-xs text-gray-600 bg-gray-200">
                                    <tr>
                                        <th className="text-left p-2">Booking ID</th>
                                        <th className="text-left p-2">Booking Date</th>
                                        <th className="text-left p-2">Customer Name</th>
                                        <th className="text-left p-2">Vehicle Type</th>
                                        <th className="text-left p-2">Vehicle Number</th>
                                        <th className="text-left p-2">Contact Number</th>
                                        <th className="text-left p-2">Email</th>
                                        <th className="text-left p-2">Selected Package</th>
                                        <th className="text-left p-2">Selected Services</th>
                                        <th className="text-left p-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBookings.map((booking, index) => (
                                        <tr key={booking._id} className="h-8" style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                                            <td className="p-2">{booking.Booking_Id}</td>
                                            <td className="p-2">{new Date(booking.Booking_Date).toLocaleDateString()}</td>
                                            <td className="p-2">{booking.Customer_Name}</td>
                                            <td className="p-2">{booking.Vehicle_Type}</td>
                                            <td className="p-2">{booking.Vehicle_Number}</td>
                                            <td className="p-2">{booking.Contact_Number}</td>
                                            <td className="p-2">{booking.Email}</td>
                                            <td className="p-2">{booking.selectedPackage}</td>
                                            <td className="p-2">{booking.selectedServices.join(", ")}</td>
                                            <td className="p-2">
                                                <div style={styles.actionIcons}>
						<Link to={`/Booking/get/${booking._id}`} className="text-green-500">
                                                        <BsInfoCircle size={20} />
                                                    </Link>
                                                    <Link to={`/Booking/edit/${booking._id}`} className="text-blue-500">
                                                        <AiOutlineEdit size={20} />
                                                    </Link>
                                                    <button 
                                                        className="text-red-500"
                                                        onClick={() => handleDelete(booking._id)}
                                                    >
                                                        <MdOutlineDelete size={20} />
                                                    </button>
                                                    
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ShowService;
<tbody>
              {services.map(service => (
                <tr key={service._id}>
                  <td>{service.Servicename}</td>
                  <td>
                    <Link to={`/Service/edit/${service._id}`} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Edit</Link>
                    <Link to={`/Service/get/${service._id}`} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>View</Link>
                    <button onClick={() => handleDeleteService(service._id)} className='bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
