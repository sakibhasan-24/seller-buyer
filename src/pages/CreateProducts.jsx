import React, { useState } from "react";

export default function CreateProducts() {
  const [formData, setFormData] = useState({
    type: "buy",
  });
  const handleTypeOfService = (e) => {};
  return (
    <section className="max-w-md mx-auto px-2">
      <h1 className="text-center mt-8 font-bold text-2xl">
        Create Your Products
      </h1>
      <form>
        <p className="text-lg font-semibold mt-4">sell/buy</p>
        <div className="flex gap-2">
          <button
            onChange={handleTypeOfService}
            id="type"
            type="button"
            className={` w-full px-6 py-3 font-bold text-sm uppercase shadow-md rounded-lg hover:shadow-lg focus:shadow-lg active:shadow-2xl transition duration-300 ${
              formData.type === "sell"
                ? "bg-white text-black"
                : "bg-black text-white"
            } `}
          >
            Sell
          </button>
          <button
            onChange={handleTypeOfService}
            id="type"
            type="button"
            className={` w-full px-6 py-3 font-bold text-sm uppercase shadow-md rounded-lg hover:shadow-lg focus:shadow-lg active:shadow-2xl transition duration-300 ${
              formData.type === "buy"
                ? "bg-white text-black"
                : "bg-black text-white"
            } `}
          >
            Buy
          </button>
        </div>
      </form>
    </section>
  );
}
