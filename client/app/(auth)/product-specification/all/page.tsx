"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as dotenv from "dotenv";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import StatistiqueSpecification from "./statistiqueSpecification";
import Sidebar from "../../dashboard/components/Sidebar";
import Header from "../../dashboard/components/header/Header";
import Footer from "../../dashboard/components/Footer";
import image from "../../../../public/assets/wifi-survey2.jpg";
import SavedProductSpecifications from "./SavedProducts";
import { getProductSpecifications } from "../utils";
import Banner from "../../dashboard/components/banner";
import result from "../../../../public/assets/search.png";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

interface ProductOrders {
  _id: any;
  id: string;
  name: string;
  status: string;
  description: string;
  lastUpdate: string;
  validFor: {
    startDateTime: string;
    endDateTime: string;
  };
}

interface SavedProduct {
  _id: any;
  id: string;
  productId: string;
  status: string;
  name: string;
  description: string;
  lastUpdate: string;
  validFor: {
    startDateTime: string;
    endDateTime: string;
  };
}

export default function AllProductSpecificationsPage({
  params,
}: {
  params: {
    id: string;
    productSpecification: string;
    productSpecificationName: string;
    name: string;
    internalId: string;
  };
}) {
  const [productSpecifications, setProductSpecifications] = useState<
    ProductOrders[]
  >([]);
  const [data, setData] = useState<ProductOrders[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [savedProducts, setSavedProducts] = useState<SavedProduct[]>([]);
  const [sortBy, setSortBy] = useState("All");
  const [showSavedList, setShowSavedList] = useState(false);

  useEffect(() => {
    getProductSpecifications();
  }, []);

  async function getProductSpecifications() {
    try {
      const response = await axios.get(
        `${AXIOS_URL}/api/product-specification`,
      );
      const specificationData: ProductOrders[] = response.data;
      setProductSpecifications(specificationData);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  }

  useEffect(() => {
    const filteredProds = productSpecifications.filter((product) => {
      const productValues = Object.values(product).join(" ").toLowerCase();
      const isMatchingSearchTerm = productValues.includes(
        searchTerm.toLowerCase(),
      );
      const isMatchingStatus =
        statusFilter === "All" || product.status === statusFilter;
      return isMatchingSearchTerm && isMatchingStatus;
    });
    setData(filteredProds);
    setCurrentPage(1);
  }, [productSpecifications, searchTerm, statusFilter]);

  const ordersPerPage = 4;
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  function getStateTextColor(status: string) {
    switch (status) {
      case "archived":
        return "text-blue-900";
      case "draft":
        return "text-blue-900";
      case "published":
        return "text-green-900";
      case "retired":
        return "text-white";
      default:
        return "";
    }
  }

  function getStateBgColor(status: string) {
    switch (status) {
      case "draft":
        return "bg-blue-200 shadow-blue-300";
      case "published":
        return "bg-green-200 shadow-yellow-300";
      case "archived":
        return "bg-yellow-200 shadow-green-300";
      case "retired":
        return "bg-red-500 shadow-red-300";
      default:
        return "";
    }
  }

  const filteredProds = data.filter((product) => {
    if (statusFilter === "All") {
      return true;
    }
    return product.status.toLowerCase() === statusFilter.toLowerCase();
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };
  //Anass: I added checks to ensure validFor and startDateTime are defined before using them
  const sortValidFor = (a: ProductOrders, b: ProductOrders) => {
    const dateA =
      a.validFor && a.validFor.startDateTime
        ? new Date(a.validFor.startDateTime)
        : new Date(0);
    const dateB =
      b.validFor && b.validFor.startDateTime
        ? new Date(b.validFor.startDateTime)
        : new Date(0);

    if (sortBy === "new") {
      return dateB.getTime() - dateA.getTime();
    } else if (sortBy === "old") {
      return dateA.getTime() - dateB.getTime();
    }

    return 0;
  };

  const sortedData = filteredProds.sort(sortValidFor);
  const [viewMode, setViewMode] = useState("card");

  const toggleViewMode = () => {
    setViewMode(viewMode === "table" ? "card" : "table");
  };

  const handleProductClick = (productId: string) => {
    console.log("Product clicked:", productId);
  };

  useEffect(() => {
    const savedProductsFromStorage = localStorage.getItem("savedProducts");
    if (savedProductsFromStorage) {
      setSavedProducts(JSON.parse(savedProductsFromStorage));
    }
  }, []);

  const handleSaveButtonClick = (productId: string) => {
    const isProductSaved = savedProducts.some((p) => p.productId === productId);

    if (isProductSaved) {
      const updatedSavedProducts = savedProducts.filter(
        (p) => p.productId !== productId,
      );
      setSavedProducts(updatedSavedProducts);
      localStorage.setItem(
        "savedProducts",
        JSON.stringify(updatedSavedProducts),
      );
      console.log("Product removed from saved list:", productId);
    } else {
      const product = productSpecifications.find((p) => p.id === productId);
      if (product) {
        const { _id, id, name, status, description, lastUpdate, validFor } =
          product;
        const savedProduct: SavedProduct = {
          productId: id,
          _id,
          id,
          name,
          status,
          description,
          lastUpdate,
          validFor,
        };
        const updatedSavedProducts = [...savedProducts, savedProduct];
        setSavedProducts(updatedSavedProducts);
        localStorage.setItem(
          "savedProducts",
          JSON.stringify(updatedSavedProducts),
        );
        console.log("Product added to saved list:", savedProduct);
      }
    }
  };

  const handleSavedClick = () => {
    setShowSavedList(!showSavedList);
  };

  return (
    <div className="bg-gray-100 flex">
      <Sidebar />
      <div className="bg-white  min-h-screen-100 w-5/6  ">
        <Header />
        <Banner />
        <div className="flex w-full">
          <div className="w-full">
            <StatistiqueSpecification />

            <div className="ml-2 flex mt-2 ">
              <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                  <div>
                    <h2 className="text-2xl font-semibold leading-tight">
                      Product Specifications
                    </h2>
                  </div>
                  <div className="my-2 flex sm:flex-row flex-col">
                    <div className="flex flex-row mb-1 sm:mb-0">
                      <div className="relative ">
                        <select
                          className=" mx-4 ml-2 px-8 py-2 border border-gray-300 focus:outline-none rounded-lg shadow-sm"
                          value={statusFilter}
                          onChange={handleStatusFilter}
                        >
                          <option value="All">All</option>
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                          <option value="retired">Retired</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-row mb-1 sm:mb-0">
                      <div className="relative ">
                        <select
                          value={sortBy}
                          onChange={handleSortChange}
                          className=" mx-4 ml-2 px-8 py-2 border border-gray-300 focus:outline-none rounded-lg shadow-sm"
                        >
                          <option value="All">order By</option>
                          <option value="new">Z to A</option>
                          <option value="old">A to Z</option>
                        </select>
                      </div>
                    </div>
                    <div className="block relative">
                      <input
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="  Search ...."
                        className="mx-2 px-6 py-2 border border-gray-300 focus:outline-none rounded-lg shadow-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-end mb-4">
                      <button
                        className="text-sm bg-gradient-to-r from-purple-800 via-purple-700 to-purple-600 hover:bg-purple-400 text-white font-semibold py-2 px-4 rounded"
                        onClick={toggleViewMode}
                      >
                        {viewMode === "table"
                          ? "Switch to Card View"
                          : "Switch to Table View"}
                      </button>
                    </div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        {sortedData.length > 0 && viewMode === "table" && (
                          <table className="w-full border-collapse">
                            <thead>
                              <tr>
                                <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                                  Name
                                </th>
                                <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                                  Version
                                </th>
                                <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                                  Description
                                </th>
                                <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                                  state
                                </th>
                                <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                                  Start Date
                                </th>
                                <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                                  End Date
                                </th>
                                <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {sortedData
                                .slice(indexOfFirstOrder, indexOfLastOrder)
                                .map((product: any, index: number) => {
                                  return (
                                    <tr key={index}>
                                      <td className="border p-2 border-grey-light px-5 py-5 border-t border-gray-300 px-3 text-md">
                                        <p className="text-blue-800 font-semibold whitespace-no-wrap font-lg text-semibold leading-6">
                                          {product.name}
                                        </p>
                                      </td>
                                      <td className="border p-2 border-grey-light px-5 py-5 border-t border-gray-300 px-3 text-md text-center">
                                        <p className="text-puprle-700 whitespace-no-wrap font-semibold">
                                          {product.version}
                                        </p>
                                      </td>
                                      <td className="border p-2 border-grey-light px-5 py-5 border-t border-gray-300 px-3 text-md">
                                        <div className="flex items-center">
                                          <div className="">
                                            <p className="text-md text-gray-900 hover:text-gray-600 leading-6">
                                              {product.description}
                                            </p>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="border p-2 border-grey-light px-5 py-5 border-t border-gray-300 px-3 text-md">
                                        <div className="flex items-center">
                                          <div className="">
                                            <span
                                              className={`relative inline-block px-3 py-1 font-semibold ${getStateTextColor(
                                                product.status,
                                              )} leading-tight`}
                                            >
                                              <span
                                                aria-hidden
                                                className={`absolute inset-0 ${getStateBgColor(
                                                  product.status,
                                                )}  rounded-full`}
                                              ></span>
                                              <span
                                                className={`relative inset-0 ${getStateTextColor(
                                                  product.status,
                                                )}  rounded-full`}
                                              >
                                                {product.status}
                                              </span>
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="border border-grey-light px-5 py-5 border-t border-gray-300 px-3 text-md">
                                        <div className="flex items-center">
                                          <div className="ml-3">
                                            <p className="text-md text-green-700 font-semibold hover:text-gray-600 leading-6">
                                              {product?.validFor?.startDateTime}
                                            </p>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="border border-grey-light px-5 py-5 border-t border-gray-300 px-3 text-md">
                                        <div className="flex items-center">
                                          <div className="ml-3">
                                            <p className="text-md text-red-700  font-semibold hover:text-gray-600 leading-6">
                                              {product?.validFor?.endDateTime}
                                            </p>
                                          </div>
                                        </div>
                                      </td>
                                      <td className=" border border-grey-light px-5 py-5 border-t border-gray-300 px-3 text-md">
                                        <div className="flex item-center justify-center">
                                          <Link
                                            href={`/product-specification/${product._id}`}
                                            className="button text-sm bg-blue-600 text-white font-semibold py-2 px-2 rounded-r flex items-end transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                                          >
                                            Details
                                          </Link>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        )}
                        {sortedData.length > 0 && viewMode === "card" && (
                          <div className="grid grid-cols-1 justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {sortedData
                              .slice(indexOfFirstOrder, indexOfLastOrder)
                              .map((product: any, index: number) => (
                                <div
                                  key={index}
                                  onClick={() => handleProductClick(product.id)}
                                >
                                  <div className="focus:outline-none mx-2 w-72 xl:mb-0 mb-8 shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
                                    <div>
                                      <Image
                                        alt="person capturing an image"
                                        src={image}
                                        className="focus:outline-none w-full h-44"
                                      />
                                    </div>
                                    <div className="bg-white">
                                      <div className="flex items-center justify-between px-4 pt-4">
                                        <div>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`focus:outline-none ${
                                              savedProducts.find(
                                                (p) =>
                                                  p.productId === product.id,
                                              )
                                                ? "text-green-500"
                                                : "text-gray-500"
                                            }`}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke={
                                              savedProducts.find(
                                                (p) =>
                                                  p.productId === product.id,
                                              )
                                                ? "purple"
                                                : "gray"
                                            }
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            onClick={() =>
                                              handleSaveButtonClick(product.id)
                                            }
                                          >
                                            <path
                                              stroke="none"
                                              d="M0 0h24v24H0z"
                                              fill="none"
                                            ></path>
                                            <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2"></path>
                                          </svg>
                                        </div>
                                        <div className="">
                                          <p className="focus:outline-none">
                                            <span
                                              className={`relative inline-block px-3 py-1 font-semibold ${getStateTextColor(
                                                product.status,
                                              )} leading-tight`}
                                            >
                                              <span
                                                aria-hidden
                                                className={`absolute inset-0 ${getStateBgColor(
                                                  product.status,
                                                )}  rounded-full`}
                                              ></span>
                                              <span
                                                className={`relative inset-0 ${getStateTextColor(
                                                  product.status,
                                                )}  rounded-full`}
                                              >
                                                {product.status}
                                              </span>
                                            </span>
                                          </p>
                                        </div>
                                      </div>
                                      <div className="p-4">
                                        <div className="flex items-center">
                                          <h2 className="focus:outline-none text-lg font-semibold line-clamp-1">
                                            {product.name}
                                          </h2>
                                          <p className="focus:outline-none  tiem-end text-xs text-gray-600 pl-5">
                                            <Link
                                              href={`/product-specification/${product._id}`}
                                              className="button text-sm bg-blue-400 text-white font-semibold py-2 px-2 rounded-r flex items-end transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300"
                                            >
                                              Details
                                            </Link>
                                          </p>
                                        </div>
                                        <p className="focus:outline-none text-xs text-gray-600 mt-2 line-clamp-1">
                                          {product.description}
                                        </p>
                                        <div className="flex mt-4">
                                          <div>
                                            <p className="focus:outline-none text-xs text-white px-2 bg-indigo-500 py-1">
                                              {product?.validFor?.startDateTime}
                                            </p>
                                          </div>
                                          <div className="pl-2">
                                            <p className="focus:outline-none text-xs text-white px-2 bg-indigo-700 py-1">
                                              {product?.validFor?.endDateTime}
                                            </p>
                                          </div>
                                        </div>
                                        {/* <div className="flex items-center justify-between py-4">
                                          <h2 className="focus:outline-none text-indigo-700 text-xs font-semibold">
                                            Last Update On: {product.lastUpdate}
                                          </h2>
                                          <h3 className="focus:outline-none text-indigo-700 text-xl font-semibold"></h3>
                                        </div> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                        {sortedData.length === 0 && (
                          <table className="w-full border-collapse">
                            <thead>
                              <tr>
                                <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                                  Name
                                </th>
                                <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                                  Version
                                </th>
                                <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                                  Description
                                </th>
                                <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                                  state
                                </th>
                                <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                                  Start Date
                                </th>
                                <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                                  End Date
                                </th>
                                <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                                  Action
                                </th>
                              </tr>
                            </thead>
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

                        <div className="mt-4 text-center">
                          <span className="text-xs xs:text-sm text-gray-900">
                            Showing {indexOfFirstOrder + 1} to{" "}
                            {Math.min(indexOfLastOrder, filteredProds.length)}{" "}
                            of {filteredProds.length} Entries
                          </span>
                        </div>
                        <div className="flex justify-center mt-2 xs:mt-0">
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
                            disabled={indexOfLastOrder >= filteredProds.length}
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
        <Footer />
      </div>
    </div>
  );
}
