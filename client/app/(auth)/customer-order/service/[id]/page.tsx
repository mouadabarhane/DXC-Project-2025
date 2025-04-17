"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as dotenv from "dotenv";

import UpdateServiceForm from "../UpdateServiceForm";
// import Chartt from "./Chartt";
// import CercleChart from "./CercleChart";

import Sidebar from "../../../dashboard/components/Sidebar";
import Header from "../../../dashboard/components/header/Header";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

const page = ({ params }: { params: { id: string } }) => {
  const [service, setService] = useState<any>();
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index: any) => {
    setActiveTab(index);
  };
  useEffect(() => {
    getServiceOrder();
  }, []);

  async function getServiceOrder() {
    try {
      const id = params.id;
      const response = await axios.get(
        `${AXIOS_URL}/api/customer-order/service/${id}`,
      );
      const serviceOrderData = response.data;
      setService(serviceOrderData);
      console.log("Service Data:", serviceOrderData);
    } catch (error) {
      console.error("Error while fetching service order:", error);
    }
  }
  const [editingServiceId, setEditingUserId] = useState(null);
  // const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleEditeService = () => {
    setShowForm(true);
    console.log("show form");
  };
  const handleCancel = () => {};

  // console.log("Services", services);

  return (
    <div>
      <div className="bg-gray-100 flex">
        <Sidebar />
        <div className="bg-white min-h-screen-100 w-5/6">
          <Header />
          {service && (
            <div>
              <div className="h-full bg-white p-8">
                <div className="bg-white rounded-lg shadow-xl pb-8">
                  <div className="flex items-center mt-2">
                    <div className=" mx-2 w-full flex items-center space-x-4 mt-2">
                      {showForm ? (
                        <UpdateServiceForm
                          service={service}
                          onClose={() => setShowForm(false)}
                        />
                      ) : (
                        <>
                          {service.ponr === "true" ? (
                            <button
                              className="mx-2 text-sm bg-gray-400 text-white font-semibold py-2 px-2 rounded-r flex items-end "
                              disabled
                            >
                              Update
                            </button>
                          ) : (
                            <button
                              className="flex items-center bg-purple-600 hover:bg-purple-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100 font-semibold rounded-r ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
                              onClick={() => handleEditeService()}
                            >
                              Update
                            </button>
                          )}

                          {service.ponr === "true" ? (
                            <button
                              className="mx-2 text-sm bg-gray-400 text-white font-semibold py-2 px-2 rounded-r flex items-end "
                              disabled
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
                              Cancel Order
                            </button>
                          ) : (
                            <button
                              className="flex items-center bg-red-600 hover:bg-purple-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100 font-semibold rounded-r ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
                              onClick={() => handleCancel()}
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
                              Cancel Order
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                  <div className="w-full flex flex-col 2xl:w-1/3">
                    <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                      <h4 className="text-xl text-gray-900 font-bold">
                        Service Order Informations
                      </h4>
                      <ul className="mt-2 text-gray-700">
                        <li className="flex border-y py-2">
                          <span className="font-bold w-24">External ID:</span>
                          <span className="text-gray-700">
                            {service.externalId}
                          </span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">Order Date:</span>
                          <span className="text-gray-700">
                            {" "}
                            {new Date(service.orderDate).toDateString()}
                          </span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">State:</span>
                          <span className="text-gray-700">{service.state}</span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">Start Date:</span>
                          <span className="text-gray-700">
                            {" "}
                            {new Date(
                              service.requestedStartDate,
                            ).toDateString()}
                          </span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">
                            Resquested Completion Date:
                          </span>
                          <span className="text-gray-700">
                            {" "}
                            {new Date(
                              service.requestedCompletionDate,
                            ).toDateString()}
                          </span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">
                            Completion Date:
                          </span>
                          <span className="text-gray-700">
                            {" "}
                            {new Date(service.completionDate).toDateString()}
                          </span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">
                            Expected Completion Date:
                          </span>
                          <span className="text-gray-700">
                            {" "}
                            {new Date(
                              service.expectedCompletionDate,
                            ).toDateString()}
                          </span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">PONR</span>
                          <span className="text-gray-700">{service.ponr}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                      <div className="relative ">
                        <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>
                        <div className="bg-white p-3 hover:shadow">
                          <div className="flex items-center font-semibold text-gray-900 text-xl leading-8">
                            <span className="text-purple-500"></span>
                            <span>Sales Statistics</span>
                          </div>

                          {/* <CercleChart /> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col w-full 2xl:w-2/3">
                    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                      <div className="relative ">
                        <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>
                        <div className="bg-white p-3 hover:shadow">
                          <span className="flex items-center font-semibold text-gray-900 text-xl leading-8">
                            Orders Per Week
                          </span>
                          {/* <Chartt /> */}
                          <div className="flex items-center font-semibold text-gray-900 text-xl leading-8">
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
                                      ? "bg-purple-600 text-white"
                                      : ""
                                  } px-4 py-2 rounded-l-md transition duration-100`}
                                >
                                  Related Party
                                </button>
                                <button
                                  onClick={() => handleTabClick(1)}
                                  className={`${
                                    activeTab === 1
                                      ? "bg-purple-600 text-white"
                                      : ""
                                  } px-4 py-2 transition duration-100`}
                                >
                                  Service Order Items
                                </button>
                                <button
                                  onClick={() => handleTabClick(2)}
                                  className={`${
                                    activeTab === 2
                                      ? "bg-purple-600 text-white "
                                      : ""
                                  } px-4 py-2 rounded-r-md transition duration-100`}
                                >
                                  Service Characteristics
                                </button>
                              </div>

                              {activeTab === 0 && <Table1 service={service} />}
                              {activeTab === 1 && <Table2 service={service} />}
                              {activeTab === 2 && <Table3 service={service} />}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-xl p-8"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const Table1 = ({ service }: any) => {
  return (
    <>
      <table className=" w-full border-collapse">
        <thead>
          <tr>
            {/* <th className="py-4 px-6 bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
          Id
        </th> */}
            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2 border-grey-light">
              Name
            </th>
            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2 border-grey-light">
              Reference Type
            </th>
            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
              Referred Type
            </th>
          </tr>
        </thead>

        <tbody>
          {service.relatedParty.map((relation: any) => {
            const id = relation["@id"];
            const name = relation["name"];
            const referredType = relation["@referredType"];
            const type = relation["@type"];

            return (
              <tr className="hover:bg-grey-lighter " key={id}>
                <td className="py-4 px-6  border p-2  border-grey-light">
                  {name}
                </td>
                <td className="py-4 px-6  border p-2  border-grey-light">
                  {referredType}
                </td>
                <td className="py-4 px-6  border p-2 border-grey-light">
                  {type}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

const Table2 = ({ service }: any) => {
  const orderRelationships = service.orderRelationship;
  const serviceOrderItems = service.serviceOrderItem;
  return (
    <>
      <table className="text-left w-full border-collapse">
        <thead>
          <tr>
            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
              ID
            </th>
            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
              Action
            </th>
            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
              order Relationship
            </th>

            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
              Service
            </th>
            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
              state
            </th>
          </tr>
        </thead>
        <tbody>
          {service.serviceOrderItem.map((relation: any) => {
            const action = relation["action"];
            const id = relation["id"];
            const orderRelationship = relation["orderRelationship"];
            const state = relation["state"];

            return (
              <tr className="hover:bg-grey-lighter">
                <td className="py-4 px-6  border p-2 border-grey-light">
                  {id}
                </td>
                <td className="py-4 px-6  border p-2  border-grey-light">
                  {action}
                </td>
                <td className="py-4 px-6 mx-auto border p-2  border-grey-light">
                  <ul>
                    {orderRelationship.map((relation: any) => (
                      <li key={relation.id}>{relation.relationshipType}</li>
                    ))}
                  </ul>
                </td>

                <td className="py-4 px-6  border p-2 border-grey-light">
                  {" "}
                  <ul>
                    {serviceOrderItems.map((item: any) => (
                      <li key={item.id}>{item.service["@type"]}</li>
                    ))}
                  </ul>
                </td>
                <td className="py-4 px-6 border p-2  border-grey-light">
                  {state}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
const Table3 = ({ service }: any) => {
  const serviceOrderItems = service.serviceOrderItem;
  return (
    <>
      <table className="text-left w-full border-collapse">
        <thead>
          <tr>
            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2 border-grey-light">
              Name
            </th>
            <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {serviceOrderItems.map((item: any) => (
            <>
              <tr key={item.id}></tr>
              {item.service.serviceCharacteristic.map((characteristic: any) => (
                <tr key={characteristic.name}>
                  <td className="py-4 px-6  border p-2  border-grey-light">
                    {characteristic.name}
                  </td>
                  <td className="py-4 px-6 border p-2  border-grey-light mx-auto">
                    {characteristic.value}
                  </td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default page;
