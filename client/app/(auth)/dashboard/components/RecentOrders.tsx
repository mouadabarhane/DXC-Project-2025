import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import data from "../data/data";

const RecentOrders = () => {
  return (
    <div className="w-full col-span-1 relative lg:h-[30vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll">
      <h1 className=" mb-2 text-xl font-semibold tracking-tight text-gray-900">
        Recent Orders
      </h1>
      <ul>
        {data.map((order, id) => (
          <li
            key={id}
            className="bg-white shadow-md  hover:bg-purple-50 rounded-lg my-3 p-2 flex items-center cursor-pointer"
          >
            <div className=" rounded-lg p-3">
              <FaShoppingBag className="text-green-400" />
            </div>
            <div className="pl-4">
              <p className="text-yellow-400 font-bold">${order.total}</p>
              <p className="text-gray-400 text-sm">{order.name.first}</p>
            </div>
            <p className="lg:flex md:hidden text-red-600 absolute right-6 text-sm">
              {order.date}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentOrders;
