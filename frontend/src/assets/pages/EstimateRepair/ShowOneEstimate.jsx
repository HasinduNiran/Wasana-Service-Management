import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShowOneEstimate = () => {
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

  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <h2 className="text-4xl font-bold text-center bg-black text-white p-5 fixed w-full">
        Repair Estimate
      </h2>
      <div className="pt-28 ml-20 mr-20">
        {/* Vehicle Information Section */}
        <section className="mb-8 bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Vehicle Information</h2>
          <div className="grid grid-cols-2 gap-4">
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

        <div className="mt-4">
          <button
            type="button"
            className="bg-pink-600 text-black text-xl px-4 py-2 rounded-md mt-5 mb-10 mr-10"
          >
            Back
          </button>
          <button
            type="button"
            className="bg-violet-500 text-black text-xl px-4 py-2 rounded-md mt-5 mb-10 mr-10"
          >
            Share
          </button>
          <button
            type="button"
            className="bg-lime-500 text-black text-xl px-4 py-2 rounded-md mt-5 mb-10"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowOneEstimate;
