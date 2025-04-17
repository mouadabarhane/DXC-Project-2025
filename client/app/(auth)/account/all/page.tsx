"use client";
import * as dotenv from "dotenv";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { FiEye, FiFilter, FiSearch, FiTrash2 } from "react-icons/fi";
import { FaSortAmountDownAlt } from "react-icons/fa";
import Sidebar from "../../dashboard/components/Sidebar";
import Header from "../../dashboard/components/header/Header";
import Footer from "../../dashboard/components/Footer";

export default function AllAccountage() {
  dotenv.config();
  const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;
  const [accounts, setAccounts] = useState<
    Array<{
      _id: string;
      country: string;
      notes: string | null;
      //stock_symbol: string | null;
      number: string;
      sys_updated_by: string;
      sys_created_on: string;
      //stock_price: number | null;
      state: string | null;
      sys_created_by: string;
      //zip: string;
      phone: string;
      //fax_phone: string | null;
      name: string;
      account_code: string;
      //primary: boolean;
      //city: string;
      //sys_class_name: string;
      //manufacturer: boolean;
      //street: string;
      //vendor: boolean;
      //theme: string | null;
      //vendor_type: string | null;
      //sn_ind_tsm_core_external_id: string | null;
      //website: string | null;
      //registration_code: string;
      // customer: boolean;
      //email: string;
      contacts:
        | {
            id: string;
            name: string;
            // Add other properties of contact object if needed
          }[]
        | null;
      locations:
        | {
            id: string;
            location: string;
            // Add other properties of location object if needed
          }[]
        | null;
    }>
  >([]);

  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [numLines, setNumLines] = useState(5); // State for selected number of lines
  // Handler for previous page button click

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(accounts.length / numLines);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  // Calculate start and end index of the current page
  const startIndex = (currentPage - 1) * numLines;
  const endIndex = startIndex + numLines;
  const [data, setData] = useState([]);
  // Calculate the next page start and end index
  const nextPageStartIndex = endIndex;
  const nextPageEndIndex = nextPageStartIndex + numLines;
  // Get the data for the next page
  const nextPageData = accounts;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${AXIOS_URL}/api/account`);
        setAccounts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const filteredAccount = accounts.filter((account) => {
    const accountValues = Object.values(account).join(" ").toLowerCase();
    const isMatchingSearchTerm = accountValues.includes(
      searchTerm.toLowerCase(),
    );
    return isMatchingSearchTerm;
  });
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleFilterChange = (event: { target: { value: string } }) => {
    const selectedNumLines = parseInt(event.target.value);
    setNumLines(selectedNumLines);
  };
  return (
    <div className="bg-gray-100 flex">
      <Sidebar />
      <div className="bg-white  min-h-screen-100 w-5/6">
        <Header />
        <div className="flex w-full">
          <div className="w-full">
            <div className="ml-2 flex mt-2 ">
              <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                  <div>
                    <h2 className="text-2xl font-semibold leading-tight">
                      All Accounts
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 gap-1 md:flex lg:gap-[49%]">
                    <div className="my-2 flex sm:flex-row ">
                      <div className="flex flex-row mb-1 sm:mb-0">
                        <div className="relative">
                          <select
                            className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            value={numLines}
                            onChange={handleFilterChange}
                          >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                          </select>
                        </div>
                      </div>
                      <div className="block relative">
                        <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                          <svg
                            viewBox="0 0 24 24"
                            className="h-4 w-4 fill-current text-gray-500"
                          >
                            <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                          </svg>
                        </span>
                        <input
                          placeholder="Search"
                          className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                          value={searchTerm}
                          onChange={handleSearchChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                      <table className="min-w-full leading-normal">
                        <thead>
                          <tr>
                            <th className="px-5 py-3 text-center bg-purple-800 font-bold uppercase text-sm text-white">
                              Number
                            </th>
                            <th className="px-5 py-3 border-b-2 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                              Name
                            </th>
                            <th className="px-5 py-3 border-b-2 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                              Customer
                            </th>
                            <th className="px-5 py-3 border-b-2 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                              contact
                            </th>
                            <th className="px-5 py-3 border-b-2 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                              location
                            </th>
                            <th className="px-5 py-3 border-b-2 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredAccount
                            .slice(
                              (currentPage - 1) * numLines,
                              currentPage * numLines,
                            )
                            .map((account) => (
                              <tr key={account._id}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <div className="flex items-center">
                                    <div className="ml-3">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        {account.number}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {account.name}
                                  </p>
                                </td>

                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                    <span
                                      aria-hidden
                                      className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                    ></span>
                                    <span className="relative">True</span>
                                  </span>
                                </td>

                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  {account.contacts &&
                                    account.contacts.length > 0 && (
                                      <ul>
                                        {account.contacts.map((contacts) => (
                                          <li key={contacts.id}>
                                            {contacts.name}
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                </td>

                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  {account.locations &&
                                    account.locations.length > 0 && (
                                      <ul>
                                        {account.locations.map((location) => (
                                          <li key={location.id}>
                                            {location.location}
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                </td>

                                <td className="py-3 px-6 border-b border-gray-200 text-center">
                                  <div className="flex item-center justify-center">
                                    <Link href={`/account/${account._id}`}>
                                      <div className="w-4 mr-2 transform hover:text-fuchsia-950 hover:scale-110">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                          />
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                          />
                                        </svg>
                                      </div>
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                      <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                        <span className="text-xs xs:text-sm text-gray-900">
                          Showing {startIndex + 1} to {endIndex} of{" "}
                          {accounts.length} Entries
                        </span>
                        <div className="inline-flex mt-2 xs:mt-0">
                          <button
                            className="text-sm bg-gradient-to-r from-purple-800 via-purple-700 to-purple-600 hover:bg-purple-400 text-white font-semibold py-2 px-4 rounded-l"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                          >
                            Prev
                          </button>
                          <button
                            className="text-sm bg-gradient-to-r from-purple-800 via-purple-700 to-purple-600 hover:bg-purple-400 text-white font-semibold py-2 px-4 rounded-r"
                            onClick={handleNextPage}
                            disabled={nextPageData.length === 0}
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
      {/* Autres composants ou contenu de la page */}
    </div>
  );
}
