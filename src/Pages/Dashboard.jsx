import { useState } from "react";
import Sidebar from "../Layout Component/Sidebar";
import Navbar from "../Layout Component/Navbar";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div
      className={`flex h-screen bg-gray-100 ${
        isSidebarOpen ? "overflow-hidden" : ""
      }`}
    >
      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      {/* <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 transition-all duration-300 ease-in-out">
        {/* <Navbar toggleSidebar={toggleSidebar} /> */}
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-900">Welcome,</h1>
          <p className="text-gray-600 text-lg mt-2">Your Role</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
