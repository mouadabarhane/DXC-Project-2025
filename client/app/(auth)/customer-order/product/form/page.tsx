import React from "react";

import Link from "next/link";

import "./Form.css";

const Form = () => {
  return (
    <div className="flex w-full">
      <div className="ml-2 flex mt-2 shadow-lg shadow-gray-500 md:shadow-1/2xl md:shadow-gray-500">
        <div className="Details">
          <nav className="navbar">
            <h3>Product Order</h3>
          </nav>
          <div className="Infos">
            <p></p>

            {/* Add any other properties of the order object here */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Number:
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                ></input>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ">
                  State:
                </label>

                <select
                  id="state"
                  name="state"
                  autoComplete="state-name"
                  className=" block w-full  bg-gray-200 text-gray-700 border border-Gray-500  py-3 px-4 mb-3 leading-tight focus:outline-none  rounded-md  "
                >
                  <option>Closed Complete</option>
                  <option>In Progress</option>
                  <option>On Hold</option>
                  <option>Canceled</option>
                  <option>Scheduled</option>
                </select>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ">
                  Priority:
                </label>

                <select
                  id="priority"
                  name="priority"
                  autoComplete="priority"
                  className=" block w-full  bg-gray-200 text-gray-700 border border-Gray-500  py-3 px-4 mb-3 leading-tight focus:outline-none  rounded-md  "
                >
                  <option>Critical</option>
                  <option>Hight</option>
                  <option>Moderate</option>
                  <option>Low</option>
                  <option>Planing</option>
                </select>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Account:
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                ></input>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Task Type:
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                ></input>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Order Line Item:
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                ></input>
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Assigned To:
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                ></input>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Created:
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                ></input>
              </div>
              <div className="w-full md:w-1/1 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Short description:
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                ></input>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link href="/customer-order/all/product">
                  <button className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                  </button>
                </Link>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
