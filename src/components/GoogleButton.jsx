import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { getDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
export default function GoogleButton() {
  const navigate = useNavigate();
  const handleGoogleLogIn = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const userInfo = await signInWithPopup(auth, provider);
      const user = userInfo.user;
      // console.log(user);
      // ------------------add user in the db-------------------

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          uName: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("not authorized!");
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleLogIn}
      className="flex items-center gap-4 justify-center w-full bg-red-700 text-white px-4 py-2 rounded-md uppercase"
    >
      <AiFillGoogleCircle className="text-4xl rounded-full bg-blue-600"></AiFillGoogleCircle>{" "}
      continue with Google
    </button>
  );
}
