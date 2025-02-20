import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const NotFound = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <Navbar />

        {/* 404 Page Content */}
        <div className="flex flex-1 flex-col items-center justify-center text-center p-6">
          <h1 className="text-6xl font-bold text-gray-800">404</h1>
          <p className="text-lg text-gray-600 mt-4">
            Oops! The page you're looking for doesn't exist.
          </p>
          <Link
            to="/dashboard"
            className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg text-lg font-medium hover:bg-indigo-700 transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
