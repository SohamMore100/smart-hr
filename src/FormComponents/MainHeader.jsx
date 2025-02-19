import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function MainHeader({title, backPath}) {
  const navigate = useNavigate();
  return (
    <div className="py-3 px-4 flex gap-2 items-center">
      <button className="px-2 flex" onClick={() => {navigate(-1)}}><FontAwesomeIcon className="text-xl text-slate-500" icon={faArrowLeft}/></button>
      <h1 className="text-2xl font-semibold">{title}</h1>
    </div>
  );
}