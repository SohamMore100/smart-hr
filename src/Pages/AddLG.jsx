import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import MainHeader from "../FormComponents/MainHeader";
import { SimpleButton } from "../FormComponents/Button";
import axios from "axios";
import { FormInputBar, FormInputSelect } from "../FormComponents/FormInput";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";
// import { showSuccessToast,showErrorToast } from "../../../../toastService";
export default function AddLG() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [serverError, setSetServerError] = useState({});
  const [drSignOptions, setDrSignOptions] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios.get("doctor-signature-list")
      .then(response => {
        // Transform API response into the format required for options
        const formattedOptions = response.data.map(item => ({
          value: item.id, 
          label: item.name
        }));
        setDrSignOptions(formattedOptions);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const onSubmit = async data => {
    const parsedData = {
      ...data,
      // mobile: parseInt(data.mobile, 10),
      // status: data.status === 'true',
    };
    const response = await axios.post('lab-group', parsedData);
    console.log(response);
    if(response?.data?.status){
      // showSuccessToast('Lab Created Successfully.');
      navigate("/lab-group")
      console.log(response.data.data)
      
    } else {
      setSetServerError(response.data.errors)
      // showErrorToast('Something went wrong');
      console.log(err);
    }  
  };

  return (
    <div className="flex flex-col h-screen overflow-x-scroll">
      <MainHeader title="Lab Group / Add" />
      <div className="flex-grow mx-3 mb-3 rounded-lg bg-slate-200">
        <div className="p-3 flex items-center justify-between">
          <h1 className="text-md uppercase font-semibold">Add New Lab Group</h1>
          <SimpleButton danger={true} onClick={() => {navigate('../configure/lab-group')}} icon={<FontAwesomeIcon className="me-2" icon={faMultiply}/>} buttonName='Cancel'/>
        </div>
        <div className="mx-3 mb-3 bg-white rounded-lg p-3">
             <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-wrap mb-6">
                  <FormInputBar width='md:w-1/3 lg:w-1/3' id='name' label='Name' placeholder='Name' type='text' columnName='name' 
                    validationRules={{ required: "Required"}} 
                    register={register} errors={errors} serverError={serverError}/>
                  <FormInputBar width='md:w-1/3 lg:w-1/3' id='sort_order' label='Group/Page Order' placeholder='Group/Page Order' type='number' columnName='sort_order' 
                    validationRules={{ required: false}} register={register} errors={errors} serverError={serverError}/>
                   <FormInputSelect width="md:w-1/3" options={drSignOptions} id="dr_sign_id" label="Dr. Signature" 
                    placeholder="Select Dr. Signature" columnName="dr_sign_id" validationRules={{ required: "Required" }} 
                    register={register} errors={errors} serverError={serverError} />
                </div>
                <SimpleButton buttonName={isSubmitting ? 'Submitting...' :'Submit'} type='submit' disabled={isSubmitting} />
            </form>
        </div>
      </div>
    </div>
  );
}

