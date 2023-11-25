import {
  collection,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase.config";
import ExistingItem from "../pages/ExistingItem";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [offeredItems, setOfferedItems] = useState([]);
  const [saleItems, setSaleItems] = useState([]);
  const [rentItems, setRentItems] = useState([]);
  // for offers data read
  useEffect(() => {
    const fetchData = async () => {
      // get the address
      const itemsRef = collection(db, "listings");
      // if offer is true then we will get it
      const itemQuery = query(
        itemsRef,
        where("offer", "==", true),
        orderBy("createdTime", "desc"),
        limit(3)
      );
      // console.log(itemQuery);
      const queryData = await getDocs(itemQuery);
      const offerItems = [];
      queryData.forEach((doc) => {
        console.log({ data: doc.data() });
        return offerItems.push({ id: doc.id, data: doc.data() });
      });

      setOfferedItems(offerItems);
      // console.log(queryData);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      // get the address
      const itemsRef = collection(db, "listings");
      // if offer is true then we will get it
      const itemQuery = query(
        itemsRef,
        where("type", "==", "sell"),
        orderBy("createdTime", "desc"),
        limit(3)
      );
      // console.log(itemQuery);
      const queryData = await getDocs(itemQuery);
      const salesItems = [];
      queryData.forEach((doc) => {
        // console.log({ data: doc.data() });
        return salesItems.push({ id: doc.id, data: doc.data() });
      });

      setSaleItems(salesItems);
      // console.log(queryData);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      // get the address
      const itemsRef = collection(db, "listings");
      // if offer is true then we will get it
      const itemQuery = query(
        itemsRef,
        where("type", "==", "rent"),
        orderBy("createdTime", "desc"),
        limit(3)
      );
      // console.log(itemQuery);
      const queryData = await getDocs(itemQuery);
      const rentedItems = [];
      queryData.forEach((doc) => {
        // console.log({ data: doc.data() });
        return rentedItems.push({ id: doc.id, data: doc.data() });
      });

      setRentItems(rentedItems);
      console.log("rented", rentedItems);
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="my-6 max-w-6xl mx-auto">
        <h1 className="font-semibold text-blue-950 text-4xl mb-0  mt-8">
          Offer
        </h1>
        <Link className="font-bold text-purple-600" to="/offer">
          Show More
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {offeredItems &&
            offeredItems.map((item) => (
              <ExistingItem key={item.id} item={item.data} id={item.id} />
            ))}
        </div>
      </div>
      <div className="my-6 max-w-6xl mx-auto">
        <h1 className="font-semibold text-blue-950 text-4xl mb-0  mt-8">
          Sale {saleItems.length}
        </h1>
        <Link className="font-bold text-purple-600" to="/category/sell">
          Show More
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {saleItems &&
            saleItems.map((item) => (
              <ExistingItem key={item.id} item={item.data} id={item.id} />
            ))}
        </div>
      </div>
      <div className="my-6 max-w-6xl mx-auto">
        <h1 className="font-semibold text-blue-950 text-4xl mb-0  mt-8">
          Rent {rentItems.length}
        </h1>
        <Link className="font-bold text-purple-600" to={`/category/rent`}>
          Show More
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rentItems &&
            rentItems.map((item) => (
              <ExistingItem key={item.id} item={item.data} id={item.id} />
            ))}
        </div>
      </div>
    </>
  );
}
