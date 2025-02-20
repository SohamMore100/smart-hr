import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import MainHeader from "../../FormComponents/MainHeader";
import { SimpleButton } from "../../FormComponents/Button";
import { FormInputBar,  FormInputFile } from "../../FormComponents/FormInput";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import { showSuccessToast, showErrorToast } from "../../toastService";
import axiosClient from "../../axiosClient";

export default function EduDetails() {
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [serverError, setSetServerError] = useState({});

  const navigate = useNavigate();


 

  const onSubmit = async (data) => {
    try {


      // Get token from localStorage
      const token = localStorage.getItem("employee");
      console.log(token);
      // Ensure token exists
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      const doc_ssc = data.doc_ssc[0];
      const doc_hsc = data.doc_hsc[0];
      const doc_graduation = data.doc_graduation[0];
      const doc_pg = data.doc_pg[0];
      // Prepare the data
      const parsedData = {
        ...data,
       
      };
      const formData = new FormData();
        formData.append("doc_ssc", doc_ssc);
        formData.append("doc_hsc", doc_hsc);
        formData.append("doc_graduation", doc_graduation);
        formData.append("doc_pg", doc_pg);
        Object.keys(parsedData).forEach((key) => {
          if (!['doc_ssc', 'doc_hsc', 'doc_graduation', 'doc_pg'].includes(key)) {
            formData.append(key, parsedData[key]);
        }
        })
      // Make the API request with Authorization header
      const response = await axiosClient.post("/education/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
            Employee: `Bearer ${token}`, 
        },
      });
  
      console.log(response);
  
      if (response?.data?.message) {
        showSuccessToast("Academic Details are stored Successfully.");
        navigate("/employee/experience/add");
        console.log(response.data.data);
      } else {
        setSetServerError(response.data.errors);
        console.error("Error response:", response.data.errors);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      showErrorToast("Something went wrong");
    }
  };
  

  return (
    <div className="flex flex-col h-screen overflow-x-scroll">
      <MainHeader title="Employee / Academic Details / Add" />
      <div className="flex-grow mx-3 mb-3 rounded-lg bg-slate-200">
        <div className="p-3 flex items-center justify-between">
          <h1 className="text-md uppercase font-semibold">Add Academic Details</h1>
          <SimpleButton danger={true} onClick={() => {navigate('../employee/')}} icon={<FontAwesomeIcon className="me-2" icon={faMultiply}/>} buttonName='Cancel'/>
        </div>
        <div className="mx-3 mb-3 bg-white rounded-lg p-3">
             <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-wrap mb-6">
                <FormInputBar width='md:w-1/4 lg:w-1/4' id='ssc_schoole' label='SSC School Name' placeholder='Enter Your School Name' type='text' columnName='ssc_schoole' 
                    validationRules={{ required: "Required"}} 
                    register={register} errors={errors} serverError={serverError}/>
                  <FormInputBar width='md:w-1/4 lg:w-1/4' id='ssc_per' label='Percentage' placeholder='Enter your SSC percentage' type='number' columnName='ssc_per' 
                    validationRules={{ required: false}} register={register} errors={errors} serverError={serverError}/>
                  <FormInputBar width='md:w-1/4 lg:w-1/4' id='ssc_passout_year' label='SSC Passout Year' placeholder='Enter your passout year' type='date' columnName='ssc_passout_year' 
                    validationRules={{ required: false}} register={register} errors={errors} serverError={serverError}/>
                  <FormInputBar width='md:w-1/4 lg:w-1/4' id='ssc_board' label='Board Name' placeholder='Enter your SSC Board Name' type='text' columnName='ssc_board' 
                    validationRules={{ required: false}} register={register} errors={errors} serverError={serverError}/>
                  

                  <FormInputBar width='md:w-1/4 lg:w-1/4' id='hsc_school' label='HSC College Name' placeholder='Enter Your College Name' type='text' columnName='hsc_school' 
                    validationRules={{ required: "Required"}} 
                    register={register} errors={errors} serverError={serverError}/>
                  <FormInputBar width='md:w-1/4 lg:w-1/4' id='hsc_per' label='Percentage' placeholder='Enter your HSC percentage' type='number' columnName='hsc_per' 
                    validationRules={{ required: false}} register={register} errors={errors} serverError={serverError}/>
                  <FormInputBar width='md:w-1/4 lg:w-1/4' id='hsc_passout_year' label='HSC Passout Year' placeholder='Enter your passout year' type='date' columnName='hsc_passout_year' 
                    validationRules={{ required: false}} register={register} errors={errors} serverError={serverError}/>
                  <FormInputBar width='md:w-1/4 lg:w-1/4' id='hsc_board' label='Board Name' placeholder='Enter your HSC Board Name' type='text' columnName='hsc_board' 
                    validationRules={{ required: false}} register={register} errors={errors} serverError={serverError}/>
                  <FormInputBar width='md:w-1/4 lg:w-1/4' id='hsc_stream' label='Stream' placeholder='Enter your stream' type='text' columnName='hsc_stream' 
                    validationRules={{ required: false}} register={register} errors={errors} serverError={serverError}/>


                  <FormInputBar width='md:w-1/4 lg:w-1/4' id='graduation_college' label='Graduation College Name' placeholder='Enter Your College Name' type='text' columnName='graduation_college' 
                    validationRules={{ required: "Required"}} 
                    register={register} errors={errors} serverError={serverError}/>
                  <FormInputBar width='md:w-1/4 lg:w-1/4' id='graduation_cgpa' label='Graduation CGPA' placeholder='Enter your graduation CGPA' type='number' columnName='graduation_cgpa' 
                    validationRules={{ required: false}} register={register} errors={errors} serverError={serverError}/>
                  <FormInputBar width='md:w-1/4 lg:w-1/4' id='graduation_start_year' label='Graduation start Year' placeholder='Enter your start year' type='date' columnName='graduation_start_year' 
                    validationRules={{ required: false}} register={register} errors={errors} serverError={serverError}/>
                  <FormInputBar width='md:w-1/4 lg:w-1/4' id='graduation_passout_year' label='Graduation Passout Year' placeholder='Enter your passout year' type='date' columnName='graduation_passout_year' 
                    validationRules={{ required: false}} register={register} errors={errors} serverError={serverError}/>
                  <FormInputBar width='md:w-1/4 lg:w-1/4' id='graduation_course' label='Ener your Graduation Course' placeholder='Enter your course' type='text' columnName='graduation_course' 
                    validationRules={{ required: false}} register={register} errors={errors} serverError={serverError}/>
                  <FormInputBar width='md:w-1/4 lg:w-1/4' id='graduation_university' label='Ener your University Name' placeholder='Enter your university name' type='text' columnName='graduation_university' 
                    validationRules={{ required: false}} register={register} errors={errors} serverError={serverError}/>


                  <FormInputBar width='md:w-1/4 lg:w-1/4' id='PG_college' label='PG College Name' placeholder='Enter Your College Name' type='text' columnName='PG_college' 
                   
                    register={register} errors={errors} serverError={serverError}/>
                  <FormInputBar width='md:w-1/4 lg:w-1/4' id='pg_cgpa' label='Graduation CGPA' placeholder='Enter your PG CGPA' type='number' columnName='pg_cgpa' 
                    validationRules={{ required: false}} register={register} errors={errors} serverError={serverError}/>
                  <FormInputBar width='md:w-1/4 lg:w-1/4' id='pg_start_year' label='PG start Year' placeholder='Enter your start year' type='date' columnName='pg_start_year' 
                    validationRules={{ required: false}} register={register} errors={errors} serverError={serverError}/>
                  <FormInputBar width='md:w-1/4 lg:w-1/4' id='pg_passout_year' label='PG Passout Year' placeholder='Enter your passout year' type='date' columnName='pg_passout_year' 
                    validationRules={{ required: false}} register={register} errors={errors} serverError={serverError}/>
                  <FormInputBar width='md:w-1/4 lg:w-1/4' id='pg_course' label='Ener your PG Course' placeholder='Enter your course' type='text' columnName='pg_course' 
                    validationRules={{ required: false}} register={register} errors={errors} serverError={serverError}/>
                  <FormInputBar width='md:w-1/4 lg:w-1/4' id='pg_university' label='Ener PG your University Name' placeholder='Enter your university name' type='text' columnName='pg_university' 
                    validationRules={{ required: false}} register={register} errors={errors} serverError={serverError}/>

                   <FormInputFile width="md:w-1/4"  id="doc_ssc" label="SSC Marksheet" type='file'
                    placeholder="upload SSC Marksheet" columnName="doc_ssc" validationRules={{ required: "Required" }} 
                    register={register} errors={errors} serverError={serverError} />
                   <FormInputFile width="md:w-1/4"  id="doc_hsc" label="HSC Marksheet" type='file'
                    placeholder="upload HSC Marksheet" columnName="doc_hsc" validationRules={{ required: "Required" }} 
                    register={register} errors={errors} serverError={serverError} />
                   <FormInputFile width="md:w-1/4"  id="doc_graduation" label="Graduation Marksheet" type='file'
                    placeholder="upload Graduation Marksheet" columnName="doc_graduation" validationRules={{ required: "Required" }} 
                    register={register} errors={errors} serverError={serverError} />
                   <FormInputFile width="md:w-1/4"  id="doc_pg" label="PG Marksheet" type='file'
                    placeholder="upload PG Marksheet" columnName="doc_pg" 
                    register={register} errors={errors} serverError={serverError} />
                </div>
                <SimpleButton buttonName={isSubmitting ? 'Submitting...' :'Submit'} type='submit' disabled={isSubmitting} />
            </form>
        </div>
      </div>
    </div>
  );
}

