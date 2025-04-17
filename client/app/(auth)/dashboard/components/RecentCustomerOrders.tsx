"use client";
import React, { useState, useEffect, SyntheticEvent } from "react";
import axios from "axios";
import * as dotenv from "dotenv";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import result from "../../../../public/assets/search.png";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

interface ProductOrders {
  id: string;
  _id: string;
  state: string;
  orderDate: string;
  ponr: string;
}
const BarChart = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [products, setProducts] = useState<ProductOrders[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  useEffect(() => {
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
  };

  const filteredOrders = products.filter((order) => {
    const orderValues = Object.values(order).join(" ").toLowerCase();
    const isMatchingSearchTerm = orderValues.includes(searchTerm.toLowerCase());
    const isMatchingStatus =
      statusFilter === "All" || order.state === statusFilter;

    return isMatchingSearchTerm && isMatchingStatus;
  });

  {
    /* Le code pour afficher 5 commande*/
  }

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 4;

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  {
    /**switch color of state */
  }
  function getStateTextColor(state: string) {
    switch (state) {
      case "new":
        return "text-blue-900";
      case "in_progress":
        return "text-yellow-900";
      case "in draft":
        return "text-orange-900";
      case "completed":
        return "text-green-900";
      case "cancellation_received":
        return "text-white";
      case "assessing_cancellation":
        return "text-white";
      default:
        return "";
    }
  }

  function getStateBgColor(state: string) {
    switch (state) {
      case "new":
        return "bg-blue-200 shadow-blue-300";
      case "in_progress":
        return "bg-yellow-200 shadow-yellow-300";
      case "in draft":
        return "bg-orange-200 shadow-orange-300";
      case "completed":
        return "bg-green-200 shadow-green-300";
      case "cancellation_received":
        return "bg-red-600 shadow-red-300";
      case "assessing_cancellation":
        return "bg-gray-400 shadow-gray-300";
      default:
        return "";
    }
  }
  const recentOrders = filteredOrders
    .sort((a, b) => {
      const date1 = new Date(a.orderDate);
      const date2 = new Date(b.orderDate);
      return date2.getTime() - date1.getTime();
    })
    .slice(0, 9);
  const [pinnedProductOrders, setPinnedProductOrders] = useState<string[]>([]);
  const togglePinProduct = (orderId: string) => {
    if (pinnedProductOrders.includes(orderId)) {
      const updatedPinnedProductOrders = pinnedProductOrders.filter(
        (pinnedOrderId) => pinnedOrderId !== orderId,
      );
      setPinnedProductOrders(updatedPinnedProductOrders);
    } else {
      const updatedPinnedProductOrders = [orderId, ...pinnedProductOrders];
      setPinnedProductOrders(updatedPinnedProductOrders);
    }
  };

  const sortedProductOrders = [...recentOrders].sort((a, b) => {
    const aPinned = pinnedProductOrders.includes(a._id);
    const bPinned = pinnedProductOrders.includes(b._id);
    if (aPinned && !bPinned) {
      return -1;
    } else if (!aPinned && bPinned) {
      return 1;
    } else {
      return 0;
    }
  });
  return (
    <div className="flex w-full">
      <div className="w-full">
        <div className=" flex mt-2 ">
          <div className="container mx-auto ">
            <div className="py-1">
              <div>
                <h2 className="text-2xl font-semibold leading-tight">
                  Recents Customer Orders
                </h2>
              </div>
              <div className="my-2 flex sm:flex-row flex-col">
                <div className="flex flex-row mb-1 sm:mb-0">
                  <div className="relative">
                    <select
                      value={statusFilter}
                      onChange={handleStatusFilter}
                      className="  ml-2 px-8 py-2 border border-gray-300 focus:outline-none rounded-lg shadow-sm"
                    >
                      <option value="All">All</option>
                      <option value="new">New</option>
                      <option value="in_progress">In progress</option>
                      <option value="completed">Completed</option>
                      <option value="rejected">Rejected</option>
                      <option value="assessing_cancellation">
                        Assessing Cancellation
                      </option>

                      <option value="cancellation_received">
                        Cancellation In Progress
                      </option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </div>
                </div>
                <div className="block relative">
                  <input
                    placeholder=" Search..."
                    className="mx-2 px-3 py-2 border border-gray-300 focus:outline-none rounded-lg shadow-sm"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </div>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full  overflow-hidden">
                  <table className="text-left w-full border-collapse">
                    <thead>
                      <tr>
                        {/* <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                          <label className="inline-flex items-center">
                            <input
                              type="checkbox"
                              className="form-checkbox text-gray-800"
                            />
                          </label>
                        </th> */}
                        <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                          Number
                        </th>

                        {/* <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                          Account
                        </th> */}
                        <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                          Created At
                        </th>
                        <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                          Status
                        </th>
                        <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                          Requested Start Date
                        </th>
                        <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                          Requested Completion Date
                        </th>
                        <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-sm font-semibold uppercase tracking-wider">
                          Created By
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedProductOrders
                        .slice(indexOfFirstOrder, indexOfLastOrder)
                        .map((order: any, index: number) => {
                          return (
                            <tr key={index}>
                              {/* <td className="px-5 py-5 border p-2  border-grey-light border-dashed border-t border-gray-200  text-md ">
                                <button
                                  onClick={() => togglePinProduct(order._id)}
                                  className={`font-bold  ${
                                    pinnedProductOrders.includes(order._id)
                                      ? "text-blue-600"
                                      : "text-black"
                                  }`}
                                >
                                  <FontAwesomeIcon icon={faThumbtack} />
                                </button>
                              </td> */}
                              <td className="px-5 py-5 border p-2 border-grey-light px-5 py-5  border-t border-gray-200 px-3 text-md ">
                                <div className="flex items-center">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    <a
                                      href={`/customer-order/product/${order._id}`}
                                      className="text-blue-500 hover:text-blue-700 text-main-color"
                                    >
                                      {order.orderNumber}
                                    </a>
                                  </p>
                                  <div className="ml-3">
                                    <button
                                      onClick={() =>
                                        togglePinProduct(order._id)
                                      }
                                      className={`font-bold ${
                                        pinnedProductOrders.includes(order._id)
                                          ? "text-purple-500"
                                          : "text-purple-800"
                                      }`}
                                      style={{ transform: "rotate(+65deg)" }}
                                    >
                                      <FontAwesomeIcon icon={faThumbtack} />
                                    </button>
                                  </div>
                                </div>
                              </td>

                              {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {order.account}
                                </p>
                              </td> */}
                              <td className="px-5 py-5 border p-2  border-grey-light px-5 py-5  border-t border-gray-200 px-3 text-md text-center">
                                <p className="text-indigo-900  font-semibold whitespace-no-wrap">
                                  {new Date(order.orderDate).toDateString()}
                                </p>
                              </td>
                              <td className="px-5 py-5 border p-2  border-grey-light px-5 py-5 border-t border-gray-200 px-3 text-md text-center">
                                <span
                                  className={`relative inline-block px-3 py-1 font-semibold ${getStateTextColor(
                                    order.state,
                                  )} leading-tight`}
                                >
                                  <span
                                    aria-hidden
                                    className={`absolute inset-0 ${getStateBgColor(
                                      order.state,
                                    )} rounded-full`}
                                  ></span>
                                  <span
                                    className={`relative inset-0 ${getStateTextColor(
                                      order.state,
                                    )} rounded-full`}
                                  >
                                    {order.state === "in_progress"
                                      ? "In Progress"
                                      : order.state === "cancellation_received"
                                      ? "Cancellation in progress"
                                      : order.state === "assessing_cancellation"
                                      ? "Assessing Cancellation"
                                      : order.state === "canceled"
                                      ? "Canceled"
                                      : order.state === "rejected"
                                      ? "Rejected"
                                      : order.state === "draft"
                                      ? "Draft"
                                      : order.state === "new"
                                      ? "New"
                                      : order.state}
                                  </span>
                                </span>
                              </td>

                              {/* <td className="px-5 py-5 border p-2  border-grey-light border-purple-400 bg-white text-md">
                                <div className="flex items-center">
                                  <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {order.category}
                                    </p>
                                  </div>
                                </div>
                              </td> */}
                              <td className="px-5 py-5 border p-2  border-grey-light px-5 py-5 border-t border-gray-200 px-3 text-md text-center">
                                <div className="flex items-center">
                                  <div className="ml-3">
                                    <p className="text-gray-900 font-semibold  whitespace-no-wrap">
                                      {new Date(
                                        order.requestedStartDate,
                                      ).toDateString()}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td className="px-5 py-5 border p-2  border-grey-light px-5 py-5 border-t border-gray-200 px-3 text-md  text-center">
                                <p className="text-gray-900 font-semibold  whitespace-no-wrap">
                                  {new Date(
                                    order.requestedCompletionDate,
                                  ).toDateString()}
                                </p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-md text-center">
                                <p className="text-pink-700 font-semibold whitespace-no-wrap">
                                  {order.createdBy}
                                </p>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  {sortedProductOrders.length === 0 && (
                    <table className="w-full border-collapse">
                      <tbody className="mx-auto">
                        <tr>
                          <td colSpan={6} className="text-center">
                            <div className="flex justify-center items-center">
                              <Image
                                src={result}
                                alt="Just a flower"
                                className="w-1/4 h-1/4 object-fill rounded-2xl"
                              />
                              <br />
                            </div>
                            <div className="ml-4">
                              <p className="text-gray-900 font-bold text-xl">
                                No Result Found ...
                              </p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                  <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                    <span className="text-xs xs:text-sm text-gray-900">
                      Showing {indexOfFirstOrder + 1} to{" "}
                      {Math.min(indexOfLastOrder, recentOrders.length)} of{" "}
                      {recentOrders.length} Entries
                    </span>
                    <div className="inline-flex mt-2 xs:mt-0">
                      <button
                        className="text-sm bg-gradient-to-r from-purple-800 via-purple-700 to-purple-600 hover:bg-purple-400 text-white fo font-semibold py-2 px-4 rounded-l"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>

                      <button
                        className="text-sm bg-gradient-to-r from-purple-800 via-purple-700 to-purple-600 hover:bg-purple-400 text-white font-semibold py-2 px-4 rounded-r"
                        onClick={handleNextPage}
                        disabled={indexOfLastOrder >= recentOrders.length}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
