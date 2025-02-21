import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainHeader from "../../FormComponents/MainHeader";
import { SimpleButton } from "../../FormComponents/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";

export default function EditEmpPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleCardClick = (path) => {
    navigate(`/employee/${path}/${id}`);
  };

  return (
    <div className="flex flex-col h-screen overflow-x-scroll">
      <MainHeader title="Employee / Add" />
      <div className="flex-grow mx-3 mb-3 rounded-lg bg-slate-200">
        <div className="p-3 flex items-center justify-between">
          <h1 className="text-md uppercase font-semibold">Add Employee</h1>
          <SimpleButton
            danger={true}
            onClick={() => {
              navigate("../employee/");
            }}
            icon={<FontAwesomeIcon className="me-2" icon={faMultiply} />}
            buttonName="Cancel"
          />
        </div>
        
        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3">
          <div
            className="p-5 bg-white shadow-md rounded-lg text-center cursor-pointer hover:bg-gray-100"
            onClick={() => handleCardClick("edit")}
          >
            <h2 className="text-lg font-semibold">Employee Account Information</h2>
          </div>
          <div
            className="p-5 bg-white shadow-md rounded-lg text-center cursor-pointer hover:bg-gray-100"
            onClick={() => handleCardClick("details/edit")}
          >
            <h2 className="text-lg font-semibold">Employee Personal Information</h2>
          </div>
          <div
            className="p-5 bg-white shadow-md rounded-lg text-center cursor-pointer hover:bg-gray-100"
            onClick={() => handleCardClick("education/edit")}
          >
            <h2 className="text-lg font-semibold">Employee Academic Details</h2>
          </div>
          <div
            className="p-5 bg-white shadow-md rounded-lg text-center cursor-pointer hover:bg-gray-100"
            onClick={() => handleCardClick("experience/edit")}
          >
            <h2 className="text-lg font-semibold">Employee Experience Details</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
