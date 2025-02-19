import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import MainHeader from "../../FormComponents/MainHeader";
import { SimpleButton } from "../../FormComponents/Button";
import axios from "axios";
import {
  FormInputBar,
  FormInputFile,
  FormInputSelect,
  FormInputTextArea,
} from "../../FormComponents/FormInput";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../Layout Component/Navbar";
import Sidebar from "../../Layout Component/Sidebar";

export default function AddEmpDetails() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [serverError, setSetServerError] = useState({});
  const [drSignOptions, setDrSignOptions] = useState([]);
  const navigate = useNavigate();

  const { id } = useParams();

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

      const response = await axios.post(
        "http://localhost:8000/api/employees/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
      if (response?.data?.message) {
        showSuccessToast("Employee Created Successfully.");
        navigate("/dashboard");
        console.log(response.data.data);
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
        <MainHeader title="Employees > Add" />
        <div className="flex-grow mx-3 mb-3 rounded-lg bg-slate-200">
          <div className="p-3 flex items-center justify-between">
            <h1 className="text-md uppercase font-semibold">
              Add New Employee
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
                  options={[
                    { value: "1", label: "Manager 1" },
                    { value: "2", label: "Manager 2" },
                  ]}
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

                {/* <FormInputFile
                  width="md:w-1/3 lg:w-1/3"
                  id="photo"
                  label="Upload Photo"
                  type="file"
                  columnName="photo"
                  // validationRules={{ required: "Required" }}
                  register={register}
                  errors={errors}
                  serverError={serverError}
                /> */}
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
