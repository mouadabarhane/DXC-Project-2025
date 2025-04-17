"use client";
import * as dotenv from "dotenv";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import Product from "../../product-offering/all/product";
import Sliderpro from "../components/Sliderpro";

const HomePage = () => {
  dotenv.config();
  const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    await axios.get(`${AXIOS_URL}/api/product-offering`).then((response) => {
      setData(response.data);
    });
  }
  useEffect(() => {
    getData();
  }, []);

  const recentOffers = data.sort((a, b) => {
    const date1 = new Date(a);
    const date2 = new Date(b);
    return date2.getTime() - date1.getTime();
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  {
    /*  Le code pour afficher 5 commande*/
  }

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

  return (
    <div>
      {/* <Header /> */}
      <div>
        {/* <div id="sticky-banner"  className="fixed top-0  z-50  justify-between w-full p-4 "> */}
        <div>
          <div className="sticky top-0   z-50 ...">
            <Header />
          </div>
          <div>
            <Sliderpro />

            {/* <Sliderpro />  */}
            <div className="grid sm:grid-cols-1 gap-4 md:grid-cols-4 m-3 ">
              {data
                .slice(indexOfFirstOrder, indexOfLastOrder)
                .map((product: any, index: number) => (
                  <ProductCard key={index} product={product} />
                ))}
            </div>

            <div className="bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
              <span className="text-xs xs:text-sm text-gray-900">
                Showing {indexOfFirstOrder + 1} to{" "}
                {Math.min(indexOfLastOrder, recentOffers.length)} of{" "}
                {recentOffers.length} Entries
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button
                  className="text-sm bg-gradient-to-r from-purple-800 via-purple-700 to-purple-600 hover:bg-purple-400 text-white font-semibold py-2 px-4 rounded-l"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className="text-sm bg-gradient-to-r from-purple-800 via-purple-700 to-purple-600 hover:bg-purple-400 text-white font-semibold py-2 px-4 rounded-r"
                  onClick={handleNextPage}
                  disabled={indexOfLastOrder >= recentOffers.length}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
