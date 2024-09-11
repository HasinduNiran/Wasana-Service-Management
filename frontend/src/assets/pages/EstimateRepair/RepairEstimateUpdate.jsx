import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Swal from "sweetalert2";
import Fab from "@mui/material/Fab";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Box from "@mui/material/Box";

const RepairEstimateUpdate = () => {
  const navigate = useNavigate();
  const [repairEstimate, setRepairEstimate] = useState({
    Register_Number: "",
    Engine_Details: "",
    Model: "",
    Year: "",
    Transmission_Details: "",
    Vehicle_Color: "",
    Make: "",
    cusID: "",
    firstName: "",
    NIC: "",
    phone: "",
    email: "",
    insuranceProvider: "",
    agentName: "",
    agentEmail: "",
    agentContact: "",
    shortDescription: "",
  });
  const [estimateList, setEstimateList] = useState([]);
  const [sparepart, setSparepart] = useState({
    name: "",
    unitPrice: "",
    quantity: "",
  });
  //   const [estimateList, setEstimateList] = useState([]);
  const [step, setStep] = useState(1);
  const { id } = useParams();
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchRepairEstimate = async () => {
      try {
        const response = await axios.get(`http://localhost:8077/est/${id}`);
        setRepairEstimate(response.data);
        setEstimateList(response.data.estimateList);
        console.log(estimateList);
      } catch (error) {
        console.error("Error fetching repair estimate:", error);
      }
    };

    fetchRepairEstimate();
  }, [id]);

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      setEstimateList((preList) => [...preList, sparepart]);
      setSparepart({ name: "", quantity: "", unitPrice: "" });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSparepart((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRepairChange = (e) => {
    const { name, value } = e.target;
    setRepairEstimate((prew) => ({
      ...prew,
      [name]: value,
    }));
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleUpdate = async () => {
    const requestBody = { ...repairEstimate, estimateList };
    console.log(requestBody);

    try {
      const udpres = await axios.put(
        `http://localhost:8077/est/upd/${id}`,
        requestBody
      );
      console.log(udpres);
      Swal.fire("Good job!", "EST Report Sucessfully Updated", "success");
      navigate(`/estone/${id}`);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };
  return (
    <div className={`flex ${darkMode ? "bg-gray-900 " : "bg-white "}`}>
      <Sidebar isOpen={sidebarOpen} />
      <style>{`
      .required::after {
        content: " *";
        color: red;
      }
      .requ::after {
        content: "   (maximum 100 words limit)";
        color: red;
      }
    `}</style>
      <div className="flex-1">
        <div className="fixed min-w-full bg-white">
          <header className="flex items-center justify-between bg-white h-16 shadow mb-5">
            <Box sx={{ "& > :not(style)": { m: -2.8, mt: 2 } }}>
              <Fab
                color="primary"
                aria-label="add"
                onClick={toggleSidebar}
                sx={{ width: 60, height: 67 }}
              >
                {sidebarOpen ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
              </Fab>
            </Box>
            <div className="flex items-center">
              <h2 className="ml-60 font-bold text-lg">
                Update Estimate Report
              </h2>
            </div>

            <div className="flex items-center space-x-4 mr-64">
              <i className="bx bx-bell text-xl"></i>
              <div className="flex items-center space-x-2">
                <button
                  className="mt-1 ml-5 mr-10 inline-block px-8 py-2.5 text-white bg-gray-800 text-sm uppercase rounded-full shadow-lg transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg active:translate-y-px active:shadow-md"
                  onClick={toggleDarkMode}
                >
                  {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </button>
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
        </div>

        {step === 1 && (
          <div className="pl-20 pt-8 pr-20">
            <form>
              <div className="mt-20 bg-slate-200 p-6 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-bold mb-5">
                  Section 1: Vehicle Information
                </h2>
                <p>{error && <p className="text-red-500 mt-4">{error}</p>}</p>
                <div className="flex items-center justify-between mb-4 ">
                  <div className="flex flex-col w-1/3">
                    <label className="block text-gray-700 required">
                      Vehicle No:
                    </label>
                    <input
                      type="text"
                      name="Register_Number"
                      value={repairEstimate.Register_Number}
                      onChange={handleRepairChange}
                      className="border border-gray-300 rounded-md p-2 mr-10"
                      required
                    />
                  </div>
                  <div className="flex flex-col w-1/3">
                    <label className="block text-gray-700 required">
                      Model:
                    </label>
                    <input
                      type="text"
                      name="Model"
                      value={repairEstimate.Model}
                      onChange={handleRepairChange}
                      className="border border-gray-300 rounded-md p-2 bg-gray-100 mr-10"
                      required
                    />
                  </div>
                  <div className="flex flex-col w-1/3">
                    <label className="block text-gray-700 required">
                      Engine:
                    </label>
                    <input
                      type="text"
                      name="Engine_Details"
                      value={repairEstimate.Engine_Details}
                      onChange={handleRepairChange}
                      className="border border-gray-300 rounded-md p-2 bg-gray-100"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col w-1/4">
                    <label className="block text-gray-700 required">
                      Make:
                    </label>
                    <input
                      type="text"
                      name="Make"
                      value={repairEstimate.Make}
                      onChange={handleRepairChange}
                      className="border border-gray-300 rounded-md p-2 bg-gray-100 mr-10"
                      required
                    />
                  </div>
                  <div className="flex flex-col w-1/4">
                    <label className="block text-gray-700 required">
                      Year:
                    </label>
                    <input
                      type="text"
                      name="Year"
                      value={repairEstimate.Year}
                      onChange={handleRepairChange}
                      className="border border-gray-300 rounded-md p-2  bg-gray-100  mr-10"
                      required
                    />
                  </div>
                  <div className="flex flex-col w-1/4">
                    <label className="block text-gray-700 required">
                      Vehicle Color:
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-lg h-10 p-1 bg-gray-100 mr-4">
                      <input
                        type="color"
                        name="Vehicle_Color"
                        value={repairEstimate.Vehicle_Color}
                        onChange={handleRepairChange}
                        className="h-9 p-1  bg-gray-100"
                        required
                      />
                      <label>{repairEstimate.Vehicle_Color}</label>
                    </div>
                  </div>
                  <div className="flex flex-col w-1/4">
                    <label className="block text-gray-700 required">
                      Transmission Type:
                    </label>
                    <input
                      type="text"
                      name="Transmission_Details"
                      value={repairEstimate.Transmission_Details}
                      onChange={handleRepairChange}
                      className="border border-gray-300 rounded-md p-2 bg-gray-100"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10 bg-slate-200 p-6 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-bold mb-5">
                  Section 2: Customer Information
                </h2>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col mb-2 w-1/2">
                    <label className="block text-gray-700 required">
                      Cus ID:
                    </label>
                    <input
                      type="text"
                      name="cusID"
                      value={repairEstimate.cusID}
                      onChange={handleRepairChange}
                      className="border border-gray-300 rounded-md p-2  bg-gray-100 mr-10"
                      required
                    />
                  </div>
                  <div className="flex flex-col mb-2 w-1/2">
                    <label className="block text-gray-700 required">
                      Name:
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={repairEstimate.firstName}
                      onChange={handleRepairChange}
                      className="border border-gray-300 rounded-md p-2  bg-gray-100"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col mb-2 w-1/3">
                    <label className="block text-gray-700 required">
                      Email:
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={repairEstimate.email}
                      onChange={handleRepairChange}
                      className="border border-gray-300 rounded-md p-2  bg-gray-100 mr-10"
                      required
                    />
                  </div>
                  <div className="flex flex-col mb-2 w-1/3">
                    <label className="block text-gray-700 required">NIC:</label>
                    <input
                      type="text"
                      name="NIC"
                      value={repairEstimate.NIC}
                      onChange={handleRepairChange}
                      className="border border-gray-300 rounded-md p-2  bg-gray-100 mr-10"
                      required
                    />
                  </div>
                  <div className="mflex flex-col mb-2 w-1/3">
                    <label className="block text-gray-700 required">
                      Phone:
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={repairEstimate.phone}
                      onChange={handleRepairChange}
                      className="border border-gray-300 rounded-md p-2 w-full bg-gray-100"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-lime-500 text-black text-xl px-4 py-2 rounded-md mt-5 mb-10"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="pl-20 pt-10 pr-20 ">
            <form>
              <div className="mt-20 bg-slate-200 p-6 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-bold mb-4">
                  Section 3: Insurance Information
                </h2>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col w-1/2">
                    <label className="block text-gray-700 required">
                      Insurance Provider:
                    </label>
                    <input
                      type="text"
                      name="insuranceProvider"
                      value={repairEstimate.insuranceProvider}
                      onChange={handleRepairChange}
                      className="border border-gray-300 rounded-md p-2 mr-10"
                      required
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label className="block text-gray-700 required">
                      Agent Name:
                    </label>
                    <input
                      type="text"
                      name="agentName"
                      value={repairEstimate.agentName}
                      onChange={handleRepairChange}
                      className="border border-gray-300 rounded-md p-2 bg-gray-100"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4 required">
                  <div className="flex flex-col w-1/2">
                    <label className="block text-gray-700 required">
                      Agent Email:
                    </label>
                    <input
                      type="email"
                      name="agentEmail"
                      value={repairEstimate.agentEmail}
                      onChange={handleRepairChange}
                      className="border border-gray-300 rounded-md p-2 bg-gray-100 mr-10"
                      required
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label className="block text-gray-700 required">
                      Contact Number:
                    </label>
                    <input
                      type="text"
                      name="agentContact"
                      value={repairEstimate.agentContact}
                      onChange={handleRepairChange}
                      className="border border-gray-300 rounded-md p-2 bg-gray-100"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col mb-4">
                  <label className="block text-gray-700 mb-2 requ">
                    Description:
                  </label>
                  <textarea
                    name="shortDescription"
                    value={repairEstimate.shortDescription}
                    onChange={handleRepairChange}
                    className="border border-gray-300 rounded-md p-2 h-32"
                    placeholder="Enter description here..."
                  />
                </div>

                <div className="flex flex-col mb-4">
                  <label className="block text-gray-700 mb-2">
                    Upload Photo:
                  </label>
                  <input
                    type="file"
                    name="photo"
                    className="border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>
              <div className="flex justify-center mb-4 mt-10">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-pink-600 text-black text-xl px-4 py-2 rounded-md mt-5 mb-10 mr-10"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-lime-500 text-black text-xl px-4 py-2 rounded-md mt-5 mb-10"
                >
                  Next
                </button>
              </div>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        )}

        {step === 3 && (
          <div className="pl-20 pt-8 pr-20">
            <form onSubmit={handleAddItem}>
              <div className="mt-20 bg-slate-200 p-6 rounded-2xl shadow-sm">
                <h1 className="text-3xl font-bold mb-4">
                  Repair Estimate Calculator
                </h1>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col mb-4 w-1/2">
                    <label className="block text-gray-700 required">
                      Spare Part Name:
                    </label>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2"
                      placeholder="Spare Part Name"
                      name="name"
                      value={sparepart.name}
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="block text-gray-700 required">
                      Unit Price:
                    </label>
                    <input
                      type="number"
                      className="border border-gray-300 rounded-md p-2 w-2/3"
                      placeholder="Unit Price"
                      name="unitPrice"
                      value={sparepart.unitPrice}
                      onChange={handleOnChange}
                      required
                    />
                  </div>

                  <div className="flex flex-col mb-4">
                    <label className="block text-gray-700 required">
                      Quantity:
                    </label>
                    <input
                      type="number"
                      className="border border-gray-300 rounded-md p-2 w-2/3"
                      placeholder="Quantity"
                      name="quantity"
                      value={sparepart.quantity}
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded-md"
                >
                  Add To List
                </button>
              </div>
            </form>
            {
              <div className="mt-4">
                {5 <= 0 ? (
                  <p>No list</p>
                ) : (
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Unit Price</th>
                        <th className="py-2 px-4 border-b">Quantity</th>
                        <th className="py-2 px-4 border-b">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {estimateList && estimateList.length > 0 ? (
                        estimateList.map((item, index) => (
                          <tr key={index} className="border-b text-center">
                            <td className="py-2 px-4">{item.name}</td>
                            <td className="py-2 px-4">{item.unitPrice}</td>
                            <td className="py-2 px-4">{item.quantity}</td>
                            <td className="py-2 px-4">
                              {item.quantity * item.unitPrice}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <div>No Insurance Estimates Available</div>
                      )}
                      <tr className="bg-gray-100">
                        <td
                          colSpan="3"
                          className="py-2 px-4 text-center font-bold"
                        >
                          Subtotal:
                        </td>
                        <td className="py-2 px-4 font-bold">
                          {repairEstimate.totalAmount}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            }
            <div className="mt-4">
              <button
                type="button"
                onClick={prevStep}
                className="bg-pink-600 text-black text-xl px-4 py-2 rounded-md mt-5 mb-10 mr-10"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleUpdate}
                className="bg-lime-500 text-black text-xl px-4 py-2 rounded-md mt-5 mb-10"
              >
                Update Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepairEstimateUpdate;
