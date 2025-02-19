import { useState } from "react";
import "./App.css";
import Home from "./Pages/Home";
import ProtectedRoute from "./Routes/ProtectedRoute";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Register from "./Pages/Register";
import AddEmp from "./Pages/Employees/AddEmp";
import Edit_Emp from "./Pages/Employees/Edit_Emp";
import { ToastContainer } from "react-toastify";
import EduDetails from "./Pages/Employees/EduDetails";
import Add_Exp from "./Pages/Work_Exp/Add_Exp";
import Edit_exp from "./Pages/Work_Exp/Edit_exp";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={<h1 className=" mr-[50%]  text-5xl">Not Found</h1>}
        />
        <Route path="/employee/add" element={<AddEmp />} />
        <Route path="/employee/education/add" element={<EduDetails />} />
        <Route path="/employee/edit" element={<Edit_Emp />} />

        {/* Work Exp */}
        <Route path="/experience/add" element={<Add_Exp />} />
        <Route path="/experience/edit" element={<Edit_exp />} />

        
      </Routes>
    </>
  );
}

export default App;
