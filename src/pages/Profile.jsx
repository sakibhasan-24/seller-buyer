import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase.config";

export default function Profile() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const handleLogOut = () => {
    auth.signOut();
    navigate("/");
  };
  const [isEdit, setIsEdit] = useState(false);
  const handleEditValue = (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleEditValueSubmit = async (e) => {
    try {
      if (auth.currentUser.displayName !== formData.name) {
        // update display name
        await updateProfile(auth.currentUser, {
          displayName: formData.name,
        });
        // update in the firebase
        const userDoc = doc(db, "users", auth.currentUser.uid);
        // now need to update the doc
        await updateDoc(userDoc, {
          uName: formData.name,
        });
      }
      toast.success("profile update successfully....");
    } catch (error) {
      toast.error("No Update Found");
    }
  };
  return (
    <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
      <h1 className="text-3xl text-center font-bold mt-4">My Profile</h1>
      <div className="w-full md:w-[50%] mt-6 px-4 ">
        <form>
          <input
            type="text"
            name="name"
            id="name"
            disabled={!isEdit}
            value={formData.name}
            onChange={handleEditValue}
            className={`w-full mb-5 px-4 py-2 text-2xl text-gray-900 bg-white  border border-gray-400 rounded-xl transition duration-500 ease-in-out ${
              isEdit && "bg-red-500"
            }`}
          />
          <input
            type="email"
            name="email"
            id="email"
            disabled={true}
            value={formData.email}
            className={`w-full mb-5 px-4 py-2 text-2xl text-gray-900 bg-white  border border-gray-400 rounded-xl transition duration-500 ease-in-out 
            }`}
          />
          <div className="flex justify-between mb-6 whitespace-nowrap text-sm lg:text-lg">
            <p className="flex items-center ">
              Need Motification?{" "}
              <span
                onClick={() => {
                  isEdit && handleEditValueSubmit();
                  setIsEdit(!isEdit);
                }}
                className="text-red-600 hover:text-red-950 cursor-pointer font-bold"
              >
                {isEdit ? "save the changes" : "edit"}
              </span>
            </p>
            <p
              className="bg-blue-500 px-2 py-1 text-white cursor-pointer"
              onClick={handleLogOut}
            >
              sign Out
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
