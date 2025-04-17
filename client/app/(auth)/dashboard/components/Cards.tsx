"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

interface ProductOfferings {
  orderDate: string;
  lastUpdate: string;
  status: string;
}

interface ProductOrders {
  state: string;
  orderDate: string;
  ponr: string;
}

const Cards = () => {
  const [productOfferings, setProductOfferings] = useState<ProductOfferings[]>(
    [],
  );
  const [products, setProducts] = useState<ProductOrders[]>([]);

  useEffect(() => {
    getProductOfferings();
    getProductOrders();
  }, []);

  async function getProductOfferings() {
    try {
      const response = await axios.get(`${AXIOS_URL}/api/product-offering`);
      const allProductOfferings = response.data;
      setProductOfferings(allProductOfferings);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  }

  async function getProductOrders() {
    try {
      const response = await axios.get(
        `${AXIOS_URL}/api/customer-order/product`,
      );
      const productsData = response.data;
      setProducts(productsData);
    } catch (error) {
      console.error("Erreur lors de la récupération des products:", error);
    }
  }

  const orders = products.filter((order: any) => order.state === "new").length;
  const newOffering = productOfferings.filter(
    (productOffering: any) => productOffering.status === "new",
  ).length;
  return (
    <div>
      <div className="mx-5 flex flex-wrap my-5">
        <div className="w-full lg:w-1/3 p-2">
          <div className="flex items-center flex-row w-full bg-gradient-to-r from-purple-800 via-purple-700 to-pink-400 rounded-md p-3">
            <div className="flex text-purple-800 items-center bg-white p-2 rounded-md flex-none w-8 h-8 md:w-12 md:h-12 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
              </svg>
            </div>
            <div className="flex flex-col justify-around flex-grow ml-5 text-white">
              <div className="text-md whitespace-nowrap">New Product Oders</div>
              <div className=""> {orders}</div>
            </div>
            <div className=" flex items-center flex-none text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="object-scale-down transition duration-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 p-2 ">
          <div className="flex items-center flex-row w-full bg-gradient-to-r from-purple-800 via-purple-700 to-pink-400 rounded-md p-3">
            <div className="flex text-indigo-500 items-center bg-white p-2 rounded-md flex-none w-8 h-8 md:w-12 md:h-12 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="purple"
                className="w-8 h-8"
              >
                <path d="M11.25 3v4.046a3 3 0 00-4.277 4.204H1.5v-6A2.25 2.25 0 013.75 3h7.5zM12.75 3v4.011a3 3 0 014.239 4.239H22.5v-6A2.25 2.25 0 0020.25 3h-7.5zM22.5 12.75h-8.983a4.125 4.125 0 004.108 3.75.75.75 0 010 1.5 5.623 5.623 0 01-4.875-2.817V21h7.5a2.25 2.25 0 002.25-2.25v-6zM11.25 21v-5.817A5.623 5.623 0 016.375 18a.75.75 0 010-1.5 4.126 4.126 0 004.108-3.75H1.5v6A2.25 2.25 0 003.75 21h7.5z" />
                <path d="M11.085 10.354c.03.297.038.575.036.805a7.484 7.484 0 01-.805-.036c-.833-.084-1.677-.325-2.195-.843a1.5 1.5 0 012.122-2.12c.517.517.759 1.36.842 2.194zM12.877 10.354c-.03.297-.038.575-.036.805.23.002.508-.006.805-.036.833-.084 1.677-.325 2.195-.843A1.5 1.5 0 0013.72 8.16c-.518.518-.76 1.362-.843 2.194z" />
              </svg>
            </div>
            <div className="flex flex-col justify-around flex-grow ml-5 text-white">
              <div className="text-md whitespace-nowrap">
                New Product Offerings
              </div>
              <div className="">{newOffering}</div>
            </div>
            <div className=" flex items-center flex-none text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="object-scale-down transition duration-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
          <div className="flex items-center flex-row w-full bg-gradient-to-r from-purple-800 via-purple-700 to-pink-400 rounded-md p-3">
            <div className="flex text-indigo-500 items-center bg-white p-2 rounded-md flex-none w-8 h-8 md:w-12 md:h-12 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="indigo"
                className="w-8 h-8"
              >
                <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
              </svg>
            </div>
            <div className="flex flex-col justify-around flex-grow ml-5 text-white">
              <div className="text-md whitespace-nowrap">New Customers</div>
              <div className=""></div>
            </div>
            <div className=" flex items-center flex-none text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="object-scale-down transition duration-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
