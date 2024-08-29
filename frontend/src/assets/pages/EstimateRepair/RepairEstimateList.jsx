import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { SidebarWithSearch } from "../../components/SidebarWithSearch";

const RepairEstimateList = () => {
  const navigate = useNavigate();
  const [repairEstimate, setRepareEstimate] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const fetchRepairEstimateLogs = async () => {
      try {
        const fetchData = await axios.get("http://localhost:8077/est");
        setRepareEstimate(fetchData.data);
      } catch (error) {
        console.error("Error fetching repair estimates:", error);
      }
    };
    fetchRepairEstimateLogs();
  }, []);

  const handleNavigate = (id) => {
    navigate(`/EstOne/${id}`);
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
      className={`flex min-h-screen transition-all duration-300 ${
        sidebarCollapsed ? "pl-20" : "pl-64"
      }`}
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <SidebarWithSearch
        collapsed={sidebarCollapsed}
        toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className="flex-1 p-10">
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
            key={rep._id}
            className="mb-8 bg-white p-6 rounded-2xl shadow-sm cursor-pointer"
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
                <strong>Customer Name:</strong>{" "}
                {rep.firstName + " " + rep.lastName}
              </div>
              <div>
                <strong>Date:</strong> {rep.createdAt}
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="bg-pink-600 text-black text-xl px-4 py-2 rounded-md mr-4"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click event from bubbling up
                    handleDelete(rep._id);
                  }}
                >
                  Delete Report
                </button>

                <button
                  type="button"
                  className="bg-lime-500 text-black text-xl px-4 py-2 rounded-md"
                >
                  Update Report
                </button>
              </div>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default RepairEstimateList;
