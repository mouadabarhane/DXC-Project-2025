"use client";
import React, { useState, useEffect, SyntheticEvent } from "react";
import Image from "next/image";
import axios from "axios";
import * as dotenv from "dotenv";
import images from "../../../../public/assets/home_internet.png";
import result from "../../../../public/assets/search.png";
import SavedProductOfferingsList from "./SavedProductOfferings";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

interface ProductOfferings {
  _id: string;
  id: string;
  link: string;
  name: string;
  description: string;
  state: string;
  internalVersion: string;
  orderDate: string;
  lastUpdate: string;
  status: string;
}
interface SavedProductOfferings {
  _id: any;
  id: string;
  productId: string;
  state: string;
  link: string;
  name: string;
  description: string;
  internalVersion: string;
  lastUpdate: string;
}

const TableProductOfferings = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [statusFilter, setStatusFilter] = useState<string>("All");

  const [productOfferings, setProductOfferings] = useState<ProductOfferings[]>(
    [],
  );
  const [savedProductOfferings, setSavedProductOfferings] = useState<
    SavedProductOfferings[]
  >([]);
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
  }, []);

  const recentOffers = productOfferings
    .sort((a, b) => {
      const date1 = new Date(a.lastUpdate);
      const date2 = new Date(b.lastUpdate);
      return date2.getTime() - date1.getTime();
    })
    .slice(0, 9);

  const filteredProducts = recentOffers.filter((product) => {
    const orderValues = Object.values(product).join(" ").toLowerCase();
    const isMatchingSearchTerm = orderValues.includes(searchTerm.toLowerCase());
    const isMatchingStatus =
      statusFilter === "All" || product.status === statusFilter;

    return isMatchingSearchTerm && isMatchingStatus;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
  };

  {
    /*  Le code pour afficher 5 commande*/
  }

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;

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
  function getStateTextColor(status: string) {
    switch (status) {
      case "retired":
        return " text-white";
      case "published":
        return "text-blue-900";
      case "draft":
        return "text-white";
      case "archived":
        return "text-red-900";
      default:
        return "";
    }
  }

  function getStateBgColor(status: string) {
    switch (status) {
      case "retired":
        return "bg-red-600 shadow-red-300";
      case "draft":
        return "bg-purple-600  shadow-yellow-300";
      case "published":
        return "bg-green-200 shadow-green-300";
      case "archived":
        return "bg-yellow-200 shadow-yellow-300";
      default:
        return "";
    }
  }
  const [viewMode, setViewMode] = useState("card");
  function toggleViewMode() {
    setViewMode((prevMode) => (prevMode === "table" ? "card" : "table"));
  }
  useEffect(() => {
    // Retrieve saved product offerings from local storage
    const savedProductsFromStorage = localStorage.getItem(
      "savedProductOfferings",
    );
    if (savedProductsFromStorage) {
      setSavedProductOfferings(JSON.parse(savedProductsFromStorage));
    }
  }, []);

  const handleSaveButtonClick = (productId: string) => {
    const isProductSaved = savedProductOfferings.some(
      (p) => p.productId === productId,
    );

    if (isProductSaved) {
      const updatedSavedProductOfferings = savedProductOfferings.filter(
        (p) => p.productId !== productId,
      );
      setSavedProductOfferings(updatedSavedProductOfferings);
      localStorage.setItem(
        "savedProductOfferings",
        JSON.stringify(updatedSavedProductOfferings),
      );
      console.log("Product removed from saved list:", productId);
    } else {
      const product = productOfferings.find((p) => p._id === productId);
      if (product) {
        const {
          _id,
          id,
          state,
          link,
          name,
          description,
          internalVersion,
          lastUpdate,
        } = product;
        const savedProductOffering: SavedProductOfferings = {
          _id,
          id,
          productId,
          state,
          link,
          name,
          description,
          internalVersion,
          lastUpdate,
        };
        const updatedSavedProductOfferings = [
          ...savedProductOfferings,
          savedProductOffering,
        ];
        setSavedProductOfferings(updatedSavedProductOfferings);
        localStorage.setItem(
          "savedProductOfferings",
          JSON.stringify(updatedSavedProductOfferings),
        );
        console.log("Product added to saved list:", savedProductOffering);
      }
    }
  };
  return (
    <>
      <div className="mx-3 flex w-full  bg-white rounded-lg shadow-xl">
        <div className="w-full">
          <div className="ml-2 flex mt-2">
            <div className="container mx-auto px-4 sm:px-8">
              <div className="py-8">
                <div>
                  <h2 className="text-2xl font-semibold leading-tight">
                    Last Updated Product Offerings
                  </h2>
                </div>
                <div className="my-2 flex sm:flex-row flex-col">
                  <div className="flex flex-row mb-1 sm:mb-0">
                    <div className="relative">
                      <select
                        value={statusFilter}
                        onChange={handleStatusFilter}
                        className="ml-2 px-8 py-2 border border-gray-300 focus:outline-none rounded-lg shadow-sm"
                      >
                        <option value="All">All</option>
                        <option value="retired">Retired</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>
                  <div className="block relative">
                    <input
                      placeholder="Search..."
                      className="mx-2 px-7 py-2 border border-purple-300 focus:outline-none rounded-lg shadow-sm"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                </div>
                <button
                  onClick={toggleViewMode}
                  className="text-sm bg-gradient-to-r from-purple-800 via-purple-700 to-purple-600 hover:bg-purple-400 text-white font-semibold py-2 px-4 rounded-r"
                >
                  Switch to {viewMode === "table" ? "Card" : "Table"} View
                </button>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                  <div className="inline-block min-w-full  overflow-hidden">
                    {viewMode === "table" ? (
                      <table className="text-left w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                              Display name
                            </th>
                            <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                              Description
                            </th>
                            <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white">
                              Version
                            </th>
                            <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white">
                              State
                            </th>
                            <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                              Last Update
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredProducts
                            .slice(indexOfFirstOrder, indexOfLastOrder)
                            .map((product, index) => {
                              return (
                                <tr key={index}>
                                  <td className="px-5 py-5 border p-2  border-grey-light border-t border-gray-200 text-md ">
                                    <div className="flex items-center">
                                      <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap text-main-color">
                                          <a
                                            href={`/product-offering/${product._id}`}
                                            className="text-blue-800 hover:text-blue-700"
                                          >
                                            {product.name}
                                          </a>
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-5 py-5 border p-2  border-grey-light border-t border-gray-200 text-md ">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {product.description}
                                    </p>
                                  </td>
                                  <td className="px-5 py-5 border p-2  border-grey-light border-t border-gray-200 text-md text-center">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {product.internalVersion}
                                    </p>
                                  </td>
                                  <td className="px-5 py-5 border p-2  border-grey-light border-t border-gray-200 text-md ">
                                    <span
                                      className={`relative inline-block px-3 py-1 font-semibold ${getStateTextColor(
                                        product.status,
                                      )} leading-tight`}
                                    >
                                      <span
                                        aria-hidden
                                        className={`absolute inset-0 ${getStateBgColor(
                                          product.status,
                                        )} rounded-full`}
                                      ></span>
                                      <span
                                        className={`relative inset-0 ${getStateTextColor(
                                          product.status,
                                        )} rounded-full`}
                                      >
                                        {product.status}
                                      </span>
                                    </span>
                                  </td>
                                  <td className="px-5 py-5 border p-2  border-grey-light  border-t border-gray-200 text-md ">
                                    <p className="text-indigo-700  font-semibold whitespace-no-wrap">
                                      {new Date(
                                        product.lastUpdate,
                                      ).toDateString()}
                                    </p>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredProducts
                          .slice(indexOfFirstOrder, indexOfLastOrder)
                          .map((product, index) => (
                            <div
                              key={index}
                              //className="bg-white rounded shadow-lg  p-4"
                            >
                              <div className="container ">
                                <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-6">
                                  <div className="flex flex-col">
                                    <div className="">
                                      <div className="relative h-62  w-30 w-full mb-3">
                                        <div className="absolute flex flex-col top-0 right-0 p-3">
                                          <button className="transition ease-in duration-300 bg-white hover:text-purple-500 shadow hover:shadow-md text-gray-500 rounded-full w-8 h-8 text-center p-1">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              className="h-6 w-6"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              stroke={
                                                savedProductOfferings.find(
                                                  (p) =>
                                                    p.productId === product._id,
                                                )
                                                  ? "purple"
                                                  : "gray"
                                              }
                                              onClick={() =>
                                                handleSaveButtonClick(
                                                  product._id,
                                                )
                                              }
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                              />
                                            </svg>
                                          </button>
                                        </div>
                                        <Image
                                          src={images}
                                          alt="Just a flower"
                                          className="w-full h-full object-fill rounded-2xl"
                                        />
                                      </div>
                                      <div className="flex-auto justify-evenly">
                                        <div className="flex flex-wrap">
                                          <div className="w-full flex-none text-sm flex items-center text-gray-600">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              className="h-4 w-4 text-red-500 mr-1"
                                              viewBox="0 0 20 20"
                                              fill="currentColor"
                                            >
                                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="text-gray-400 whitespace-nowrap mr-3">
                                              4.60
                                            </span>
                                            <span className="mr-2 text-gray-400">
                                              {product.name}
                                            </span>
                                          </div>
                                          <div className="flex items-center w-full justify-between min-w-0 ">
                                            <h2 className="text-lg mr-auto cursor-pointer text-gray-800 hover:text-purple-500 truncate">
                                              {product.description}
                                            </h2>
                                            {/* <div className="flex items-center bg-green-400 text-white text-xs px-8 py-1 ml-3 rounded-lg"></div> */}
                                          </div>
                                        </div>
                                        <div className="text-xl text-white font-semibold mt-1">
                                          $240.00
                                        </div>
                                        <div className="lg:flex py-4 text-sm text-gray-600">
                                          <div className="flex-1 inline-flex items-center mb-3">
                                            <span
                                              className={`relative inline-block px-3 py-1 font-semibold ${getStateTextColor(
                                                product.status,
                                              )} leading-tight`}
                                            >
                                              <span
                                                aria-hidden
                                                className={`absolute inset-0 ${getStateBgColor(
                                                  product.status,
                                                )} rounded-full`}
                                              ></span>
                                              <span
                                                className={`relative inset-0 ${getStateTextColor(
                                                  product.status,
                                                )} rounded-full`}
                                              >
                                                {product.status}
                                              </span>
                                            </span>
                                          </div>
                                          <div className="flex space-x-2 text-sm font-medium justify-start">
                                            <button
                                              onClick={() => {
                                                window.location.href = `/product-offering/${product._id}`;
                                              }}
                                              className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-gradient-to-r from-purple-800 via-purple-700 to-pink-400 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600"
                                            >
                                              <span>View Details</span>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                    {filteredProducts.length === 0 && (
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
                    <div className=" mt-8 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                      <span className="text-xs xs:text-sm text-gray-900">
                        Showing {indexOfFirstOrder + 1} to{" "}
                        {Math.min(indexOfLastOrder, recentOffers.length)} of{" "}
                        {recentOffers.length} Entries
                      </span>
                      <div className="inline-flex mt-2 xs:mt-0">
                        <button
                          className="text-sm bg-gradient-to-r from-purple-800 via-purple-700 to-purple-600 hover:bg-purple-400 text-white font-semibold py-2 px-4 rounded-l"
                          onClick={handlePreviousPage}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                        <button
                          className="text-sm bg-gradient-to-r from-purple-800 via-purple-700 to-purple-600 hover:bg-purple-400 text-white font-semibold py-2 px-4 rounded-r"
                          onClick={handleNextPage}
                          disabled={indexOfLastOrder >= recentOffers.length}
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
    </>
  );
};

export default TableProductOfferings;
