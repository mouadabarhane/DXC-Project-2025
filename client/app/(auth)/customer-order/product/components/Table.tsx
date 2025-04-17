"use client";
import React, { useEffect, useState } from "react";
import {
  FiEye,
  FiFilter,
  FiRefreshCcw,
  FiSearch,
  FiTrash2,
} from "react-icons/fi";
import Link from "next/link";
import {
  FaBan,
  FaPencilAlt,
  FaSortAmountDownAlt,
  FaTrashAlt,
} from "react-icons/fa";
import Image from "next/image";
import axios from "axios";
import { IoMdOptions } from "react-icons/io";
import * as dotenv from "dotenv";
import NoRecord from "../../../../../public/assets/NoRecord.png";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

const Table = () => {
  // const [selectedState, setSelectedState] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterState, setFilterState] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 4;

  // const handleNextPage = () => {
  //   setCurrentPage(currentPage + 1);
  // };

  // const handlePreviousPage = () => {
  //   setCurrentPage(currentPage - 1);
  // };

  // const indexOfLastOrder = currentPage * ordersPerPage;
  // const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  const [productOrders, setProductOrders] = React.useState<
    Array<{
      _id: number;
      id: string;
      externalId: string;
      ponr: boolean;
      href: string;
      completionDate: string;
      expectedCompletionDate: string;
      orderDate: string;
      requestedCompletionDate: string;
      requestedStartDate: string;
      state: string;
      version: string;
      "@type": string;

      channel: {
        id: string;
        name?: string;
      };
    }>
  >([]);
  // Ajouter sortOrder comme variable d'état
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedPONR, setSelectedPONR] = useState("");
  const [showTaskType, setShowTaskType] = useState(false);
  const [itemsPerPage] = useState(5);

  // Fonction pour gérer le tri
  const handleSort = (order: React.SetStateAction<string>) => {
    setSortOrder(order);
  };
  useEffect(() => {
    getProductOrders();
  }, []);

  async function getProductOrders() {
    try {
      const response = await axios.get(
        `${AXIOS_URL}/api/customer-order/product`,
      );
      const productsData = response.data;
      console.log(productsData);
      setProductOrders(productsData);
    } catch (error) {
      console.error("Erreur lors de la récupération des products:", error);
    }
  }
  if (productOrders.length === 0) {
    return (
      <center>
        <div className="loader">
          {/* <div className="loader-small"></div>
  <div className="loader-large"></div> */}
        </div>
      </center>
    );
  }
  // Trier les commandes de produits en fonction de sortOrder
  const sortedProductOrders = productOrders.sort((a, b) => {
    const dateA = new Date(a.orderDate);
    const dateB = new Date(b.orderDate);

    if (sortOrder === "newest") {
      return dateB.getTime() - dateA.getTime();
    } else if (sortOrder === "oldest") {
      return dateA.getTime() - dateB.getTime();
    }

    // Retourne 0 si aucun ordre de tri correspondant n'est trouvé
    return 0;
  });

  const handlePONRFilter = (value: string) => {
    setSelectedPONR(value.toString());
  };
  const handleAllFilter = () => {
    setFilterState("all");
    setSelectedPONR("");
  };
  const handleStateFilter = (state: React.SetStateAction<string>) => {
    setFilterState(state);
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const filteredData = productOrders.filter((order) => {
    const orderValues = Object.values(order).join(" ").toLowerCase();
    const isMatchingSearchTerm = orderValues.includes(
      searchQuery.toLowerCase(),
    );
    const isPonrMatch =
      selectedPONR === "" || order.ponr === (selectedPONR === "true");
    const isStateMatch = filterState === "all" || order.state === filterState;

    return isMatchingSearchTerm && isPonrMatch && isStateMatch;
  });
  //show/hide
  const handleToggleTaskType = () => {
    setShowTaskType(!showTaskType);
  };
  //pagination

  // Le nombre total de pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // l'index de la première et de la dernière ligne à afficher
  const indexOfLastRow = currentPage * itemsPerPage;
  const indexOfFirstRow = indexOfLastRow - itemsPerPage;

  // Obtenir les lignes à afficher sur la page actuelle
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  // Fonction pour passer à la page suivante
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Fonction pour passer à la page précédente
  const previousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="flex w-full">
      <div className="flex w-full">
        <div className="w-full">
          <div className="ml-2 flex mt-2 shadow-lg shadow-gray-500 md:shadow-1/2xl md:shadow-gray-500">
            <div className="container mx-auto px-4 sm:px-8">
              <div className="py-8">
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                  <h1 className=" mb-2 text-xl font-semibold tracking-tight text-gray-900">
                    Product customer orders
                  </h1>

                  <div className="search-bar">
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={handleSearch}
                      className="search-input"
                    />
                    <FiSearch size={15} className="search-icon" />
                  </div>
                  <button className="btn" onClick={handleAllFilter}>
                    ALL
                  </button>

                  {/* Anass: New button fixed */}
                  <Link href="/customer-order/product/new/create-order">
                    <button className="btn">NEW</button>
                  </Link>
                  <div className="dropdown">
                    <button
                      className="dropbtn"
                      onClick={handleAllFilter}
                      title="Refresh"
                    >
                      <FiRefreshCcw size={20} color="white" />
                    </button>
                  </div>
                  <div className="dropdown">
                    <button className="dropbtn">
                      <IoMdOptions size={20} color="white" />
                    </button>
                    <div className="dropdown-content">
                      <div className="submenu">
                        <button>SHOW/HIDE</button>
                        <div className="submenu-content">
                          <button
                            className="px-3 py-1.5 rounded-md bg-white border border-gray-300"
                            onClick={handleToggleTaskType}
                          >
                            {showTaskType ? (
                              <p className="text-black-500">Hide Task Type</p>
                            ) : (
                              <p className="text-black-500">Show Task Type</p>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown">
                    <button className="dropbtn">
                      <FiFilter size={20} color="white" />
                    </button>
                    <div className="dropdown-content">
                      <div className="submenu">
                        <button>State</button>
                        <div className="submenu-content">
                          <button
                            onClick={() => handleStateFilter("completed")}
                          >
                            <p className="text-black-500">Completed</p>
                          </button>
                          <button
                            onClick={() =>
                              handleStateFilter("cancellation_received")
                            }
                          >
                            <p className="text-black-500">
                              Cancellation Received
                            </p>
                          </button>
                          <button
                            onClick={() =>
                              handleStateFilter("assessing_cancellation")
                            }
                          >
                            <p className="text-black-500">
                              Assessing Cancellation
                            </p>
                          </button>
                          <button onClick={() => handleStateFilter("canceled")}>
                            <p className="text-black-500">Canceled</p>
                          </button>
                          <button onClick={() => handleStateFilter("on hold")}>
                            <p className="text-black-500">On Hold</p>
                          </button>
                          <button
                            onClick={() => handleStateFilter("in_progress")}
                          >
                            <p className="text-black-500">In Progress</p>
                          </button>
                          <button
                            onClick={() => handleStateFilter("scheduled")}
                          >
                            <p className="text-black-500">Scheduled</p>
                          </button>
                          <button onClick={() => handleStateFilter("new")}>
                            <p className="text-black-500">New</p>
                          </button>
                          <button onClick={() => handleStateFilter("in draft")}>
                            <p className="text-black-500">in draft</p>
                          </button>
                        </div>
                      </div>
                      <div className="submenu">
                        <button>PONR</button>
                        <div className="submenu-content">
                          <button onClick={() => handlePONRFilter("true")}>
                            <p className="text-black-500">True</p>
                          </button>
                          <button onClick={() => handlePONRFilter("false")}>
                            <p className="text-black-500">False</p>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown">
                    <button className="dropbtn">
                      <FaSortAmountDownAlt size={20} color="white" />
                    </button>

                    <div className="dropdown-content">
                      <div className="submenu">
                        <button>Sort by Order date</button>
                        <div className="submenu-content">
                          <button onClick={() => handleSort("newest")}>
                            <p className="text-black-500">Newest first</p>
                          </button>
                          <button onClick={() => handleSort("oldest")}>
                            <p className="text-black-500">Oldest first</p>
                          </button>
                        </div>
                      </div>
                      <div className="submenu"></div>
                    </div>
                  </div>
                  <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <div className="table-responsive">
                      <table className="min-w-full leading-normal">
                        <thead>
                          <tr>
                            <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-left text-xs font-semibold uppercase tracking-wider">
                              NUMBER
                            </th>
                            <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-left text-xs font-semibold uppercase tracking-wider">
                              Completion Date
                            </th>
                            <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-left text-xs font-semibold uppercase tracking-wider">
                              Requested start Date
                            </th>
                            <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-left text-xs font-semibold uppercase tracking-wider">
                              state
                            </th>
                            <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-left text-xs font-semibold uppercase tracking-wider">
                              ORDER DATE
                            </th>
                            <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-left text-xs font-semibold uppercase tracking-wider">
                              PONR
                            </th>
                            <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-left text-xs font-semibold uppercase tracking-wider">
                              {showTaskType ? "TASK TYPE" : ""}
                            </th>
                            <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-left text-xs font-semibold uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {currentRows.length === 0 ? (
                            <tr className="tabbody">
                              <td colSpan={8} className="no-results">
                                <center>
                                  <Image
                                    className="image"
                                    src={NoRecord}
                                    alt="No record"
                                  />
                                </center>
                                <center>No records to display</center>
                              </td>
                            </tr>
                          ) : (
                            currentRows
                              .filter((order) => {
                                if (filterState === "all") {
                                  return true;
                                } else {
                                  return order.state === filterState;
                                }
                              })
                              .map((order: any, index: number) => (
                                <tr key={order._id}>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                    <div className="flex items-center">
                                      <div className="ml-3">
                                        {order.orderNumber}
                                      </div>
                                    </div>
                                  </td>
                                  {/* <div className="flex items-center">
                                    <div className="ml-3">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        {order.id}
                                      </p>
                                    </div>
                                  </div> */}
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {JSON.stringify(
                                        new Date(order.completionDate),
                                      )}
                                    </p>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {new Date(
                                        order.requestedStartDate,
                                      ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                      })}{" "}
                                      {new Date(
                                        order.requestedStartDate,
                                      ).toLocaleTimeString("en-US", {
                                        hour12: false,
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                      })}
                                    </p>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <span className="relative inline-block px-3 py-1 font-semibold leading-tight">
                                      <span
                                        aria-hidden
                                        className={`absolute inset-0 ${
                                          order.state === "completed"
                                            ? "bg-blue-200"
                                            : order.state === "on hold"
                                            ? "bg-brown-200"
                                            : order.state === "in draft"
                                            ? "bg-yellow-200"
                                            : order.state === "in_progress"
                                            ? "bg-orange-200"
                                            : order.state ===
                                              "cancellation_received"
                                            ? "bg-red-200"
                                            : order.state === "new"
                                            ? "bg-green-200"
                                            : order.state === "scheduled"
                                            ? "bg-purple-200"
                                            : order.state ===
                                              "assessing_cancellation"
                                            ? "bg-gray-200"
                                            : ""
                                        } rounded-full`}
                                      ></span>
                                      <span className="relative">
                                        {order.state}
                                      </span>
                                    </span>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <div className="flex items-center">
                                      <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                          {new Date(
                                            order.orderDate,
                                          ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                          })}{" "}
                                          {new Date(
                                            order.orderDate,
                                          ).toLocaleTimeString("en-US", {
                                            hour12: false,
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                          })}
                                        </p>
                                      </div>
                                    </div>
                                  </td>

                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <span
                                      className={`relative inline-block px-3 py-1 font-semibold rounded-full text-black-900 leading-tight ${
                                        order.ponr
                                          ? "bg-green-200"
                                          : "bg-red-200"
                                      }`}
                                    >
                                      <span className="relative ">
                                        {order.ponr ? "True" : "False"}
                                      </span>
                                    </span>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {showTaskType ? "Product Order" : ""}
                                    </p>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      <Link
                                        href={`/customer-order/product/${order._id}`}
                                      >
                                        <FiEye
                                          size={18}
                                          className="icon"
                                          title="View"
                                          style={{ color: "blue" }}
                                        />
                                      </Link>
                                      <Link
                                        href={`/customer-order/product/edit/${order._id}`}
                                      >
                                        <FaPencilAlt
                                          size={18}
                                          className="icon"
                                          title="UpDate"
                                          style={{ color: "green" }}
                                        />
                                      </Link>
                                      <Link
                                        href={`/customer-order/product/${order._id}`}
                                      >
                                        <FaBan
                                          size={18}
                                          className="icon"
                                          title="Disconnect"
                                          style={{ color: "red" }}
                                        />
                                      </Link>
                                    </p>
                                  </td>
                                </tr>
                              ))
                          )}
                        </tbody>
                      </table>
                      <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                        <span className="text-xs xs:text-sm text-gray-900">
                          Page {currentPage} of {totalPages}
                        </span>
                        <div className="inline-flex mt-2 xs:mt-0">
                          <button
                            className={`text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l ${
                              currentPage === 1 ? "disabled" : ""
                            }`}
                            onClick={previousPage}
                            disabled={currentPage === 1}
                          >
                            Prev
                          </button>
                          <button
                            className={`text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l ${
                              currentPage === 1 ? "disabled" : ""
                            }`}
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="min-w-full leading-normal">
                      <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                        <span className="text-xs xs:text-sm text-gray-900">
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center"></div>
                          </div>
                        </span>
                        <div className="inline-flex mt-2 xs:mt-0"></div>
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
  );
};

export default function ProductCustomerOrdersPage() {
  return (
    <div className="product-customer-orders">
      <div className="product-customer-orders">
        <Table />
      </div>
    </div>
  );
}
