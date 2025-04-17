"use client";
import React, { useState, useEffect, SyntheticEvent } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import Swal from "sweetalert2";
import * as dotenv from "dotenv";
import Header from "../../dashboard/components/header/Header";
import Sidebar from "../../dashboard/components/Sidebar";
import Stats from "./Stats";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

type ServiceOrders = {
  state: string;
  orderDate: string;
  ponr: string;
};
export default function ServiceCustomerOrdersPage() {
  const [services, setServices] = useState<ServiceOrders[]>([]);
  const [data, setData] = useState<ServiceOrders[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesFilter, setServicesFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
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
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  }
  useEffect(() => {
    const filteredServices = services.filter((service) => {
      const serviceValues = Object.values(service).join(" ").toLowerCase();
      const isMatchingSearchTerm = serviceValues.includes(
        searchTerm.toLowerCase(),
      );
      const isMatchingStatus =
        statusFilter === "All" || service.state === statusFilter;

      return isMatchingSearchTerm && isMatchingStatus;
    });

    setData(filteredServices);
    console.log(filteredServices);
  }, [searchTerm, statusFilter, services]);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const filteredServices = data.filter((service) => {
    if (statusFilter === "All") {
      return true;
    }
    return service.state.toLowerCase() === statusFilter.toLowerCase();
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
  };

  const ordersPerPage = 5;

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  const handleCancelClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("click");
  };

  function getPonrTextColor(ponr: string) {
    switch (ponr) {
      case "true":
        return "text-white";
      case "false":
        return "text-white";
      default:
        return "";
    }
  }

  function getPonrBgColor(ponr: string) {
    switch (ponr) {
      case "true":
        return "bg-green-700 shadow-green-300";
      case "false":
        return "bg-red-500 shadow-red-300";
      default:
        return "";
    }
  }
  function getStateTextColor(state: string) {
    switch (state) {
      case "active":
        return "text-blue-900";
      case "in progress":
        return "text-yellow-900";
      case "completed":
        return "text-green-900";
      case "canceled":
        return "text-red-900";
      default:
        return "";
    }
  }

  function getStateBgColor(state: string) {
    switch (state) {
      case "active":
        return "bg-blue-200 shadow-blue-300";
      case "new":
        return "bg-yellow-200 shadow-yellow-300";
      case "completed":
        return "bg-green-200 shadow-green-300";
      case "on hold":
        return "bg-orange-200 shadow-red-300";
      case "canceled":
        return "bg-red-200 shadow-red-300";
      default:
        return "";
    }
  }
  const [orderFilter, setOrderFilter] = useState("");
  const sortedOrders = [...filteredServices];

  sortedOrders.sort((a, b) => {
    const date1 = new Date(
      parseInt(a.orderDate.split("-")[0]),
      parseInt(a.orderDate.split("-")[1]) - 1,
      parseInt(a.orderDate.split("-")[2]),
    );

    const date2 = new Date(
      parseInt(b.orderDate.split("-")[0]),
      parseInt(b.orderDate.split("-")[1]) - 1,
      parseInt(b.orderDate.split("-")[2]),
    );

    if (orderFilter === "new") {
      return date2.getTime() - date1.getTime();
    } else if (orderFilter === "old") {
      return date1.getTime() - date2.getTime();
    } else {
      return 0;
    }
  });

  const recentOrders = sortedOrders;

  return (
    <div className="service-customer-orders">
      <div className="bg-gray-100 flex">
        <Sidebar />
        <div className="bg-white  min-h-screen-100 w-5/6">
          <Header />
          <div className="content ml-12 transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 ">
            <nav className="flex px-5 py-3 text-gray-700  rounded-lg bg-purple-100">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <a
                    href="#"
                    className="inline-flex items-center text-sm font-medium text-purple-700 hover:text-gray-900"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="purple"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                    Dashboard
                  </a>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="purple"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <a
                      href="#"
                      className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2"
                    >
                      Service Orders
                    </a>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          <Stats />
          <div className="flex w-full">
            <div className="w-full">
              <div className="ml-2 flex mt-2 ">
                <div className="container mx-auto px-4 sm:px-8">
                  <div className="py-8">
                    <div>
                      <h2 className="text-2xl font-semibold leading-tight">
                        Service Orders
                      </h2>
                    </div>
                    <div className="my-2 flex sm:flex-row flex-col">
                      <div className="flex flex-row mb-1 sm:mb-0">
                        <div className="relative ">
                          <select
                            value={statusFilter}
                            onChange={handleStatusFilter}
                            className=" ml-2 px-3 py-2 border border-gray-300 focus:outline-none rounded-lg shadow-sm"
                          >
                            <option value="All">All</option>
                            <option value="new">New</option>
                            <option value="active">Active</option>
                            <option value="in progress">In progress</option>
                            <option value="on hold">On hold</option>
                            <option value="qualified">Qualified</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="completed">Completed</option>
                            <option value="canceled">Canceled</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex flex-row mb-1 sm:mb-0">
                        <div className="relative ">
                          <select
                            value={orderFilter}
                            onChange={(event) =>
                              setOrderFilter(event.target.value)
                            }
                            className=" ml-2 px-7 py-2 border border-gray-300 focus:outline-none rounded-lg shadow-sm"
                          >
                            <option value="All">order By</option>
                            <option value="new">A to Z</option>
                            <option value="old">Z to A</option>
                          </select>
                        </div>
                      </div>
                      <div className="block relative">
                        <span className=" h-full absolute inset-y-0 left-0 flex items-center pl-2"></span>
                        <input
                          placeholder="  Search..."
                          className="mx-2 px-3 py-2 border border-gray-300 focus:outline-none rounded-lg shadow-sm"
                          value={searchTerm}
                          onChange={handleSearch}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button className="text-sm bg-purple-700 hover:bg-purple-400 text-white font-semibold py-4 px-8 rounded-r flex items-end transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                        New
                      </button>
                    </div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className=" w-full border-collapse">
                          <thead>
                            <tr>
                              <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white mx-auto text-xs font-semibold uppercase tracking-wider">
                                ID
                              </th>
                              <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white border p-2 border-grey-light">
                                external Id
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-purple-800 text-white mx-auto text-xs font-semibold uppercase tracking-wider">
                                Order Date
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-purple-800 text-white mx-auto text-xs font-semibold uppercase tracking-wider">
                                Status
                              </th>
                              {/* <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                               Service Characteristic
                              </th>
                              <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                              service Specification
                              </th> */}
                              <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white mx-auto text-xs font-semibold uppercase tracking-wider">
                                Note
                              </th>
                              <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white mx-auto text-xs font-semibold uppercase tracking-wider">
                                PONR
                              </th>
                              <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white mx-auto text-xs font-semibold uppercase tracking-wider">
                                requested Start Date
                              </th>
                              <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white mx-auto text-xs font-semibold uppercase tracking-wider">
                                requested Completion Date
                              </th>
                              <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white mx-auto text-xs font-semibold uppercase tracking-wider">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredServices
                              .slice(indexOfFirstOrder, indexOfLastOrder)
                              .map((order: any, index: number) => {
                                const isPonrTrue = order.ponr === true;
                                return (
                                  <tr key={index}>
                                    {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                                      <div className="flex items-center">
                                        <div className="ml-3">
                                          <p className="text-gray-900 whitespace-no-wrap">
                                            <a
                                              href={order.link}
                                              className="text-blue-500  text-main-color hover:text-blue-700"
                                            >
                                              {order._id}
                                            </a>
                                          </p>
                                        </div>
                                      </div>
                                    </td> */}

                                    <td className="px-5 py-5 border p-2  border-grey-light border-purple-400 bg-white text-md">
                                      <p className="text-gray-900 whitespace-no-wrap  font-lg text-semibold leading-6 ">
                                        {order.externalId}
                                      </p>
                                    </td>
                                    <td className="px-5 py-5 border p-2  border-grey-light border-purple-400 bg-white text-md">
                                      <p className="text-indigo-700 whitespace-no-wrap font-semibold">
                                        {new Date(
                                          order.orderDate,
                                        ).toDateString()}
                                      </p>
                                    </td>
                                    <td className="px-5 py-5 border p-2  border-grey-light border-purple-400 bg-white text-md">
                                      <span
                                        className={`relative inline-block px-3 py-1 font-semibold ${getStateTextColor(
                                          order.state,
                                        )} leading-tight`}
                                      >
                                        <span
                                          aria-hidden
                                          className={`absolute inset-0 ${getStateBgColor(
                                            order.state,
                                          )}  rounded-full`}
                                        ></span>
                                        <span
                                          className={`relative inset-0 ${getStateTextColor(
                                            order.state,
                                          )}  rounded-full`}
                                        >
                                          {order.state}
                                        </span>
                                      </span>
                                    </td>
                                    <td className="px-5 py-5 border p-2  border-grey-light border-purple-400 bg-white text-md">
                                      <div className="flex items-center ">
                                        <div className="ml-3 ">
                                          <p className=" text-gray-700 hover:text-gray-600 leading-6">
                                            {order.note.map(
                                              (n: { text: string }) => {
                                                return n.text;
                                              },
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-5 py-5 border p-2  border-grey-light border-purple-400 bg-white text-md">
                                      <span
                                        className={`relative inline-block px-3 py-1 font-semibold ${getPonrTextColor(
                                          order.state,
                                        )} leading-tight`}
                                      >
                                        <span
                                          aria-hidden
                                          className={`absolute inset-0 ${getPonrBgColor(
                                            order.ponr,
                                          )}  rounded-full`}
                                        ></span>
                                        <span
                                          className={`relative inset-0 ${getPonrTextColor(
                                            order.ponr,
                                          )}  rounded-full`}
                                        >
                                          {order.ponr}
                                        </span>
                                      </span>
                                    </td>
                                    <td className="px-5 py-5 border p-2  border-grey-light border-purple-400 bg-white text-md">
                                      <div className="flex items-center">
                                        <div className="ml-3">
                                          <p className="text-gray-900  whitespace-no-wrap">
                                            {new Date(
                                              order.requestedStartDate,
                                            ).toDateString()}
                                          </p>
                                        </div>
                                      </div>
                                    </td>

                                    <td className="px-5 py-5 border p-2  border-grey-light border-purple-400 bg-white text-md">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        {new Date(
                                          order.requestedCompletionDate,
                                        ).toDateString()}
                                      </p>
                                    </td>

                                    <td className="py-3 px-6 text-center border p-2  border-grey-light border-gray-200 bg-white text-sm">
                                      <div className="flex item-center justify-center">
                                        <Link
                                          href={`/customer-order/service/${order._id}`}
                                          className="button text-sm bg-yellow-300 text-white font-semibold py-2 px-2 rounded-r flex items-end transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300"
                                        >
                                          View
                                        </Link>
                                        {order.ponr === "true" ? (
                                          <button
                                            className="mx-2 button text-sm bg-white text-gray-600   border border:bg-gray-900 font-semibold py-2 px-2 rounded-r flex items-end "
                                            disabled
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 24 24"
                                              fill="gray"
                                              className="w-6 h-6"
                                            >
                                              <path
                                                fillRule="evenodd"
                                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                                                clipRule="evenodd"
                                              />
                                            </svg>
                                            Cancel
                                          </button>
                                        ) : (
                                          <button
                                            className="mx-2 button text-sm bg-red-600 text-white  border border:bg-gray-900 font-semibold py-2 px-2 rounded-r flex items-end transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300"
                                            onClick={handleCancelClick}
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 24 24"
                                              fill="white"
                                              className="w-6 h-6"
                                            >
                                              <path
                                                fillRule="evenodd"
                                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                                                clipRule="evenodd"
                                              />
                                            </svg>
                                            Cancel
                                          </button>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                        <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                          <span className="text-xs xs:text-sm text-gray-900">
                            Showing 1 to 4 of 50 Entries
                          </span>
                          <div className="inline-flex mt-2 xs:mt-0">
                            <button
                              className="text-sm bg-purple-700 hover:bg-purple-400 text-white fo font-semibold py-2 px-4 rounded-l"
                              onClick={handlePreviousPage}
                              disabled={currentPage === 1}
                            >
                              Previous
                            </button>

                            <button
                              className="text-sm bg-purple-700 hover:bg-purple-400 text-white font-semibold py-2 px-4 rounded-r"
                              onClick={handleNextPage}
                              disabled={indexOfLastOrder >= services.length}
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
        </div>
        {/* Autres composants ou contenu de la page */}
      </div>
    </div>
  );
}
