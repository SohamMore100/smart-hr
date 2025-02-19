import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"

export const SimpleTable = ({th, tr}) => {
    return (
        <div className="mx-3  shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
                {th.map((t, i) => (
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-slate-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        key={i} >
                        {t}
                    </th>
                ))
                }
            </tr>
          </thead>
          <tbody>
              {
                tr.map((t, i) => (
                  <tr key={'tr'+i} className=" hover:bg-slate-200">
                      {Object.keys(t).map((k, id) => (
                          <td className="px-4 py-3 border-b border-gray-200 bg-white" key={id}>
                              <p className="text-gray-900 whitespace-no-wrap">
                              {/* {console.log(t[k])} */}
                                  {t[k]?.edit 
                                  ? <TableEditButton path={t[k].path+t.id}/>
                                  : t[k]}
                              </p>
                          </td>
                      ))}
                  </tr>
                ))
              }
            </tbody>
        </table>
        {
          tr.length == 0 ?
            <div className="flex justify-center py-3 px-2 uppercase text-sm font-bold">
              No Data
            </div>
            :
            ''
        }
      </div>
    )
}

export const TableEditButton = ({path}) => {
    return (
        <NavLink to={path} className="">
            <span aria-label="Edit" title='Edit'className="relative inline-block px-3 py-1 font-semibold text-blue-900 rounded-lg overflow-hidden hover:bg-blue-200 leading-tight">
                <span aria-hidden className="absolute inset-0 bg-blue-200 opacity-50  "></span>
                <span className="relative text-md"><FontAwesomeIcon icon={faPenToSquare}/></span>
            </span>
        </NavLink>
    )
}

export const TableDeleteButton = ({path}) => {
    return (
        <NavLink to={path} className="">
            <span aria-label="Delete" title='Delete' className="relative inline-block px-3 py-1 font-semibold text-red-900 rounded-lg overflow-hidden hover:bg-red-200 leading-tight">
                <span aria-hidden className="absolute inset-0 bg-red-200 opacity-50  "></span>
                <span className="relative text-md"><FontAwesomeIcon icon={faTrashCan}/></span>
            </span>
        </NavLink>
    )
}