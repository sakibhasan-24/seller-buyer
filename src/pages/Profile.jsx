import React, { useState } from "react";

export default function Profile() {
  const [formData, setFormData] = useState({
    name: "sakib",
    email: "sakibhasan7724@gmail.com",
  });
  return (
    <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
      <h1 className="text-3xl text-center font-bold mt-4">My Profile</h1>
      <div className="w-full md:w-[50%] mt-6 px-4 ">
        <form>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            className="w-full mb-5 px-4 py-2 text-2xl text-gray-900 bg-white border border border-gray-400 rounded-xl transition duration-500 ease-in-out"
          />
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            className="w-full mb-5 px-4 py-2 text-2xl text-gray-900 bg-white border border border-gray-400 rounded-xl transition duration-500 ease-in-out"
          />
          <div className="flex justify-between mb-6 whitespace-nowrap text-sm lg:text-lg">
            <p className="flex items-center ">
              Need Motification?{" "}
              <span className="text-red-600 hover:text-red-400">Edit</span>{" "}
            </p>
            <p>sign Out</p>
          </div>
        </form>
      </div>
    </section>
  );
}
