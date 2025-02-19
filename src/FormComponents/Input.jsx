import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

export const InputLabel = ({id, type, placeholder, label, value, onChange})=> {
    return(
        <div className="flex flex-col space-y-2 mb-5">
            <label className='text-lg font-medium' htmlFor={id}>{label}</label>
            <input
            value={value}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-purple-400 focus:shadow-outline" 
            id={id} 
            type={type} 
            placeholder={placeholder} />
      </div>
    )
}
export const InputSearch = ({id, type, placeholder, label, value, onChange})=> {
    return(
        <div className="flex">
            <input
            value={value}
            onChange={onChange}
            className="shadow rounded-l-lg w-full py-2 px-4 text-gray-700 focus:outline-violet-600 " 
            id={id} 
            type={type} 
            placeholder={placeholder} />
            <button className='bg-violet-600 text-white py-2 px-3 rounded-r-lg' htmlFor={id}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
      </div>
    )
}
