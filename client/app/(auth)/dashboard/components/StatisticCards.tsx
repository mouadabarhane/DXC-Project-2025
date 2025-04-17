"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as dotenv from "dotenv";
import dataCostumerOrders from "../data/dataCostumerOrders";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

interface ProductOfferings {
  state: string;
  orderDate: string;
  lastUpdate: string;
  status: string;
}
interface ProductOrders {
  state: string;
  orderDate: string;
  ponr: string;
}
const StatisticCards = () => {
  const [productOfferings, setProductOfferings] = useState<ProductOfferings[]>(
    [],
  );
  const [products, setProducts] = useState<ProductOrders[]>([]);
  const [data, setData] = useState<ProductOfferings[]>([]);
  async function getProductOfferings() {
    try {
      const response = await axios.get(`${AXIOS_URL}/api/product-offering`);
      const allProductOfferings = response.data;
      setProductOfferings(allProductOfferings);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  }

  useEffect(() => {
    getProductOfferings();
    getProductOrders();
  }, []);

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

  {
    /*  Total Completed Costumer Orders */
  }
  const CompletedOrders = products.filter(
    (order) => order.state === "completed",
  );
  const totalCompletedOrders = CompletedOrders.length;
  {
    /*  Statistics %  CompletedCostumer Orders */
  }
  const percenCompletedOrders = Math.floor(
    (totalCompletedOrders / products.length) * 100,
  );
  {
    /*  Total In draft Costumer Orders */
  }
  const DraftProductOfferings = productOfferings.filter(
    (product) => product.status === "draft",
  );
  const totalDraftProductOfferings = DraftProductOfferings.length;
  {
    /*  Statistics %  Canceled Costumer Orders */
  }
  const percentDraftProductOfferings = Math.floor(
    (totalDraftProductOfferings / productOfferings.length) * 100,
  );
  {
    /*  Total In progress Costumer Orders */
  }
  const InprogressOrders = products.filter(
    (order) => order.state === "in progress",
  );
  const totalInProgressOrders = InprogressOrders.length;
  {
    /*  Statistics %  Canceled Costumer Orders */
  }
  const percenInprogressOrders = Math.floor(
    (totalInProgressOrders / products.length) * 100,
  );
  {
    /*  Total Archived Product Offering  */
  }
  const ArchidedProductOfferings = productOfferings.filter(
    (product) => product.status === "archived",
  );
  const totalArchivedProductOfferings = ArchidedProductOfferings.length;
  {
    /*  Statistics %  Archived Product Offering  */
  }
  const percentArchivedProductOfferings = Math.floor(
    (totalArchivedProductOfferings / productOfferings.length) * 100,
  );
  {
    /*  Total Published Product Offering  */
  }
  const PublichedProductOfferings = productOfferings.filter(
    (product) => product.status === "published",
  );
  const totalPublichedProductOfferings = PublichedProductOfferings.length;
  {
    /*  Statistics %  Published Product Offering  */
  }
  const percentPublichedProductOfferings = Math.floor(
    (totalPublichedProductOfferings / productOfferings.length) * 100,
  );

  {
    /*  Total In progress Costumer Orders */
  }
  const CanceledOrders = products.filter((order) => order.state === "canceled");
  const totalInCanceledOrders = CanceledOrders.length;
  {
    /*  Statistics %  in Progress Costumer Orders */
  }
  const percenCanceledOrders = Math.floor(
    (totalInCanceledOrders / products.length) * 100,
  );

  return (
    <>
      {/* <h1 className=" ml-8 mt-2 mb-2 text-xl font-semibold tracking-tight text-gray-600  ">
     Statistic Cards
    </h1> */}
      <section className="text-gray-600 body-font flex justify-center items-center">
        <div className="container px-5 py-4 mx-auto">
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
              <div className=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
                <div>
                  <h2 className="text-gray-900 text-lg font-bold">
                    Total Completed Orders
                  </h2>
                  <h3 className="mt-2 text-3xl font-bold leading-8">
                    {" "}
                    Total: {totalCompletedOrders}{" "}
                  </h3>

                  <button
                    onClick={() =>
                      (window.location.href = "/customer-order/product/")
                    }
                    className="text-sm mt-6 px-4 py-2 bg-green-400  text-white rounded-lg  tracking-wider hover:bg-green-500 outline-none"
                  >
                    View in Table
                  </button>
                </div>
                <div className="bg-gradient-to-tr from-green-500 to-green-500 w-24 h-24  rounded-full shadow-xl shadow-green-300 border-white   border-2  flex justify-center items-center ">
                  <div>
                    <h1 className="text-white mt-1 text-base">
                      Complete
                      <br />
                      {percenCompletedOrders}%
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
              <div className=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
                <div>
                  <h2 className="text-gray-900 text-lg font-bold">
                    Total In Progress Orders
                  </h2>
                  <h3 className="mt-2 text-3xl font-bold leading-8">
                    {" "}
                    Total :{totalInProgressOrders}
                  </h3>

                  <button
                    onClick={() =>
                      (window.location.href = "/customer-order/product/")
                    }
                    className="text-sm mt-6 px-4 py-2 bg-yellow-500 text-white rounded-lg  tracking-wider hover:bg-yellow-300 outline-none"
                  >
                    View in Table
                  </button>
                </div>
                <div className="bg-gradient-to-tr from-yellow-600 to-yellow-300 w-24 h-24 rounded-full shadow-xl shadow-yellow-200  border-white   border-2  flex justify-center items-center ">
                  <div>
                    <h1 className="text-white mt-1 text-base">
                      In <br />
                      Progress
                      <br />
                      {percenInprogressOrders}%
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
              <div className=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
                <div>
                  <h2 className="text-gray-900 text-lg font-bold">
                    Total Canceled Orders
                  </h2>
                  <h3 className="mt-2 text-3xl font-bold leading-8">
                    Total: {totalInCanceledOrders}{" "}
                  </h3>

                  <button
                    onClick={() =>
                      (window.location.href = "/customer-order/product/")
                    }
                    className="text-sm mt-6 px-4 py-2 bg-orange-400  text-white rounded-lg  tracking-wider hover:bg-orange-500 outline-none"
                  >
                    View in Table
                  </button>
                </div>
                <div className="bg-gradient-to-tr from-orange-500 to-orange-400 w-24 h-24  rounded-full shadow-xl shadow-orange-200  border-white  border-2  flex justify-center items-center ">
                  <div>
                    <h1 className="text-white mt-1 text-base">
                      Cancel
                      <br />
                      {percenCanceledOrders}%
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
              <div className=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
                <div>
                  <h2 className="text-gray-900 text-lg font-bold">
                    Total Published Product Offerings
                  </h2>
                  <h3 className="mt-2 text-3xl font-bold leading-8t">
                    Total:{totalPublichedProductOfferings}
                  </h3>
                  <button
                    onClick={() =>
                      (window.location.href =
                        "/product-offering/all/published/")
                    }
                    className="text-sm mt-6 px-4 py-2 bg-cyan-400  text-white rounded-lg  tracking-wider hover:bg-cyan-500 outline-none"
                  >
                    View in Table
                  </button>
                </div>
                <div className="bg-gradient-to-tr from-cyan-500 to-cyan-400 w-24 h-24  rounded-full shadow-2xl shadow-cyan-200  border-white border-2  flex justify-center items-center ">
                  <div>
                    <h1 className="text-white mt-1 text-base">
                      Publish
                      <br />
                      {percentPublichedProductOfferings}%
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
              <div className=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
                <div>
                  <h2 className="text-gray-900 text-lg font-bold">
                    Total Archived Product Offerings
                  </h2>
                  <h3 className="mt-2 text-3xl font-bold leading-8">
                    Total:{totalArchivedProductOfferings}
                  </h3>
                  <button
                    onClick={() =>
                      (window.location.href = "/product-offering/all/archived/")
                    }
                    className="text-sm mt-6 px-4 py-2 bg-red-400 text-white rounded-lg tracking-wider hover:bg-red-500 outline-none"
                  >
                    View in Table
                  </button>
                  {/* <Link
                                         
                                          className="button text-sm mt-6 px-4 py-2 bg-red-400  text-white rounded-lg  tracking-wider hover:bg-red-500 outline-none"
                                        >
                                          View in table
                                        </Link> */}
                </div>
                <div className="bg-gradient-to-tr from-red-500 to-red-400 w-24 h-24  rounded-full shadow-2xl shadow-red-200  border-white border-2  flex justify-center items-center ">
                  <div>
                    <h1 className="text-white mt-1 text-base">
                      Archived
                      <br />
                      {percentArchivedProductOfferings} %
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
              <div className=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
                <div>
                  <h2 className="text-gray-900 text-lg font-bold">
                    Total In Draft Product Offerings
                  </h2>
                  <h3 className="mt-2 text-3xl font-bold leading-8">
                    Total:{totalDraftProductOfferings}
                  </h3>
                  <button
                    onClick={() =>
                      (window.location.href = "/product-offering/all/")
                    }
                    className="text-sm mt-6 px-4 py-2 bg-indigo-400 text-white rounded-lg  tracking-wider hover:bg-indigo-500 outline-none"
                  >
                    View in Table
                  </button>
                </div>
                <div className="bg-gradient-to-tr from-indigo-500 to-indigo-400 w-24 h-24  rounded-full shadow-xl shadow-[#304FFE] border-white  border-2  flex justify-center items-center ">
                  <div>
                    <h1 className="text-white mt-1 text-base">
                      Draft
                      <br />
                      {percentDraftProductOfferings}%
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StatisticCards;
