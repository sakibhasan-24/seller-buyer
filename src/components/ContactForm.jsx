import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase.config";

export default function ContactForm({ items, userIdentify }) {
  const [owner, setOwner] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const getOwner = async () => {
      const docRef = doc(db, "users", userIdentify);
      const docInfo = await getDoc(docRef);
      if (docInfo.exists()) {
        setOwner(docInfo.data());
      }
    };
    getOwner();
  }, [userIdentify]);
  const handleMessgae = (e) => setMessage(e.target.value);
  return (
    <>
      {owner !== null && (
        <div className="flex flex-col w-full mt-6 ">
          <p className="my-6">
            contact {owner.uName} for{" "}
            <span className="text-black font-bold">{items.name}</span>{" "}
          </p>
          <div>
            <textarea
              name="message"
              id="message"
              value={message}
              rows="2"
              className="px-4 py-2 w-full"
              onChange={handleMessgae}
            ></textarea>
          </div>
          <a
            href={`mailto:${owner.email}?Subject=${items.name}&body=${message}`}
          >
            <button className="bg-green-700 text-white font-bold uppercase px-4 py-2 rounded-md">
              Send Message ( <span className="lowercase">{owner.email}</span> )
            </button>
          </a>
        </div>
      )}
    </>
  );
}
