"use client";
import React from "react";

export const SimpleButton = ({
  buttonName,
  onClick,
  type,
  disabled,
  icon,
  danger,
  gray,
  primary,
  success
}) => {
  const bg = `${ danger ? ' bg-red-500' : ''}${success ?' bg-green-500' : ''}${primary ?' bg-blue-500' : ''}${gray ?' bg-slate-500' : ''}`
  return (
      <div>
        <button onClick={onClick} type={type} disabled={disabled}
        className={"px-4 py-2 rounded-lg text-white text-md font-semibold hover:-translate-y-1 transform transition duration-200 hover:shadow-lg" 
        + ( bg != '' ? bg : ' bg-violet-600')}>
            {icon}{buttonName}
        </button>
      </div>
  );
};


export const GradientButton = ({
  buttonName,
  onClick,
  type
}) => {
  return (
      <div>
         <button onClick={onClick} type={type} className="px-8 py-2 rounded-full bg-gradient-to-b from-violet-500 to-violet-600 text-white font-semibold focus:ring-2 focus:ring-violet-400 hover:shadow-xl transition duration-200">
            {buttonName}
        </button>
      </div>
  );
};
