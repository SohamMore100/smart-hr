import { useState } from "react";
import { Menu, X, Home, Users, Settings, User } from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white transform ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out shadow-lg z-50`}
    >
      <div className="p-4 flex justify-between md:hidden">
        <h2 className="text-xl font-bold">HR WebApp</h2>
        <button onClick={toggleSidebar} className="text-white">
          <X size={28} />
        </button>
      </div>

      <nav className="mt-8">
        <ul className="space-y-4">
          <li className="px-6 py-3 flex items-center gap-3 text-lg font-medium hover:bg-gray-700 rounded-md cursor-pointer transition">
            <Home size={22} /> Dashboard
          </li>
          <li className="px-6 py-3 flex items-center gap-3 text-lg font-medium hover:bg-gray-700 rounded-md cursor-pointer transition">
            <Users size={22} /> Employees
          </li>
          <li className="px-6 py-3 flex items-center gap-3 text-lg font-medium hover:bg-gray-700 rounded-md cursor-pointer transition">
            <Settings size={22} /> Settings
          </li>
          <li className="px-6 py-3 flex items-center gap-3 text-lg font-medium hover:bg-gray-700 rounded-md cursor-pointer transition">
            <User size={22} /> Profile
          </li>
        </ul>
      </nav>
    </div>
  );
};

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-blue-500 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Mobile Menu Button */}
      <button onClick={toggleSidebar} className="md:hidden">
        <Menu size={28} />
      </button>

      {/* Logo */}
      <div className="text-2xl font-bold">HR WebApp</div>

      {/* Desktop Links */}
      <ul className="hidden md:flex space-x-6">
        <li className="hover:text-gray-300 cursor-pointer">Dashboard</li>
        <li className="hover:text-gray-300 cursor-pointer">Employees</li>
        <li className="hover:text-gray-300 cursor-pointer">Settings</li>
        <li className="hover:text-gray-300 cursor-pointer">Profile</li>
      </ul>
    </nav>
  );
};

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
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 transition-all duration-300 ease-in-out">
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
