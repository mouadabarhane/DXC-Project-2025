"use client";
import React, { useState, useEffect, Fragment } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import * as dotenv from "dotenv";
import Link from "next/link";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import { AiFillCheckCircle } from "react-icons/ai";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import avatar from "../../../../../public/assets/avatar.png";
import image from "../../../../../public/assets/wifi-survey2.jpg";
import product from "../../../../../public/assets/home_internet.png";
import result from "../../../../../public/assets/search.png";
import result2 from "../../../../../public/assets/search2.png";
// Importing types
import {
  TDataCustomerOrder,
  TDataProductOffering,
  TDataProductSpecification,
} from "./types";

// Importin utility funtions
import { handleLogout, handleSearchClick } from "./utils";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;
export async function getStaticProps() {
  return {
    props: {
      // productOfferings: filteredProducts,
    },
  };
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const [localToken, setLocalToken] = useState("");
  const [localUser, setLocalUser] = useState(JSON.stringify({}));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [customerResults, setCustomerResults] = useState<TDataCustomerOrder[]>(
    [],
  );
  //const [searchValue, setSearchValue] = useState("");
  const [productSpecifications, setProductSpecifications] = useState<
    TDataProductSpecification[]
  >([]);
  const [productOfferings, setProductOfferings] = useState<
    TDataProductOffering[]
  >([]);
  const [products, setProducts] = useState<TDataCustomerOrder[]>([]);
  useEffect(() => {
    let token;
    let user;
    // Get the value from local storage if it exists
    token = localStorage.getItem("token") || "";
    setLocalToken(token);

    user = localStorage.getItem("user") || "";
    setLocalUser(user);
  }, []);
  interface Incident {
    createdAt: string;
    _id: number;
    incidentNumber: string;
    state: string;
    read: Boolean;
    caller: string;
    // other properties...
  }
  const [productOrders, setProductOrders] = React.useState<
    Array<{
      created: string;
      caller: string;
      orderNumber: String;
      _id: number;
      id: string;
      status: string;
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
      read: Boolean;
    }>
  >([]);

  useEffect(() => {
    getProductSpecifications();
  }, []);

  async function getProductSpecifications() {
    try {
      const response = await axios.get(
        `${AXIOS_URL}/api/product-specification`,
      );
      const specificationData: TDataProductSpecification[] = response.data;
      setProductSpecifications(specificationData);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des products speicifications:",
        error,
      );
    }
  }
  const getProductOfferings = async () => {
    try {
      const response = await axios.get(`${AXIOS_URL}/api/product-offering`);
      const allProductOfferings: TDataProductOffering[] = response.data;

      // Calculate and format the time elapsed for each product offering
      const formattedProductOfferings = allProductOfferings.map(
        (productOffering) => {
          const createdAt = new Date(productOffering.created);
          const currentTime = new Date();

          const timeDiff = Math.abs(
            currentTime.getTime() - createdAt.getTime(),
          );
          let timeElapsed = "";

          if (timeDiff < 1000) {
            timeElapsed = `${Math.floor(timeDiff)} millisecond${
              timeDiff !== 1 ? "s" : ""
            }`;
          } else if (timeDiff < 60000) {
            timeElapsed = `${Math.floor(timeDiff / 1000)} second${
              Math.floor(timeDiff / 1000) !== 1 ? "s" : ""
            }`;
          } else if (timeDiff < 3600000) {
            timeElapsed = `${Math.floor(timeDiff / 60000)} minute${
              Math.floor(timeDiff / 60000) !== 1 ? "s" : ""
            }`;
          } else if (timeDiff < 86400000) {
            timeElapsed = `${Math.floor(timeDiff / 3600000)} hour${
              Math.floor(timeDiff / 3600000) !== 1 ? "s" : ""
            }`;
          } else {
            timeElapsed = `${Math.floor(timeDiff / 86400000)} day${
              Math.floor(timeDiff / 86400000) !== 1 ? "s" : ""
            }`;
          }

          return {
            ...productOffering,
            timeElapsed: timeElapsed,
          };
        },
      );

      setProductOfferings(formattedProductOfferings);
    } catch (error) {
      console.error("Erreur lors de la récupération des offerings:", error);
    }
  };
  useEffect(() => {
    getProductOrders();
  }, []);

  async function getProductOrders() {
    try {
      const response = await axios.get(
        `${AXIOS_URL}/api/customer-order/product`,
      );
      const productsData: TDataCustomerOrder[] = response.data;
      // const productsDataString = JSON.stringify(productsData);
      // console.log("productsData:", productsDataString);
      setProducts(productsData);
    } catch (error) {
      console.error("Erreur lors de la récupération des products:", error);
    }
  }

  useEffect(() => {
    getProductOfferings();
  }, []);
  /*search  by term testing*/
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePopupClose = () => {
    console.log("click");
    setPopupOpen(false);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };
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
  useEffect(() => {
    let token;
    let user;
    // Get the value from local storage if it exists
    token = localStorage.getItem("token") || "";
    setLocalToken(token);

    user = localStorage.getItem("user") || "";
    setLocalUser(user);
  }, []);
  const name = localUser
    ? JSON.parse(localUser).username
      ? JSON.parse(localUser).username.toUpperCase()
      : ""
    : "";
  const id = localUser ? JSON.parse(localUser)._id : "";
  useEffect(() => {
    fetchIncidents();
  }, []);
  // fetch incident
  const fetchIncidents = async () => {
    try {
      const response = await axios.get(`${AXIOS_URL}/api/incidents`);
      const fetchedIncidents = response.data.map(
        (incident: { createDate: string | number | Date }) => {
          return {
            ...incident,
            createdAt: new Date(incident.createDate).toISOString(), // Convert the creation timestamp to a valid ISO string
          };
        },
      );
      setIncidents(fetchedIncidents);
    } catch (error) {
      console.error("Error fetching incidents:", error);
    }
  };

  // Define your update incident function here
  const updateIncident = async (id: any, updates: any) => {
    try {
      const response = await axios.patch(
        `${AXIOS_URL}/api/incidents/${id}`,
        updates,
      );
      if (response) {
        // Handle the response and update the incidents state if necessary
      } else {
        console.error("Empty response received");
      }
    } catch (error) {
      console.error("Error updating incident:", error);
    }
  };
  // fetch productorder
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${AXIOS_URL}/api/customer-order/product`,
      );
      // console.log("productorders", response.data);

      // Calculate and display the time taken for each product order
      const productData = response.data.map(
        (productOrder: { created: string | number | Date }) => {
          const createdAt = new Date(productOrder.created);
          const currentTime = new Date();

          // Calculate time difference in milliseconds
          const timeDiff = Math.abs(
            currentTime.getTime() - createdAt.getTime(),
          );
          let timeElapsed = "";

          if (timeDiff < 1000) {
            timeElapsed = `${Math.floor(timeDiff)} millisecond${
              timeDiff !== 1 ? "s" : ""
            }`;
          } else if (timeDiff < 60000) {
            timeElapsed = `${Math.floor(timeDiff / 1000)} second${
              Math.floor(timeDiff / 1000) !== 1 ? "s" : ""
            }`;
          } else if (timeDiff < 3600000) {
            timeElapsed = `${Math.floor(timeDiff / 60000)} minute${
              Math.floor(timeDiff / 60000) !== 1 ? "s" : ""
            }`;
          } else if (timeDiff < 86400000) {
            timeElapsed = `${Math.floor(timeDiff / 3600000)} hour${
              Math.floor(timeDiff / 3600000) !== 1 ? "s" : ""
            }`;
          } else {
            timeElapsed = `${Math.floor(timeDiff / 86400000)} day${
              Math.floor(timeDiff / 86400000) !== 1 ? "s" : ""
            }`;
          }

          return {
            ...productOrder,
            timeElapsed: timeElapsed,
          };
        },
      );

      setProductOrders(productData);
    } catch (error) {
      console.error("Error fetching product orders:", error);
    }
  };

  // notification incident
  const notifIncident = incidents.filter((incident) => {
    return (
      !incident.read &&
      (incident.state === "New" || incident.state === "In Progress")
    );
  });

  async function markAsRead(incident: any) {
    // Update the read property of the clicked incident to true
    incident.read = true;

    // Update the incident in the backend
    await updateIncident(incident._id, { read: true });

    // Remove the incident from the notifIncident array
    const index = notifIncident.indexOf(incident);
    if (index > -1) {
      notifIncident.splice(index, 1);
    }
  }
  // console.log(notifIncident);
  // totl notification
  const totalIncident = notifIncident.length;

  // notification ProductOrders
  const notifProductOrder = productOrders.filter((productOrder) => {
    return !productOrder.read && productOrder.state === "in_progress";
  });

  // console.log("Length: " + notifProductOrder.length);
  // // totl notification productorder
  const totalProductOrder = notifProductOrder.length;
  // notificatin productoffering
  const notifProductOffering = productOfferings.filter((productOffering) => {
    return !productOffering.read && productOffering.status === "published";
  });
  // totl notification productoffering
  const totalProductOffering = notifProductOffering.length;
  // console.log(totalProductOffering)

  const handleIncidentClick = async (id: number) => {
    // Find the incident with the clicked id
    const clickedIncident = incidents.find((incident) => incident._id === id);

    if (clickedIncident) {
      // Update the incident's read status
      const updatedIncidents = incidents.map((incident) => {
        if (incident._id === id) {
          return { ...incident, read: true };
        }
        return incident;
      });

      setIncidents(updatedIncidents);
      markAsRead(clickedIncident);
    }
  };
  function getTimeElapsed(createdAt: string | number | Date) {
    console.log("createdAt:", createdAt); // Check the value and type of createdAt

    const currentTime = new Date();
    const createdTime = new Date(createdAt);

    // Check if the createdTime is a valid Date object
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(createdTime.getTime())) {
      return "Invalid timestamp";
    }

    const timeDiff =
      Math.abs(currentTime.getTime() - createdTime.getTime()) / 1000; // Difference in seconds

    const seconds = Math.floor(timeDiff); // Calculate the duration in seconds

    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60); // Calculate the duration in minutes
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600); // Calculate the duration in hours
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(seconds / 86400); // Calculate the duration in days
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
  }

  const updateProductOrder = async (id: any, updates: any) => {
    try {
      const response = await axios.patch(
        `${AXIOS_URL}/api/customer-order/product/${id}`,
        updates,
      );
      if (response) {
        // Handle the response and update the incidents state if necessary
      } else {
        console.error("Empty response received");
      }
    } catch (error) {
      console.error("Error updating incident:", error);
    }
  };

  const markProductOrderAsRead = async (id: number) => {
    try {
      // Update the product order in the backend
      await updateProductOrder(id, { read: true });

      // Update the product order locally
      const updatedProductOrders = productOrders.map((productOrder) => {
        if (productOrder._id === id) {
          return { ...productOrder, read: true };
        }
        return productOrder;
      });

      setProductOrders(updatedProductOrders);
    } catch (error) {
      console.error("Error updating product order:", error);
    }
  };

  const handleProductOrderClick = async (id: number) => {
    // Find the clicked product order
    const clickedProductOrder = productOrders.find(
      (productOrder) => productOrder._id === id,
    );

    if (clickedProductOrder) {
      // Update the product order's read status locally
      const updatedProductOrders = productOrders.map((productOrder) => {
        if (productOrder._id === id) {
          return { ...productOrder, read: true };
        }
        return productOrder;
      });

      setProductOrders(updatedProductOrders);

      // Update the stored product orders in local storage
      localStorage.setItem(
        "productOrders",
        JSON.stringify(updatedProductOrders),
      );

      await markProductOrderAsRead(id);
    }
  };
  const updateProductOffering = async (id: string, updates: any) => {
    try {
      const response = await axios.patch(
        `${AXIOS_URL}/api/product-offering/update/${id}`,
        updates,
      );

      if (response.data) {
        // Handle the successful response from the API
        console.log("Product offering updated successfully:", response.data);
      } else {
        console.error("Empty response received");
      }
    } catch (error) {
      console.error("Error updating product offering:", error);
    }
  };

  const markProductOfferingAsRead = async (id: string) => {
    // console.log(id);
    try {
      // Update the product offering in the database
      await updateProductOffering(id, { read: true });

      // Update the product offerings locally
      const updatedProductOfferings = productOfferings.map(
        (productOffering) => {
          if (productOffering._id === id) {
            return { ...productOffering, read: true };
          }
          return productOffering;
        },
      );

      setProductOfferings(updatedProductOfferings);
    } catch (error) {
      console.error("Error updating product offering:", error);
    }
  };

  const handleProductOfferingClick = async (id: string) => {
    // Find the clicked product offering
    const clickedProductOffering = productOfferings.find(
      (productOffering) => productOffering.id === id,
    );

    if (clickedProductOffering) {
      // Update the product offering's read status locally
      const updatedProductOfferings = productOfferings.map(
        (productOffering) => {
          if (productOffering.id === id) {
            return { ...productOffering, read: true };
          }
          return productOffering;
        },
      );

      setProductOfferings(updatedProductOfferings);

      // Update the stored product offerings in local storage
      localStorage.setItem(
        "productOfferings",
        JSON.stringify(updatedProductOfferings),
      );

      await markProductOfferingAsRead(id);
    }
  };

  return (
    <div className="flex justify-between items-center px-5 py-5 bg-white relative">
      {/* Champ de modal & form */}
      <div className="w-5/6 ">
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
            handleSearchClick(e, {
              setPopupOpen,
              products,
              searchTerm,
              setProducts,
              productOfferings,
              setProductOfferings,
              productSpecifications,
              setProductSpecifications,
            })
          }
        >
          <ReactModal
            isOpen={isPopupOpen}
            onRequestClose={handlePopupClose}
            className="bg-white h-full justify-center  border-0"
          >
            <div className="max-h-full overflow-y-auto">
              {/* Result Product Offerings by word */}
              <div className="w-full px-4 lg:p-5   ">
                <button
                  className="absolute top-5 right-5 text-gray-600 hover:text-gray-800"
                  onClick={handlePopupClose}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="red"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>

                <h2 className="text-blue-800 font-bold text-center">
                  Product Offerings
                </h2>

                {productOfferings.length > 0 ? (
                  <ul>
                    <div className="flex flex-wrap">
                      {productOfferings.map((offering) => (
                        <div
                          key={offering._id}
                          className="card focus:outline-none mx-2 w-72 xl:mb-0 mb-1 bg-white shadow rounded-lg p-4 cursor-pointer"
                        >
                          <div className="container ">
                            <div className="max-w-md w-full bg-white  rounded-xl p-6">
                              <div className="flex flex-col">
                                <div className="">
                                  <div className="relative h-62 w-full mb-3">
                                    <div className="absolute flex flex-col top-0 right-0 p-3">
                                      <button className="transition ease-in duration-300 bg-gray-800 hover:text-purple-500 shadow hover:shadow-md text-gray-500 rounded-full w-8 h-8 text-center p-1">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-6 w-6"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
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
                                      src={product}
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
                                        <span className="mr-2  text-gray-800 w-40 h-8  ">
                                          {offering.description}
                                        </span>
                                      </div>
                                      <div className="flex items-center w-full justify-between min-w-0 ">
                                        <h2 className="mt-8 text-lg mr-auto cursor-pointer text-gray-400  hover:text-purple-500 truncate">
                                          {offering.name}
                                        </h2>
                                      </div>
                                    </div>
                                    <div className="text-xl text-white font-semibold mt-1">
                                      $240.00
                                    </div>
                                    <div className="lg:flex py-4 text-sm text-gray-600">
                                      <div className="flex-1 inline-flex items-center mb-3">
                                        <div className="w-full flex-none text-sm flex items-center text-white">
                                          <span
                                            className={`relative inline-block px-3 py-1 font-semibold ${getStateTextColor(
                                              offering.status,
                                            )} leading-tight`}
                                          >
                                            <span
                                              aria-hidden
                                              className={`absolute inset-0 ${getStateBgColor(
                                                offering.status,
                                              )} rounded-full`}
                                            ></span>
                                            <span
                                              className={`relative inset-0 ${getStateTextColor(
                                                offering.status,
                                              )} rounded-full`}
                                            >
                                              {offering.status}
                                            </span>
                                          </span>
                                        </div>
                                      </div>
                                      <div className="flex space-x-2 text-sm font-medium justify-start">
                                        <button
                                          onClick={() => {
                                            window.location.href = `/product-offering/${offering._id}`;
                                          }}
                                          className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-gradient-to-r from-purple-800 via-purple-700 to-pink-400 w-35 h-8 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600"
                                        >
                                          <span className="text-center mx-2">
                                            View Details
                                          </span>
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
                  </ul>
                ) : (
                  <div className="flex justify-center items-center">
                    <Image
                      src={result}
                      alt="Just a flower"
                      className="w-1/4 h-1/4 object-fill rounded-2xl"
                    />
                    <br />
                    <div className="ml-4">
                      <p className="text-gray-900 font-bold text-5xl">
                        No Product Offering Found.
                      </p>
                      <br />
                      <span className="text-gray-500 font-semibold text-2xl">
                        Please Try another Keyword ...
                      </span>
                    </div>
                  </div>
                )}

                <h2 className="text-blue-800 font-bold text-center">
                  Product Specification
                </h2>

                {productSpecifications.length > 0 ? (
                  <ul>
                    <div className="flex flex-wrap">
                      {productSpecifications.map((specification) => (
                        <div
                          key={specification._id}
                          className="card focus:outline-none mx-2 w-72 xl:mb-0 mb-8  shadow rounded-lg p-4 cursor-pointer"
                        >
                          <div>
                            <Image
                              alt="person capturing an image"
                              src={image}
                              className="focus:outline-none w-full h-44"
                            />
                          </div>
                          <div className="bg-white">
                            <div className="flex items-center justify-between px-4 pt-4">
                              {/* <div> */}
                              {/* <svg
                                     xmlns="http://www.w3.org/2000/svg"
                                     className={`focus:outline-none ${
                                       savedProducts.find(
                                         (p) => p.productId === product.productId,
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
                                         (p) => p.productId === product.productId,
                                       )
                                         ? "#34D399"
                                         : "#2c3e50"
                                     }
                                     fill="none"
                                     strokeLinecap="round"
                                     strokeLinejoin="round"
                                     //onClick={() => handleSaveButtonClick(product.productId)}
                                   > */}
                              {/* <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                     <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2"></path>
                                   </svg> */}
                              {/* //</div> */}

                              <div className="">
                                <p className="focus:outline-none">
                                  <span
                                    className={`relative inline-block px-3 py-1 font-semibold ${getStateTextColor(
                                      specification.status,
                                    )} leading-tight`}
                                  >
                                    <span
                                      aria-hidden
                                      className={`absolute inset-0 ${getStateBgColor(
                                        specification.status,
                                      )}  rounded-full`}
                                    ></span>
                                    <span
                                      className={`relative inset-0 ${getStateTextColor(
                                        specification.status,
                                      )}  rounded-full`}
                                    >
                                      {specification.status}
                                    </span>
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div className="p-4">
                              <div className="flex items-center">
                                <h2 className="focus:outline-none text-lg font-semibold">
                                  {specification.name}
                                </h2>
                                <p className="focus:outline-none  tiem-end text-xs text-gray-600 pl-5">
                                  <Link
                                    href={`/product-specification/${specification._id}`}
                                    className=" button text-sm bg-blue-400 text-white font-semibold py-2 px-2 rounded-r flex items-end transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300"
                                  >
                                    Details
                                  </Link>
                                </p>
                              </div>
                              <p className="focus:outline-none text-xs text-gray-600 mt-2">
                                {specification.description}
                              </p>
                              <div className="flex mt-4 ">
                                <div>
                                  <p className="focus:outline-none text-xs text-white px-2 bg-indigo-500 py-1">
                                    {specification?.validFor?.startDateTime}
                                  </p>
                                </div>
                                <div className="pl-2">
                                  <p className="focus:outline-none text-xs text-white px-2 bg-indigo-700 py-1">
                                    {specification?.validFor?.endDateTime}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center justify-between py-4">
                                <h2 className="focus:outline-none text-indigo-700 text-xs font-semibold">
                                  {specification.lastUpdate}
                                </h2>
                                <h3 className="focus:outline-none text-indigo-700 text-xl font-semibold"></h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>{" "}
                  </ul>
                ) : (
                  <div className="flex justify-center items-center">
                    <Image
                      src={result2}
                      alt="Just a flower"
                      className="w-1/4 h-1/4 object-fill rounded-2xl"
                    />
                    <br />
                    <div className="ml-4">
                      <p className="text-gray-900 font-bold text-5xl">
                        No Product Specification Found.
                      </p>
                      <br />
                      <span className="text-gray-500 font-semibold text-2xl">
                        Please Try another Keyword ...
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ReactModal>
          <div
            className={`relative overflow-hidden  rounded-lg border ${
              isInputFocused ? "border-purple-500" : "border-purple-300"
            }`}
          >
            <div className="inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
            <input
              type="search"
              id="search"
              className={`shadow-md block w-full p-3 pl-10 text-sm text-gray-900 bg-white-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                isInputFocused ? "border-none" : "border"
              }`}
              placeholder=" Quick Search"
              required
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </form>
      </div>
      {newFunction()}
      <button
        id="dropdownNotificationButton"
        data-dropdown-toggle="dropdownNotification"
        className="inline-flex items-center w-11 h-11 p-2 bg-gradient-to-r from-purple-800 via-purple-700 to-pink-400  text-white-400 align-middle rounded-full hover:text-white hover:bg-purple-200 focus:outline-nonerounded-full text-sm font-medium text-center  focus:outline-none relative"
        type="button"
        onClick={handleDropdownToggle}
      >
        <svg
          className="w-6 h-6 mx-auto bg-green"
          aria-hidden="true"
          fill="white"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
            clipRule="evenodd"
          ></path>
        </svg>
        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2">
          {totalIncident > 0 &&
          localUser &&
          JSON.parse(localUser).profile === "Administrator" ? (
            <span className="ml-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              {totalIncident}
            </span>
          ) : totalProductOrder > 0 &&
            localUser &&
            JSON.parse(localUser).profile === "Commercial Agent" ? (
            <span className="ml-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              {totalProductOrder}
            </span>
          ) : totalProductOffering > 0 &&
            localUser &&
            JSON.parse(localUser).profile === "Commercial Agent" ? (
            <span className="ml-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              {totalProductOffering}
            </span>
          ) : totalProductOffering > 0 &&
            localUser &&
            JSON.parse(localUser).profile === "Product Offering Manager" ? (
            <span className="ml-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              {totalProductOffering}
            </span>
          ) : (
            <span className="ml-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              0
            </span>
          )}
        </div>
      </button>
      {/* Dropdown de notification */}

      {isDropdownOpen && (
        <div
          id="dropdownNotification"
          // className="z-20 w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow transition ease-out duration-100"
          className="fixed right-20 top-20 z-20 border border-gray-300 rounded-lg max-h-100 overflow-y-auto" // Add max height and overflow-y
          aria-labelledby="dropdownNotificationButton"
        >
          <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 ">
            Notifications
          </div>
          <div className="bg-white">
            {/* Display the incidents */}
            <div className="overflow-y-auto max-h-60">
              {localUser &&
              JSON.parse(localUser).profile === "Administrator" ? (
                notifIncident
                  .sort((incident1, incident2) => {
                    const date1 = new Date(incident1.createdAt).getTime();
                    const date2 = new Date(incident2.createdAt).getTime();
                    return date2 - date1;
                  })
                  .map((incident, index) => {
                    return (
                      <>
                        <div className="flex justify-between py-4 px-6 rounded-lg">
                          <div
                            key={index}
                            className="flex items-center space-x-4"
                          >
                            <div className="flex flex-col space-y-1">
                              <span className="font-bold">
                                {incident.caller}
                              </span>
                              <span className="text-sm">
                                A new incident &nbsp;
                                <a
                                  className="text-blue-600"
                                  href={`/notification/${incident._id}`}
                                >
                                  {incident.incidentNumber}
                                </a>
                                &nbsp; has been created
                              </span>
                            </div>
                          </div>
                          <div className="flex-none px-4 py-2 text-green-600 text-xs md:text-sm">
                            {getTimeElapsed(incident.createdAt)}
                          </div>
                          <button
                            onClick={() => handleIncidentClick(incident._id)}
                            className="text-green-500"
                          >
                            <AiFillCheckCircle />
                          </button>
                        </div>
                        {index !== notifIncident.length - 1 && (
                          <hr className="border-b-[1px] my-4 border-gray" />
                        )}
                      </>
                    );
                  })
              ) : localUser &&
                JSON.parse(localUser).profile === "Commercial Agent" ? (
                notifProductOrder
                  .sort((order1, order2) => {
                    const date1 = new Date(order1.created).getTime();
                    const date2 = new Date(order2.created).getTime();
                    return date2 - date1;
                  })
                  .map((productOrder, index) => {
                    return (
                      <>
                        <div className="flex justify-between py-4 px-6 rounded-lg">
                          <div
                            key={index}
                            className="flex items-center space-x-4"
                          >
                            <div className="flex flex-col space-y-1">
                              <span className="text-sm">
                                The product order&nbsp;
                                <a
                                  href={`/customer-order/product/${productOrder._id}`}
                                  className="text-blue-600"
                                >
                                  {productOrder.orderNumber}
                                </a>
                                &nbsp;is approved
                              </span>
                            </div>
                          </div>
                          <div className="flex-none px-4 py-2 text-green-600 text-xs md:text-sm">
                            {getTimeElapsed(productOrder.created)}
                          </div>
                          <button
                            onClick={() =>
                              handleProductOrderClick(productOrder._id)
                            }
                            className="text-green-500"
                          >
                            <AiFillCheckCircle />
                          </button>
                        </div>
                        {index !== notifProductOrder.length - 1 && (
                          <hr className="border-b-[1px] my-4 border-gray" />
                        )}
                      </>
                    );
                  })
              ) : localUser &&
                JSON.parse(localUser).profile === "Product Offering Manager" ? (
                notifProductOffering
                  .sort((order1, order2) => {
                    const date1 = new Date(order1.created).getTime();
                    const date2 = new Date(order2.created).getTime();
                    return date2 - date1;
                  })
                  .map((productOffering, index) => {
                    return (
                      <>
                        <div className="flex justify-between py-4 px-6 rounded-lg">
                          <div
                            key={index}
                            className="flex items-center space-x-4"
                          >
                            <div className="flex flex-col space-y-1">
                              <span className="text-sm">
                                The product offering&nbsp;
                                <a
                                  href={`/product-offering/${productOffering._id}`}
                                  className="text-blue-600"
                                >
                                  {productOffering.name}
                                </a>
                                &nbsp;has been Published
                              </span>
                            </div>
                          </div>
                          <div className="flex-none px-4 py-2 text-green-600 text-xs md:text-sm">
                            {getTimeElapsed(productOffering.created)}
                          </div>
                          <button
                            onClick={() =>
                              handleProductOfferingClick(productOffering._id)
                            }
                            className="text-green-500"
                          >
                            <AiFillCheckCircle />
                          </button>
                        </div>
                        {index !== notifProductOffering.length - 1 && (
                          <hr className="border-b-[1px] my-4 border-gray" />
                        )}
                      </>
                    );
                  })
              ) : (
                <div className="flex px-4 py-3 hover:bg-gray-100">
                  No Notifications
                </div>
              )}
            </div>
            {/* Display the productorders */}
            {/* Plus d'éléments de notification... */}
          </div>

          {/* "View all" link based on the user profile */}
          <a
            href={
              localUser && JSON.parse(localUser).profile === "Administrator"
                ? "/notification"
                : localUser &&
                  JSON.parse(localUser).profile === "Commercial Agent"
                ? "/customer-order/product"
                : localUser &&
                  JSON.parse(localUser).profile === "Product Offering Manager"
                ? "/product-offering"
                : ""
            }
            className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100"
          >
            <div className="inline-flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-gray-500"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                ></path>
              </svg>

              {localUser &&
              JSON.parse(localUser).profile === "Administrator" ? (
                <span>View all (Incidents)</span>
              ) : localUser &&
                JSON.parse(localUser).profile === "Commercial Agent" ? (
                <span>View all (Product Orders)</span>
              ) : localUser &&
                JSON.parse(localUser).profile === "Product Offering Manager" ? (
                <span>View all (ProductOffering)</span>
              ) : (
                <span>View all</span>
              )}
            </div>
          </a>
        </div>
      )}

      {/* Photo de profil */}
      <div className="">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex  w-10 h-10 rounded-full justify-center gap-x-1.5">
              <Image
                className="hidden h-10 w-10 rounded-full sm:block object-cover mr-2 border-4 border-purple-700"
                src={avatar}
                alt="Bonnie image"
              />
              <ChevronDownIcon
                className="-mr-1 h-12 w-5 text-purple-400"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  <div className="flex flex-col items-center mt-2">
                    <h5 className="text-sm font-semibold text-gray-900">
                      <span className=" mx-2 inline-block w-3 h-3 rounded-full bg-green-500 tracking-widest"></span>
                      {name}
                    </h5>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href={`/admin/user/${id}`}
                      className={classNames(
                        active
                          ? "bg-gradient-to-r from-purple-200 via-purple-purple300 to-pink-100 font-semibold text-blue-900"
                          : "text-gray-900 font-bold",
                        "block px-4 py-2 text-sm",
                      )}
                    >
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                            clipRule="evenodd"
                          />
                        </svg>

                        <span className="ml-2">See Profile</span>
                      </div>
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="submit"
                      className={classNames(
                        active
                          ? "bg-gradient-to-r from-purple-200 via-purple-purple-300 to-pink-100 text-gray-900"
                          : "text-gray-700",
                        "block w-full px-4 py-2 text-left text-sm",
                      )}
                    >
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="ml-2">Help & Support</span>
                      </div>
                    </button>
                  )}
                </Menu.Item>
                <form method="POST" action="#">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={handleLogout}
                        className={classNames(
                          active
                            ? "bg-gradient-to-r from-purple-200 via-purple-purple300 to-pink-100 text-gray-900"
                            : "text-gray-700",
                          "block w-full px-4 py-2 text-left text-sm",
                        )}
                      >
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="ml-2">Sign out</span>
                        </div>
                      </button>
                    )}
                  </Menu.Item>
                </form>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );

  function newFunction() {
    return (
      <div>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="w-10 h-10"
        >
          <path d="M17.004 10.407c.138.435-.216.842-.672.842h-3.465a.75.75 0 01-.65-.375l-1.732-3c-.229-.396-.053-.907.393-1.004a5.252 5.252 0 016.126 3.537zM8.12 8.464c.307-.338.838-.235 1.066.16l1.732 3a.75.75 0 010 .75l-1.732 3.001c-.229.396-.76.498-1.067.16A5.231 5.231 0 016.75 12c0-1.362.519-2.603 1.37-3.536zM10.878 17.13c-.447-.097-.623-.608-.394-1.003l1.733-3.003a.75.75 0 01.65-.375h3.465c.457 0 .81.408.672.843a5.252 5.252 0 01-6.126 3.538z" />
          <path
            fillRule="evenodd"
            d="M21 12.75a.75.75 0 000-1.5h-.783a8.22 8.22 0 00-.237-1.357l.734-.267a.75.75 0 10-.513-1.41l-.735.268a8.24 8.24 0 00-.689-1.191l.6-.504a.75.75 0 10-.964-1.149l-.6.504a8.3 8.3 0 00-1.054-.885l.391-.678a.75.75 0 10-1.299-.75l-.39.677a8.188 8.188 0 00-1.295-.471l.136-.77a.75.75 0 00-1.477-.26l-.136.77a8.364 8.364 0 00-1.377 0l-.136-.77a.75.75 0 10-1.477.26l.136.77c-.448.121-.88.28-1.294.47l-.39-.676a.75.75 0 00-1.3.75l.392.678a8.29 8.29 0 00-1.054.885l-.6-.504a.75.75 0 00-.965 1.149l.6.503a8.243 8.243 0 00-.689 1.192L3.8 8.217a.75.75 0 10-.513 1.41l.735.267a8.222 8.222 0 00-.238 1.355h-.783a.75.75 0 000 1.5h.783c.042.464.122.917.238 1.356l-.735.268a.75.75 0 10.513 1.41l.735-.268c.197.417.428.816.69 1.192l-.6.504a.75.75 0 10.963 1.149l.601-.505c.326.323.679.62 1.054.885l-.392.68a.75.75 0 101.3.75l.39-.679c.414.192.847.35 1.294.471l-.136.771a.75.75 0 101.477.26l.137-.772a8.376 8.376 0 001.376 0l.136.773a.75.75 0 101.477-.26l-.136-.772a8.19 8.19 0 001.294-.47l.391.677a.75.75 0 101.3-.75l-.393-.679a8.282 8.282 0 001.054-.885l.601.504a.75.75 0 10.964-1.15l-.6-.503a8.24 8.24 0 00.69-1.191l.735.268a.75.75 0 10.512-1.41l-.734-.268c.115-.438.195-.892.237-1.356h.784zm-2.657-3.06a6.744 6.744 0 00-1.19-2.053 6.784 6.784 0 00-1.82-1.51A6.704 6.704 0 0012 5.25a6.801 6.801 0 00-1.225.111 6.7 6.7 0 00-2.15.792 6.784 6.784 0 00-2.952 3.489.758.758 0 01-.036.099A6.74 6.74 0 005.251 12a6.739 6.739 0 003.355 5.835l.01.006.01.005a6.706 6.706 0 002.203.802c.007 0 .014.002.021.004a6.792 6.792 0 002.301 0l.022-.004a6.707 6.707 0 002.228-.816 6.781 6.781 0 001.762-1.483l.009-.01.009-.012a6.744 6.744 0 001.18-2.064c.253-.708.39-1.47.39-2.264a6.74 6.74 0 00-.408-2.308z"
            clipRule="evenodd"
          />
        </svg> */}
      </div>
    );
  }
};

export default Header;
