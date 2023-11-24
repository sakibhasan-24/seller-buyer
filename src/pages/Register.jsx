import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import GoogleButton from "../components/GoogleButton";
import { db } from "../firebase.config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    uName: "",
    email: "",
    password: "",
  });
  //password show or not

  const [showPassword, setShowPassword] = useState(false);
  const { uName, email, password } = formData;
  const handleFormData = (e) => {
    e.preventDefault();
    // console.log([e.target.id]);email///password field
    setFormData((previousState) => ({
      ...previousState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userInfo = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, {
        displayName: uName,
      });
      const user = userInfo.user;
      // remove password...No need to store password
      const newFormData = { ...formData };
      delete newFormData.password;
      newFormData.timestamp = serverTimestamp();

      // save it inside db
      await setDoc(doc(db, "users", user.uid), newFormData);
      // after successfull login navigate it in home page
      navigate("/");
      toast.success(newFormData.uName + "successufully register");
      // console.log(user);
    } catch (error) {
      // console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <section>
      <h1 className="font-bold text-center text-3xl mt-6 max-w-5xl mx-auto">
        SignIn
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
          <form onSubmit={handleFormSubmit} className="">
            <input
              type="text"
              id="uName"
              value={uName}
              className="w-full px-4  py-3 border-gray-300 rounded-lg mb-6"
              onChange={handleFormData}
            />
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
            <div className="flex items-center justify-between  whitespace-nowrap text-xs lg:text-lg mt-4">
              <p>
                already Have an account?
                <Link
                  className="text-red-200 ml-2 hover:text-red-800"
                  to="/sign-up"
                >
                  Sign Up
                </Link>
              </p>
              <p>
                <Link
                  className="text-blue-200 ml-2 hover:text-blue-800"
                  to="/forgot-password"
                >
                  Forget Password?
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-green-950 text-white text-lg my-4  uppercase px-4 py-2 rounded-xl font-bold hover:bg-green-700 transition duration-700 ease-in-out "
              type="submit"
            >
              Sign In
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
