import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import CountUp from "react-countup";
import logo from "../images/logo.png";

const Sidebar = (props) => {
  const [darkMode, setDarkMode] = useState(false);

  const [isCustomerOpen, setIsCustomerOpen] = useState(false);
  const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);

  const sideOpen = props.isOpen;

  const styles = {
    tableRowEven: {
      backgroundColor: "#f9f9f9",
    },
    tableRowOdd: {
      backgroundColor: "#ffffff",
    },
    image: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
    },
    actionIcons: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
    },
  };
  return (
    <div
      className={`flex ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } min-h-screen`}
    >
      {sideOpen && (
        <aside className="w-64 bg-gray-800 text-white flex flex-col justify-between">
          <div className="fixed bg-gray-800">
            <div className="flex items-center justify-center h-16 ">
              <img
                src={logo}
                alt="logo"
                style={{
                  width: "60px",
                  height: "60px",
                  marginLeft: "90px",
                  marginRight: "105px",
                }}
              />
            </div>
            <nav className="flex-1">
              <ul className="mt-2">
                <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3 flex items-center space-x-3">
                  <i className="bx bx-home-alt text-xl"></i>
                  <span>Dashboard</span>
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
                  <i
                    className={`bx bx-chevron-${
                      isCustomerOpen ? "up" : "down"
                    } text-xl`}
                  ></i>
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
                  <i
                    className={`bx bx-chevron-${
                      isEmployeeOpen ? "up" : "down"
                    } text-xl`}
                  ></i>
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
                  <i
                    className={`bx bx-chevron-${
                      isCompanyOpen ? "up" : "down"
                    } text-xl`}
                  ></i>
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
                <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3 flex items-center space-x-3">
                  <i className="bx bx-home-alt text-xl"></i>
                  <Link to="/estList">Repair Estimate</Link>
                </li>
              </ul>
            </nav>
            <div className="p-3 mt-96">
              <button className="w-full flex items-center p-3 bg-gray-800 rounded hover:bg-gray-700">
                <i className="bx bx-cog text-xl"></i>
                <span className="ml-4 top-10">Settings</span>
              </button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};

export default Sidebar;
