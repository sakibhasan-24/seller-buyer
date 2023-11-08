import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const navigateRoute = useNavigate();
  const [pageStatus, setPageStatus] = useState("sign up");
  const auth = getAuth();
  const location = useLocation();
  const handleRoute = (route) => {
    navigateRoute(route);
  };
  //   add heading background based on pathname
  const handleHeaderStyle = (route) => {
    if (location.pathname === route) return true;
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageStatus("Profile");
      } else {
        setPageStatus("sign up");
      }
    });
  }, [auth]);
  return (
    <nav className="flex justify-between items-center mx-2 py-3 px-6 bg-green-200 border-b-4 shadow-2xl">
      <div className="w-1/4 ">
        <img
          onClick={() => handleRoute("/")}
          className="w-[100px] cursor-pointer "
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUt6C1DZPHKZ4RpLb3hkqfuOjPdC0QKVCJvQ&usqp=CAU"
          alt="logo"
        />
      </div>
      <ul className="flex items-center justify-evenly space-x-8 font-semibold text-gray-600 cursor-pointer">
        <li
          className={`${
            handleHeaderStyle("/") && "font-bold border-b-4 border-red-300"
          }`}
          onClick={() => handleRoute("/")}
        >
          Home
        </li>
        <li
          className={`${
            handleHeaderStyle("/offer") && "font-bold border-b-4 border-red-300"
          }`}
          onClick={() => handleRoute("/offer")}
        >
          Offers
        </li>
        {/* <li
          className={`${
            handleHeaderStyle("/profile") &&
            "font-bold border-b-4 border-red-300"
          }`}
          onClick={() => handleRoute("/profile")}
        >
          Profile
        </li> */}
        <li
          className={`${
            (handleHeaderStyle("/sign-up") || handleHeaderStyle("/profile")) &&
            "font-bold border-b-4 border-red-300"
          }`}
          onClick={() => handleRoute("/profile")}
        >
          {pageStatus}
        </li>
      </ul>
    </nav>
  );
}
