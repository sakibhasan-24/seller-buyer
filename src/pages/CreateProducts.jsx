import React, { useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { v4 as uuidv4 } from "uuid"; //provide unique id
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";

// --------------------end of import librarys-------------------------------///
export default function CreateProducts() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [geoLocation, setGeoLocation] = useState(false);
  const [loading, setLoading] = useState(false);
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
    latitude: 0,
    longitude: 0,
    images: {},
  });

  const handleTypeOfService = (e) => {
    // i need to update setForm Data with new Value
    let booleanValue = null; //offer,parking,furnished
    if (e.target.value === "true") {
      // if offer true then booleanValue will true
      booleanValue = true;
    }
    if (e.target.value === "false") {
      // if offer false then booleanValue will false
      booleanValue = false;
    }

    if (e.target.files) {
      // actually only images file ..if these value come from files then take images also previous value
      setFormData((prevData) => ({ ...prevData, images: e.target.files }));
    }
    if (!e.target.files) {
      // if not files(images)=> like name,price etc
      setFormData((prevData) => ({
        ...prevData,
        [e.target.id]: booleanValue ?? e.target.value,
      }));
    }
  };

  // -------------------------FORM submit---------------------------------------
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (+formData.regularPrice <= +formData.discountePrice) {
      setLoading(false);
      return toast.error(
        "offer price cannot be equal or greater than regular price"
      );
    }
    if (formData.images.length > 6) {
      setLoading(false);
      toast.error("maximum 6 images allow");
    }

    // manually set it as i have no map api card
    let geoLocationData = {};
    geoLocationData.lat = formData.latitude;
    geoLocationData.lon = formData.longitude;
    // console.log(geoLocationData);

    // ----------------------------------store image in firebase----------------------------
    const storeImg = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage(); //@returns — A FirebaseStorage instance.
        const fileName = `${auth.currentUser.uid}-${image.name} -${uuidv4()} `;
        const storageRef = ref(storage, fileName);
        // now upload it
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                // console.log("Upload is paused");
                break;
              case "running":
                // console.log("Upload is running");
                break;
            }
          },
          (error) => {
            reject(error);
            // console.log("upload", error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };
    const imagesUrl = await Promise.all(
      [...formData.images].map((image) => storeImg(image))
    ).catch((err) => {
      setLoading(false);
      // console.log("image error ", err);
      toast.error(err);
      return;
    });
    const newFormData = {
      ...formData,
      imagesUrl,
      geoLocationData,
      createdTime: serverTimestamp(),
    };
    delete newFormData.images;
    if (newFormData.offer === false) {
      delete newFormData.discountePrice;
    }
    // const docRef = await addDoc(collection(db, "listings"), newFormData);
    const docRef = await addDoc(collection(db, "listings"), newFormData);
    // console.log(docRef);
    setLoading(false);
    toast.success("successfully created");
    navigate(`/category/${newFormData.type}/${docRef.id}`);
  };

  // -------------------end of form submit------------------

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className="max-w-md mx-auto px-2 my-10">
      <h1 className="text-center mt-8 font-bold text-2xl">
        Create Your Products
      </h1>
      <form onSubmit={handleSubmitForm}>
        <p className="text-lg font-semibold mt-4">sell/buy</p>
        <div className="flex gap-2">
          <button
            onClick={handleTypeOfService}
            id="type"
            value="sell"
            type="button"
            className={` w-full px-6 py-3 font-bold text-sm uppercase shadow-md rounded-lg hover:shadow-lg focus:shadow-lg active:shadow-2xl transition duration-300 ${
              formData.type === "sell"
                ? "bg-black text-white"
                : " bg-white text-black"
            } `}
          >
            Sell
          </button>
          <button
            onClick={handleTypeOfService}
            id="type"
            value="rent"
            type="button"
            className={` w-full px-6 py-3 font-bold text-sm uppercase shadow-md rounded-lg hover:shadow-lg focus:shadow-lg active:shadow-2xl transition duration-300 ${
              formData.type === "rent"
                ? "bg-black text-white"
                : " bg-white text-black"
            } `}
          >
            Buy
          </button>
        </div>
        <p className="mt-4 text-lg font-semibold">Name</p>
        <input
          onChange={handleTypeOfService}
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
              onChange={handleTypeOfService}
              className="px-4 py-2 text-center text-gray-700 rounded-md"
              type="number"
              name=""
              id="bedrooms"
              value={formData.bedrooms}
              min={1}
              max={50}
              required
            />
          </div>
          <div className="">
            <p className="text-lg font-semibold">BathRooms</p>
            <input
              onChange={handleTypeOfService}
              className="px-4 py-2 text-center text-gray-700 rounded-md"
              type="number"
              name=""
              id="bathRooms"
              value={formData.bathRooms}
              min={1}
              max={50}
              required
            />
          </div>
        </div>
        <p className="text-lg font-semibold mt-4">Parking</p>
        <div className="flex gap-2">
          <button
            value={true}
            onClick={handleTypeOfService}
            id="parking"
            type="button"
            className={` w-full px-6 py-3 font-bold text-sm uppercase shadow-md rounded-lg hover:shadow-lg focus:shadow-lg active:shadow-2xl transition duration-300 ${
              formData.parking ? "bg-black text-white" : " bg-white text-black"
            } `}
          >
            Yes
          </button>
          <button
            onClick={handleTypeOfService}
            id="parking"
            value={false}
            type="button"
            className={` w-full px-6 py-3 font-bold text-sm uppercase shadow-md rounded-lg hover:shadow-lg focus:shadow-lg active:shadow-2xl transition duration-300 ${
              !formData.parking ? "bg-black text-white" : " bg-white text-black"
            } `}
          >
            No
          </button>
        </div>
        <p className="text-lg font-semibold mt-4">Furnished</p>
        <div className="flex gap-2">
          <button
            onClickCapture={handleTypeOfService}
            id="furnished"
            value={true}
            type="button"
            className={` w-full px-6 py-3 font-bold text-sm uppercase shadow-md rounded-lg hover:shadow-lg focus:shadow-lg active:shadow-2xl transition duration-300 ${
              formData.furnished
                ? "bg-black text-white"
                : " bg-white text-black"
            } `}
          >
            Yes
          </button>
          <button
            value={false}
            onClick={handleTypeOfService}
            id="furnished"
            type="button"
            className={` w-full px-6 py-3 font-bold text-sm uppercase shadow-md rounded-lg hover:shadow-lg focus:shadow-lg active:shadow-2xl transition duration-300 ${
              !formData.furnished
                ? "bg-black text-white"
                : " bg-white text-black"
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
          onChange={handleTypeOfService}
          value={formData.address}
          className="w-full mt-2 px-4 py-2 rounded-md focus:border-sky-300"
        />
        {!geoLocation && (
          <div className="flex justify-between gap-4 ">
            <div>
              <p className="mt-4 text-lg font-semibold">lattitude</p>
              <input
                type="number"
                name="latitude"
                id="latitude"
                placeholder="latitude"
                required
                onChange={handleTypeOfService}
                value={formData.latitude}
                className="w-full mt-2 px-4 py-2 rounded-md focus:border-sky-300"
              />
            </div>
            <div>
              <p className="mt-4 text-lg font-semibold">longitude</p>
              <input
                type="number"
                name="longitude"
                id="longitude"
                placeholder="longitude"
                required
                onChange={handleTypeOfService}
                value={formData.longitude}
                className="w-full mt-2 px-4 py-2 rounded-md focus:border-sky-300"
              />
            </div>
          </div>
        )}
        <p className="mt-4 text-lg font-semibold">Description</p>
        <textarea
          onChange={handleTypeOfService}
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
            onClick={handleTypeOfService}
            id="offer"
            type="button"
            className={` w-full px-6 py-3 font-bold text-sm uppercase shadow-md rounded-lg hover:shadow-lg focus:shadow-lg active:shadow-2xl transition duration-300 ${
              formData.offer ? "bg-black text-white" : " bg-white text-black"
            } `}
          >
            Yes
          </button>
          <button
            onClick={handleTypeOfService}
            id="offer"
            value={false}
            type="button"
            className={` w-full px-6 py-3 font-bold text-sm uppercase shadow-md rounded-lg hover:shadow-lg focus:shadow-lg active:shadow-2xl transition duration-300 ${
              !formData.offer ? "bg-black text-white" : " bg-white text-black"
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
                onChange={handleTypeOfService}
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
                  onChange={handleTypeOfService}
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
            onChange={handleTypeOfService}
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
