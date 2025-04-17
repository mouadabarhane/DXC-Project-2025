"use client";

import React, { useState, useEffect, SyntheticEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import * as dotenv from "dotenv";
import UpdateUserForm from "./updateUserForm";
import result from "../../../public/assets/search.png";

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

const Table = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [profileFilter, setProfileFilter] = useState("All");
  const [selectedUsers, setSelectedUsers] = useState<any>([]);
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    getUsers();
  }, [users]);

  async function getUsers() {
    try {
      const response = await axios.get(`${AXIOS_URL}/api/user`);
      const usersData = await response.data;

      setUsers(usersData);
      // console.log(users);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  }

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedUsers(selectAll ? [] : users.map((user: TUser) => user._id));
  };

  useEffect(() => {
    const filteredUsers = users.filter((user: TUser) => {
      const userValues = Object.values(user).join(" ").toLowerCase();
      const isMatchingSearchTerm = userValues.includes(
        searchTerm.toLowerCase(),
      );
      const isMatchingStatus =
        profileFilter === "All" || user.profile === profileFilter;

      return isMatchingSearchTerm && isMatchingStatus;
    });

    setData(filteredUsers);
  }, [searchTerm, profileFilter, users]);

  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [data]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleProfileFilter = (value: string) => {
    setProfileFilter(value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 8;

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const handleDeleteClick = (userId: string) => {
    const updatedData = users.filter((user: TUser) => user._id !== userId);
    setUsers(updatedData);
    console.log("Utilisateur supprimé avec succès.");
    // console.log("data:", updatedData);
  };
  const handleDeleteUser = async (userId: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "It will permanently delete the user!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await handleConfirmDelete(userId);
        Swal.fire("Deleted!", "The user has been deleted.", "success");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmDelete = async (userId: string) => {
    try {
      const response = await axios.delete(`${AXIOS_URL}/api/user/${userId}`);
      console.log(response.data);
      // setShowAlert(false);
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  const handleDeleteSelectedUsers = () => {
    const updatedData = users.filter(
      (user: TUser) => !selectedUsers.includes(user._id),
    );
    setUsers(updatedData);
    setSelectedUsers([]);
  };

  const handleCheckboxChange = (checked: boolean, userId: string) => {
    // const target = event.target;
    if (checked) {
      setSelectedUsers((prevSelectedUsers: TUser[]) => [
        ...prevSelectedUsers,
        userId,
      ]);
    } else {
      setSelectedUsers((prevSelectedUsers: TUser[]) =>
        prevSelectedUsers.filter((user) => user.id !== userId),
      );
    }
    setSelectAll(false);
  };
  useEffect(() => {}, [editingUserId]);

  // const handleInputChange = (event, field, userId) => {
  // const { value } = event.target;
  // setData((prevData) =>
  //  prevData.map((user) =>
  //    user.id === userId ? { ...user, [field]: value } : user,
  //  ),
  // );
  // };

  const handleEditUser = (selectedUser: TUser) => {
    setEditingUserId(selectedUser._id);
    setIsUpdateFormVisible(true);
  };

  const filteredUsers = data.filter((user: TUser) => {
    if (profileFilter === "All") {
      return true;
    }
    return user.profile.toLowerCase() === profileFilter.toLowerCase();
  });
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      {editingUserId !== null && +editingUserId !== 0 && (
        <UpdateUserForm
          user={users.find((user: TUser) => user._id === editingUserId)}
          onCancel={() => setEditingUserId(null)}
          onClose={() => setShowForm(false)}
        />
      )}

      <div className="flex w-full">
        <div className="w-full">
          <div className="ml-2 flex mt-2 ">
            <div className="container mx-auto px-4 sm:px-8">
              <div className="py-8">
                <div>
                  <h2 className="text-2xl font-semibold leading-tight">
                    List Users
                  </h2>
                </div>
                <div className="my-2 flex sm:flex-row flex-col">
                  <input
                    type="text"
                    placeholder="Search..."
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleSearch(e.currentTarget.value)
                    }
                    className="px-3 py-2 border border-gray-300 focus:outline-none rounded-lg shadow-sm"
                  />
                  <select
                    onChange={(
                      e: React.SyntheticEvent<HTMLSelectElement, Event>,
                    ) => handleProfileFilter(e.currentTarget.value)}
                    value={profileFilter}
                    className="ml-2 px-3 py-2 border border-gray-300 focus:outline-none rounded-lg shadow-sm"
                  >
                    <option value="All">All</option>
                    <option value="Commercial Agent">Agent</option>
                    <option value="Product Offering Manager">Manager</option>
                  </select>
                </div>
                <div className="mb-4">
                  {selectedUsers.length > 0 && (
                    <button
                      onClick={handleDeleteSelectedUsers}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                      Delete Selected Users
                    </button>
                  )}
                </div>
                {users.length === 0 ? (
                  <div className="flex justify-center items-center">
                    <table>
                      <tbody>
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
                  </div>
                ) : (
                  <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                      <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative min-w-full leading-normal">
                        <thead>
                          <tr className="text-left">
                            <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="form-checkbox text-gray-800"
                                  checked={selectAll}
                                  onChange={handleSelectAll}
                                />
                              </label>
                            </th>
                            <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800  text-white text-left text-xs font-semibold uppercase tracking-wider">
                              Username
                            </th>
                            <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                              Profile
                            </th>
                            <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800  text-white text-left text-xs font-semibold uppercase tracking-wider">
                              Role
                            </th>
                            <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider">
                              UserID
                            </th>

                            <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white  text-xs font-semibold uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {filteredUsers
                            .slice(indexOfFirstOrder, indexOfLastOrder)
                            .map((user: TUser, index: number) => {
                              if (user.profile !== "Administrator") {
                                return (
                                  <tr key={user._id}>
                                    <td className="border-dashed border-t border-gray-200 px-3">
                                      <label className="inline-flex items-center">
                                        <input
                                          type="checkbox"
                                          className="form-checkbox text-gray-800"
                                          checked={selectedUsers.includes(
                                            user._id,
                                          )}
                                          onChange={(event) =>
                                            handleCheckboxChange(
                                              event.currentTarget.checked,
                                              user._id,
                                            )
                                          }
                                        />
                                      </label>
                                    </td>
                                    <td className="border-dashed border-t border-gray-200 px-3">
                                      <span className="text-gray-700 hover:text-gray-500 cursor-pointer">
                                        {user.username}
                                      </span>
                                    </td>
                                    <td className="border-dashed border-t border-gray-200 px-3">
                                      <span className="text-gray-700 hover:text-gray-500 cursor-pointer">
                                        {user.profile}
                                      </span>
                                    </td>
                                    <td className="border-dashed border-t border-gray-200 px-3">
                                      <span className="text-gray-700 hover:text-gray-500 cursor-pointer">
                                        {user.role}
                                      </span>
                                    </td>
                                    <td className="border-dashed border-t border-gray-200 px-3">
                                      <span className="text-gray-700 hover:text-gray-500 cursor-pointer">
                                        {user.userID}
                                      </span>
                                    </td>

                                    <td className="border-dashed border-t border-gray-200 px-3">
                                      <div className="flex">
                                        <Link href={`/admin/user/${user._id}`}>
                                          <FaEye className="text-blue-500 text-lg" />
                                        </Link>

                                        <button
                                          className="mx-2 w-5 mr-2 transform hover:text-purple-500 hover:scale-110"
                                          //value={currentUser.id}
                                          onClick={() => handleEditUser(user)}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="green"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                            />
                                          </svg>
                                        </button>

                                        <button
                                          className="mx-2 w-5 mr-2 transform hover:text-purple-500 hover:scale-110"
                                          onClick={() =>
                                            handleDeleteUser(user._id)
                                          }
                                        >
                                          {" "}
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="red"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                          </svg>
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              }
                              return null;
                            })}
                        </tbody>
                      </table>
                    </div>
                    <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                      <span className="text-xs xs:text-sm text-gray-900">
                        Showing {indexOfFirstOrder + 1} to{" "}
                        {Math.min(indexOfLastOrder, filteredUsers.length)} of{" "}
                        {filteredUsers.length} Entries
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
                          disabled={indexOfLastOrder >= filteredUsers.length}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
