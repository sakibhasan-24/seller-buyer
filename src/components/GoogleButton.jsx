import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
export default function GoogleButton() {
  return (
    <button className="flex items-center gap-4 justify-center w-full bg-red-700 text-white px-4 py-2 rounded-md uppercase">
      <AiFillGoogleCircle className="text-4xl rounded-full bg-blue-600"></AiFillGoogleCircle>{" "}
      continue with Google
    </button>
  );
}
