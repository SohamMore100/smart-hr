import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import MainHeader from "../../FormComponents/MainHeader";
import { SimpleButton } from "../../FormComponents/Button";
import {FormInputBar,FormInputFile, FormInputSelect} from "../../FormComponents/FormInput";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../../axiosClient";
import { showSuccessToast, showErrorToast } from "../../toastService";

export default function Add_Exp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [serverError, setSetServerError] = useState({});
  const [experienceType, setExperienceType] = useState("fresher");
  const navigate = useNavigate();

  const { id } = useParams();
  
  // const onSubmit = async (data) => {
  //   try {


  //     // Get token from localStorage
  //     const token = localStorage.getItem("employee");
  //     console.log(token);
  //     // Ensure token exists
  //     if (!token) {
  //       console.error("No token found in localStorage");
  //       return;
  //     }
  //     const payslip1 = data.payslip1[0];
  //     const payslip2 = data.payslip2[0];
  //     const payslip3 = data.payslip3[0];
  //     const offer_letter = data.offer_letter[0];
  //     const exp_letter	 = data.exp_letter	[0];
  //     const inc_letter	 = data.inc_letter	[0];
  //     // Prepare the data
  //     const parsedData = {
  //       ...data,
       
  //     };
  //     const formData = new FormData();
  //       formData.append("payslip1", payslip1);
  //       formData.append("payslip2", payslip2);
  //       formData.append("payslip3", payslip3);
  //       formData.append("offer_letter", offer_letter);
  //       formData.append("exp_letter", exp_letter);
  //       formData.append("inc_letter", inc_letter);
  //       Object.keys(parsedData).forEach((key) => {
  //         if (!['payslip1', 'payslip2', 'payslip3', 'offer_letter','exp_letter','inc_letter'].includes(key)) {
  //           formData.append(key, parsedData[key]);
  //       }
  //       })
  //     // Make the API request with Authorization header
  //     const response = await axiosClient.post("/experience/add", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //           Employee: `Bearer ${token}`, 
  //       },
  //     });
  
  //     console.log(response);
  
  //     if (response?.data?.message) {
  //       showSuccessToast("Experience Details are stored Successfully.");
  //       navigate("/employee");
  //       console.log(response.data.data);
  //     } else {
  //       setSetServerError(response.data.errors);
  //       console.error("Error response:", response.data.errors);
  //     }
  //   } catch (err) {
  //     console.error("Error submitting form:", err);
  //     showErrorToast("Something went wrong");
  //   }
  // };



