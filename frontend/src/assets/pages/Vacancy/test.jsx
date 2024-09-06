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

const ShowAllVehicles = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
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
          .get('http://localhost:8077/Vehicle') // Replace with your actual API endpoint
          .then((response) => {
              setVehicles(response.data.data);
              setFilteredVehicles(response.data.data); // Initialize filtered data
              setLoading(false);
          })
          .catch((error) => {
              console.error(error);
              setLoading(false);
          });
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = vehicles.filter((vehicle) =>
        vehicle.Register_Number.toLowerCase().includes(query) ||
        vehicle.Make.toLowerCase().includes(query) ||
        vehicle.Model.toLowerCase().includes(query) ||
        vehicle.Owner.toLowerCase().includes(query)
    );
    setFilteredVehicles(filtered);
};

    useEffect(() => {
        handleSearch();
    }, [searchQuery]);

    const generateReport = () => {
      const doc = new jsPDF();
      doc.text("Vehicle Report", 14, 16);

      const tableData = filteredVehicles.map((vehicle, index) => [
          index + 1,
          vehicle.Register_Number,
          vehicle.Make,
          vehicle.Model,
          vehicle.Year,
          vehicle.Engine_Details,
          vehicle.Transmission_Details,
          vehicle.Vehicle_Color,
          vehicle.Owner,
      ]);

      doc.autoTable({
          head: [["No", "Register Number", "Make", "Model", "Year", "Engine Details", "Transmission", "Color", "Owner"]],
          body: tableData,
          startY: 30,
          margin: { horizontal: 10 },
          styles: { fontSize: 10 },
      });

      doc.save("vehicle_report.pdf");
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
                  window.location.reload();
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
                            <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3 flex items-center space-x-3">
                                <i className="bx bx-home-alt text-xl"></i>
                                <span>Dashboard</span>
                            </li>
                            <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3 flex items-center space-x-3">
                                <i className="bx bx-group text-xl"></i>
                                <span>Team</span>
                            </li>
                            <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3 flex items-center space-x-3">
                                <i className="bx bx-folder text-xl"></i>
                                <span>Projects</span>
                            </li>
                            <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3 flex items-center space-x-3">
                                <i className="bx bx-calendar text-xl"></i>
                                <span>Calendar</span>
                            </li>
                            <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3 flex items-center space-x-3">
                                <i className="bx bx-file text-xl"></i>
                                <span>Documents</span>
                            </li>
                            <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3 flex items-center space-x-3">
                                <i className="bx bx-chart text-xl"></i>
                                <span>Reports</span>
                            </li>
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
                            onChange={(e) => setSearchQuery(e.target.value)}
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
                {/* Main Content */}
                <main className="flex-1 p-6">
                    <h1 className="text-2xl font-semibold mb-4">Employee List</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIC</th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Basic Salary</th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact No</th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEmployees.map((employee, index) => (
                                    <tr key={employee._id} className={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                                       
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.EmpID}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.employeeName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.DOB}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.NIC}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.Address}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.BasicSalary}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.ContactNo}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.Email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div style={styles.actionIcons}>
                                                <Link to={`/Employee/${employee._id}`}>
                                                <BsInfoCircle className='text-2xl text-green-800' />
                                            </Link>
                                            <Link to={`/Employee/edit/${employee._id}`}>
                                                <AiOutlineEdit className='text-2xl text-yellow-600' />
                                            </Link>
                                            <Link to={`/Employee/delete/${employee._id}`}>
                                                <MdOutlineDelete className='text-2xl text-red-600' />
                                            </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ShowAllVehicles;

<tbody>
                    {loading ? (
                        <tr><td colSpan='10'>Loading...</td></tr>
                    ) : (
                        filteredVehicles.map((vehicle) => (
                            <tr key={vehicle._id}>
                                <td className='border px-4 py-2 text-left'>
                                    {vehicle.image ? (
                                        <img 
                                            src={vehicle.image} 
                                            alt={vehicle.Register_Number} 
                                            className='w-20 h-20 object-cover' 
                                        />
                                    ) : (
                                        'No Image'
                                    )}
                                </td>
                                <td className='border px-4 py-2 text-left'>{vehicle.Register_Number}</td>
                                <td className='border px-4 py-2 text-left'>{vehicle.Make}</td>
                                <td className='border px-4 py-2 text-left'>{vehicle.Model}</td>
                                <td className='border px-4 py-2 text-left'>{vehicle.Year}</td>
                                <td className='border px-4 py-2 text-left'>{vehicle.Engine_Details}</td>
                                <td className='border px-4 py-2 text-left'>{vehicle.Transmission_Details}</td>
                                <td className='border px-4 py-2 text-left'>{vehicle.Vehicle_Color}</td>
                                <td className='border px-4 py-2 text-left'>{vehicle.Owner}</td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/vehicles/${vehicle.Register_Number}`}>View</Link>
                                        <Link to={`/vehicles/edit/${vehicle._id}`}>Edit</Link>
                                        <Link to={`/vehicles/delete/${vehicle._id}`}>Delete</Link>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
