"use client";
import * as dotenv from "dotenv";
import { off } from "process";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
// import { off } from "process";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../../dashboard/components/Sidebar";
import Header from "../../dashboard/components/header/Header";
import Footer from "../../dashboard/components/Footer";
import result from "../../../../public/assets/search.png";

// Importing utility functions
import { getProductSpecification } from "../utils";
import ProductOfferingsChart from "./ChartSpecification";
import Banner from "../../dashboard/components/banner";
import StatisticCards from "../../dashboard/components/StatisticCards";
import Statistique from "./Statistique";
import PieChart from "../../admin/user/[id]/managerPie";

const SingleProductSpecificationPage = ({
  params,
}: {
  params: {
    id: string;
    productSpecification: string;
    productSpecificationName: string;
    name: string;
    internalId: string;
  };
}) => {
  dotenv.config();
  const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;
  const [activeTab, setActiveTab] = useState(0);
  const [productSpec, setProductSpec] = useState<any>();
  const [productOfferings, setProductOfferings] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 4;
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
  };
  const handleTabClick = (index: any) => {
    setActiveTab(index);
  };
  useEffect(() => {
    getProductSpecification(params.id, setProductSpec);
  }, []);

  async function getProductOfferingsBySpecification() {
    try {
      const response = await axios.get(`${AXIOS_URL}/api/product-offering`);
      const allProductOfferings = response.data;
      console.log(allProductOfferings);

      const filteredOfferings = allProductOfferings.filter((offering: any) => {
        return (
          offering.productSpecification &&
          offering.productSpecification.id &&
          offering.productSpecification.id.trim() === productSpec.id.trim()
        );
      });

      console.log("filteredOfferings", filteredOfferings);
      return filteredOfferings;
    } catch (error) {
      console.error("Error reading product offerings:", error);
      return [];
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${AXIOS_URL}/api/product-offering`);
        const allProductOfferings = response.data;
        console.log(allProductOfferings);

        const filteredOfferings = allProductOfferings.filter(
          (offering: any) => {
            return (
              offering.productSpecification &&
              offering.productSpecification.id &&
              offering.productSpecification.id.trim() === productSpec.id.trim()
            );
          },
        );

        console.log("filteredOfferings", filteredOfferings);
        setProductOfferings(filteredOfferings);

        const filteredProducts = filteredOfferings.filter((product: any) => {
          const productValues = Object.values(product).join(" ").toLowerCase();
          const isMatchingSearchTerm = productValues.includes(
            searchTerm.toLowerCase(),
          );
          const isMatchingStatus =
            statusFilter === "All" || product.status === statusFilter;

          return isMatchingSearchTerm && isMatchingStatus;
        });

        console.log("filteredProducts", filteredProducts);
        setFilteredProducts(filteredProducts);
      } catch (error) {
        console.error("Error reading product offerings:", error);
        setFilteredProducts([]);
      }
    }

    setTimeout(() => {
      console.log("After 1s");
      fetchData();
    }, 1000 / 2);
  }, [productSpec, searchTerm, statusFilter]);
  const [pinnedProducts, setPinnedProducts] = useState<string[]>([]);
  // const togglePinProduct = (productId: string) => {
  //   const updatedPinnedProducts = pinnedProducts.includes(productId)
  //     ? pinnedProducts.filter((id) => id !== productId)
  //     : [...pinnedProducts, productId];
  //   setPinnedProducts(updatedPinnedProducts);
  // };
  const togglePinProduct = (productId: string) => {
    if (pinnedProducts.includes(productId)) {
      const updatedPinnedProducts = pinnedProducts.filter(
        (pinnedProductId) => pinnedProductId !== productId,
      );
      setPinnedProducts(updatedPinnedProducts);
    } else {
      const updatedPinnedProducts = [productId, ...pinnedProducts];
      setPinnedProducts(updatedPinnedProducts);
    }
  };

  const sortedProductOfferings = [...filteredProducts].sort((a, b) => {
    const aPinned = pinnedProducts.includes(a.id);
    const bPinned = pinnedProducts.includes(b.id);
    if (aPinned && !bPinned) {
      return -1;
    } else if (!aPinned && bPinned) {
      return 1;
    } else {
      return 0;
    }
  });

  const totalOffering = productOfferings.length;
  const RetiredProductOfferings = productOfferings.filter(
    (product) => product.status === "retired",
  );
  const totalRetiredProductOfferings = RetiredProductOfferings.length;
  const percentRetiredProductOfferings = Math.floor(
    (totalRetiredProductOfferings / productOfferings.length) * 100,
  );
  const ArchivedProductOfferings = productOfferings.filter(
    (product) => product.status === "archived",
  );
  const totalArchivedProductOfferings = ArchivedProductOfferings.length;
  const percentArchivedProductOfferings = Math.floor(
    (totalArchivedProductOfferings / productOfferings.length) * 100,
  );
  const DraftProductOfferings = productOfferings.filter(
    (product) => product.status === "draft",
  );
  const totalDraftProductOfferings = DraftProductOfferings.length;
  const percentDraftProductOfferings = Math.floor(
    (totalDraftProductOfferings / productOfferings.length) * 100,
  );
  const PublishedProductOffering = productOfferings.filter(
    (product) => product.status === "published",
  );
  const totalPublishedProductOffering = PublishedProductOffering.length;
  {
    /*  Statistics %  Canceled Costumer Orders */
  }
  const percentPublishedProductOffering = Math.floor(
    (totalPublishedProductOffering / productOfferings.length) * 100,
  );
  console.log("totalOffering:", totalOffering);
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
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  return (
    <div className="Product spec">
      <div className="bg-gray-100 flex">
        <Sidebar />
        <div className="bg-white min-h-screen-100 w-5/6">
          <Header />
          {productSpec && (
            <div>
              <div>
                <div className="h-full bg-white p-8">
                  <div className="bg-white rounded-lg shadow-xl pb-8">
                    <span className="text-purple-800 text-center text-xl font-bold">
                      Statistics
                    </span>
                    <div className="flex justify-center bg-white py-10 p-14">
                      <div className="container mx-auto pr-4">
                        <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
                          <div className="h-20 bg-gradient-to-r from-red-500 via-red-600 to-red-400  flex items-center justify-between">
                            <p className="mr-0 text-white text-lg pl-5">
                              RETIRED
                            </p>
                          </div>
                          <div className="flex justify-between px-5 pt-6 mb-2 text-sm text-gray-600">
                            <p>TOTAL</p>
                            <h3 className="mt-2 text-3xl font-bold leading-8">
                              {totalRetiredProductOfferings}
                            </h3>

                            <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-400 w-12 h-12  rounded-full shadow-xl shadow-green-300 border-white   border-2  flex justify-center items-center ">
                              <div>
                                <h1 className="text-white mt-1 text-base">
                                  {percentRetiredProductOfferings} %<br />
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="container mx-auto pr-4">
                        <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
                          <div className="h-20  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-400  flex items-center justify-between">
                            <p className="mr-0 text-white text-lg pl-5">
                              IN DRAFT
                            </p>
                          </div>
                          <div className="flex justify-between px-5 pt-6 mb-2 text-sm text-gray-600">
                            <p>TOTAL</p>
                            <h3 className="mt-2 text-3xl font-bold leading-8">
                              {" "}
                              {totalDraftProductOfferings}
                            </h3>

                            <div className=" bg-gradient-to-r from-blue-500 via-blue-600 to-blue-400 w-12 h-12  rounded-full shadow-xl shadow-green-300 border-white   border-2  flex justify-center items-center ">
                              <div>
                                <h1 className="text-white mt-1 text-base">
                                  {percentDraftProductOfferings} %<br />
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="container mx-auto pr-4">
                        <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
                          <div className="h-20 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400 flex items-center justify-between">
                            <p className="mr-0 text-white text-lg pl-5">
                              PUBLISHED
                            </p>
                          </div>
                          <div className="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
                            <p>TOTAL</p>
                            <h3 className="mt-2 text-3xl font-bold leading-8">
                              {totalPublishedProductOffering}
                            </h3>

                            <div className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400 w-12 h-12  rounded-full shadow-xl shadow-green-300 border-white   border-2  flex justify-center items-center ">
                              <div>
                                <h1 className="text-white mt-1 text-base">
                                  {percentPublishedProductOffering} %<br />
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="container mx-auto">
                        <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
                          <div className="h-20 bg-gradient-to-r from-purple-800 via-purple-900 to-purple-800 flex items-center justify-between">
                            <p className="mr-0 text-white text-lg pl-5">
                              Archived
                            </p>
                          </div>
                          <div className="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
                            <p>TOTAL</p>
                            <h3 className="mt-2 text-3xl font-bold leading-8">
                              {totalArchivedProductOfferings}
                            </h3>

                            <div className="bg-gradient-to-r from-purple-800 via-purple-900 to-purple-800 w-12 h-12  rounded-full shadow-xl shadow-green-300 border-white   border-2  flex justify-center items-center ">
                              <div>
                                <h1 className="text-white mt-1 text-base">
                                  {percentArchivedProductOfferings} %<br />
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mx-2 flex items-center font-semibold text-gray-900 text-xl leading-8">
                      <span>Related Product Offerings</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <div className="mx-2 w-full flex items-center space-x-4">
                        {sortedProductOfferings.length === 0 && (
                          <div className="w-full">
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
                            <div className="bg-white px-4 pt-2 pb-2">
                              <table className="w-full">
                                <thead>
                                  <tr className="bg-gray-100 border-b">
                                    <th className="py-2 px-6 text-center bg-purple-800 text-white">
                                      Display Name
                                    </th>

                                    <th className="py-2 px-6 text-center bg-purple-800 text-white">
                                      Description
                                    </th>
                                    <th className="py-2 px-6 text-center bg-purple-800 text-white">
                                      Version
                                    </th>
                                    <th className="py-2 px-6 text-center bg-purple-800 text-white">
                                      Product Specification
                                    </th>
                                    <th className="py-2 px-6 text-center bg-purple-800 text-white">
                                      Last Update
                                    </th>
                                    <th className="py-2 px-6 text-center bg-purple-800 text-white">
                                      Status
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
                                          No Related Offering Found ...
                                        </p>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {sortedProductOfferings.length > 0 && (
                          <div className="w-full">
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
                            <div className="bg-white px-4 pt-4 pb-2 rounded-lg shadow-lg">
                              <table className="w-full">
                                <thead>
                                  <tr className="bg-gray-100 border-b">
                                    {/* <th className="py-4 px-3 text-center bg-purple-800 text-white">
                                      <label className="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          className="form-checkbox text-gray-800"
                                        />
                                      </label>
                                    </th> */}
                                    <th className="py-4 px-6 text-center bg-purple-800 text-white">
                                      Display Name
                                    </th>

                                    <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                                      Description
                                    </th>
                                    <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                                      Version
                                    </th>
                                    <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                                      Product Specification
                                    </th>
                                    <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                                      Last Update
                                    </th>
                                    <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                                      Status
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {sortedProductOfferings
                                    .slice(indexOfFirstOrder, indexOfLastOrder)
                                    .map((offering: any) => (
                                      <tr
                                        key={offering.id}
                                        className="border-b"
                                      >
                                        {/* <td>
                                          <button
                                            onClick={() =>
                                              togglePinProduct(offering.id)
                                            }
                                            className={`font-bold border p-2  border-grey-light ${
                                              pinnedProducts.includes(
                                                offering.id,
                                              )
                                                ? "text-blue-600"
                                                : "text-black"
                                            }`}
                                          >
                                            <FontAwesomeIcon
                                              icon={faThumbtack}
                                            />
                                          </button>
                                        </td> */}
                                        <td className="px-5 py-5 border p-2 border-grey-light border-dashed border-t border-gray-200 text-md ">
                                          <div className="flex items-center">
                                            <p className="text-gray-900 whitespace-no-wrap text-main-color">
                                              <a
                                                href={`/product-offering/${offering._id}`}
                                                className="text-blue-500 hover:text-blue-700"
                                              >
                                                {offering.name}
                                              </a>
                                            </p>
                                            <div className="ml-3">
                                              <button
                                                onClick={() =>
                                                  togglePinProduct(offering.id)
                                                }
                                                className={`font-bold ${
                                                  pinnedProducts.includes(
                                                    offering.id,
                                                  )
                                                    ? "text-purple-500"
                                                    : "text-purple-800"
                                                }`}
                                                style={{
                                                  transform: "rotate(65deg)",
                                                }}
                                              >
                                                <FontAwesomeIcon
                                                  icon={faThumbtack}
                                                />
                                              </button>
                                            </div>
                                          </div>
                                        </td>

                                        <td className="py-4 px-6 text-gray-900 border p-2  border-grey-light">
                                          {offering.description}
                                        </td>
                                        <td className="py-4 px-6 text-gray-900 border p-2  border-grey-light">
                                          {offering.internalVersion}
                                        </td>
                                        <td className="py-4 px-6 text-blue-700 border p-2 font-semibold border-grey-light">
                                          {offering.productSpecification.name}
                                        </td>
                                        <td className="py-4 px-6 text-gray-900 border p-2 border-grey-light">
                                          {new Date(
                                            offering.lastUpdate,
                                          ).toDateString()}
                                        </td>
                                        <td className="py-2 px-4">
                                          <div
                                            className={`rounded-full py-1 px-4 ${getStateBgColor(
                                              offering.status,
                                            )}`}
                                          >
                                            <span
                                              className={`text-sm font-semibold ${getStateTextColor(
                                                offering.status,
                                              )}`}
                                            >
                                              {offering.status}
                                            </span>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                              <div className="text-center bg-white border-t">
                                <div>
                                  <span className="text-xs xs:text-sm text-gray-900">
                                    Showing {indexOfFirstOrder + 1} to{" "}
                                    {Math.min(
                                      indexOfLastOrder,
                                      productOfferings.length,
                                    )}{" "}
                                    of {productOfferings.length} Entries
                                  </span>
                                </div>
                                <div className="flex justify-center mt-2 xs:mt-0">
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
                                    disabled={
                                      indexOfLastOrder >=
                                      productOfferings.length
                                    }
                                  >
                                    Next
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                    <div className="w-full flex flex-col 2xl:w-1/3">
                      <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                        <h4 className="text-xl text-gray-900 font-bold">
                          Product Specification Informations
                        </h4>
                        <ul className="mt-2 text-gray-700">
                          <li className="flex border-b py-2">
                            <span className="font-bold w-24">Name:</span>
                            <span className=" text-blue-900 font-semibold">
                              {" "}
                              {productSpec.name}
                            </span>
                          </li>
                          <li className="flex border-b py-2">
                            <span className="font-bold w-24">Version:</span>
                            <span className="text-gray-700 ">
                              {productSpec.version}
                            </span>
                          </li>
                          <li className="flex border-b py-2">
                            <span className="font-bold w-24">Description:</span>
                            <span className="text-indigo-800 font-bold">
                              {productSpec.description}
                            </span>
                          </li>
                          <li className="flex border-b py-2">
                            <span className="font-bold w-40">Last Update:</span>
                            <span className=" text-blue-700 font-semibold">
                              {new Date(productSpec.lastUpdate).toDateString()}
                            </span>
                          </li>
                          <li className="flex border-b py-2">
                            <span className="font-bold w-40">
                              Start Date Time:
                            </span>
                            <span className="text-blue-800 font-semibold">
                              {productSpec?.validFor?.startDateTime}
                            </span>
                          </li>
                          <li className="flex border-b py-2">
                            <span className="font-bold w-40">
                              End Date Time:
                            </span>
                            <span className="text-blue-800 font-semibold">
                              {productSpec?.validFor?.endDateTime}
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8 text-center">
                        <ProductOfferingsChart params={params} />
                        <p className="mt-2 text-gray-600 font-semibold">
                          Related Products Offering By Stats
                        </p>
                      </div>
                    </div>
                    <div className="flex  flex-col w-full 2xl:w-2/3">
                      <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                        <div className="relative ">
                          <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>
                          <div className="bg-white p-3 hover:shadow">
                            <div className="mt-8 flex items-center font-semibold text-gray-900 text-xl leading-8">
                              <span className="text-purple-500"></span>
                              <span>Related List</span>
                            </div>
                            <div className="container mr-5 ml-2 mx-auto bg-white shadow-xl">
                              <div className="w-11/12 mx-auto">
                                <div className="bg-white my-6">
                                  <button
                                    onClick={() => handleTabClick(0)}
                                    className={`${
                                      activeTab === 0
                                        ? "bg-purple-800 text-white"
                                        : "bg-purple-600 text-white "
                                    } px-4 py-2 rounded-l-md transition duration-100`}
                                  >
                                    Service Specification
                                  </button>
                                  <button
                                    onClick={() => handleTabClick(1)}
                                    className={`${
                                      activeTab === 1
                                        ? "bg-purple-800 text-white"
                                        : "bg-purple-600 text-white "
                                    } px-4 py-2 transition duration-100`}
                                  >
                                    Product Specification Relationship
                                  </button>
                                  <button
                                    onClick={() => handleTabClick(2)}
                                    className={`${
                                      activeTab === 2
                                        ? "bg-purple-800 text-white"
                                        : "bg-purple-600 text-white "
                                    } px-4 py-2 rounded-r-md transition duration-100`}
                                  >
                                    Resource Specification
                                  </button>
                                </div>

                                {activeTab === 0 && (
                                  <Table1 product={productSpec} />
                                )}
                                {activeTab === 1 && (
                                  <Table2 product={productSpec} />
                                )}
                                {activeTab === 2 && (
                                  <Table3 product={productSpec} />
                                )}
                                {/* {activeTab === 2 && <Table4 product={product} />} */}
                              </div>
                            </div>
                            <div className="mt-10 flex items-center font-semibold text-gray-900 text-xl leading-8 bg-white">
                              <span className="text-purple-500 py-8"></span>
                              <span>Product Specification Characteristics</span>
                            </div>
                            <div className="container mr-5 ml-2 mx-auto bg-white shadow-xl">
                              <table className="text-left w-full border-collapse">
                                <thead>
                                  <tr>
                                    <th className="py-4 px-6 text-center  bg-purple-800  font-bold uppercase text-sm text-white ">
                                      Name
                                    </th>
                                    <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                                      Description
                                    </th>
                                    <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                                      Value Type
                                    </th>
                                    <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                                      Value
                                    </th>
                                    <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                                      start Date time
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {productSpec.productSpecCharacteristic.map(
                                    (relation: any, index: number) => {
                                      const name = relation["name"];
                                      const description =
                                        relation["description"];
                                      const valueType = relation["valueType"];

                                      return (
                                        <tr
                                          key={index}
                                          className="hover:bg-grey-lighter "
                                        >
                                          <td className="py-4 px-4  border p-2  border-grey-light text-purple-900 font-semibold">
                                            {name}
                                          </td>
                                          <td className="py-4 px-4  border p-2  border-grey-light">
                                            {description}
                                          </td>
                                          <td className="py-4 px-4  border p-2 border-grey-light">
                                            {valueType}
                                          </td>
                                          <td className="py-4 px-6  border p-2 border-grey-light">
                                            {relation.productSpecCharacteristicValue.map(
                                              (charVar: any, index: number) => {
                                                return (
                                                  <ul>
                                                    <li>
                                                      - {charVar["value"]}
                                                    </li>
                                                  </ul>
                                                );
                                              },
                                            )}
                                          </td>
                                          <td className="py-4 px-4 border text-indigo-600 font-semibold p-2 border-grey-light">
                                            {new Date(
                                              productSpec?.productSpecCharacteristic[0]?.validFor?.startDatetime,
                                            ).toDateString()}
                                          </td>
                                        </tr>
                                      );
                                    },
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg shadow-xl p-8"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};
const Table1 = ({ product }: any) => {
  return (
    <>
      <table className="text-left w-full border-collapse">
        <thead>
          <tr>
            {/* <th className="py-4 px-6 bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
            Id
          </th> */}
            <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
              Name
            </th>
            <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
              version
            </th>
            <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
              internalVersion
            </th>
          </tr>
        </thead>

        <tbody>
          {product.serviceSpecification.map((relation: any) => {
            const id = relation["id"];
            const name = relation["name"];
            const version = relation["version"];
            const internalVersion = relation["internalVersion"];

            return (
              <tr className="hover:bg-grey-lighter " key={id}>
                <td className="py-4 px-6  border p-2  border-grey-light">
                  {name}
                </td>
                <td className="py-4 px-6  border p-2  border-grey-light">
                  {version}
                </td>
                <td className="py-4 px-6  border p-2 border-grey-light">
                  {internalVersion}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

const Table2 = ({ product }: any) => {
  const validFor = product.validFor;
  return (
    <>
      <table className="text-left w-full border-collapse">
        <thead>
          <tr>
            <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
              Name
            </th>
            <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
              Version
            </th>

            <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
              internal Version
            </th>
            <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
              type
            </th>
            <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
              Start Date Time
            </th>
            <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
              End Date Time
            </th>
          </tr>
        </thead>
        <tbody>
          {product.productSpecificationRelationship.map((relation: any) => {
            const name = relation["name"];
            const version = relation["version"];
            const internalVersion = relation["internalVersion"];
            const type = relation["type"];

            return (
              <tr className="hover:bg-grey-lighter">
                <td className="py-4 px-6  border p-2 border-grey-light">
                  {name}
                </td>
                <td className="py-4 px-6  border p-2  border-grey-light">
                  {version}
                </td>
                <td className="py-4 px-6 mx-auto border p-2  border-grey-light">
                  {internalVersion}
                </td>
                <td className="py-4 px-6 mx-auto border p-2  border-grey-light">
                  {type}
                </td>

                <td className="py-4 px-6 border p-2 border-grey-light">
                  <ul>
                    <li>
                      {new Date(
                        product?.productSpecificationRelationship[0]?.validFor?.startDateTime,
                      ).toDateString()}
                    </li>
                  </ul>
                </td>
                <td className="py-4 px-6 border p-2 border-grey-light">
                  <ul>
                    <li>
                      {
                        product?.productSpecificationRelationship[0]?.validFor
                          ?.endDateTime
                      }
                    </li>
                  </ul>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
const Table3 = ({ product }: any) => {
  const serviceOrderItems = product.serviceOrderItem;
  return (
    <>
      <table className="text-left w-full border-collapse">
        <thead>
          <tr>
            <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
              Name
            </th>
            <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
              Version
            </th>

            <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
              internal Version
            </th>
          </tr>
        </thead>
        <tbody>
          {product.resourceSpecification.map((relation: any) => {
            const name = relation["name"];
            const version = relation["version"];
            const internalVersion = relation["internalVersion"];

            return (
              <tr className="hover:bg-grey-lighter">
                <td className="py-4 px-6  border p-2 border-grey-light">
                  {name}
                </td>
                <td className="py-4 px-6  border p-2  border-grey-light">
                  {version}
                </td>
                <td className="py-4 px-6 mx-auto border p-2  border-grey-light">
                  {internalVersion}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default SingleProductSpecificationPage;
