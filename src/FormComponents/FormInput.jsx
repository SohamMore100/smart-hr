import React from "react"

export const FormInputBar = ({id, type, placeholder, label, width, register, errors,serverError, validationRules, columnName, onChange})=> {
    return(
        <div className={"w-full px-3 mb-4 md:mb-2 " + width }>
            <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor={id}>{label}</label>
            <input 
                id={id}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                {...register(columnName, validationRules)}
                className={`appearance-none block w-full bg-slate-50 text-gray-800 border-[2px] rounded py-1 px-2 mb-1 focus:outline-none focus:bg-white ${errors[columnName] ? 'border-red-500' : 'border-violet-200 focus:border-violet-600' }`} />
            {errors[columnName] && <p className="text-red-500 text-sm italic" role="alert">{errors[columnName]?.message}</p>}
            {serverError[columnName] && <p className="text-red-500 text-sm italic" role="alert">{serverError[columnName][0]}</p>}
        </div>
    )
}

export const FormInputFile = ({id, type, placeholder, label, width, register, errors,serverError, validationRules, columnName})=> {
    return(
        <div className={"w-full px-3 mb-4 md:mb-2 " + width }>
            <span class="sr-only">Choose {label}</span>
            <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor={id}>{label}</label>
            <input 
                id={id}
                type={type}
                placeholder={placeholder}
                {...register(columnName, validationRules)}
                className={`w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100
                    ${errors[columnName] ? 'border-red-500' : 'border-violet-200 focus:border-violet-600' }`} />
            {errors[columnName] && <p className="text-red-500 text-sm italic" role="alert">{errors[columnName]?.message}</p>}
            {serverError[columnName] && <p className="text-red-500 text-sm italic" role="alert">{serverError[columnName][0]}</p>}
        </div>
    )
}

export const FormInputSelect = ({id, width, options, placeholder, label, register, errors, validationRules, columnName})=> {
    return(
        <div className={"w-full px-3 mb-4 md:mb-2 " + width }>
            <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor={id}>{label}</label>
            <div className="relative">
                <select
                    id={id}
                    className={`appearance-none block w-full bg-slate-50 text-gray-700 border-[2px] rounded py-1 px-2 mb-1 focus:outline-none focus:bg-white ${errors[columnName] ? 'border-red-500' : 'border-violet-200 focus:border-violet-600' }`}
                    {...register(columnName,validationRules)}>
                    <option value="">{placeholder}</option>
                    {
                        options.map((option, index) => <option key={index} value={option.value}>{option.label}</option>)
                    }
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
            {errors[columnName] && <p className="text-red-500 text-sm italic" role="alert">{errors[columnName]?.message}</p>}
        </div>
    )
}

export const FormInputRadio = ({id, width, type, options, placeholder, label, register, errors, validationRules, columnName})=> {
    return(
        <div className={"flex flex-col w-full px-3 mb-4 md:mb-2 " + width}>
            <label className="block text-gray-700 text-sm font-semibold mb-1" >{label}</label>
            <div className="flex flex-col md:flex-row">
                {
                    options.map((option, index) => (
                        <div className="me-5 flex flex-row items-center my-2 mx-3" key={index}>
                            <input
                            id={option.value+option.label}
                            type={type}
                            placeholder={placeholder}
                            value={option.value}
                            {...register(columnName, validationRules)}
                            className='hidden peer'/>
                            <label htmlFor={option.value+option.label} className="w-5 h-5 mx-1 rounded-full border-[2px] border-violet-200 peer-checked:border-violet-600 peer-checked:bg-violet-600 peer-hover:border-violet-600"></label>
                            <label className="" htmlFor={option.value+option.label}>{option.label}</label>
                        </div>
                        ))
                }
            </div>
            {errors[columnName] && <p className="text-red-500 text-sm italic" role="alert">{errors[columnName]?.message}</p>} 
        </div>
    )
}

export const FormInputCheckbox = ({id, width, placeholder, label, register, errors, validationRules, columnName})=> {
    return(
        <div className={"w-full mb-4 px-3 md:mb-3 "+width}>
            <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor={id}>{label}</label>
            <div className="py-2 ">
            <input 
                id={id}
                type="checkbox"
                placeholder={placeholder}
                {...register(columnName, validationRules)}
                className={`flex h-5 w-5 px-2 py-1  ${errors[columnName] ? 'border-red-500' : 'border-violet-200 focus:border-violet-600' }`} />
            </div>
            {errors[columnName] && <p className="text-red-500 font-medium" role="alert">{errors[columnName]?.message}</p>}
        </div>
    )
}

export const FormInputTextArea = ({id, type, placeholder, label, width, register, errors, validationRules, columnName})=> {
    return(
        <div className="w-full px-3 mb-4 md:mb-2 ">
            <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor={id}>{label}</label>
            <textarea 
                id={id}
                type={type}
                placeholder={placeholder}
                {...register(columnName, validationRules)}
                className={`appearance-none block w-full bg-slate-50 text-gray-700 border-[2px] rounded py-1 px-2 mb-1 focus:outline-none focus:bg-white ${errors[columnName] ? 'border-red-500' : 'border-violet-200 focus:border-violet-600' }`} />
            {errors[columnName] && <p className="text-red-500 text-sm italic" role="alert">{errors[columnName]?.message}</p>}
        </div>
    )
}


