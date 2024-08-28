import React, { useState, useEffect } from "react";
import { CountUp } from "countup.js"; // Include if you're using CountUp

const CreateVacancy = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Initialize CountUp on mount for stats
  useEffect(() => {
    const numbers = document.querySelectorAll("[countTo]");

    numbers.forEach((number) => {
      const ID = number.getAttribute("id");
      const value = number.getAttribute("countTo");
      let countUp = new CountUp(ID, value);

      if (number.hasAttribute("data-decimal")) {
        const options = {
          decimalPlaces: 1,
        };
        countUp = new CountUp(ID, value, options);
      }

      if (!countUp.error) {
        countUp.start();
      } else {
        console.error(countUp.error);
        number.innerHTML = value;
      }
    });
  }, []);

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="w-64 bg-gray-800 text-white flex flex-col">
          <div className="flex items-center justify-center h-16 bg-gray-800">
            <h1 className="text-xl font-bold">Logo</h1>
          </div>
          <nav className="flex-1">
            <ul className="mt-2">
              <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3 flex items-center space-x-3">
                <i className="bx bx-home-alt text-xl"></i>
                <span>Dashboard</span>
              </li>
              <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3 flex items-center space-x-3">
                <i className="bx bx-group text-xl"></i>
                <span>Team</span>
              </li>
              <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3 flex items-center space-x-3">
                <i className="bx bx-folder text-xl"></i>
                <span>Projects</span>
              </li>
              <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3 flex items-center space-x-3">
                <i className="bx bx-calendar text-xl"></i>
                <span>Calendar</span>
              </li>
              <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3 flex items-center space-x-3">
                <i className="bx bx-file text-xl"></i>
                <span>Documents</span>
              </li>
              <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3 flex items-center space-x-3">
                <i className="bx bx-chart text-xl"></i>
                <span>Reports</span>
              </li>
            </ul>
            <h3 className="mt-6 text-gray-500 text-sm font-semibold px-3">Your teams</h3>
            <ul className="mt-2">
              <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3 flex items-center space-x-3">
                <span className="bg-gray-700 h-8 w-8 flex items-center justify-center rounded-full">H</span>
                <span>Heroicons</span>
              </li>
              <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3 flex items-center space-x-3">
                <span className="bg-gray-700 h-8 w-8 flex items-center justify-center rounded-full">T</span>
                <span>Tailwind Labs</span>
              </li>
              <li className="text-gray-400 hover:bg-gray-700 hover:text-white p-3 flex items-center space-x-3">
                <span className="bg-gray-700 h-8 w-8 flex items-center justify-center rounded-full">W</span>
                <span>Workcation</span>
              </li>
            </ul>
          </nav>
          <div className="p-3">
            <button className="w-full flex items-center p-3 bg-gray-800 rounded hover:bg-gray-700">
              <i className="bx bx-cog text-xl"></i>
              <span className="ml-4">Settings</span>
            </button>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white h-16 px-4 shadow">
          <div className="flex items-center">
            <i className="bx bx-menu text-xl cursor-pointer" onClick={toggleSidebar}></i>
            <input
              type="search"
              placeholder="Search..."
              className="ml-4 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
            />
          </div>
          <div className="flex items-center space-x-4">
            <i className="bx bx-bell text-xl"></i>
            <div className="flex items-center space-x-2">
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

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6">
          <div className="flex flex-col items-center">
            <h3 className="text-5xl font-extrabold text-dark-grey-900"><span id="countto1" countTo="250"></span>+</h3>
            <p className="text-base font-medium text-dark-grey-600">Successful Projects</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-5xl font-extrabold text-dark-grey-900">$<span id="countto2" countTo="12"></span>m</h3>
            <p className="text-base font-medium text-dark-grey-600">Annual Revenue Growth</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-5xl font-extrabold text-dark-grey-900"><span id="countto3" countTo="2600"></span>k+</h3>
            <p className="text-base font-medium text-dark-grey-600">Global Partners</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-5xl font-extrabold text-dark-grey-900"><span id="countto4" countTo="18000"></span>+</h3>
            <p className="text-base font-medium text-dark-grey-600">Daily Website Visitors</p>
          </div>
        </div>

        {/* Table Section */}
        <div className="p-6">
          <div className="text-gray-700">Fat Classic Table</div>
          <div className="flex flex-col mt-4">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 border-b bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 border-b bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-3 border-b bg-gray-50"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {/* Sample row */}
                    <tr className="border-b">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">John Doe</td>
                      <td className="px-6 py-4 text-sm text-gray-500">john.doe@example.com</td>
                      <td className="px-6 py-4 text-sm text-gray-500">Microsoft</td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                      </td>
                    </tr>
                    {/* Add more rows as needed */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreateVacancy;
