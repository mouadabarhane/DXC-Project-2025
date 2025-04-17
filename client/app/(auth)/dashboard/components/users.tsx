"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import * as dotenv from "dotenv";
// import Footer from "./Footer";
// import Sidebar from "./Sidebar";
// import Header from "./header/Header";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

interface User {
  totalOrders: string;
  _id: string;
  totalProductOfferings: string;
  userID: boolean;
  password: string;
  profile: string;
  username: string;
  role: string;
  createdAt: string;
  __v: string;
}

export default function ShowUsers() {
  const [users, setUsers] = React.useState<Array<User>>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${AXIOS_URL}/api/user`);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (users.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <div className="flex w-full">
      <div className="w-full">
        <div className="ml-2 flex mt-2 ">
          <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
              <div>
                <h2 className="text-2xl font-semibold leading-tight">
                  All Users
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-1 md:flex lg:gap-[31.75rem]">
                <div className="my-2 flex sm:flex-row ">
                  <div className="flex flex-row mb-1 sm:mb-0">
                    <div className="relative">
                      <select className="appearance-none h-full rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                    <div className="relative">
                      <select className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                        <option>All</option>
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
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
                    />
                  </div>
                </div>
                <div className="flex justify-end items-center">
                  <Link href="/customer-order/new">
                    <button className="bg-fuchsia-950 text-white uppercase text-sm leading-normal px-5 py-2">
                      New User +
                    </button>
                  </Link>
                </div>
              </div>

              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-pink-200 bg-fuchsia-950 text-white text-left text-xs font-semibold uppercase tracking-wider">
                          UserID
                        </th>
                        <th className="px-5 py-3 border-b-2 border-pink-200 bg-fuchsia-950 text-white text-left text-xs font-semibold uppercase tracking-wider">
                          Username
                        </th>
                        <th className="px-5 py-3 border-b-2 border-pink-200 bg-fuchsia-950 text-white text-left text-xs font-semibold uppercase tracking-wider">
                          Profile
                        </th>
                        <th className="px-5 py-3 border-b-2 border-pink-200 bg-fuchsia-950 text-white text-left text-xs font-semibold uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-5 py-3 border-b-2 border-pink-200 bg-fuchsia-950 text-white text-left text-xs font-semibold uppercase tracking-wider">
                          total Product Offerings
                        </th>
                        <th className="px-5 py-3 border-b-2 border-pink-200 bg-fuchsia-950 text-white text-left text-xs font-semibold uppercase tracking-wider">
                          total Orders
                        </th>
                        <th className="px-5 py-3 border-b-2 border-pink-200 bg-fuchsia-950 text-white text-left text-xs font-semibold uppercase tracking-wider">
                          created At
                        </th>

                        <th className="px-5 py-3 border-b-2 border-pink-200 bg-fuchsia-950 text-white text-left text-xs font-semibold uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((order) => (
                        <tr key={order._id}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {order.userID}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {order.username}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {order.profile}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                              ></span>
                              <span className="relative">{order.role}</span>
                            </span>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {order.totalProductOfferings}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {order.totalOrders}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {order.createdAt}
                            </p>
                          </td>
                          <td className="py-3 px-6 text-center">
                            <div className="flex item-center justify-center">
                              <Link
                                href={`/customer-order/product/${order._id}`}
                              >
                                <div className="w-4 mr-2 transform hover:text-pink-700 hover:scale-110">
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
                              <Link
                                href={`/customer-order/edit?orderId=${order._id}`}
                              >
                                <div className="w-4 mr-2 transform hover:text-pink-700 hover:scale-110">
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
                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                  </svg>
                                </div>
                              </Link>
                              <a>
                                <div className="w-4 mr-2 transform hover:text-pink-700 hover:scale-110">
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
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </div>
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                    <span className="text-xs xs:text-sm text-gray-900"></span>
                    <div className="inline-flex mt-2 xs:mt-0">
                      <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                        Prev
                      </button>
                      <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
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
}
