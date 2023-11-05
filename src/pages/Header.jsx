import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigateRoute = useNavigate();
  const handleRoute = (route) => {
    navigateRoute(route);
  };
  return (
    <nav className="flex justify-between items-center mx-2 py-3 px-6 bg-green-200 border-b-4 shadow-2xl">
      <div className="w-1/4 ">
        <img
          className="w-[100px] "
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUt6C1DZPHKZ4RpLb3hkqfuOjPdC0QKVCJvQ&usqp=CAU"
          alt="logo"
        />
      </div>
      <ul className="flex items-center justify-evenly space-x-8 font-semibold text-gray-600 cursor-pointer">
        <li onClick={() => handleRoute("/")}>Home</li>
        <li onClick={() => handleRoute("/offer")}>Offers</li>
        <li onClick={() => handleRoute("/profile")}>Profile</li>
        <li onClick={() => handleRoute("/sign-up")}>SignIn</li>
      </ul>
    </nav>
  );
}
