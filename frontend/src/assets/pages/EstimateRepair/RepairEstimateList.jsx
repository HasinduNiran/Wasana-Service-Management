import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RepairEstimateList = () => {
  const navigate = useNavigate();
  const [repairEstimate, setRepareEstimate] = useState([]);

  useEffect(() => {
    const fetchRepairEstimateLogs = async () => {
      try {
        const fetchData = await axios.get("http://localhost:8077/est");
        setRepareEstimate(fetchData.data);
        console.log(repairEstimate);
      } catch (error) {}
    };
    fetchRepairEstimateLogs();
  }, []);

  const handleNavigate = (id) => {
    navigate(`/EstOne/${id}`); // Navigate to the specific ShowOneEstimate page
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this Estimate Log",
        icon: "warning",
        fontFamily: "Montserrat, sans-serif",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:8077/est/del/${id}`);
        setRepareEstimate(repairEstimate.filter((rep) => rep._id !== id));
        Swal.fire("Deleted!", "The Estimate Log has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting Estimate Log:", error);
      Swal.fire(
        "Error",
        "An error occurred while deleting the Estimate Log.",
        "error"
      );
    }
  };
  return (
    <div
      className="min-h-screen "
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <h2 className="text-4xl font-bold text-center bg-black text-white p-5 fixed w-full">
        Repair Estimate
      </h2>
      <div className="ml-10 mr-10 pt-28">
        <div className="text-right mb-8">
          <a
            href="/est"
            className="bg-violet-500 text-black text-xl px-4 py-2 rounded-md"
          >
            Make New Estimate
          </a>
        </div>
        {repairEstimate.map((rep) => (
          <section
            className="mb-8 bg-white p-6 rounded-2xl shadow-sm"
            onClick={() => handleNavigate(rep._id)}
          >
            <h2 className="text-2xl font-bold mb-4">Repair Estimate Card</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong>Report Id:</strong> {rep._id}
              </div>
              <div>
                <strong>Vehicle Reg No:</strong> {rep.Register_Number}
              </div>
              <div>
                <strong>Customer Name:</strong> {rep.firstName + rep.lastName}
              </div>
              <div>
                <strong>Date:</strong> {rep.createdAt}
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="bg-pink-600 text-black text-xl px-4 py-2 rounded-md mr-10"
                  onClick={() => handleDelete(rep._id)}
                >
                  Delete Report
                </button>

                <button
                  type="button"
                  className="bg-lime-500 text-black text-xl px-4 py-2 rounded-md m"
                >
                  Update Report
                </button>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default RepairEstimateList;
