import { useState } from "react";
import "./App.css";
import Home from "./Pages/Home";
import ProtectedRoute from "./Routes/ProtectedRoute";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Register from "./Pages/Register";
import { ToastContainer } from "react-toastify";
import EduDetails from "./Pages/Employees/EduDetails";
import Add_Exp from "./Pages/Work_Exp/Add_Exp";
import Edit_exp from "./Pages/Work_Exp/Edit_exp";
import EditEduDetails from "./Pages/Employees/EditEduDetails";
import AddEmpDetails from "./Pages/Employees/AddEmpDetails";
import EditEmpDetails from "./Pages/Employees/EditEmpDetails";
import AddEmp from "./Pages/Employees/AddEmp";
import EditEmp from "./Pages/Employees/EditEmp";

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
        <Route path="/employee/details/add" element={<AddEmpDetails />} />
        <Route path="/employee//details/edit/:id" element={<EditEmpDetails />} />

        {/* Employee Education Details  */}
        <Route path="/employee/education/add" element={<EduDetails />} />
        <Route path="/employee/education/edit/:id" element={<EditEduDetails />} />

        {/* Add Employee  */}
        <Route path="/employee/add" element={<AddEmp />} />
        <Route path="/employee/edit/:id" element={<EditEmp />} />

        {/* Work Exp */}
        <Route path="/employee/experience/add" element={<Add_Exp />} />
        <Route path="/employee/experience/edit/:id" element={<Edit_exp />} />
      </Routes>
    </>
  );
}

export default App;
