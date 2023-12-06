import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase.config";
import Spinner from "./Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
// Import Swiper styles
import "swiper/css/bundle";
import { useNavigate } from "react-router-dom";
import HomePage from "./HomePage";
export default function Slider() {
  const [getItems, setGetItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const loadData = async () => {
      // where search data
      const docRef = collection(db, "listings");
      // query data and take first 5
      const queryData = query(docRef, orderBy("createdTime", "desc"), limit(5));
      // get data
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
    return <>No items avaiable</>;
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
                  className="relative w-full h-[300px] overflow-hidden"
                  style={{
                    background: `url(${data.imagesUrl[0]}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                >
                  <p className="absolute top-4 left-4 rounded-br-md px-2 py-1 text-blue-800 whitespace-nowrap bg-white w-[20%] text-center font-bold">
                    {data.name}
                  </p>
                  <p className=" absolute bottom-0 left-4 rounded-tr-md px-2 py-1 text-teal-700 whitespace-nowrap bg-orange-600 w-[20%] text-center font-bold text-3xl">
                    ${data.regularPrice}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
      <HomePage />
    </div>
  );
}
