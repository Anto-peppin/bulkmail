import React from "react";
import { NavLink } from "react-router-dom";

const Aside = () => {
  return (
    <div className="hidden w-fit p-2 border-r-2 md:flex flex-col gap-2 min-h-[90vh]  ">
      <NavLink
        to={"/"}
         style={{whiteSpace:'nowrap'}}
        className={({ isActive }) =>
          `${
            isActive
              ? "border-b-2 border-gray-600 shadow-[inset_0-1px_3px_gray]"
              : ""
          } p-1 font-bold text-xl cursor-pointer `
        }
      >
        Bulk Mailer
      </NavLink>
      <NavLink
        to={"/reader"}
        style={{whiteSpace:'nowrap'}}
        className={({ isActive }) =>
          `${
            isActive
              ? "border-b-2 border-gray-600 text-center shadow-[inset_0-1px_3px_gray]"
              : ""
          } p-1 font-bold text-xl cursor-pointer `
        }
      >
        History
      </NavLink>
    </div>
  );
};

export default Aside;
