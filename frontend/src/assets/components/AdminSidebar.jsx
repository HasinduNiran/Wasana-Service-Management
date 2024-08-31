import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FaChartBar,
  FaGlobe,
  FaPaintBrush,
  FaBox,
  FaShoppingCart,
  FaCalendarAlt,
  FaBook,
  FaHeart,
} from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <Sidebar
      backgroundColor="#0b2948"
      style={{
        color: "#8ba1b7",
        height: "100%",
        overflow: "hidden",
        position: "fixed",
        border: "none",
        borderRadius: "0 20px 20px 0px",
      }}
    >
      {/* Sidebar Header */}
      <div className="sidebar-header mb-10">
        <h4
          style={{
            color: "black",
            fontWeight: "bold",
            backgroundColor: "yellow",
            borderRadius: "10px",
            padding: "8px",
            margin: "20px",
          }}
        >
          Wasana Service Center
        </h4>
      </div>

      {/* Menu Items */}
      <Menu>
        <SubMenu
          label="Vehicle "
          icon={<FaChartBar />}
          style={{ color: "#fff" }}
        >
          <MenuItem suffix={<span className="badge red">6</span>}>
            Pie charts
          </MenuItem>
          <MenuItem>Line charts</MenuItem>
          <MenuItem>Bar charts</MenuItem>
        </SubMenu>

        <SubMenu label="Customer " icon={<FaGlobe />} style={{ color: "#fff" }}>
          <MenuItem>Google Maps</MenuItem>
          <MenuItem>OpenStreetMap</MenuItem>
        </SubMenu>

        <SubMenu
          label="Bookings"
          icon={<FaPaintBrush />}
          style={{ color: "#fff" }}
        >
          <MenuItem>Dark Mode</MenuItem>
          <MenuItem>Light Mode</MenuItem>
        </SubMenu>

        <SubMenu label="Employees" icon={<FaBox />} style={{ color: "#fff" }}>
          <MenuItem>Buttons</MenuItem>
          <MenuItem>Cards</MenuItem>
        </SubMenu>

        <SubMenu
          label="Inquary"
          icon={<FaShoppingCart />}
          style={{ color: "#fff" }}
        >
          <MenuItem>Products</MenuItem>
          <MenuItem>Orders</MenuItem>
        </SubMenu>

        <SubMenu
          label="Repair Estimate"
          icon={<FaCalendarAlt />}
          style={{ color: "#fff" }}
        >
          <MenuItem>View Calendar</MenuItem>
        </SubMenu>

        <MenuItem icon={<FaBook />} style={{ color: "#fff" }}>
          Feedback
        </MenuItem>
        <MenuItem icon={<FaHeart />} style={{ color: "#fff" }}>
          Service
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default AdminSidebar;
