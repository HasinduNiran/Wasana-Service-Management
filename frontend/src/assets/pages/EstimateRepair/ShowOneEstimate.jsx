import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminSidebar from "../../components/AdminSideBar";
import { useNavigate } from "react-router-dom";

const ShowOneEstimate = () => {
  const navigation = useNavigate();
  const [repairEstimate, setRepairEstimate] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchRepairEstimate = async () => {
      try {
        const response = await axios.get(`http://localhost:8077/est/${id}`);
        setRepairEstimate(response.data);
      } catch (error) {
        console.error("Error fetching repair estimate:", error);
      }
    };

    fetchRepairEstimate();
  }, [id]); // Dependency array with `id` ensures effect runs when `id` changes

  const handleBackClick = () => {
    navigation(-1);
  };
  return (
    <div
      className="min-h-screen bg-black"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="text-right mb-8 p-4 fixed w-full bg-black flex ml-auto mr-auto">
        <h2
          className="flex-1 text-center text-3xl font-bold "
          style={{ color: "white" }}
        >
          Repair Estimate Logs
        </h2>

        <button
          type="button"
          className="bg-pink-600 text-black text-xl px-4 py-2 rounded-md mr-10"
          onClick={handleBackClick}
        >
          Back
        </button>
        <button
          type="button"
          className="bg-violet-500 text-black text-xl px-4 py-2 rounded-md mr-10"
        >
          Share
        </button>
        <button
          type="button"
          className="bg-lime-500 text-black text-xl px-4 py-2 rounded-md"
        >
          Download PDF
        </button>
      </div>
      <AdminSidebar />
      <div className="ml-72 mr-10 pt-24">
        {/* Vehicle Information Section */}
        <section className="mb-8 bg-white p-6 rounded-2xl shadow-sm ">
          <h2 className="text-2xl font-bold mb-4">Vehicle Information</h2>
          <div className="grid grid-cols-2 gap-4 ">
            <div>
              <strong>Vehicle No:</strong> {repairEstimate.Register_Number}
            </div>
            <div>
              <strong>Engine:</strong> {repairEstimate.Engine_Details}
            </div>
            <div>
              <strong>Model:</strong> {repairEstimate.Model}
            </div>
            <div>
              <strong>Year:</strong> {repairEstimate.Year}
            </div>
            <div>
              <strong>Make:</strong> {repairEstimate.Make}
            </div>
            <div>
              <strong>Vehicle Color:</strong> {repairEstimate.Vehicle_Color}
            </div>
            <div>
              <strong>Transmission:</strong>{" "}
              {repairEstimate.Transmission_Details}
            </div>
          </div>
        </section>

        {/* Customer Information Section */}
        <section className="mb-8 bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Customer Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>CUS Id:</strong> {repairEstimate.cusID}
            </div>
            <div>
              <strong>First Name:</strong> {repairEstimate.firstName}
            </div>
            <div>
              <strong>Last Name:</strong> {repairEstimate.lastName}
            </div>
            <div>
              <strong>Email:</strong> {repairEstimate.email}
            </div>
            <div>
              <strong>Contact:</strong> {repairEstimate.phone}
            </div>
            <div>
              <strong>NIC:</strong> {repairEstimate.NIC}
            </div>
          </div>
        </section>

        {/* Insurance Information Section */}
        <section className="mb-8 bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Insurance Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Insurance Provider:</strong>{" "}
              {repairEstimate.insuranceProvider}
            </div>
            <div>
              <strong>Agent Name:</strong> {repairEstimate.agentName}
            </div>
            <div>
              <strong>Agent Email:</strong> {repairEstimate.agentEmail}
            </div>
            <div>
              <strong>Agent Contact:</strong> {repairEstimate.agentContact}
            </div>
            <div>
              <strong>Description:</strong> {repairEstimate.shortDescription}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShowOneEstimate;
