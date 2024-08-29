import { React, useState, useEffect } from "react";
import axios from "axios";

const RepairEstimate = () => {
  const [step, setStep] = useState(1);
  const [sparepart, setSparepart] = useState({
    name: "",
    unitPrice: "",
    quantity: "",
  });
  const [estimateList, setEstimateList] = useState([]);
  const [vehicle, setVehicle] = useState({
    Register_Number: "",
    Engine_Details: "",
    Model: "",
    Year: "",
    Transmission_Details: "",
    Vehicle_Color: "",
    Make: "",
  });
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [customer, setCustomer] = useState({
    cusID: "",
    firstName: "",
    lastName: "",
    NIC: "",
    phone: "",
    email: "",
  });
  const [insurance, setInsurance] = useState({
    insuranceProvider: "",
    agentName: "",
    agentEmail: "",
    agentContact: "",
    shortDescription: "",
  });
  const [error, setError] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSparepart((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAgentChange = (e) => {
    const { name, value } = e.target;
    setInsurance((prew) => ({
      ...prew,
      [name]: value,
    }));
    console.log(insurance);
  };

  const handleVehicleChange = (e) => {
    const { name, value } = e.target;
    setVehicle((preww) => ({
      ...preww,
      [name]: value,
    }));
    console.log(insurance);
  };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prewww) => ({
      ...prewww,
      [name]: value,
    }));
    console.log(customer);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      setEstimateList((preList) => [...preList, sparepart]);
      setSparepart({ name: "", quantity: "", unitPrice: "" });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const calculateSubtotal = () => {
    return estimateList
      .reduce(
        (total, item) =>
          total + parseFloat(item.unitPrice * item.quantity || 0),
        0
      )
      .toFixed(2);
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleVehicleNumberChange = (e) => {
    const number = e.target.value;
    setVehicleNumber(number);
    fetchVehicleData(number);
  };

  const fetchVehicleData = async (number) => {
    try {
      const response1 = await axios.get(
        `http://localhost:8077/Vehicle/${number}`
      );
      const response2 = await axios.get(
        `http://localhost:8077/Customer/${response1.data.cusID}`
      );
      setVehicle(response1.data);
      setCustomer(response2.data);
      //   console.log(response1.data);
      //   console.log(response2.data);
      setError("");
    } catch (error) {
      console.error("Error fetching vehicle:", error);
      setError("Vehicle Not Registered.");
      setVehicle({
        Register_Number: "",
        Engine_Details: "",
        Model: "",
        Year: "",
        Transmission_Details: "",
        Vehicle_Color: "",
        Make: "",
      });
      setCustomer({
        cusID: "",
        NIC: "",
        phone: "",
      });
    }
  };

  return (
    <div
      className="min-h-screen "
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
        Repair Estimate
      </h2>

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
                    name="vehno"
                    value={vehicleNumber}
                    onChange={handleVehicleNumberChange}
                    className="border border-gray-300 rounded-md p-2 mr-10"
                    required
                  />
                </div>
                <div className="flex flex-col w-1/3">
                  <label className="block text-gray-700 required">Model:</label>
                  <input
                    type="text"
                    name="Model"
                    value={vehicle.Model}
                    onChange={handleVehicleChange}
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
                    value={vehicle.Engine_Details}
                    onChange={handleVehicleChange}
                    className="border border-gray-300 rounded-md p-2 bg-gray-100"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col w-1/4">
                  <label className="block text-gray-700 required">Make:</label>
                  <input
                    type="text"
                    name="Make"
                    value={vehicle.Make}
                    onChange={handleVehicleChange}
                    className="border border-gray-300 rounded-md p-2 bg-gray-100 mr-10"
                    required
                  />
                </div>
                <div className="flex flex-col w-1/4">
                  <label className="block text-gray-700 required">Year:</label>
                  <input
                    type="text"
                    name="Year"
                    value={vehicle.Year}
                    onChange={handleVehicleChange}
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
                    value={vehicle.Vehicle_Color}
                    onChange={handleVehicleChange}
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
                    value={vehicle.Transmission_Details}
                    onChange={handleVehicleChange}
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
                    value={customer.cusID}
                    onChange={handleCustomerChange}
                    className="border border-gray-300 rounded-md p-2  bg-gray-100 mr-10"
                    required
                  />
                </div>
                <div className="flex flex-col mb-2 w-1/2">
                  <label className="block text-gray-700 required">Name:</label>
                  <input
                    type="text"
                    name="fristName"
                    value={customer.firstName + customer.lastName}
                    onChange={handleCustomerChange}
                    className="border border-gray-300 rounded-md p-2  bg-gray-100"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col mb-2 w-1/3">
                  <label className="block text-gray-700 required">Email:</label>
                  <input
                    type="text"
                    name="email"
                    value={customer.email}
                    onChange={handleCustomerChange}
                    className="border border-gray-300 rounded-md p-2  bg-gray-100 mr-10"
                    required
                  />
                </div>
                <div className="flex flex-col mb-2 w-1/3">
                  <label className="block text-gray-700 required">NIC:</label>
                  <input
                    type="text"
                    name="NIC"
                    value={customer.NIC}
                    onChange={handleCustomerChange}
                    className="border border-gray-300 rounded-md p-2  bg-gray-100 mr-10"
                    required
                  />
                </div>
                <div className="mflex flex-col mb-2 w-1/3">
                  <label className="block text-gray-700 required">Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    value={customer.phone}
                    onChange={handleCustomerChange}
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
                    value={insurance.insuranceProvider}
                    onChange={handleAgentChange}
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
                    value={insurance.agentName}
                    onChange={handleAgentChange}
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
                    value={insurance.agentEmail}
                    onChange={handleAgentChange}
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
                    value={insurance.agentContact}
                    onChange={handleAgentChange}
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
                  value={insurance.shortDescription}
                  onChange={handleAgentChange}
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
          <form onSubmit={handleOnSubmit}>
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
          <div className="mt-4">
            {estimateList.length <= 0 ? (
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
                  {estimateList.map((item, index) => (
                    <tr key={index} className="border-b text-center">
                      <td className="py-2 px-4">{item.name}</td>
                      <td className="py-2 px-4">{item.unitPrice}</td>
                      <td className="py-2 px-4">{item.quantity}</td>
                      <td className="py-2 px-4">
                        {item.quantity * item.unitPrice}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100">
                    <td colSpan="3" className="py-2 px-4 text-center font-bold">
                      Subtotal:
                    </td>
                    <td className="py-2 px-4 font-bold">
                      {calculateSubtotal()}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
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
              onClick={nextStep}
              className="bg-lime-500 text-black text-xl px-4 py-2 rounded-md mt-5 mb-10"
            >
              Genarate Summary
            </button>
          </div>
        </div>
      )}
      {step === 4 && (
        <div className="p-8 min-h-screen">
          <div className="mt-20">
            {/* Vehicle Information Section */}
            <section className="mb-8 bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Vehicle Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <strong>Vehicle No:</strong> {vehicle.Register_Number}
                </div>
                <div>
                  <strong>Engine:</strong> {vehicle.Engine_Details}
                </div>
                <div>
                  <strong>Model:</strong> {vehicle.Model}
                </div>
                <div>
                  <strong>Year:</strong> {vehicle.Year}
                </div>
                <div>
                  <strong>Make:</strong> {vehicle.Make}
                </div>
                <div>
                  <strong>Vehicle Color:</strong> {vehicle.Vehicle_Color}
                </div>
                <div>
                  <strong>Transmission:</strong> {vehicle.Transmission_Details}
                </div>
              </div>
            </section>

            {/* Customer Information Section */}
            <section className="mb-8 bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Customer Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <strong>CUS Id:</strong> {customer.cusID}
                </div>
                <div>
                  <strong>First Name:</strong> {customer.firstName}
                </div>
                <div>
                  <strong>Last Name:</strong> {customer.lastName}
                </div>
                <div>
                  <strong>Email:</strong> {customer.email}
                </div>
                <div>
                  <strong>Contact:</strong> {customer.phone}
                </div>
                <div>
                  <strong>NIC:</strong> {customer.NIC}
                </div>
              </div>
            </section>

            {/* Insurance Information Section */}
            <section className="mb-8 bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Insurance Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <strong>Insurance Provider:</strong>{" "}
                  {insurance.insuranceProvider}
                </div>
                <div>
                  <strong>Agent Name:</strong> {insurance.agentName}
                </div>
                <div>
                  <strong>Agent Email:</strong> {insurance.agentEmail}
                </div>
                <div>
                  <strong>Agent Contact:</strong> {insurance.agentContact}
                </div>
                <div>
                  <strong>Description:</strong> {insurance.shortDescription}
                </div>
              </div>
            </section>

            {/* Estimate Table Section */}
            <section className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Estimate Details</h2>
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
                  {estimateList.map((item, index) => (
                    <tr key={index} className="border-b text-center">
                      <td className="py-2 px-4">{item.name}</td>
                      <td className="py-2 px-4">{item.unitPrice}</td>
                      <td className="py-2 px-4">{item.quantity}</td>
                      <td className="py-2 px-4">
                        {item.quantity * item.unitPrice}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100">
                    <td colSpan="3" className="py-2 px-4 text-right font-bold">
                      Subtotal:
                    </td>
                    <td className="py-2 px-4 font-bold">
                      {calculateSubtotal()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

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
                onClick={nextStep}
                className="bg-violet-500 text-black text-xl px-4 py-2 rounded-md mt-5 mb-10 mr-10"
              >
                Share
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="bg-lime-500 text-black text-xl px-4 py-2 rounded-md mt-5 mb-10"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepairEstimate;
