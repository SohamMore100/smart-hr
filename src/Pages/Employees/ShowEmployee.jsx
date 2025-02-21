import { useState, useEffect } from "react";
import MainHeader from "../../FormComponents/MainHeader";
import { InputSearch } from "../../FormComponents/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { SimpleButton } from "../../FormComponents/Button";
import { useNavigate } from "react-router-dom";
import { TableEditButton } from "../../FormComponents/Tables";
import axiosClient from "../../axiosClient";

function addEditProperty(objects){
    objects.map((obj) => {
        obj.action = {edit:true , path:'/employee/edit/'}
        
    })
    return objects;
}


function ShowEmployee() {
  const [account, setAccount] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cSearch, setCSearch] = useState();

  const navigate = useNavigate();

  const accountData = (accountData) => {
    const newData = accountData.map(data => {
      let role;
      
      switch(data.role){
        case 1:
          role ='HR'
          break;
        case 2:
          role ='Intern'
          break;
        case 3:
          role ='Junior Associate Engineer'
          break;
        case 4:
          role ='Associate Engineer'
          break;
        case 5:
          role ='Project Manager'
          break;
        case 6:
          role ='Data Entry Executive'
          break;
        default:
          role =' '
          break;
      }
     
      return {
        id: data.id,
        first_name: data.first_name,
        role: data.role,
        role_name: data.role_name,
      }
    });
    addEditProperty(newData)
    console.log(newData);
    setAccount(newData);
  }
  useEffect(() => {
    if(cSearch){
      axiosClient.get(`/users?search=${cSearch}`).then((result) => {
        console.log(result);
        if(result.data.status){
          accountData(result.data.data.data)
          setLoading(false);
        }
       
      }).catch((err) => {
        console.log(err);
      });
    } else {
      axiosClient.get('/users').then((result) => {
        if(result.data.status){
          accountData(result.data.data.data)
          
          setLoading(false);
        }
      }).catch((err) => {``
        console.log(err);
      });
    }
  },[cSearch])

  return (
    <div className="flex flex-col h-full">
      <MainHeader title="Accounts" />
      <div className="flex-grow mx-3 mb-3 rounded-lg bg-slate-200">
        <div className="p-3 flex items-center justify-between">
          <h1 className="text-md uppercase font-semibold">All Accounts</h1>
          <div className="flex items-center gap-3">
            <SimpleButton onClick={() => {navigate('add')}} icon={<FontAwesomeIcon className="me-2" icon={faPlus}/>} buttonName='Add Account'/>
            <InputSearch id='CCSearch' type='text' placeholder="Search..." label='Search' value={cSearch} onChange={(e) => setCSearch(e.target.value)}/>
          </div>
        </div>
      
        <div>
                            { loading ? "Loading":
                               <div className="mx-3  shadow-md rounded-lg overflow-hidden">
                                       <table className="min-w-full leading-normal">
                                         <thead>
                                           <tr>
                                               <th className="px-5 py-3 border-b-2 border-gray-200 bg-slate-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Id</th>
                                               <th className="px-5 py-3 border-b-2 border-gray-200 bg-slate-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                                        
                                               <th className="px-5 py-3 border-b-2 border-gray-200 bg-slate-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Designation</th>
                                           
                
                                               <th className="px-5 py-3 border-b-2 border-gray-200 bg-slate-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                                           </tr>
                                         </thead>
                                         <tbody>
                                             {
                                               account.map((t, i) => (
                                                 <tr key={i} className=" hover:bg-slate-200">
                                                    <td className="px-4 py-3 border-b border-gray-200 bg-white">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                        {i+1}
                                                        </p>
                                                    </td>
                                                    <td className="px-4 py-3 border-b border-gray-200 bg-white">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                        {t.first_name}
                                                        </p>
                                                    </td>
                                                   
                                                    <td className="px-4 py-3 border-b border-gray-200 bg-white">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                        {t.role_name}
                                                        </p>
                                                    </td>
                                                   
                                                   
                                                    <td className="px-4 py-3 border-b border-gray-200 bg-white">
                                                        <TableEditButton path={`/employee/home/edit/${t.id}`}/>
                                                        
                                                    </td>
                                                 </tr>
                                               ))
                                             }
                                           </tbody>
                                       </table>
                                       {
                                         account.length == 0 ?
                                           <div className="flex justify-center py-3 px-2 uppercase text-sm font-bold">
                                             No Data
                                           </div>
                                           :
                                           ''
                                       }
                                     </div>
                            }
                        </div>
      </div>
    </div>
  );
}

export default ShowEmployee
