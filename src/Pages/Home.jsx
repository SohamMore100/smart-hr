import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to SmartHR</h1>
      <p className="mt-4 text-gray-600">
        Manage Payroll, Employees & Projects Easily
      </p>
      <div className="mt-6 space-x-4">
        <Link
          to="/login"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Home;
