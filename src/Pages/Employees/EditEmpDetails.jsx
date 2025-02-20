import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import MainHeader from "../../FormComponents/MainHeader";
import { SimpleButton } from "../../FormComponents/Button";
import {
  FormInputBar,
  FormInputFile,
  FormInputSelect,
  FormInputTextArea,
} from "../../FormComponents/FormInput";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import { showSuccessToast, showErrorToast } from "../../toastService";
import axiosClient from "../../axiosClient";


export default function EditEmpDetails() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue
  } = useForm();
  const [serverError, setSetServerError] = useState({});
  const [employee, setEmployye ] = useState({});
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reportingManagers, setReportingManagers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchReportingManagers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosClient.get("/users");
        console.log("API Response:", response.data); // Debugging

        // Extract the nested `data` array from the response
        if (response.data && response.data.data && Array.isArray(response.data.data.data)) {
          setReportingManagers(response.data.data.data); // Set the nested `data` array
        } else {
          setError("Invalid API response format");
          showErrorToast("Failed to fetch reporting managers");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching reporting managers:", err);
        showErrorToast("Failed to fetch reporting managers");
      } finally {
        setLoading(false);
      }
    };

    fetchReportingManagers();
  }, []);

  useEffect(() => {
    axiosClient.get(`/employees/${id}`).then((result) => {
        if(result.data.status){
            setEmployye(result.data.data);
        }
    }).catch((err) => {
        
    });
},[])

  useEffect(() => {
    Object.keys(employee).forEach((key) => {
        console.log(key, employee[key]);
        setValue(key, employee[key])
    })
},[employee]);


  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
  
      // Append form fields to FormData
      Object.keys(data).forEach((key) => {
        if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      });
  
      // Append the photo file (ensure `data.photo` is a File object)
      if (data.photo && data.photo[0]) {
        formData.append("photo", data.photo[0]); // Use the first file
      }
  
      const token = localStorage.getItem("employee"); // Retrieve token before API call
  
      const response = await axiosClient.post(
        `/employees/edit/${id}`, // Ensure `id` is defined
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Employee: `Bearer ${token}`, 
          },
        }
      );
  
      console.log("API Response:", response.data); // Debugging
  
      if (response?.data?.message) {
        const user_id = response.data.data?.user_id; // Ensure correct path to user_id
        if (user_id) {
          localStorage.setItem("user_id", user_id); // Store user_id only if it exists
        } else {
          console.error("user_id is undefined in API response");
        }
  
        showSuccessToast("Employee personal information updated successfully.");
        navigate(`/employee/education/edit/${user_id}`);
      } else {
        setSetServerError(response.data.errors);
        showErrorToast("Something went wrong");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      showErrorToast("Something went wrong");
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen overflow-x-scroll">
        <MainHeader title="Employees > Edit" />
        <div className="flex-grow mx-3 mb-3 rounded-lg bg-slate-200">
          <div className="p-3 flex items-center justify-between">
            <h1 className="text-md uppercase font-semibold">
              Update Employee Details
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
              <FormInputSelect
                width="md:w-1/3 lg:w-1/3"
                id="reporting_manager_id"
                label="Reporting Manager"
                placeholder="Select Reporting Manager"
                options={Array.isArray(reportingManagers) ? reportingManagers.map(manager => ({
                  value: manager.id,
                  label: manager.first_name
                })) : []}
                columnName="reporting_manager_id"
                validationRules={{ required: "Required" }}
                register={register}
                errors={errors}
              />

                <FormInputBar
                  width="md:w-1/3 lg:w-1/3"
                  id="aadhar"
                  label="Aadhar Number"
                  placeholder="Enter Aadhar Number"
                  type="text"
                  columnName="aadhar"
                  validationRules={{ required: "Required" }}
                  register={register}
                  errors={errors}
                  serverError={serverError}
                />

                <FormInputBar
                  width="md:w-1/3 lg:w-1/3"
                  id="pan"
                  label="PAN Number"
                  placeholder="Enter PAN Number"
                  type="text"
                  columnName="pan"
                  validationRules={{ required: "Required" }}
                  register={register}
                  errors={errors}
                  serverError={serverError}
                />

                <FormInputBar
                  width="md:w-1/3 lg:w-1/3"
                  id="dob"
                  label="Date of Birth"
                  placeholder="Select DOB"
                  type="date"
                  columnName="dob"
                  validationRules={{ required: "Required" }}
                  register={register}
                  errors={errors}
                  serverError={serverError}
                />

                <FormInputSelect
                  width="md:w-1/3 lg:w-1/3"
                  id="gender"
                  label="Gender"
                  placeholder="Select Gender"
                  options={[
                    { value: 1, label: "Male" },
                    { value: 2, label: "Female" },
                    { value: 3, label: "Other" },
                  ]}
                  columnName="gender"
                  validationRules={{ required: "Required" }}
                  register={register}
                  errors={errors}
                />

                <FormInputBar
                  width="md:w-1/3 lg:w-1/3"
                  id="alternate_mobile"
                  label="Alternate Mobile"
                  placeholder="Enter Alternate Mobile Number"
                  type="text"
                  columnName="alternate_mobile"
                  validationRules={{ required: "Required" }}
                  register={register}
                  errors={errors}
                  serverError={serverError}
                />

                <FormInputTextArea
                  width="md:w-1/3 lg:w-1/3"
                  id="address1"
                  label="Address Line 1"
                  placeholder="Enter Address"
                  type="text"
                  columnName="address1"
                  validationRules={{ required: "Required" }}
                  register={register}
                  errors={errors}
                  serverError={serverError}
                />

                <FormInputTextArea
                  width="md:w-1/3 lg:w-1/3"
                  id="address2"
                  label="Address Line 2"
                  placeholder="Enter Address"
                  type="text"
                  columnName="address2"
                  register={register}
                  errors={errors}
                />

                <FormInputBar
                  width="md:w-1/3 lg:w-1/3"
                  id="city"
                  label="City"
                  placeholder="Enter City"
                  type="text"
                  columnName="city"
                  validationRules={{ required: "Required" }}
                  register={register}
                  errors={errors}
                  serverError={serverError}
                />

                <FormInputBar
                  width="md:w-1/3 lg:w-1/3"
                  id="state"
                  label="State"
                  placeholder="Enter State"
                  type="text"
                  columnName="state"
                  validationRules={{ required: "Required" }}
                  register={register}
                  errors={errors}
                  serverError={serverError}
                />

                <FormInputBar
                  width="md:w-1/3 lg:w-1/3"
                  id="country"
                  label="Country"
                  placeholder="Enter Country"
                  type="text"
                  columnName="country"
                  validationRules={{ required: "Required" }}
                  register={register}
                  errors={errors}
                  serverError={serverError}
                />

                <FormInputBar
                  width="md:w-1/3 lg:w-1/3"
                  id="pin_code"
                  label="Pin Code"
                  placeholder="Enter Pin Code"
                  type="text"
                  columnName="pin_code"
                  validationRules={{ required: "Required" }}
                  register={register}
                  errors={errors}
                  serverError={serverError}
                />

                <FormInputFile
                  width="md:w-1/3 lg:w-1/3"
                  id="photo"
                  label="Upload Photo"
                  type="file"
                  columnName="photo"
                  validationRules={{ required: "Required" }}
                  register={register}
                  errors={errors}
                  serverError={serverError}
                />
              </div>
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
