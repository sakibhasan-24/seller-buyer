import React, { useState } from "react";

export default function CreateProducts() {
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathRooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: true,
    regularPrice: 0,
    discountePrice: 0,
  });
  const handleTypeOfService = (e) => {};
  return (
    <section className="max-w-md mx-auto px-2 my-10">
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
              formData.type === "buy"
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
              formData.type === "rent"
                ? "bg-white text-black"
                : "bg-black text-white"
            } `}
          >
            Buy
          </button>
        </div>
        <p className="mt-4 text-lg font-semibold">Name</p>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="name"
          maxLength="30"
          required
          value={formData.name}
          className="w-full mt-2 px-4 py-2 rounded-md focus:border-sky-300"
        />
        <div className=" flex gap-4">
          <div className="">
            <p className="text-lg font-semibold">Bedrooms</p>
            <input
              className="px-4 py-2 text-center text-gray-700 rounded-md"
              type="number"
              name=""
              id="usedYear"
              value={formData.bedrooms}
              min={1}
              max={5}
              required
            />
          </div>
          <div className="">
            <p className="text-lg font-semibold">BathRooms</p>
            <input
              className="px-4 py-2 text-center text-gray-700 rounded-md"
              type="number"
              name=""
              id="releaseYear"
              value={formData.bathRooms}
              min={1}
              max={5}
              required
            />
          </div>
        </div>
        <p className="text-lg font-semibold mt-4">Parking</p>
        <div className="flex gap-2">
          <button
            value={true}
            onChange={handleTypeOfService}
            id="parking"
            type="button"
            className={` w-full px-6 py-3 font-bold text-sm uppercase shadow-md rounded-lg hover:shadow-lg focus:shadow-lg active:shadow-2xl transition duration-300 ${
              formData.parking ? "bg-white text-black" : "bg-black text-white"
            } `}
          >
            Yes
          </button>
          <button
            onChange={handleTypeOfService}
            id="parking"
            value={false}
            type="button"
            className={` w-full px-6 py-3 font-bold text-sm uppercase shadow-md rounded-lg hover:shadow-lg focus:shadow-lg active:shadow-2xl transition duration-300 ${
              !formData.parking ? "bg-white text-black" : "bg-black text-white"
            } `}
          >
            No
          </button>
        </div>
        <p className="text-lg font-semibold mt-4">Furnished</p>
        <div className="flex gap-2">
          <button
            onChange={handleTypeOfService}
            id="furnished"
            value={false}
            type="button"
            className={` w-full px-6 py-3 font-bold text-sm uppercase shadow-md rounded-lg hover:shadow-lg focus:shadow-lg active:shadow-2xl transition duration-300 ${
              formData.furnished ? "bg-white text-black" : "bg-black text-white"
            } `}
          >
            Yes
          </button>
          <button
            value={false}
            onChange={handleTypeOfService}
            id="furnished"
            type="button"
            className={` w-full px-6 py-3 font-bold text-sm uppercase shadow-md rounded-lg hover:shadow-lg focus:shadow-lg active:shadow-2xl transition duration-300 ${
              !formData.furnished
                ? "bg-white text-black"
                : "bg-black text-white"
            } `}
          >
            No
          </button>
        </div>
        <p className="mt-4 text-lg font-semibold">Address</p>
        <textarea
          type="text"
          name="address"
          id="address"
          placeholder="address"
          maxLength="30"
          required
          value={formData.address}
          className="w-full mt-2 px-4 py-2 rounded-md focus:border-sky-300"
        />
        <p className="mt-4 text-lg font-semibold">Description</p>
        <textarea
          type="text"
          name="description"
          id="description"
          value={formData.description}
          required
          className="w-full mt-2 px-4 py-2 rounded-md focus:border-sky-300"
        />
        <p className="text-lg font-semibold mt-4">Offer</p>
        <div className="flex gap-2">
          <button
            value={true}
            onChange={handleTypeOfService}
            id="offer"
            type="button"
            className={` w-full px-6 py-3 font-bold text-sm uppercase shadow-md rounded-lg hover:shadow-lg focus:shadow-lg active:shadow-2xl transition duration-300 ${
              formData.offer ? "bg-white text-black" : "bg-black text-white"
            } `}
          >
            Yes
          </button>
          <button
            onChange={handleTypeOfService}
            id="offer"
            value={false}
            type="button"
            className={` w-full px-6 py-3 font-bold text-sm uppercase shadow-md rounded-lg hover:shadow-lg focus:shadow-lg active:shadow-2xl transition duration-300 ${
              !formData.offer ? "bg-white text-black" : "bg-black text-white"
            } `}
          >
            No
          </button>
        </div>
        <div>
          <div>
            <p className="text-lg font-bold">regular Price</p>
            <div className="flex items-center justify-center mr-4">
              <input
                type="number"
                name="regularPrice"
                id="regularPrice"
                value={formData.regularPrice}
                min={0}
                max={100000}
                required
                className="w-full text-center py-2 px-4 text-lg text-gray-800 bg-white border-gray-500 rounded "
              />
              {formData.type === "rent" && (
                <div className="ml-4">
                  <p className="whitespace-nowrap text-sm">$/month</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {formData.offer && (
          <div>
            <div>
              <p className="text-lg font-bold">discounted Price</p>
              <div className="flex items-center justify-center mr-4">
                <input
                  type="number"
                  name="discountePrice"
                  id="discountePrice"
                  value={formData.discountePrice}
                  min={0}
                  max={100000}
                  required
                  className="w-full text-center py-2 px-4 text-lg text-gray-800 bg-white border-gray-500 rounded "
                />
                {formData.type === "rent" && (
                  <div className="ml-4">
                    <p className="whitespace-nowrap text-sm">$/month</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="my-4">
          <p className="text-lg font-semibold ">Images/</p>
          <p className="text-gray-600">Max (6)</p>
          <input
            type="file"
            name="images"
            id="images"
            accept=".jpg,.png,.jpeg"
            required
            multiple
            className="w-full px-4 py-2 text-gray-800 bg-white border border-gray-500 roundedF"
          />
        </div>
        <button
          className="mb-6 w-full text-sm bg-green-900 shadow-md text-white px-6 py-3 rounded-md font-bold hover:shadow-xl "
          type="submit"
        >
          Create Your Products
        </button>
      </form>
    </section>
  );
}
