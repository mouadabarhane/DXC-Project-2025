"use client";

import React, { useEffect, useState } from "react";

import Header from "./components/header/Header";
import Sidebar from "./components/Sidebar";
import BarChart from "./components/RecentCustomerOrders";
import StatisticCards from "./components/StatisticCards";
import Chartt from "./components/chart";
import Footer from "./components/Footer";
import TableProductOfferings from "./components/TableProductOfferings";
import CercleChart from "./components/ChartCercle";
import Cards from "./components/Cards";
import ChartProduct from "./components/ProductChart";
import AllCharts from "./components/AllCharts";

export default function DashboardHome() {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState(JSON.stringify({}));
  useEffect(() => {
    let tokenUser;
    let user;
    // Get the value from local storage if it exists
    tokenUser = localStorage.getItem("token") || "";
    setToken(tokenUser);

    user = localStorage.getItem("user") || "";
    setUsername(user);
  }, []);

  return !token && !username ? (
    (window.location.href = "/login")
  ) : (
    <div className="bg-gray-100 flex">
      <Sidebar />
      <div className="bg-white min-h-screen-100 w-5/6 ">
        <Header />
        <div className=" mx-4 py-5">
          <Cards />
          <AllCharts />
        </div>
        <div className="mx-3 mt-1 item-end   rounded-lg  p-8">
          <TableProductOfferings />
        </div>
        <div className=" mx-9 mt-4 flex p-2 ">
          <div className="mx-3 w-full rounded-lg shadow-xl p-8">
            <BarChart />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
