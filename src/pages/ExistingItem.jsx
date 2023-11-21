import moment from "moment";
import { MdLocationOn, MdDelete, MdEdit } from "react-icons/md";

import { Link } from "react-router-dom";

export default function ExistingItem({ item, id, deleteItem, editItem }) {
  //   console.log(item.createdTime);
  const createTime = item.createTime?.toDate();
  return (
    <li className="  flex flex-col my-8 justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden">
      <Link className="contents" to={`/category/${item.type}/${id}`}>
        <img
          className="w-full h-[150px] object-cover hover:scale-105 transition-scale duration-200 ease-in"
          src={item.imagesUrl[0]}
          alt="userImage"
          loading="lazy"
        />
        <span className="bg-blue-400 shadow-xl font-bold relative -top-36 left-0 text-xs uppercase text-black px-4 py-2 rounded-md">
          {moment().startOf(`${createTime}`).fromNow()}
        </span>

        <div className="w-full p-[10px]">
          <div className="flex items-center space-x-2">
            <MdLocationOn className="h-6 w-6 text-blue-600" />
            <p className="text-gray-600 font-bold truncate">{item.address}</p>
          </div>
          <p className="font-semibold  mt-2 text-xl m-0 text-violet-800">
            {item.name}
          </p>
          <p className="font-semibold text-lg">
            ${item.offer ? item.discountePrice : item.regularPrice}
            {item.type === "rent" ? "/month" : ""}
          </p>
          <div>
            <div className="flex items-center space-x-7">
              <div className="flex items-center text-xs font-bold space-x-1">
                <p>{item.bedrooms} beds</p>
              </div>
              <div className="flex items-center text-xs font-bold space-x-1">
                <p>{item.bathRooms} baths</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex  items-center justify-between gap-8 text-xl cursor-pointer">
        {deleteItem && <MdDelete className="my-2 text-red-500" />}
        {editItem && <MdEdit />}
      </div>
    </li>
  );
}
