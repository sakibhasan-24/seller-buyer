import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaShareAlt } from "react-icons/fa";

import Spinner from "../components/Spinner";
import { db } from "../firebase.config";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
// Import Swiper styles
import "swiper/css/bundle";
export default function SingleItem() {
  const { id } = useParams();
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
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
      <div className="fixed h[20px] w-[40px] rounded-full p-2 top-[20%] right-[3%] bg-white cursor-pointer  z-10">
        <FaShareAlt className="text-lg" />
      </div>
    </main>
  );
}
