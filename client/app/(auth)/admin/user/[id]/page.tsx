"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as dotenv from "dotenv";
import Sidebar from "../../../dashboard/components/Sidebar";
import Header from "../../../dashboard/components/header/Header";
import Footer from "../../../dashboard/components/Footer";
import couver from "../../../../../public/assets/couver.jpeg";
import avatar from "../../../../../public/assets/avatar.png";
import result from "../../../../../public/assets/search.png";
import DoughnutChart from "./ChartCercle";
import LineChart from "./LineChart";
import PieChart from "./PiChart";
import BarChart from "./BarChar";
import UserChart from "./managerPie";
import AgentChart from "./agentPie";
import AdminStatistique from "./AdminStats";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;
export type TUser = {
  _id: string;
  id: string;
  profile: string;
  username: string;
  password: string;
  role: string;
  userID: string;
};

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
  createdBy: string;
  validFor: {
    startDateTime: string;
    endDateTime: string;
  };
}
interface ProductOrders {
  _id: string;
  id: string;
  externalId: string;
  state: string;
  orderNumber: string;
  requestedStartDate: string;
  requestedCompletionDate: string;
  orderDate: string;
  ponr: string;
  createdBy: string;
}
interface Incident {
  _id: number;
  incidentNumber: string;
  state: string;
  read: Boolean;
  userID: string;
}
const Page = ({
  params,
}: {
  params: { id: string; profile: string; userID: string };
}) => {
  const [user, setUser] = useState<any>(null);
  const [similarProfiles, setSimilarProfiles] = useState([]);
  const [products, setProducts] = useState<ProductOrders[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [percent, setPercent] = useState<number>();
  const [percentOrders, setPercentOrders] = useState<number>(0);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [productOfferings, setProductOfferings] = useState<ProductOfferings[]>(
    [],
  );
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [localUser, setLocalUser] = useState(JSON.stringify({}));
  const [pinnedProductOrders, setPinnedProductOrders] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationAlert, setShowConfirmationAlert] = useState(false);
  const [localToken, setLocalToken] = useState("");
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    try {
      const id = params.id;
      const response = await axios.get(`${AXIOS_URL}/api/user/${id}`);
      const userData = response.data;

      const notifProductOrder = products.filter((productOrder) => {
        return productOrder.state === "new" && productOrder.createdBy === id;
      });
      setUser(userData);
      getProductOrders(userData.userID);
      getProductOfferings(userData.userID);
      const profile = userData.profile;
      const similarProfilesResponse = await axios.get(
        `${AXIOS_URL}/api/user/similar-profile/${profile}`,
      );
      const similarProfilesData = similarProfilesResponse.data;

      const filteredSimilarProfilesData = similarProfilesData.filter(
        (similarProfile: any) => similarProfile._id !== id,
      );

      setSimilarProfiles(filteredSimilarProfilesData);
    } catch (error) {
      console.error("Error while fetching user data:", error);
    }
  };

  const updateUserPassword = async () => {
    try {
      console.log(user._id);
      const response = await axios.patch(`${AXIOS_URL}/api/user/${user?._id}`, {
        userId: user._id,
        oldPassword,
        newPassword,
      });
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          text: response.data.message,
        });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        Swal.fire({
          icon: "error",
          text: "An error occurred while changing the password ",
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        text: `An error occurred while changing the password :  ${error.response.data.message}`,
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        text: "The passwords are different",
      });
      return;
    }
    updateUserPassword();
  };

  // const handleConfirmation = () => {
  //   setShowConfirmationAlert(false);
  //   Swal.fire({
  //     title: "Updating password",
  //     text: "Do you really want to reset the password? ?",
  //     icon: "question",
  //     showCancelButton: true,
  //     confirmButtonText: "Confirm",
  //     cancelButtonText: "cancel",
  //     showLoaderOnConfirm: true,
  //     preConfirm: () => {
  //       return new Promise<void>((resolve) => {
  //         setTimeout(() => {
  //           resolve();
  //         }, 1000);
  //       });
  //     },
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire("", "success", "success");
  //     }
  //   });
  // };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!user) {
    return null;
  }
  async function getProductOrders(userID: string) {
    try {
      const response = await axios.get(
        `${AXIOS_URL}/api/customer-order/product`,
      );
      const productsData = response.data;

      const ordersByUser = productsData.filter(
        (order: any) => order.createdBy === userID,
      );
      const percentOrders = (ordersByUser.length / productsData.length) * 100;

      setPercentOrders(percentOrders);

      setProducts(ordersByUser);
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes :", error);
    }
  }

  async function getProductOfferings(userID: string) {
    try {
      const response = await axios.get(`${AXIOS_URL}/api/product-offering`);
      const allProductOfferings = response.data;
      const ProductOfferingByUser = allProductOfferings.filter(
        (product: any) => product.createdBy === userID,
      );
      const percent =
        (ProductOfferingByUser.length / allProductOfferings.length) * 100;
      setPercent(percent);
      setProductOfferings(ProductOfferingByUser);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des offres des produits:",
        error,
      );
    }
  }
  const totalProductOfferings = productOfferings.length;
  const ordersPerPage = 8;
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  function getStateTextColor(state: string) {
    switch (state) {
      case "new":
        return "text-blue-900";
      case "in_progress":
        return "text-yellow-900";
      case "in draft":
        return "text-orange-900";
      case "completed":
        return "text-green-900";
      case "cancellation_received":
        return "text-red-900";
      case "assessing_cancellation":
        return "text-white";
      default:
        return "";
    }
  }

  function getStateBgColor(state: string) {
    switch (state) {
      case "new":
        return "bg-blue-200 shadow-blue-300";
      case "in_progress":
        return "bg-yellow-200 shadow-yellow-300";
      case "in draft":
        return "bg-orange-200 shadow-orange-300";
      case "completed":
        return "bg-green-200 shadow-green-300";
      case "cancellation_received":
        return "bg-red-200 shadow-red-300";
      case "assessing_cancellation":
        return "bg-gray-400 shadow-gray-300";
      default:
        return "";
    }
  }
  function getStatusTextColor(status: string) {
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

  function getStatusBgColor(status: string) {
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
  const totalOrders = products.length;
  const NewOrders = products.filter((order) => order.state === "new");
  const totalNewOrders = NewOrders.length;
  const percentNewOrders = Math.floor((totalNewOrders / totalOrders) * 100);
  {
    /* */
  }
  const InProgressOrders = products.filter(
    (order) => order.state === "in_progress",
  );
  const totalInProgressOrders = InProgressOrders.length;
  const percentInProgressOrders = Math.floor(
    (totalInProgressOrders / totalOrders) * 100,
  );
  {
    /* */
  }
  const CompletedOrders = products.filter(
    (order) => order.state === "completed",
  );
  const totalCompletedOrders = CompletedOrders.length;
  const percentCompletedOrders = Math.floor(
    (totalCompletedOrders / totalOrders) * 100,
  );
  const CanceledOrders = products.filter((order) => order.state === "canceled");
  const totalCanceledOrders = CanceledOrders.length;
  const percentCanceledOrders = Math.floor(
    (totalCanceledOrders / totalOrders) * 100,
  );
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

  const togglePinProduct = (orderId: string) => {
    if (pinnedProductOrders.includes(orderId)) {
      const updatedPinnedProductOrders = pinnedProductOrders.filter(
        (pinnedOrderId) => pinnedOrderId !== orderId,
      );
      setPinnedProductOrders(updatedPinnedProductOrders);
    } else {
      const updatedPinnedProductOrders = [orderId, ...pinnedProductOrders];
      setPinnedProductOrders(updatedPinnedProductOrders);
    }
  };
  const sortedProductOfferings = [...productOfferings].sort((a, b) => {
    const aPinned = pinnedProductOrders.includes(a._id);
    const bPinned = pinnedProductOrders.includes(b._id);
    if (aPinned && !bPinned) {
      return -1;
    } else if (!aPinned && bPinned) {
      return 1;
    } else {
      return 0;
    }
  });
  const sortedProductOrders = [...products].sort((a, b) => {
    const aPinned = pinnedProductOrders.includes(a._id);
    const bPinned = pinnedProductOrders.includes(b._id);
    if (aPinned && !bPinned) {
      return -1;
    } else if (!aPinned && bPinned) {
      return 1;
    } else {
      return 0;
    }
  });
  return (
    <div className="user">
      <div className="bg-gray-100 flex">
        <Sidebar />
        <div className="bg-white min-h-screen-100 w-5/6">
          <Header />
          {user && (
            <div>
              <div className="h-full bg-white p-8">
                <div className="bg-white rounded-lg shadow-xl pb-8">
                  <div className="w-full h-[250px]">
                    <Image
                      src={couver}
                      className="w-full h-full rounded-tl-lg rounded-tr-lg"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col items-center -mt-20">
                    <Image
                      src={avatar}
                      className="w-40 border-4 border-white rounded-full"
                      alt=""
                    />
                    <div className="flex items-center space-x-2 mt-2">
                      <p className="text-2xl text-gray-900">{user.username}</p>
                      <span
                        className="bg-purple-500 rounded-full p-1"
                        title="Verified"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-gray-100 h-2.5 w-2.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="4"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <p className="text-gray-500">{user.profile}</p>
                  </div>
                  <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
                    <div className="flex items-center space-x-4 mt-2">
                      <button
                        onClick={openModal}
                        className="flex items-center bg-orange-500 hover:bg-orange-400 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="white"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z"
                            clipRule="evenodd"
                          />
                          <path d="M10.076 8.64l-2.201-2.2V4.874a.75.75 0 00-.364-.643l-3.75-2.25a.75.75 0 00-.916.113l-.75.75a.75.75 0 00-.113.916l2.25 3.75a.75.75 0 00.643.364h1.564l2.062 2.062 1.575-1.297z" />
                          <path
                            fillRule="evenodd"
                            d="M12.556 17.329l4.183 4.182a3.375 3.375 0 004.773-4.773l-3.306-3.305a6.803 6.803 0 01-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 00-.167.063l-3.086 3.748zm3.414-1.36a.75.75 0 011.06 0l1.875 1.876a.75.75 0 11-1.06 1.06L15.97 17.03a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>

                        <span>Update Password</span>
                      </button>
                      <Modal isOpen={isOpen} onRequestClose={closeModal}>
                        <div className="mt-5 bg-white p-4 rounded-md max-w-sm">
                          <div className="w-full">
                            <h2 className="text-lg font-bold mb-4">
                              Update Password
                            </h2>
                            <form onSubmit={handleFormSubmit}>
                              <label htmlFor="oldPassword">Old Password:</label>
                              <input
                                type={showPassword ? "text" : "password"}
                                id="oldPassword"
                                required
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="border border-gray-300 p-2 mb-4 rounded-md w-full"
                              />
                              <label htmlFor="newPassword">New Password:</label>
                              <div className="relative">
                                <input
                                  type={showPassword ? "text" : "password"}
                                  id="newPassword"
                                  required
                                  value={newPassword}
                                  onChange={(e) =>
                                    setNewPassword(e.target.value)
                                  }
                                  className="border border-gray-300 p-2 mb-2 rounded-md w-full"
                                />
                                <button
                                  type="button"
                                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400"
                                  onClick={togglePasswordVisibility}
                                >
                                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                              </div>
                              <label htmlFor="confirmPassword">
                                Confirm Password:
                              </label>
                              <div className="relative">
                                <input
                                  type={showPassword ? "text" : "password"}
                                  id="confirmPassword"
                                  required
                                  value={confirmPassword}
                                  onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                  }
                                  className="border border-gray-300 p-2 mb-4 rounded-md w-full"
                                />
                                <button
                                  type="button"
                                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400"
                                  onClick={togglePasswordVisibility}
                                >
                                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                              </div>
                              <div className="flex justify-between">
                                <button
                                  type="submit"
                                  className="bg-blue-700 text-white py-2 px-4 rounded-md"
                                >
                                  Update
                                </button>
                                <button
                                  type="button"
                                  className="bg-red-600 text-white py-2 px-4 rounded-md mr-2"
                                  onClick={closeModal}
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Modal>

                      {/* <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span>Message</span>
                      </button> */}
                    </div>
                  </div>
                </div>

                <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                  <div className="w-full flex flex-col 2xl:w-1/3">
                    <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                      <h4 className="text-xl text-gray-900 font-bold">
                        Personal Info
                      </h4>
                      <ul className="mt-2 text-gray-700">
                        <li className="flex border-y py-2">
                          <span className="font-bold w-24">Full name:</span>
                          <span className="text-gray-700">{user.username}</span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">Profile:</span>
                          <span className="text-gray-700">{user.profile}</span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">Role</span>
                          <span className="text-gray-700">{user.role}</span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">userID</span>
                          <span className="text-gray-700">{user.userID}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                      <h4 className="text-xl text-gray-900 font-bold">
                        Charts
                      </h4>
                      {user.profile === "Product Offering Manager" ? (
                        <div>
                          {" "}
                          <div className="flex justify-center">
                            <div className="w-2/4 flex justify-center">
                              <UserChart userID={user.userID} />
                            </div>
                          </div>
                          <p className=" mt-2 text-center text-gray-800 font-semibold">
                            The manager
                            <span className="text-blue-700 font-semibold">
                              {" "}
                              {user.userID}
                            </span>{" "}
                            has created{" "}
                            <span className="text-indigo-500 font-semibold">
                              {percent}%
                            </span>{" "}
                            of the total product offers.
                          </p>
                        </div>
                      ) : (
                        <div>
                          {" "}
                          <div className="flex justify-center ">
                            <div className="w-full flex justify-center  ">
                              <AgentChart userID={user.userID} />
                            </div>
                          </div>
                          <p className="mt-2 text-center text-gray-800 font-semibold">
                            The agent
                            <span className="text-blue-700 font-semibold">
                              {" "}
                              {user.userID}
                            </span>{" "}
                            has created{" "}
                            <span className="text-indigo-500 font-semibold">
                              {Math.round(percentOrders)}%
                            </span>{" "}
                            of the total product orders.
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                      <div className="relative ">
                        <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>
                        <div className="bg-white p-3 hover:shadow">
                          <div className="flex items-center font-semibold text-gray-900 text-xl leading-8">
                            <span className="text-purple-500">
                              <svg
                                className="h-7 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                              </svg>
                            </span>
                            <span>Similar Roles</span>
                          </div>
                          <div className="container mr-5 ml-2 mx-auto bg-white ">
                            <div className="w-11/12 mx-auto">
                              <div className="bg-white my-6">
                                <table className="text-left w-full border-collapse">
                                  <thead>
                                    <tr>
                                      <th className="py-4 px-6 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border-b border-grey-light">
                                        Name
                                      </th>
                                      <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border-b border-grey-light">
                                        Profile
                                      </th>
                                    </tr>
                                  </thead>
                                  {similarProfiles.length === 0 ? (
                                    <tbody>
                                      <tr>
                                        <td colSpan={6} className="text-center">
                                          <div className="flex justify-center items-center">
                                            <Image
                                              src={result}
                                              alt="Just a flower"
                                              className="w-1/3 h-1/3 object-fill rounded-2xl"
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
                                  ) : (
                                    <tbody>
                                      {similarProfiles.map((profile: any) => (
                                        <tr
                                          className="hover:bg-grey-lighter"
                                          key={profile.id}
                                        >
                                          <td className="py-4 px-6 border-b text-blue-700 border-grey-light">
                                            <a
                                              href={`/admin/user/${profile._id}`}
                                            >
                                              {profile.username}
                                            </a>
                                          </td>
                                          <td className="py-4 px-6 text-center border-b border-grey-light">
                                            {profile.profile}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  )}
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full 2xl:w-2/3">
                    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                      <div>
                        <div>
                          <div>
                            <h4 className="mt-3 text-xl text-gray-900 font-bold">
                              Statistics
                            </h4>
                            {user.profile === "Product Offering Manager" ? (
                              <div>
                                <div className="bg-white my-6 mx-auto">
                                  <div className="flex justify-center bg-white py-10 p-14">
                                    <div className="container mx-auto pr-4">
                                      <div className="w-52 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
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
                                                {percentRetiredProductOfferings}{" "}
                                                %<br />
                                              </h1>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="container mx-auto pr-4">
                                      <div className="w-52 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
                                        <div className="h-20  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-400  flex items-center justify-between">
                                          <p className="mr-0 text-white text-lg pl-5">
                                            ARCHIVED
                                          </p>
                                        </div>
                                        <div className="flex justify-between px-5 pt-6 mb-2 text-sm text-gray-600">
                                          <p>TOTAL</p>
                                          <h3 className="mt-2 text-3xl font-bold leading-8">
                                            {totalArchivedProductOfferings}
                                          </h3>

                                          <div className=" bg-gradient-to-r from-blue-500 via-blue-600 to-blue-400 w-12 h-12  rounded-full shadow-xl shadow-green-300 border-white   border-2  flex justify-center items-center ">
                                            <div>
                                              <h1 className="text-white mt-1 text-base">
                                                {
                                                  percentArchivedProductOfferings
                                                }{" "}
                                                %<br />
                                              </h1>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="container mx-auto pr-4">
                                      <div className="w-52 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
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
                                                {
                                                  percentPublishedProductOffering
                                                }{" "}
                                                %
                                                <br />
                                              </h1>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="container mx-auto">
                                      <div className="w-52 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
                                        <div className="h-20 bg-gradient-to-r from-purple-800 via-purple-900 to-purple-800 flex items-center justify-between">
                                          <p className="mr-0 text-white text-lg pl-5">
                                            IN DRAFT
                                          </p>
                                        </div>
                                        <div className="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
                                          <p>TOTAL</p>
                                          <h3 className="mt-2 text-3xl font-bold leading-8">
                                            {totalDraftProductOfferings}
                                          </h3>

                                          <div className="bg-gradient-to-r from-purple-800 via-purple-900 to-purple-800 w-12 h-12  rounded-full shadow-xl shadow-green-300 border-white   border-2  flex justify-center items-center ">
                                            <div>
                                              <h1 className="text-white mt-1 text-base">
                                                {percentDraftProductOfferings}%
                                                <br />
                                              </h1>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <h4 className="mt-3 text-xl text-gray-900 font-bold">
                                    Activities
                                  </h4>
                                  <table className="text-left w-full border-collapse">
                                    <thead>
                                      <tr>
                                        <th className="py-4 px-6 text-center bg-indigo-800 font-bold uppercase text-sm text-white ">
                                          <label className="inline-flex items-center">
                                            <input
                                              type="checkbox"
                                              className="form-checkbox text-gray-800"
                                            />
                                          </label>
                                        </th>
                                        <th className="py-4 px-6 bg-indigo-800 font-bold uppercase text-sm text-white border-b border-grey-light">
                                          NAME
                                        </th>
                                        <th className="py-4 px-6 text-center bg-indigo-800 font-bold uppercase text-sm text-white border-b border-grey-light">
                                          DESCRIPTION
                                        </th>
                                        <th className="py-4 px-6 text-center bg-indigo-800  font-bold uppercase text-sm text-white border-b border-grey-light">
                                          STATE
                                        </th>
                                        <th className="py-4 px-6 text-center bg-indigo-800 font-bold uppercase text-sm text-white border-b border-grey-light">
                                          lAST UPDATE
                                        </th>
                                        <th className="py-4 px-6 text-center bg-indigo-800 font-bold uppercase text-sm text-white border-b border-grey-light">
                                          VERSION
                                        </th>
                                        <th className="py-4 px-6 text-center bg-indigo-800  font-bold uppercase text-sm text-white border-b border-grey-light">
                                          START DATE
                                        </th>
                                        <th className="py-4 px-6 text-center bg-indigo-800    font-bold uppercase text-sm text-white border-b border-grey-light">
                                          END DATE
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {sortedProductOfferings
                                        .slice(
                                          indexOfFirstOrder,
                                          indexOfLastOrder,
                                        )
                                        .map((product, index) => (
                                          <tr
                                            className="hover:bg-grey-lighter"
                                            key={index}
                                          >
                                            <td className="px-5 py-5 border p-2  border-grey-light border-dashed border-t border-gray-200  text-md ">
                                              <button
                                                onClick={() =>
                                                  togglePinProduct(product._id)
                                                }
                                                className={`font-bold  ${
                                                  pinnedProductOrders.includes(
                                                    product._id,
                                                  )
                                                    ? "text-purple-600"
                                                    : "text-purple-800"
                                                }`}
                                              >
                                                <FontAwesomeIcon
                                                  icon={faThumbtack}
                                                />
                                              </button>
                                            </td>
                                            <td className="py-4 px-6 text-indigo-700 font-semibold border-b border-grey-light">
                                              <a
                                                href={`/product-offering/${product._id}`}
                                              >
                                                {product.name}
                                              </a>
                                            </td>

                                            <td className="py-4 px-6 text-center border-b border-grey-light">
                                              {product.description}
                                            </td>
                                            <td className="py-4 px-6 text-center border-b border-grey-light">
                                              <span
                                                className={`relative inline-block px-3 py-1 font-semibold ${getStateTextColor(
                                                  product.status,
                                                )} leading-tight`}
                                              >
                                                <span
                                                  aria-hidden
                                                  className={`absolute inset-0 ${getStatusBgColor(
                                                    product.status,
                                                  )} rounded-full`}
                                                ></span>
                                                <span
                                                  className={`relative inset-0 ${getStatusTextColor(
                                                    product.status,
                                                  )} rounded-full`}
                                                >
                                                  {product.status}
                                                </span>
                                              </span>
                                            </td>
                                            <td className="py-4 px-6 text-center text-blue-600 font-semibold border-b border-grey-light">
                                              {new Date(
                                                product.lastUpdate,
                                              ).toDateString()}
                                            </td>
                                            <td className="py-4 px-6 text-center text-green font-bold border-b border-grey-light">
                                              {product.internalVersion}
                                            </td>
                                            <td className="py-4 px-6 text-center  text-green-600 font-semibold border-b border-grey-light">
                                              {product?.validFor?.startDateTime}
                                            </td>
                                            <td className="py-4 px-6 text-center text-red-600 font-semibold border-b border-grey-light">
                                              {product?.validFor?.endDateTime}
                                            </td>
                                          </tr>
                                        ))}
                                    </tbody>
                                  </table>
                                  <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                                    <span className="text-xs xs:text-sm text-gray-900">
                                      Showing {indexOfFirstOrder + 1} to{" "}
                                      {Math.min(
                                        indexOfLastOrder,
                                        productOfferings.length,
                                      )}{" "}
                                      of {productOfferings.length} Entries
                                    </span>
                                    <div className="inline-flex mt-2 xs:mt-0">
                                      <button
                                        className="text-sm bg-indigo-700 hover:bg-purple-400 text-white fo font-semibold py-2 px-4 rounded-l"
                                        onClick={handlePreviousPage}
                                        disabled={currentPage === 1}
                                      >
                                        Previous
                                      </button>

                                      <button
                                        className="text-sm bg-indigo-700 hover:bg-purple-400 text-white font-semibold py-2 px-4 rounded-r"
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
                                {/* <div className="flex justify-center">
                                  <div className="w-2/4 flex justify-center">
                                    <UserChart userID={user.userID} />
                                  </div>
                                </div>
                                <p className=" mt-2 text-center text-gray-800 font-semibold">
                                  The manager
                                  <span className="text-blue-700 font-semibold">
                                    {" "}
                                    {user.userID}
                                  </span>{" "}
                                  has created{" "}
                                  <span className="text-indigo-500 font-semibold">
                                    {percent}%
                                  </span>{" "}
                                  of the total product offers.
                                </p> */}
                              </div>
                            ) : user.profile === "Commercial Agent" ? (
                              <div className="bg-white my-6 mx-auto">
                                <div className="flex justify-center bg-white py-10 p-14">
                                  <div className="container mx-auto pr-4">
                                    <div className="w-52 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
                                      <div className="h-20 bg-gradient-to-r from-green-500 via-green-600 to-green-400  flex items-center justify-between">
                                        <p className="mr-0 text-white text-lg pl-5">
                                          NEW
                                        </p>
                                      </div>
                                      <div className="flex justify-between px-5 pt-6 mb-2 text-sm text-gray-600">
                                        <p>TOTAL</p>
                                        <h3 className="mt-2 text-3xl font-bold leading-8">
                                          {totalNewOrders}
                                        </h3>

                                        <div className="bg-gradient-to-r from-green-500 via-green-600 to-green-400 w-12 h-12  rounded-full shadow-xl shadow-green-300 border-white   border-2  flex justify-center items-center ">
                                          <div>
                                            <h1 className="text-white mt-1 text-base">
                                              {percentNewOrders} %<br />
                                            </h1>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="container mx-auto pr-4">
                                    <div className="w-52 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
                                      <div className="h-20  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-400  flex items-center justify-between">
                                        <p className="mr-0 text-white text-lg pl-5">
                                          IN PROGRESS
                                        </p>
                                      </div>
                                      <div className="flex justify-between px-5 pt-6 mb-2 text-sm text-gray-600">
                                        <p>TOTAL</p>
                                        <h3 className="mt-2 text-3xl font-bold leading-8">
                                          {totalInProgressOrders}
                                        </h3>

                                        <div className=" bg-gradient-to-r from-blue-500 via-blue-600 to-blue-400 w-12 h-12  rounded-full shadow-xl shadow-green-300 border-white   border-2  flex justify-center items-center ">
                                          <div>
                                            <h1 className="text-white mt-1 text-base">
                                              {percentInProgressOrders}%<br />
                                            </h1>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="container mx-auto pr-4">
                                    <div className="w-52 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
                                      <div className="h-20 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400 flex items-center justify-between">
                                        <p className="mr-0 text-white text-lg pl-5">
                                          COMPLETED
                                        </p>
                                      </div>
                                      <div className="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
                                        <p>TOTAL</p>
                                        <h3 className="mt-2 text-3xl font-bold leading-8">
                                          {totalCompletedOrders}
                                        </h3>

                                        <div className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400 w-12 h-12  rounded-full shadow-xl shadow-green-300 border-white   border-2  flex justify-center items-center ">
                                          <div>
                                            <h1 className="text-white mt-1 text-base">
                                              {percentCompletedOrders} %<br />
                                            </h1>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="container mx-auto">
                                    <div className="w-52 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
                                      <div className="h-20 bg-gradient-to-r from-red-600 via-red-700 to-red-600 flex items-center justify-between">
                                        <p className="mr-0 text-white text-lg pl-5">
                                          CANCELED
                                        </p>
                                      </div>
                                      <div className="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
                                        <p>TOTAL</p>
                                        <h3 className="mt-2 text-3xl font-bold leading-8">
                                          {totalCanceledOrders}
                                        </h3>

                                        <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-600  w-12 h-12  rounded-full shadow-xl shadow-green-300 border-white   border-2  flex justify-center items-center ">
                                          <div>
                                            <h1 className="text-white mt-1 text-base">
                                              {percentCanceledOrders} %<br />
                                            </h1>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <table className="text-left w-full border-collapse">
                                  <thead>
                                    <tr>
                                      <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white ">
                                        <label className="inline-flex items-center">
                                          <input
                                            type="checkbox"
                                            className="form-checkbox text-gray-800"
                                          />
                                        </label>
                                      </th>
                                      <th className="py-4 px-6 bg-purple-800 font-bold uppercase text-sm text-white border-b border-grey-light">
                                        NUMBER
                                      </th>
                                      <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white border-b border-grey-light">
                                        ORDER DATE
                                      </th>
                                      <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white border-b border-grey-light">
                                        STATE
                                      </th>
                                      <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white border-b border-grey-light">
                                        Start Date
                                      </th>
                                      <th className="py-4 px-6 text-center bg-purple-800 font-bold uppercase text-sm text-white border-b border-grey-light">
                                        Completion Date
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {sortedProductOrders
                                      .slice(
                                        indexOfFirstOrder,
                                        indexOfLastOrder,
                                      )
                                      .map((product, index) => (
                                        <tr
                                          className="hover:bg-grey-lighter"
                                          key={index}
                                        >
                                          <td className="px-5 py-5 border p-2  border-grey-light border-dashed border-t border-gray-200  text-md ">
                                            <button
                                              onClick={() =>
                                                togglePinProduct(product._id)
                                              }
                                              className={`font-bold  ${
                                                pinnedProductOrders.includes(
                                                  product._id,
                                                )
                                                  ? "text-purple-600"
                                                  : "text-purple-800"
                                              }`}
                                            >
                                              <FontAwesomeIcon
                                                icon={faThumbtack}
                                              />
                                            </button>
                                          </td>
                                          <td className="py-4 px-6 text-center text-blue-400 border-b border-grey-light">
                                            <a
                                              href={`/customer-order/product/${product._id}`}
                                            >
                                              {product.orderNumber}
                                            </a>
                                          </td>
                                          <td className="py-4 px-6 text-indigo-800 font-semibold border-b border-grey-light">
                                            {new Date(
                                              product.orderDate,
                                            ).toDateString()}
                                          </td>
                                          <td className="py-4 px-6 text-center border-b border-grey-light">
                                            <span
                                              className={`relative inline-block px-3 py-1 font-semibold ${getStateTextColor(
                                                product.state,
                                              )} leading-tight`}
                                            >
                                              <span
                                                aria-hidden
                                                className={`absolute inset-0 ${getStateBgColor(
                                                  product.state,
                                                )} rounded-full`}
                                              ></span>
                                              <span
                                                className={`relative inset-0 ${getStateTextColor(
                                                  product.state,
                                                )} rounded-full`}
                                              >
                                                {product.state === "in_progress"
                                                  ? "In Progress"
                                                  : product.state ===
                                                    "cancellation_received"
                                                  ? "Cancellation in progress"
                                                  : product.state ===
                                                    "assessing_cancellation"
                                                  ? "Assessing Cancellation"
                                                  : product.state === "canceled"
                                                  ? "Canceled"
                                                  : product.state === "rejected"
                                                  ? "Rejected"
                                                  : product.state === "draft"
                                                  ? "Draft"
                                                  : product.state === "new"
                                                  ? "New"
                                                  : product.state}
                                              </span>
                                            </span>
                                          </td>
                                          <td className="py-4 px-6 text-center text-green-700 font-semibold border-b border-grey-light">
                                            {new Date(
                                              product.requestedStartDate,
                                            ).toDateString()}
                                          </td>
                                          <td className="py-4 px-6 text-center  text-red-600 font-semibold border-b border-grey-light">
                                            {new Date(
                                              product.requestedCompletionDate,
                                            ).toDateString()}
                                          </td>
                                        </tr>
                                      ))}
                                  </tbody>
                                </table>
                                <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                                  <span className="text-xs xs:text-sm text-gray-900">
                                    Showing {indexOfFirstOrder + 1} to{" "}
                                    {Math.min(
                                      indexOfLastOrder,
                                      products.length,
                                    )}{" "}
                                    of {products.length} Entries
                                  </span>
                                  <div className="inline-flex mt-2 xs:mt-0">
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
                                      disabled={
                                        indexOfLastOrder >= products.length
                                      }
                                    >
                                      Next
                                    </button>
                                  </div>
                                </div>

                                {/* <div className="flex justify-center ">
                                  <div className="w-full flex justify-center  ">
                                    <AgentChart userID={user.userID} />
                                  </div>
                                </div>
                                <p className="mt-2 text-center text-gray-800 font-semibold">
                                  The agent
                                  <span className="text-blue-700 font-semibold">
                                    {" "}
                                    {user.userID}
                                  </span>{" "}
                                  has created{" "}
                                  <span className="text-indigo-500 font-semibold">
                                    {Math.round(percentOrders)}%
                                  </span>{" "}
                                  of the total product orders.
                                </p> */}
                              </div>
                            ) : user.profile === "Administrator" ? (
                              <div className="flex flex-col p-2">
                                <AdminStatistique />
                                <div className="py-12 chart-container bg-white">
                                  <h4 className="text-xl text-gray-900 font-bold">
                                    Activities
                                  </h4>
                                  <div className=" flex w-full">
                                    <div className="w-1/2  rounded-lg shadow-xl p-8">
                                      <LineChart />
                                      <p className="mt-2 text-gray-600 font-semibold text-center">
                                        Completed Orders by Day
                                      </p>
                                    </div>
                                    <div className=" mx-2 w-1/2  rounded-lg shadow-xl p-8">
                                      <BarChart />
                                    </div>
                                  </div>
                                </div>

                                <div className="flex flex-wrap mt-4">
                                  <div className="w-1/2">
                                    <div className="py-12 chart-container bg-white rounded-lg shadow-xl p-8">
                                      <DoughnutChart />
                                    </div>
                                  </div>
                                  <div className="w-1/2">
                                    <div className="mx-3 h-full rounded-lg shadow-xl p-8">
                                      <PieChart />
                                      <p className="mt-2 text-gray-600 font-semibold text-center">
                                        Users{" "}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : null}
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
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Page;
