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
import ShowEmployee from "./Pages/Employees/ShowEmployee";
import NotFound from "./Layout Component/NotFound";

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
          element={<NotFound/>}
        />
        <Route path="/employee/details/add/:id" element={<AddEmpDetails />} />
        <Route path="/employee/details/edit/:id" element={<EditEmpDetails />} />

        {/* Employee Education Details  */}
        <Route path="/employee/education/add" element={<EduDetails />} />
        <Route path="/employee/education/edit/:id" element={<EditEduDetails />} />

        {/* Add Employee  */}
        <Route path="/employee/add" element={<AddEmp />} />
        <Route path="/employee/edit/:id" element={<EditEmp />} />
        <Route path="/employee" element={<ShowEmployee />} />

        {/* Work Exp */}
        <Route path="/employee/experience/add" element={<Add_Exp />} />
        <Route path="/employee/experience/edit/:id" element={<Edit_exp />} />
      </Routes>
    </>
  );
}

export default App;
