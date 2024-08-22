import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const CreateVehicle = () => {
  const [cusID, setCusID] = useState('');
  const [Register_Number, setRegister_Number] = useState('');
  const [Make, setMake] = useState('');
  const [Model, setModel] = useState('');
  const [Year, setYear] = useState('');
  const [Engine_Details, setEngine_Details] = useState('');
  const [Transmission_Details, setTransmission_Details] = useState('');
  const [Vehicle_Color, setVehicle_Color] = useState('');
  const [Vehicle_Features, setVehicle_Features] = useState('');
  const [Condition_Assessment, setCondition_Assessment] = useState('');
  const [Owner, setOwner] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      cusID,
      Register_Number,
      Make,
      Model,
      Year,
      Engine_Details,
      Transmission_Details,
      Vehicle_Color,
      Vehicle_Features,
      Condition_Assessment,
      Owner,
    };

    axios.post('http://localhost:8077/Vehicle', data)
      .then(res => {
        setLoading(false);
        if (res.status === 200) {
          console.log(res.data);
          navigate('/vehicles');
        } else {
          console.log(res.data);
          alert("Failed to create vehicle");
        }
      })
      .catch(err => {
        setLoading(false);
        console.error(err);
        alert("An error occurred while creating the vehicle");
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Create Vehicle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Customer ID:</label>
          <input
            type="text"
            value={cusID}
            onChange={(e) => setCusID(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Register Number:</label>
          <input
            type="text"
            value={Register_Number}
            onChange={(e) => setRegister_Number(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Make:</label>
          <input
            type="text"
            value={Make}
            onChange={(e) => setMake(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Model:</label>
          <input
            type="text"
            value={Model}
            onChange={(e) => setModel(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Year:</label>
          <input
            type="text"
            value={Year}
            onChange={(e) => setYear(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Engine Details:</label>
          <input
            type="text"
            value={Engine_Details}
            onChange={(e) => setEngine_Details(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Transmission Details:</label>
          <input
            type="text"
            value={Transmission_Details}
            onChange={(e) => setTransmission_Details(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Vehicle Color:</label>
          <input
            type="text"
            value={Vehicle_Color}
            onChange={(e) => setVehicle_Color(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Vehicle Features:</label>
          <input
            type="text"
            value={Vehicle_Features}
            onChange={(e) => setVehicle_Features(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Condition Assessment:</label>
          <input
            type="text"
            value={Condition_Assessment}
            onChange={(e) => setCondition_Assessment(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Owner:</label>
          <input
            type="text"
            value={Owner}
            onChange={(e) => setOwner(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 font-semibold text-white rounded-lg ${
            loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Creating...' : 'Create Vehicle'}
        </button>
      </form>
    </div>
  );
};
