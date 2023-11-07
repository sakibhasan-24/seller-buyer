import React, { useState } from "react";
import { Link } from "react-router-dom";
import GoogleButton from "../components/GoogleButton";
import { toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
export default function ForgetPassword() {
  const [email, setEmail] = useState("");

  //password show or not

  const handleFormData = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const handleForgetPassword = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success(" check your email.if needed check spam");
    } catch (error) {
      toast.error("email is not Correct");
    }
  };
  return (
    <section>
      <h1 className="font-bold text-center text-3xl mt-6 max-w-5xl mx-auto">
        Forget Password
      </h1>
      <div className="flex flex-wrap justify-center items-center px-2 py-4">
        <div className="w-[100%] md:[w-60%] lg:w-[50%] mb-12 md:mb-4 ">
          <img
            className="w-full h-[300px] lg:h-[500px] rounded-2xl"
            src="https://plus.unsplash.com/premium_photo-1676618539987-12b7c8a8ae61?auto=format&fit=crop&q=80&w=1935&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="w-[100%] lg:w-[40%] md:w-[70%] lg:ml-2">
          <form onSubmit={handleForgetPassword} className="">
            <input
              type="email"
              id="email"
              value={email}
              className="w-full px-4  py-3 border-gray-300 rounded-lg mb-6"
              onChange={handleFormData}
            />

            <div className="flex items-center justify-between  whitespace-nowrap text-xs lg:text-lg mt-4">
              <p>
                Dont't Have an account?
                <Link
                  className="text-red-200 ml-2 hover:text-red-800"
                  to="/register"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  className="text-blue-200 ml-2 hover:text-blue-800"
                  to="/sign-up"
                >
                  log in
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-green-950 text-white text-lg my-4  uppercase px-4 py-2 rounded-xl font-bold hover:bg-green-700 transition duration-700 ease-in-out "
              type="submit"
            >
              Send email for reset password
            </button>
            <div className="flex items-center my-6 before:border-t-4 before:flex-1 before:border-gray-800 after:border-t-4 after:flex-1 after:border-gray-800">
              <p className="text-center text-bold px-4">Or</p>
            </div>
            <GoogleButton></GoogleButton>
          </form>
        </div>
      </div>
    </section>
  );
}
