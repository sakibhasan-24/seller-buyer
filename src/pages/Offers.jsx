import React, { useEffect, useState } from "react";
import ExistingItem from "./ExistingItem";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../firebase.config";

export default function Offers() {
  const [offeredItems, setOfferedItems] = useState([]);
  const [lastNumber, setLastNumber] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      // get the address
      const itemsRef = collection(db, "listings");
      // if offer is true then we will get it
      const itemQuery = query(
        itemsRef,
        where("offer", "==", true),
        orderBy("createdTime", "desc"),
        limit(5)
      );
      // console.log(itemQuery);
      const queryData = await getDocs(itemQuery);
      const lastFetch = queryData.docs[queryData.docs.length - 1];
      // console.log(lastFetch);
      setLastNumber(lastFetch);
      const offerItems = [];
      queryData.forEach((doc) => {
        // console.log({ data: doc.data() });
        return offerItems.push({ id: doc.id, data: doc.data() });
      });

      setOfferedItems(offerItems);
    };
    fetchData();
  }, []);
  const loadMore = async () => {
    const itemsRef = collection(db, "listings");
    // if offer is true then we will get it
    const itemQuery = query(
      itemsRef,
      where("offer", "==", true),
      orderBy("createdTime", "desc"),
      startAfter(lastNumber),
      limit(2)
    );
    // console.log(itemQuery);
    const queryData = await getDocs(itemQuery);
    const lastFetch = queryData.docs[queryData.docs.length - 1];
    setLastNumber(lastFetch);
    const offerItems = [];
    queryData.forEach((doc) => {
      console.log({ data: doc.data() });
      return offerItems.push({ id: doc.id, data: doc.data() });
    });
    setOfferedItems((prev) => [...prev, ...offerItems]);
  };
  return (
    <div>
      <div className="my-6 max-w-6xl mx-auto">
        <h1 className="font-semibold text-blue-950 text-4xl mb-0  mt-8">
          Offer
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {offeredItems &&
            offeredItems.map((item) => (
              <ExistingItem key={item.id} item={item.data} id={item.id} />
            ))}
        </div>
      </div>
      {lastNumber && (
        <div className="flex items-center justify-center">
          <button
            onClick={loadMore}
            className="bg-white text-gray-700 px-3 py-1 border border-gray-500 my-6 rounded-lg"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
