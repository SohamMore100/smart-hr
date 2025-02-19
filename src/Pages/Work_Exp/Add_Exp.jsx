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
// import { showSuccessToast,showErrorToast } from "../../../../toastService";

export default function Add_Exp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [serverError, setSetServerError] = useState({});
  const [drSignOptions, setDrSignOptions] = useState([]);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/experience/add/${id}`)
      .then((response) => {
        // Transform API response into the format required for options
        const formattedOptions = response.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setDrSignOptions(formattedOptions);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const onSubmit = async (data) => {
    const parsedData = {
      ...data,
      // mobile: parseInt(data.mobile, 10),
      // status: data.status === 'true',
    };
    const response = await axios.post("lab-group", parsedData);
    console.log(response);
    if (response?.data?.status) {
      // showSuccessToast('Lab Created Successfully.');
      navigate("/lab-group");
      console.log(response.data.data);
    } else {
      setSetServerError(response.data.errors);
      // showErrorToast('Something went wrong');
      console.log(err);
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
                navigate("/dashboard");
              }}
              icon={<FontAwesomeIcon className="me-2" icon={faMultiply} />}
              buttonName="Cancel"
            />
          </div>
          <div className="mx-3 mb-3 bg-white rounded-lg p-3">
            <form onSubmit={handleSubmit(onSubmit)}>
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
