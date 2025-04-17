"use client";
import React, { useState, useEffect, ReactNode } from "react";

import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import { FiArchive } from "react-icons/fi";
import Image from "next/image";
import avatar from "../../../../public/assets/avatar.png";
import SideBarData from "../data/SidebarData";

type SidebarProps = {
  children: ReactNode;
};

const Sidebar = () => {
  const [localToken, setLocalToken] = useState("");
  const [localUser, setLocalUser] = useState("{}");

  useEffect(() => {
    let token;
    let user;
    // Get the value from local storage if it exists
    token = localStorage.getItem("token") || "";
    setLocalToken(token);

    user = localStorage.getItem("user") || "";
    setLocalUser(user);
  }, []);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const renderIcon = (id: string) => {
    switch (id) {
      case "0":
        return <RxDashboard size={20} color="gray" />;
      case "1":
        return <FiArchive size={20} color="gray" />;
      default:
        return null;
    }
  };

  const name = localUser
    ? JSON.parse(localUser).username
      ? JSON.parse(localUser).username.toUpperCase()
      : ""
    : "";
  const profile = localUser ? JSON.parse(localUser).profile : "";
  const data = SideBarData.filter((item: any) =>
    item.profile.includes(profile),
  );

  return (
    <div className="w-1/6  shadow-lg bg-white lg:flex  tracking-tight flex-col flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto ">
      <div className="flex flex-col bg-white-100 items-center justify-center  mt-2 ">
        <div className="flex flex-col items-center mt-2">
          <Image
            className="hidden h-24 w-24 bg-white rounded-full sm:block object-cover mr-2 border-4 tracking-tight flex-col flex-grow md:block px-4 pb-4 border-purple-700"
            src={avatar}
            alt="user image"
          />
          <h5 className="pt-2 font-semibold mb-1 tracking-widest font-small text-gray-900 text-lg md:text-sm sm:text-xs lg:text-lg">
            {name}
          </h5>
          <span className="text-sm font-semibold text-gray-500">
            <span className="inline-block w-3 h-3 rounded-full bg-green-500 tracking-widest"></span>
            {profile}
          </span>
        </div>
        <span className="border-b-[1px] border-white p-3 w-16 md:w-32 lg:w-48"></span>
      </div>
      <div className="flex mt-3 flex-col space-y-0.5 ">
        {data.map((item) => (
          <Link href={item.path} key={item.id}>
            <div className="cursor-pointer p-3 inline-flex items-center">
              <div className="border rounded-md   text-white bg-gradient-to-r from-purple-800 via-purple-700 to-pink-400 bg-white w-[30px] h-[30px] flex items-center justify-center md:flex tracking-tight">
                {item.icon}
              </div>
              {/* Appel à une fonction renderIcon pour afficher l'icône correspondante */}
              <p className="hidden md:flex-1 ml-3 font-semibold text-left whitespace-nowrap text-gray-900 lg:flex tracking-tight hover:font-bold hover:text-purple-800">
                {item.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <span className="border-b-[2px] border-white mx-auto p-3 w-16 md:w-32 lg:w-48"></span>
    </div>
  );
};

export default Sidebar;
