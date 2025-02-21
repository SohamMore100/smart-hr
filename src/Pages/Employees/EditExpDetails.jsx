// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate, useParams } from "react-router-dom";
// import axiosClient from "../../axiosClient";
// import MainHeader from "../../FormComponents/MainHeader";
// import { SimpleButton } from "../../FormComponents/Button";
// import { FormInputBar, FormInputFile } from "../../FormComponents/FormInput";
// import { showSuccessToast, showErrorToast } from "../../toastService";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMultiply } from "@fortawesome/free-solid-svg-icons";

// export default function EditExpDetails() {
//   const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm();
//   const [serverError, setServerError] = useState({});
//   const [employee, setEmployee] = useState({});
//   const [experienceType, setExperienceType] = useState("fresher");
//   const navigate = useNavigate();
//   const { id } = useParams();

//   // Fetch Experience Details
//   useEffect(() => {
//     axiosClient.get(`/experience/${id}`)
//       .then((result) => {
//         if (result.data.status) {
//           const fetchedData = result.data.data;
//           setEmployee(fetchedData);
//           setExperienceType(fetchedData.experience || "fresher"); // Ensure type is set correctly
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching experience details:", err);
//         showErrorToast("Error fetching experience details.");
//       });
//   }, [id]);

//   // Populate Form Fields
//   useEffect(() => {
//     if (Object.keys(employee).length > 0) {
//       Object.entries(employee).forEach(([key, value]) => {
//         if (value !== null && value !== undefined) {
//           setValue(key, value);
//         }
//       });
//     }
//   }, [employee, setValue]);

//   // Handle Form Submission
//   const onSubmit = async (data) => {
//     try {
//       const token = localStorage.getItem("employee");
//       if (!token) {
//         showErrorToast("No authentication token found.");
//         return;
//       }

//       const formData = new FormData();
//       const user_id = localStorage.getItem("user_id");
//       formData.append("experience", experienceType);
//       formData.append("user_id", user_id);

//       if (experienceType === "experience") {
//         const fields = [
//           "last_company", "exp_start_date", "exp_end_date",
//           "last_designation", "last_salary", "current_exp", "current_salary", "total_exp"
//         ];
//         fields.forEach(field => formData.append(field, data[field] || ""));

//         // Handle File Uploads
//         const fileFields = ["payslip1", "payslip2", "payslip3", "offer_letter", "inc_letter", "exp_letter"];
//         fileFields.forEach((fileField) => {
//           if (data[fileField]?.[0]) formData.append(fileField, data[fileField][0]);
//         });
//       }

//       const response = await axiosClient.post(`/experience/edit/${id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data", Employee: `Bearer ${token}` },
//       });

//       if (response?.data?.message) {
//         showSuccessToast("Experience Details stored successfully.");
//         navigate("/employee");
//       } else {
//         setServerError(response.data.errors);
//         showErrorToast("Error storing experience details.");
//       }
//     } catch (err) {
//       console.error("Error submitting form:", err);
//       showErrorToast("Something went wrong");
//     }
//   };

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";
import MainHeader from "../../FormComponents/MainHeader";
import { SimpleButton } from "../../FormComponents/Button";
import { FormInputBar, FormInputFile } from "../../FormComponents/FormInput";
import { showSuccessToast, showErrorToast } from "../../toastService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";

export default function EditExpDetails() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch } = useForm();
  const [serverError, setServerError] = useState({});
  const [employee, setEmployee] = useState(null);
  const [experienceType, setExperienceType] = useState("fresher");
  const navigate = useNavigate();
  const { id } = useParams();

  // Function to fetch experience details when "Experience" is selected
  const fetchExperienceDetails = () => {
    if (experienceType === "experience") {
      axiosClient.get(`/experience/${id}`)
        .then((result) => {
          if (result.data.status) {
            const fetchedData = result.data.data;
            setEmployee(fetchedData);

            // Populate form fields with API response
            Object.entries(fetchedData).forEach(([key, value]) => {
              if (value !== null && value !== undefined) {
                setValue(key, value);
              }
            });
          }
        })
        .catch((err) => {
          console.error("Error fetching experience details:", err);
          showErrorToast("Error fetching experience details.");
        });
    }
  };

  // Call API when "Experience" is selected
  useEffect(() => {
    fetchExperienceDetails();
  }, [experienceType]); // Fetch data only when experienceType changes

  // Watch form values to check if they are updating
  console.log("Form values:", watch());

  // Handle Form Submission
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
      formData.append("user_id", user_id);

      if (experienceType === "experience") {
        const fields = [
          "last_company", "exp_start_date", "exp_end_date",
          "last_designation", "last_salary", "current_exp", "current_salary", "total_exp", "UAN"
        ];
        fields.forEach(field => formData.append(field, data[field] || ""));

        // Handle File Uploads
        const fileFields = ["payslip1", "payslip2", "payslip3", "offer_letter", "inc_letter", "exp_letter"];
        fileFields.forEach((fileField) => {
          if (data[fileField]?.[0]) formData.append(fileField, data[fileField][0]);
        });
      }

      const response = await axiosClient.post(`/experience/edit/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data", Employee: `Bearer ${token}` },
      });

      if (response?.data?.message) {
        showSuccessToast("Experience Details updated successfully.");
        console.log(formData);
        navigate(`/employee/home/edit/${id}`);
      } else {
        setServerError(response.data.errors);
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
        <MainHeader title="Experience Detail > Edit" />
        <div className="flex-grow mx-3 mb-3 rounded-lg bg-slate-200">
          <div className="p-3 flex items-center justify-between">
            <h1 className="text-md uppercase font-semibold">
              Update Experience Detail
            </h1>
            <SimpleButton
              danger={true}
              onClick={() => {
                navigate("/dashboard");
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
                <FormInputBar width='md:w-1/4 lg:w-1/4' id='last_company' label='Previous Company Name' placeholder='Enter Your School Name' type='text' columnName='last_company' 
                            validationRules={{ required: "Required"}} 
                            register={register} errors={errors} serverError={serverError}/>

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
                <FormInputBar
                  width="md:w-1/3 lg:w-1/3"
                  id="UAN"
                  label="UAN"
                  placeholder="UAN"
                  type="text"
                  columnName="UAN"
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
