"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import Sidebar from "../../dashboard/components/Sidebar";
import Header from "../../dashboard/components/header/Header";
import Footer from "../../dashboard/components/Footer";

// Importing utility functions
import getAccount from "../utils/getAccount";

const SingleAcountPage = ({ params }: { params: { id: string } }) => {
  const [account, setAccount] = useState<any>();
  const [openTab, setOpenTab] = useState(1);

  useEffect(() => {
    getAccount(params.id, setAccount);
  }, [account]);

  //console.log(account);

  return (
    <>
      <div className="bg-gray-100 flex">
        <Sidebar />
        <div className="bg-white  min-h-screen-100 w-5/6 ">
          <Header />
          <div className="shadow-lg shadow-gray-500 md:shadow-1/2xl md:shadow-gray-200 ">
            <div className="bg-gray-100 py-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3 mr-12">
                <h2 className="text-2xl font-semibold leading-tight ml-5 pl-5 mt-5 ">
                  Show Account
                </h2>
              </div>
              <div className="sm:col-span-3 mr-12 flex justify-end items-center">
                <Link href="/account/all">
                  <button
                    type="button"
                    className="rounded-md bg-fuchsia-950 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-fuchsia-550 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-950"
                  >
                    Cancel
                  </button>
                </Link>
              </div>
            </div>
            <form>
              <div
                className="space-y-5 w-full"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Number
                      </label>
                      <div className="mt-2 ">
                        {account && (
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            className="block w-80 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-pink-700 placeholder:text-fuchsia-950 focus:ring-2 focus:ring-inset focus:ring-fuchsia-950 sm:text-sm sm:leading-6"
                            disabled
                            value={account.number}
                          />
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3 ml-12">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Name
                      </label>
                      <div className="mt-2 ">
                        {account && (
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            value={account.name}
                            className="block w-80 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-pink-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-950 sm:text-sm sm:leading-6"
                            disabled
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Locations
                      </label>
                      <div className="mt-2 ">
                        {account && account.locations.length >= 0 && (
                          <textarea
                            rows={3}
                            name="locations"
                            id="locations"
                            autoComplete="locations"
                            value={account.locations.map(
                              (locations: any) => `${locations.location} \n`,
                            )}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-pink-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-950 sm:text-sm sm:leading-6"
                            disabled
                          />
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3 ml-12">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Contacts
                      </label>
                      <div className="mt-2 ">
                        {account && account.contacts.length >= 0 && (
                          <textarea
                            rows={3}
                            name="contacts"
                            id="contacts"
                            autoComplete="contacts"
                            value={account.contacts.map(
                              (contacts: any) => `${contacts.name} \n`,
                            )}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-pink-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-950 sm:text-sm sm:leading-6"
                            disabled
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3 mr-12">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Contact phone
                      </label>
                      <div className="mt-2 ">
                        {account && (
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="block w-80 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-pink-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-950 sm:text-sm sm:leading-6"
                            disabled
                            value={account.phone}
                          />
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3 ml-12">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street
                      </label>
                      <div className="mt-2 ">
                        {account && (
                          <textarea
                            id="about"
                            name="about"
                            rows={1}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-pink-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-950 sm:text-sm sm:leading-6"
                            defaultValue={account.street}
                            disabled
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className=" mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3 mr-12">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Fax phone
                      </label>
                      <div className="mt-2">
                        {account && (
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="block w-80 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-pink-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-950 sm:text-sm sm:leading-6"
                            disabled
                            value={account.fax_phone}
                          />
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3 ml-12">
                      <label htmlFor="country" className="">
                        City
                      </label>
                      <div className="kw">
                        {account && (
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="block w-80 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-pink-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-950 sm:text-sm sm:leading-6"
                            disabled
                            value={account.city}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="relative flex gap-x-3 mt-5 sm:col-span-3 ">
                      <div className="flex h-6 items-center mt-2">
                        {account && (
                          <input
                            id="comments"
                            name="comments"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-fuchsia-950 focus:ring-fuchsia-950"
                            disabled
                            checked={account.manufacturer === true}
                          />
                        )}
                      </div>

                      <div className="text-sm leading-6 mt-2">
                        <label
                          htmlFor="comments"
                          className="font-medium text-gray-900"
                        >
                          Manufacturer
                        </label>
                      </div>
                    </div>
                    <div className="sm:col-span-3 ml-12">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2 ">
                        {account && (
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            value={account.state}
                            className="block w-80 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-pink-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-950 sm:text-sm sm:leading-6"
                            disabled
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="relative flex gap-x-3 mt-5 sm:col-span-3 ">
                      <div className="flex h-6 items-center ">
                        {account && (
                          <input
                            id="comments"
                            name="comments"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-fuchsia-950 focus:ring-fuchsia-950"
                            disabled
                            checked={account.vendor === true}
                          />
                        )}
                      </div>

                      <div className="text-sm leading-6 ">
                        <label
                          htmlFor="comments"
                          className="font-medium text-gray-900"
                        >
                          Vendor
                        </label>
                      </div>
                    </div>
                    <div className="sm:col-span-3 ml-12">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Zip / Postal code
                      </label>
                      <div className="mt-2 ">
                        {account && (
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            value={account.zip}
                            className="block w-80 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-pink-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-950 sm:text-sm sm:leading-6"
                            disabled
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Stock symbol
                      </label>
                      <div className="mt-2 ">
                        {account && (
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            className="block w-80 pl-2 rounded-md border-0 py-1.5  px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-pink-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-950 sm:text-sm sm:leading-6"
                            disabled
                            value={account.stock_symbol}
                          />
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-3 ml-12">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Stock price
                      </label>
                      <div className="mt-2 ">
                        {account && (
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            className="block w-80 pl-2 rounded-md border-0 py-1.5  px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-pink-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-950 sm:text-sm sm:leading-6"
                            disabled
                            value={account.stock_price}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 ">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Notes
                      </label>
                      <div className="mt-2 ">
                        {account && (
                          <textarea
                            id="about"
                            name="about"
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-pink-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-950 sm:text-sm sm:leading-6"
                            defaultValue={account.street}
                            disabled
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <Footer />
        </div>
        {/* Autres composants ou contenu de la page */}
      </div>
    </>
  );
};

export default SingleAcountPage;
