"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

const Stats = () => {
  interface ServiceOrders {
    state: string;
    orderDate: string;
    ponr: string;
  }
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServiceOrders();
  }, []);

  async function getServiceOrders() {
    try {
      const response = await axios.get(
        `${AXIOS_URL}/api/customer-order/service`,
      );
      const servicesData = response.data;
      setServices(servicesData);
      console.log("hello", servicesData);
    } catch (error) {
      console.error("Erreur lors de la récupération des services:", error);
    }
  }
  /*  Total Completed Costumer Orders */
  const CompletedOrders = services.filter(
    (order: any) => order.state === "completed",
  );
  console.log("cc", CompletedOrders);
  const totalCompletedOrders = CompletedOrders.length;
  /*  Statistics %  CompletedCostumer Orders */
  const percentCompletedOrders = Math.floor(
    (totalCompletedOrders / services.length) * 100,
  );

  /*  Total In progress Costumer Orders */
  const newOrders = services.filter((order: any) => order.state === "new");
  const totalnewOrders = newOrders.length;

  /*  Statistics %  Canceled Costumer Orders */
  const percenNewOrders = Math.floor((totalnewOrders / services.length) * 100);

  /*  Total cancel Costumer Orders */
  const CanceledOrders = services.filter(
    (order: any) => order.state === "canceled",
  );
  const totalInCanceledOrders = CanceledOrders.length;

  /*  Statistics %  cancel Costumer Orders */
  const percenCanceledOrders = Math.floor(
    (totalInCanceledOrders / services.length) * 100,
  );
  /*  Total cancel Costumer Orders */
  const ActiveOrders = services.filter(
    (order: any) => order.state === "active",
  );
  const totalActiveOrders = ActiveOrders.length;

  /*  Statistics %  cancel Costumer Orders */
  const percenActiveOrders = Math.floor(
    (totalActiveOrders / services.length) * 100,
  );

  return (
    <div>
      <div className=" mx-16 grid grid-cols-12 gap-6 mt-5">
        <a
          className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
          href="#"
        >
          <div className="p-5">
            <div className="flex justify-between">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <div className="bg-green-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                <span className="flex items-center">
                  {percenActiveOrders} %
                </span>
              </div>
            </div>
            <div className="ml-2 w-full flex-1">
              <div>
                <div className="mt-3 text-3xl font-bold leading-8">
                  {totalActiveOrders}
                </div>

                <div className="mt-1 text-base text-gray-600">Active</div>
              </div>
            </div>
          </div>
        </a>
        <a
          className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
          href="#"
        >
          <div className="p-5">
            <div className="flex justify-between">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="red"
                className="w-7 h-7"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="bg-red-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                <span className="flex items-center">
                  {percenCanceledOrders} %
                </span>
              </div>
            </div>
            <div className="ml-2 w-full flex-1">
              <div>
                <div className="mt-3 text-3xl font-bold leading-8">
                  {totalInCanceledOrders}
                </div>

                <div className="mt-1 text-base text-gray-600">Canceled</div>
              </div>
            </div>
          </div>
        </a>
        <a
          className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
          href="#"
        >
          <div className="p-5">
            <div className="flex justify-between">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="orange"
                className="w-7 h-7"
              >
                <path
                  fillRule="evenodd"
                  d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                  clipRule="evenodd"
                />
              </svg>

              <div className="bg-yellow-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                <span className="flex items-center">{percenNewOrders} %</span>
              </div>
            </div>
            <div className="ml-2 w-full flex-1">
              <div>
                <div className="mt-3 text-3xl font-bold leading-8">
                  {totalnewOrders}
                </div>

                <div className="mt-1 text-base text-gray-600">New</div>
              </div>
            </div>
          </div>
        </a>
        <a
          className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
          href="#"
        >
          <div className="p-5">
            <div className="flex justify-between">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="blue"
                className="w-7 h-7"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clip-rule="evenodd"
                />
              </svg>

              <div className="bg-blue-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                <span className="flex items-center">
                  {percentCompletedOrders} %
                </span>
              </div>
            </div>
            <div className="ml-2 w-full flex-1">
              <div>
                <div className="mt-3 text-3xl font-bold leading-8">
                  {totalCompletedOrders}
                </div>

                <div className="mt-1 text-base text-gray-600">Completed</div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Stats;
