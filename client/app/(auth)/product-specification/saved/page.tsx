"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import SavedProductsList from "../all/SavedProducts";
import SavedProductOfferingsList from "../../dashboard/components/SavedProductOfferings";
import Header from "../../dashboard/components/header/Header";
import Sidebar from "../../dashboard/components/Sidebar";
import cover from "../../../../public/assets/product_cover.png";

interface SavedProduct {
  _id: string;
  id: string;
  productId: string;
  status: string;
  name: string;
  description: string;
  lastUpdate: string;
  validFor: {
    startDateTime: string;
    endDateTime: string;
  };
}

interface SavedProductOfferings {
  _id: string;
  id: string;
  productId: string;
  status: string;
  link: string;
  name: string;
  description: string;
  internalVersion: string;
  lastUpdate: string;
}

const SavedProductsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [savedProducts, setSavedProducts] = useState<SavedProduct[]>([]);
  const [savedProductOfferings, setSavedProductOfferings] = useState<
    SavedProductOfferings[]
  >([]);

  const ordersPerPage = 4;

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  useEffect(() => {
    const savedProductsFromStorage = localStorage.getItem("savedProducts");
    const savedProductOfferingsFromStorage = localStorage.getItem(
      "savedProductOfferings",
    );

    if (savedProductsFromStorage) {
      const savedProductsData = JSON.parse(savedProductsFromStorage);
      setSavedProducts(savedProductsData);
    }

    if (savedProductOfferingsFromStorage) {
      const savedProductOfferingsData = JSON.parse(
        savedProductOfferingsFromStorage,
      );
      setSavedProductOfferings(savedProductOfferingsData);
    }
  }, []);

  return (
    <div>
      <div className="bg-gray-100 flex">
        <Sidebar />
        <div className="bg-white min-h-screen-100 w-5/6">
          <Header />
          <div className="h-full bg-white p-8">
            <div className="bg-white rounded-lg shadow-xl pb-8">
              <div className="w-full h-[250px]">
                <Image
                  src={cover}
                  className="w-full h-full rounded-tl-lg rounded-tr-lg"
                  alt="cover"
                />
              </div>
              <div className="flex-1 flex flex-col items-center px-8 mt-2">
                <SavedProductsList savedProducts={savedProducts} />
                <SavedProductOfferingsList
                  savedProductOfferings={savedProductOfferings}
                />
                <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                  <span className="text-xs xs:text-sm text-gray-900">
                    Showing {indexOfFirstOrder + 1} to{" "}
                    {Math.min(indexOfLastOrder, savedProducts.length)} of{" "}
                    {savedProducts.length} Entries
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
                      disabled={indexOfLastOrder >= savedProducts.length}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedProductsPage;
