import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase.config";
import Spinner from "./Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
// Import Swiper styles
import "swiper/css/bundle";
import { useNavigate } from "react-router-dom";
export default function Slider() {
  const [getItems, setGetItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const loadData = async () => {
      const docRef = collection(db, "listings");
      const queryData = query(docRef, orderBy("createdTime", "desc"), limit(5));
      const dataFromStore = await getDocs(queryData);
      let itemsFromStorage = [];
      dataFromStore.forEach((item) => {
        return itemsFromStorage.push({ id: item.id, data: item.data() });
      });
      setGetItems(itemsFromStorage);
      setLoading(false);
    };
    loadData();
  }, []);
  if (loading) {
    return <Spinner />;
  }
  if (getItems.length === 0) {
    return <></>;
  }
  return (
    <div>
      {getItems && (
        <>
          <Swiper
            slidesPerView={1}
            navigation
            pagination={{ type: "progressbar" }}
            effect="fade"
            modules={[Autoplay, EffectFade, Navigation, Pagination]}
            autoplay={{ delay: 2000 }}
            loop={true}
          >
            {getItems.map(({ data, id }) => (
              <SwiperSlide
                key={id}
                onClick={() => navigate(`/category/${data.type}/${id}`)}
              >
                <div
                  className="w-full h-[300px] overflow-hidden"
                  style={{
                    background: `url(${data.imagesUrl[0]}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
}
