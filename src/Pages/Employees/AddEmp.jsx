import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import MainHeader from "../../FormComponents/MainHeader";
import { SimpleButton } from "../../FormComponents/Button";
import { FormInputBar, FormInputSelect, FormInputFile } from "../../FormComponents/FormInput";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import { showErrorToast, showSuccessToast } from "../../toastService";
import axiosClient from "../../axiosClient";

export default function AddEmp() {
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [serverError, setServerError] = useState({});

  const navigate = useNavigate();




  const onSubmit = async (data) => {
    try {
      const response = await axiosClient.post("/register", data);
      if (response.data.success) {
        showSuccessToast("User registered successfully");
        const token = response.data.token;

      if (token) {
        // Remove 'Bearer ' prefix before storing
        
        localStorage.setItem('employee', token);
      } else {
        console.warn("Authorization token not found in response headers");
      }
        navigate("../employee/details/add/:id");
      } else {
        setServerError(response.data.error);
        showErrorToast(response.data.error)
        showErrorToast("Something Went Wrong")
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setServerError(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-x-scroll">
      <MainHeader title="Employee / Add" />
      <div className="flex-grow mx-3 mb-3 rounded-lg bg-slate-200">
        <div className="p-3 flex items-center justify-between">
          <h1 className="text-md uppercase font-semibold">Add Employee</h1>
          <SimpleButton danger={true} onClick={() => {navigate('../employee/')}} icon={<FontAwesomeIcon className="me-2" icon={faMultiply}/>} buttonName='Cancel'/>
        </div>
        <div className="mx-3 mb-3 bg-white rounded-lg p-3">
             <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-wrap mb-6">
                  <FormInputBar width='md:w-1/4 lg:w-1/4' id='first_name' label='First Name' placeholder='Enter First Name' type='text' columnName='first_name' 
                    validationRules={{ required: "Required"}} 
                    register={register} errors={errors} serverError={serverError}/>
                  <FormInputBar width='md:w-1/4 lg:w-1/4' id='middle_name' label='Middle Name' placeholder='Enter  middle name' type='text' columnName='middle_name' 
                    validationRules={{ required: false}} register={register} errors={errors} serverError={serverError}/>
                  <FormInputBar width='md:w-1/4 lg:w-1/4' id='last_name' label='Last Name' placeholder='Enter  last name' type='text' columnName='last_name' 
                    validationRules={{ required: false}} register={register} errors={errors} serverError={serverError}/>
                  <FormInputBar width='md:w-1/4 lg:w-1/4' id='mobile' label='Contact Number' placeholder='10 Digit contact number' type='number' columnName='mobile' 
                    validationRules={{ required: false}} register={register} errors={errors} serverError={serverError}/>
                  <FormInputBar width='md:w-1/4 lg:w-1/4' id='email' label='Email' placeholder='Enter email' type='email' columnName='email' 
                    validationRules={{ required: false}} register={register} errors={errors} serverError={serverError}/>
                  <FormInputBar width='md:w-1/4 lg:w-1/4' id='password' label='Password' placeholder='Enter password' type='password' columnName='password' 
                    validationRules={{ required: false}} register={register} errors={errors} serverError={serverError}/>
                   <FormInputSelect
                    width='md:w-1/4'
                    options={[{ value: 2, label: 'Intern' }, { value: 3, label: 'Junior Associate Engineer.' }, { value: 4, label: 'Associate Engineer' }, { value: 5, label: 'Project Manager' }, { value: 6, label: 'Data Entry Executive' }]}
                    id='role'
                    label='Select Designation'
                    placeholder='Select Designation'
                    columnName='role'
                    validationRules={{ required: "Required" }}
                    register={register}
                    errors={errors}
                    serverError={serverError}
                  />
     
                </div>
                <SimpleButton buttonName={isSubmitting ? 'Submitting...' :'Submit'} type='submit' disabled={isSubmitting} />
            </form>
        </div>
      </div>
    </div>
  );
}

