import React from "react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export function SidebarWithSearch({ collapsed, toggleSidebar }) {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-${
        collapsed ? "20" : "64"
      } p-4 shadow-xl transition-all duration-300 bg-gray-800 text-white`}
    >
      <div className="mb-2 flex items-center gap-4 p-4">
        <img
          src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
          alt="brand"
          className="h-8 w-8"
        />
        {!collapsed && <h5 className="text-white text-xl">Sidebar</h5>}
        <button onClick={toggleSidebar} className="ml-auto text-white">
          {collapsed ? (
            <ChevronRightIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      <div>
        <div>
          <div
            onClick={() => handleOpen(1)}
            className={`flex items-center p-3 cursor-pointer ${
              open === 1 ? "bg-gray-700" : ""
            }`}
          >
            <PresentationChartBarIcon className="h-5 w-5" />
            {!collapsed && (
              <span className="ml-3 font-normal">
                Dashboard
                <div className="ml-auto">
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`h-4 w-4 transition-transform ${
                      open === 1 ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </span>
            )}
          </div>
          {open === 1 && (
            <div className="bg-gray-800">
              <div className="py-1">
                <div className="flex items-center text-white px-3 py-1">
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  <span className="ml-2">Analytics</span>
                </div>
                <div className="flex items-center text-white px-3 py-1">
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  <span className="ml-2">Reporting</span>
                </div>
                <div className="flex items-center text-white px-3 py-1">
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  <span className="ml-2">Projects</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <div
            onClick={() => handleOpen(2)}
            className={`flex items-center p-3 cursor-pointer ${
              open === 2 ? "bg-gray-700" : ""
            }`}
          >
            <ShoppingBagIcon className="h-5 w-5" />
            {!collapsed && (
              <span className="ml-3 font-normal">
                E-Commerce
                <div className="ml-auto">
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`h-4 w-4 transition-transform ${
                      open === 2 ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </span>
            )}
          </div>
          {open === 2 && (
            <div className="bg-gray-800">
              <div className="py-1">
                <div className="flex items-center text-white px-3 py-1">
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  <span className="ml-2">Orders</span>
                </div>
                <div className="flex items-center text-white px-3 py-1">
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  <span className="ml-2">Products</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <hr className="my-2 border-gray-700" />
        <div className="flex items-center text-white px-3 py-2 cursor-pointer">
          <InboxIcon className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Inbox</span>}
        </div>
        <div className="flex items-center text-white px-3 py-2 cursor-pointer">
          <UserCircleIcon className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Profile</span>}
        </div>
        <div className="flex items-center text-white px-3 py-2 cursor-pointer">
          <Cog6ToothIcon className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Settings</span>}
        </div>
        <div className="flex items-center text-white px-3 py-2 cursor-pointer">
          <PowerIcon className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Log Out</span>}
        </div>
      </div>

      {openAlert && (
        <div className="mt-auto bg-gray-700 text-white p-4 rounded">
          <button onClick={() => setOpenAlert(false)} className="text-white">
            Close
          </button>
        </div>
      )}
    </div>
  );
}