const onSubmit = async (data) => {
  try {
    const token = localStorage.getItem("employee");
    if (!token) {
      showErrorToast("No authentication token found.");
      return;
    }

    const formData = new FormData();
    const user_id = localStorage.getItem("user_id");
    formData.append("experience", experienceType);
    formData.append("user_id", user_id); // Replace with actual user ID logic

    if (experienceType === "experience") {
      formData.append("last_company", data.last_company);
      formData.append("exp_start_date", data.exp_start_date);
      formData.append("exp_end_date", data.exp_end_date);
      formData.append("last_designation", data.last_designation);
      formData.append("last_salary", data.last_salary);
      formData.append("current_exp", data.current_exp);
      formData.append("current_salary", data.current_salary);

      // Handle file uploads
      if (data.payslip1[0]) formData.append("payslip1", data.payslip1[0]);
      if (data.payslip2[0]) formData.append("payslip2", data.payslip2[0]);
      if (data.payslip3[0]) formData.append("payslip3", data.payslip3[0]);
      if (data.offer_letter[0]) formData.append("offer_letter", data.offer_letter[0]);
      if (data.inc_letter[0]) formData.append("inc_letter", data.inc_letter[0]);
      if (data.exp_letter[0]) formData.append("exp_letter", data.exp_letter[0]);
    }
    
    const response = await axiosClient.post("/experience/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Employee: `Bearer ${token}`,
      },
    });

    if (response?.data?.message) {
      showSuccessToast("Experience Details stored successfully.");
      navigate("/employee");
    } else {
      setSetServerError(response.data.errors);
      showErrorToast("Error storing experience details.");
    }
  } catch (err) {
    console.error("Error submitting form:", err);
    showErrorToast("Something went wrong");
  }
};

  return (
    <>
      <div className="flex flex-col h-screen overflow-x-scroll">
        <MainHeader title="Experience Detail > Add" />
        <div className="flex-grow mx-3 mb-3 rounded-lg bg-slate-200">
          <div className="p-3 flex items-center justify-between">
            <h1 className="text-md uppercase font-semibold">
              Add Experience Detail
            </h1>
            <SimpleButton
              danger={true}
              onClick={() => {
                navigate("/employee");
              }}
              icon={<FontAwesomeIcon className="me-2" icon={faMultiply} />}
              buttonName="Cancel"
            />
          </div>
          <div className="mx-3 mb-3 bg-white rounded-lg p-3">
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-1">Select Experience Type</label>
              <select
                className="appearance-none block w-full bg-slate-50 text-gray-700 border-[2px] rounded py-1 px-2 mb-1 focus:outline-none focus:bg-white 'border-red-500' : 'border-violet-200 focus:border-violet-600 "
                value={experienceType}  
                onChange={(e) => setExperienceType(e.target.value)}
              >
                <option value="fresher">Fresher</option>
                <option value="experience">Experience</option>
              </select>
            </div>
            {experienceType === "experience" && (
              <div className="flex flex-wrap mb-6">
                {/* Last Company */}
                <FormInputBar
                  width="md:w-1/3 lg:w-1/3"
                  id="last_company"
                  label="Last Company"
                  placeholder="Enter Last Company Name"
                  type="text"
                  columnName="last_company"
                  validationRules={{ required: "Required" }}
                  register={register}
                  errors={errors}
                  serverError={serverError}
                />

                {/* Experience Start Date */}
                <FormInputBar
                  width="md:w-1/3 lg:w-1/3"
                  id="exp_start_date"
                  label="Experience Start Date"
                  placeholder="Select Start Date"
                  type="date"
                  columnName="exp_start_date"
                  validationRules={{ required: "Required" }}
                  register={register}
                  errors={errors}
                  serverError={serverError}
                />

                {/* Experience End Date */}
                <FormInputBar
                  width="md:w-1/3 lg:w-1/3"
                  id="exp_end_date"
                  label="Experience End Date"
                  placeholder="Select End Date"
                  type="date"
                  columnName="exp_end_date"
                  validationRules={{ required: "Required" }}
                  register={register}
                  errors={errors}
                  serverError={serverError}
                />

                {/* Last Designation */}
                <FormInputBar
                  width="md:w-1/3 lg:w-1/3"
                  id="last_designation"
                  label="Last Designation"
                  placeholder="Enter Last Designation"
                  type="text"
                  columnName="last_designation"
                  validationRules={{ required: "Required" }}
                  register={register}
                  errors={errors}
                  serverError={serverError}
                />

                {/* Last Salary */}
                <FormInputBar
                  width="md:w-1/3 lg:w-1/3"
                  id="last_salary"
                  label="Last Salary"
                  placeholder="Enter Last Salary"
                  type="number"
                  columnName="last_salary"
                  validationRules={{ required: "Required" }}
                  register={register}
                  errors={errors}
                  serverError={serverError}
                />

                {/* Current Experience */}
                <FormInputBar
                  width="md:w-1/3 lg:w-1/3"
                  id="current_exp"
                  label="Current Experience (Years)"
                  placeholder="Enter Current Experience"
                  type="number"
                  columnName="current_exp"
                  validationRules={{ required: "Required" }}
                  register={register}
                  errors={errors}
                  serverError={serverError}
                />

                {/* Current Salary */}
                <FormInputBar
                  width="md:w-1/3 lg:w-1/3"
                  id="current_salary"
                  label="Current Salary"
                  placeholder="Enter Current Salary"
                  type="number"
                  columnName="current_salary"
                  validationRules={{ required: "Required" }}
                  register={register}
                  errors={errors}
                  serverError={serverError}
                />

                {/* Total Experience */}
                <FormInputBar
                  width="md:w-1/3 lg:w-1/3"
                  id="total_exp"
                  label="Total Experience (Years)"
                  placeholder="Enter Total Experience"
                  type="number"
                  columnName="total_exp"
                  validationRules={{ required: "Required" }}
                  register={register}
                  errors={errors}
                  serverError={serverError}
                />

                {/* Payslips */}
                <FormInputFile
                  width="md:w-1/3 lg:w-1/3"
                  id="payslip1"
                  label="Upload Payslip 1"
                  type="file"
                  columnName="payslip1"
                  validationRules={{ required: "Required" }}
                  register={register}
                  errors={errors}
                  serverError={serverError}
                />

                <FormInputFile
                  width="md:w-1/3 lg:w-1/3"
                  id="payslip2"
                  label="Upload Payslip 2"
                  type="file"
                  columnName="payslip2"
                  validationRules={{ required: "Required" }}
                  register={register}
                  errors={errors}
                  serverError={serverError}
                />

                <FormInputFile
                  width="md:w-1/3 lg:w-1/3"
                  id="payslip3"
                  label="Upload Payslip 3"
                  type="file"
                  columnName="payslip3"
                  validationRules={{ required: "Required" }}
                  register={register}
                  errors={errors}
                  serverError={serverError}
                />

                {/* Offer Letter */}
                <FormInputFile
                  width="md:w-1/3 lg:w-1/3"
                  id="offer_letter"
                  label="Upload Offer Letter"
                  type="file"
                  columnName="offer_letter"
                  validationRules={{ required: "Required" }}
                  register={register}
                  errors={errors}
                  serverError={serverError}
                />

                {/* Experience Letter */}
                <FormInputFile
                  width="md:w-1/3 lg:w-1/3"
                  id="exp_letter"
                  label="Upload Experience Letter"
                  type="file"
                  columnName="exp_letter"
                  validationRules={{ required: "Required" }}
                  register={register}
                  errors={errors}
                  serverError={serverError}
                />

                {/* Increment Letter */}
                <FormInputFile
                  width="md:w-1/3 lg:w-1/3"
                  id="inc_letter"
                  label="Upload Increment Letter"
                  type="file"
                  columnName="inc_letter"
                  register={register}
                  errors={errors}
                  serverError={serverError}
                />

                {/* UAN Number */}
                <FormInputBar
                  width="md:w-1/3 lg:w-1/3"
                  id="UAN"
                  label="UAN Number"
                  placeholder="Enter UAN Number"
                  type="text"
                  columnName="UAN"
                  validationRules={{ required: "Required" }}
                  register={register}
                  errors={errors}
                  serverError={serverError}
                />
              </div>
              )}
              {/* Submit Button */}
              <SimpleButton
                buttonName={isSubmitting ? "Submitting..." : "Submit"}
                type="submit"
                disabled={isSubmitting}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
