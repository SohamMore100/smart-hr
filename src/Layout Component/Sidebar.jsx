import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Calendar,
  Users,
  FileText,
  Settings,
  LogOut,
  Plus,
  List,
  ChevronDown,
  X,
} from "lucide-react";

const menuItems = [
  { name: "Overview", icon: <Home size={20} />, link: "/overview" },
  {
    name: "Employees",
    icon: <Calendar size={20} />,
    subMenu: [
      {
        name: "Add Employee",
        icon: <Plus size={18} />,
        link: "/employee/add",
      },
      { name: "Employee List", icon: <List size={18} />, link: "/emp_list" },
    ],
  },
  {
    name: "Recruitment",
    icon: <Users size={20} />,
    subMenu: [
      {
        name: "Job Openings",
        icon: <FileText size={18} />,
        link: "/job_openings",
      },
      { name: "Applicants", icon: <FileText size={18} />, link: "/applicants" },
    ],
  },
  { name: "Onboarding", icon: <FileText size={20} />, link: "/onboarding" },
  { name: "Performance", icon: <FileText size={20} />, link: "/performance" },
  { name: "Payroll", icon: <FileText size={20} />, link: "/payroll" },
  { name: "Development", icon: <FileText size={20} />, link: "/development" },
  { name: "Reports", icon: <FileText size={20} />, link: "/reports" },
];
import { useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuName) => {
    setOpenMenus((prev) => ({ ...prev, [menuName]: !prev[menuName] }));
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 shadow-md transform ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
    >
      {/* Sidebar Header */}
      <div className="p-4 flex justify-between items-center">
        <img
          src="https://aonemr.com/static/d183b52e02f9b5cc188a12a2d82e0bae/aone-market-research.svg"
          alt="A One Market Research"
          className="h-10 md:h-18"
        />
        <button onClick={toggleSidebar} className="md:hidden text-gray-600">
          <X size={28} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-3">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index} className="relative">
              {item.subMenu ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className="flex justify-between items-center w-full px-6 py-3 text-gray-700 text-[16px] font-medium cursor-pointer rounded-md transition hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-3">{item.name}</span>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`transition-transform ${
                        openMenus[item.name] ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openMenus[item.name] && (
                    <ul className="ml-6 mt-1 space-y-1">
                      {item.subMenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.link}
                            className="flex items-center px-6 py-3 text-gray-600 font-medium hover:bg-gray-100 rounded-md transition"
                          >
                            {subItem.icon}
                            <span className="ml-3">{subItem.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to={item.link}
                  className={`flex items-center px-6 py-3 text-gray-700 text-[16px] font-medium rounded-md transition duration-200 hover:bg-gray-100 ${
                    location.pathname === item.link
                      ? "bg-gray-200 font-semibold"
                      : ""
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              )}
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

export default Sidebar;
