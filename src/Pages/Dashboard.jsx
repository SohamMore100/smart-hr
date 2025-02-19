import { useState } from "react";
import {
  Menu,
  X,
  Home,
  Users,
  Settings,
  FileText,
  Calendar,
  LogOut,
} from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 shadow-md transform ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
    >
      {/* Sidebar Header */}
      <div className="p-5 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">talensync</h2>
        <button onClick={toggleSidebar} className="md:hidden text-gray-600">
          <X size={28} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4">
        <ul className="space-y-2">
          {[
            { name: "Overview", icon: <Home size={20} /> },
            { name: "Calendar", icon: <Calendar size={20} /> },
            { name: "Recruitment", icon: <Users size={20} /> },
            { name: "Onboarding", icon: <FileText size={20} /> },
            { name: "Performance", icon: <FileText size={20} /> },
            { name: "Payroll", icon: <FileText size={20} /> },
            { name: "Development", icon: <FileText size={20} />, active: true },
            { name: "Reports", icon: <FileText size={20} /> },
          ].map((item, index) => (
            <li
              key={index}
              className={`flex items-center px-6 py-3 text-gray-700 text-[16px] font-medium cursor-pointer rounded-md transition ${
                item.active ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout & Settings */}
      <div className="absolute bottom-4 left-0 w-full">
        <ul className="px-6">
          <li className="flex items-center px-6 py-3 text-gray-700 font-medium cursor-pointer hover:bg-gray-100 rounded-md transition">
            <Settings size={20} />
            <span className="ml-3">Settings</span>
          </li>
          <li className="flex items-center px-6 py-3 text-gray-700 font-medium cursor-pointer hover:bg-gray-100 rounded-md transition">
            <LogOut size={20} />
            <span className="ml-3">Log out</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
      {/* Mobile Menu Button */}
      <button onClick={toggleSidebar} className="md:hidden text-gray-600">
        <Menu size={28} />
      </button>

      {/* Title */}
      <div className="text-xl font-semibold text-gray-900">Development</div>

      {/* Search & Profile */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="hidden md:block px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
          I
        </div>
      </div>
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
