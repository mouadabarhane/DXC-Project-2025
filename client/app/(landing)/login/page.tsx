"use client";

// Importing modules
import React, { SyntheticEvent, useState, useEffect } from "react";
import axios from "axios";
import * as dotenv from "dotenv";
import Swal from "sweetalert2";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

// Importing components
import Image from "next/image";

// Importing assets
import dxc from "../../../public/assets/dxc.jpg";
import loginpic from "../../../public/assets/loginpic.svg";

// Importing styles
import styles from "../../home.module.css";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

export default function loginPage() {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const url = `${AXIOS_URL}/api/user/login`;
      // const url = "https://dxc-pfe-project-server.vercel.app/api/user/login";:
      const { data: res } = await axios.post(
        url,
        { userID, password },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        },
      );
      console.log(res.data);
      console.log(res.user);
      localStorage.setItem("token", res.data);
      localStorage.setItem("user", JSON.stringify(res.user));
      //alert(res.message);
      window.location.href = "/dashboard";
      // <Redirect to="/login"/>
      //console.log(res.message);
    } catch (err: any) {
      if (err.response || err.response.status >= 400 || err.response <= 500) {
        setError(err.response.data.message);
        console.log(err.response.data.message);
      }
      // console.log(err);
    }
  };

  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    let tokenUser;
    let user;
    // Get the value from local storage if it exists
    tokenUser = localStorage.getItem("token") || "";
    setToken(tokenUser);

    user = localStorage.getItem("user") || "";
    setUsername(user);
  }, []);

  return token && username ? (
    (window.location.href = "/dashboard")
  ) : (
    <div className="login ">
      <div className="relative">
        <div
          className="flex flex-col items-center justify-between pt-20 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
          xl:px-5 lg:flex-row"
        >
          <form onSubmit={handleSubmit} method="POST">
            <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
              <div className="w-full bg-cover relative max-w-md mr-10 lg:max-w-2xl lg:w-7/12">
                <div className="">
                  <Image src={loginpic} className="btn-" alt="" />
                </div>
              </div>
              <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
                <div
                  className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
                relative z-10"
                >
                  <Image
                    className="h-20 w-auto flex justify-center"
                    src={dxc}
                    alt="logo"
                  />
                  <span className="border-b-[1px] border-purple-200 w-2/3 p-3 md:w-32 lg:w-48"></span>
                  <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight purple-header-links">
                    Sign in to your account
                  </h2>
                  {error ? (
                    <div className="text-red-500 flex justify-center mt-5">
                      <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                      {error}
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                    <div className="relative">
                      <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                        UserID
                      </p>
                      <input
                        id="userID"
                        name="userID"
                        type="text"
                        autoComplete="userID"
                        onChange={(e) => {
                          setUserID(e.target.value);
                        }}
                        required
                        placeholder="exemple.exemple"
                        className="border placeholder-gray-400 focus:outline-none
                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                      border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="relative">
                      <p
                        className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                      absolute"
                      >
                        Password
                      </p>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        required
                        placeholder="Password"
                        className="border placeholder-gray-400 focus:outline-none
                      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                      border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="relative">
                      <button
                        type="submit"
                        className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-purple-800
                      rounded-lg transition duration-200 hover:bg-indigo-600 ease "
                      >
                        Log In
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
