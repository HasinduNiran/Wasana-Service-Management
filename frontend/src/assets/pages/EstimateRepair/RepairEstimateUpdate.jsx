import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminSidebar from "../../components/AdminSideBar";
import axios from "axios";

const RepairEstimateUpdate = () => {
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
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };
  return (
    <div
      className="min-h-screen bg-black"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
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

      <h2 className="text-4xl font-bold text-center bg-black text-white p-5 fixed w-full">
        Update Repair Estimate Log
      </h2>
      <AdminSidebar />
      <div className="pl-64">
        {step === 1 && (
          <div className="pl-20 pt-10 pr-20">
            <form>
              <div className="mt-20 bg-white p-6 rounded-2xl shadow-sm">
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
                    <input
                      type="text"
                      name="Vehicle_Color"
                      value={repairEstimate.Vehicle_Color}
                      onChange={handleRepairChange}
                      className="border border-gray-300 rounded-md p-2 bg-gray-100 mr-10"
                      required
                    />
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
              <div className="mt-10 bg-white p-6 rounded-2xl shadow-sm">
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
          <div className="pl-20 pt-8 pr-20 ">
            <form>
              <div className="mt-20 bg-white p-6 rounded-2xl shadow-sm">
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
              <div className="mt-20 bg-white p-6 rounded-2xl shadow-sm">
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
                Genarate Summary
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepairEstimateUpdate;
