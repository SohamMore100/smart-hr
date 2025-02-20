import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import MainHeader from "../../FormComponents/MainHeader";
import { SimpleButton } from "../../FormComponents/Button";
import axios from "axios";
import { FormInputBar, FormInputSelect, FormInputFile } from "../../FormComponents/FormInput";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import { showSuccessToast, showErrorToast } from "../../toastService";
import { useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";
function EditEmp() {
    const [employee, setEmployye ] = useState({});
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm();
    const [serverError, setSetServerError] = useState({});
    const {id} = useParams();
    const navigate= useNavigate();

    useEffect(() => {
        axiosClient.get(`/users/${id}`).then((result) => {
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

    const onSubmit = async data => {
        const parsedData = {
            ...data,
            prefix: data.prefix+'',
           
        };
        const result = await axiosClient.post(`/users/${id}`, parsedData)
        console.log(result);
        if(result.data.status){
            showSuccessToast("Details updated successfully");
            navigate("/employee/details/edit")
            console.log(result)
        } else {
            setSetServerError(err.response.data.errors)
            showErrorToast("Something went wrong")
            console.log(err);
        }
    };
    return (
        <div className="flex flex-col h-screen overflow-x-scroll">
            <MainHeader title="Employee / Edit"/>
            <div className="flex-grow mx-3 mb-3 rounded-lg bg-slate-200">
                <div className="p-3 flex items-center justify-between">
                <h1 className="text-md uppercase font-semibold">Edit Employee</h1>
                <SimpleButton danger={true} onClick={() => {navigate('../employee')}} icon={<FontAwesomeIcon className="me-2" icon={faMultiply}/>} buttonName='Cancel'/>
                </div>
                <div className="mx-3 mb-3 bg-white rounded-lg p-4">
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

export default EditEmp;
