import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //password show or not

  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData;
  const handleFormData = (e) => {
    e.preventDefault();
    // console.log([e.target.id]);email///password field
    setFormData((previousState) => ({
      ...previousState,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <section>
      <h1 className="font-bold text-center text-3xl mt-6 max-w-5xl mx-auto">
        SignIn
      </h1>
      <div className="flex flex-wrap justify-center items-center px-2 py-4">
        <div className="w-[100%] md:[w-60%] lg:w-[50%] mb-12 md:mb-4 ">
          <img
            className="w-full h-[400px] lg:h-[500px] rounded-2xl"
            src="https://plus.unsplash.com/premium_photo-1676618539987-12b7c8a8ae61?auto=format&fit=crop&q=80&w=1935&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="w-[100%] lg:w-[40%] md:w-[70%] lg:ml-2">
          <form className="">
            <input
              type="email"
              id="email"
              value={email}
              className="w-full px-4  py-3 border-gray-300 rounded-lg mb-6"
              onChange={handleFormData}
            />
            <div className="relative">
              <input
                type={`${showPassword ? "text" : "password"}`}
                id="password"
                value={password}
                className="w-full px-4  py-3 border-gray-300 rounded-lg"
                onChange={handleFormData}
              />
              {showPassword ? (
                <AiFillEye
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-2xl "
                />
              ) : (
                <AiFillEyeInvisible
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-2xl "
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
