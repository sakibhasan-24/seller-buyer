import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaShareAlt,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";

import { getAuth } from "firebase/auth";
import Spinner from "../components/Spinner";
import { db } from "../firebase.config";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
// Import Swiper styles
import "swiper/css/bundle";
import ContactForm from "../components/ContactForm";
// import { Marker, TileLayer, MapContainer, Popup } from "leaflet";
import { MapContainer, Popup, TileLayer, Marker } from "react-leaflet";
export default function SingleItem() {
  const auth = getAuth();
  const { id } = useParams();
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLink, setShareLink] = useState(false);
  const [contactOwner, setContactOwner] = useState(false);
  useEffect(() => {
    const loadingData = async () => {
      const docRef = doc(db, "listings", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setItems(docSnap.data());
        setLoading(false);
      }
    };
    loadingData();
  }, [id]);
  console.log(items);
  if (loading) {
    return <Spinner />;
  }
  return (
    <main className="my-4">
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        autoplay={{ delay: 2000 }}
        loop={true}
      >
        {items.imagesUrl.map((image, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="h-[300px] w-full overflow-hidden relative"
              style={{
                background: `url(${items.imagesUrl[idx]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLink(true);
          setTimeout(() => {
            setShareLink(false);
          }, 2000);
        }}
        className="fixed h[20px] w-[40px] rounded-full p-2 top-[20%] right-[3%] bg-white cursor-pointer  z-10"
      >
        <FaShareAlt className="text-lg" />
      </div>
      {shareLink && (
        <p className="bg-white p-4 rounded-md fixed top-[30%] left-[4%] z-10 font-bold text-gray-800">
          Link Copied
        </p>
      )}
      {/* map and info */}
      <div className="w-full mx-auto whitespace-nowrap md:max-w-6xl lg:mx-auto m-4 p-4 shadow-xl flex flex-col md:flex-row lg:flex-row justify-center items-center lg:space-x-6">
        <div className="  w-full my-6">
          <p className="text-lg text-blue-800 font-semibold">
            {items.name}---- $
            {items.offer ? items.discountePrice : items.regularPrice}
            {items.type === "rent" ? "/months" : ""}
          </p>
          <p className="flex items-center mt-6 mb-3 font-semibold">
            <FaMapMarkerAlt className="text-green-600" />
            {items.address}
          </p>
          <div className="flex items-center  justify-start space-x-8">
            <p className="rounded-md px-4 py-3 bg-green-700 text-white font-bold w-3/4">
              {items.type === "rent" ? "Rent" : "sell"}
            </p>
            {items.offer && (
              <p className="bg-purple-600 px-4 py-3 font-bold  rounded-md w-3/4">
                discount: ${" "}
                {Number(items.regularPrice) - Number(items.discountePrice)}
              </p>
            )}
          </div>
          <p>
            Details: <span>{items.description}</span>{" "}
          </p>
          <ul className="flex items-center space-x-3 lg:space-x-10 text-xs my-3 ">
            <li className="flex items-center  font-bold ">
              <FaBed className="mr-2" /> {items.bedrooms} beds
            </li>
            <li className="flex items-center  font-bold ">
              <FaBath className="mr-2" /> {items.bathRooms} baths
            </li>
            <li className="flex items-center  font-bold ">
              <FaParking className="mr-2" />{" "}
              {items.parking ? "parking" : "no parking"}
            </li>
            <li className="flex items-center  font-bold ">
              <FaChair className="mr-2" />{" "}
              {items.furnished ? "furnished" : "no furnished"}
            </li>
          </ul>
          {/* message section  if this property is this for user no need to show button*/}
          {items.userIdentify !== auth.currentUser?.uid && !contactOwner && (
            <div className="my-10">
              <button
                onClick={() => setContactOwner(true)}
                className="my-6 px-6 py-3 bg-blue-950 text-white font-semibold text-xs uppercase rounded shadow-md hover:bg-blue-600 w-full focus:bg-blue-400"
              >
                Contact Owner
              </button>
            </div>
          )}
          {contactOwner && (
            <ContactForm items={items} userIdentify={items.userIdentify} />
          )}
        </div>
        {/* map */}
        <div className=" h-[200px] lg:h-[400px] mt-6 md:mt-0 w-full md:ml-2 md:h-[400px overflow-x-hidden z-10">
          <MapContainer
            center={[items.geoLocationData.lat, items.geoLocationData.lon]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[items.geoLocationData.lat, items.geoLocationData.lon]}
            >
              <Popup>{items.address}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </main>
  );
}
