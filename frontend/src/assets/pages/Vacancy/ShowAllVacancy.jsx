import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ShowVacancy = () => {
  // State and refs initialization
  const [vacancy, setVacancy] = useState([]);
  const [filteredVacancy, setFilteredVacancy] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const componentRef = useRef();

  // Initial fetch of Vacancy data
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8077/vacancy")
      .then((response) => {
        setVacancy(response.data);
        setFilteredVacancy(response.data); // Initialize filtered data
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Search functionality
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = vacancy.filter(
      (item) =>
        item.Name.toLowerCase().includes(query) ||
        item.Description.toLowerCase().includes(query)
    );
    setFilteredVacancy(filtered);
  };

  // Report generation functionality
  const generateReport = () => {
    const doc = new jsPDF();
    doc.text("Vacancy Report", 14, 16);

    const tableData = filteredVacancy.map((item, index) => [
      index + 1,
      item.Name,
      item.Description,
    ]);

    doc.autoTable({
      head: [["No", "Name", "Description"]],
      body: tableData,
      startY: 30,
      margin: { horizontal: 10 },
      styles: { fontSize: 10 },
    });

    doc.save("vacancy_report.pdf");
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

  // Inline styles for components
  const styles = {
    // Your styles here...
  };

  return (
    <div style={styles.container} className="p-4" ref={componentRef}>
      <h1 style={styles.subHeading} className="text-3xl mb-8">
        Vacancy List
      </h1>
      <div className="mb-4 flex justify-end items-center"></div>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search vacancy..."
          value={searchQuery}
          onChange={handleSearch}
          className="border border-gray-300 p-2 rounded"
        />
        <button
          onClick={generateReport}
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Generate Report
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => (window.location.href = "/vacancy/create")}
        >
          Add Vacancy
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <table style={styles.table} className="w-full border-separate border-spacing-2">
          <thead>
            <tr style={styles.tableHead}>
              <th style={styles.tableHeader} className="border border-slate-600 rounded-md">No</th>
              <th style={styles.tableHeader} className="border border-slate-600 rounded-md">Name</th>
              <th style={styles.tableHeader} className="border border-slate-600 rounded-md">Description</th>
              <th style={styles.tableHeader} className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {filteredVacancy.map((vacancyItem, index) => (
              <tr key={vacancyItem._id} className="h-8" style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                <td style={styles.tableCell}>{index + 1}</td>
                <td style={styles.tableCell}>{vacancyItem.Name}</td>
                <td style={styles.tableCell}>{vacancyItem.Description}</td>
                <td style={styles.tableCell}>
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/vacancy/get/${vacancyItem._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/vacancy/edit/${vacancyItem._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600" />
                    </Link>
                    <button onClick={() => handleDelete(vacancyItem._id)}>
                      <MdOutlineDelete className="text-2xl text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowVacancy;
