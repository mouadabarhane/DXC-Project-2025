import React, { useState, useEffect } from "react";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

const StatistiqueSpecification = () => {
  interface ProductSpecifications {
    status: string;
  }
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductSpecifications();
  }, []);

  async function getProductSpecifications() {
    try {
      const response = await axios.get(
        `${AXIOS_URL}/api/product-specification`,
      );
      const productSpecification = response.data;
      setProducts(productSpecification);
    } catch (error) {
      console.error("Erreur lors de la récupération des services:", error);
    }
  }
  /*  Total Completed Costumer Orders */
  const PublishedProducts = products.filter(
    (order: any) => order.status === "published",
  );
  const totalPublishedProducts = PublishedProducts.length;
  // /*  Statistics %  CompletedCostumer Orders */
  // const percentCompletedProducts = Math.floor(
  //   (totalCompletedProducts / products.length) * 100,
  // );

  /*  Total In progress Costumer Orders */
  const inDraftProducts = products.filter(
    (order: any) => order.status === "draft",
  );
  const totalInDraftProducts = inDraftProducts.length;

  // /*  Statistics %  Canceled Costumer Orders */
  // const percenNewProducts = Math.floor((totalnewProducts/ products.length) * 100);

  /*  Total cancel Costumer Orders */
  const ArchivedProducts = products.filter(
    (order: any) => order.state === "archived",
  );
  const totalArchivedProducts = ArchivedProducts.length;

  // /*  Statistics %  cancel Costumer Orders */
  // const percenCanceledProducts= Math.floor(
  //   (totalInCanceledProducts / products.length) * 100,
  // );
  /*  Total cancel Costumer Orders */
  const RetiredProducts = products.filter(
    (order: any) => order.status === "retired",
  );
  const totalRetiredProducts = RetiredProducts.length;

  // /*  Statistics %  cancel Costumer Orders */
  // const percenActiveProducts = Math.floor(
  //   (totalActiveProducts / products.length) * 100,
  // );
  return (
    <div>
      <div className="flex justify-center bg-white py-10 p-14">
        <div className="container mx-auto pr-4">
          <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
            <div className="h-20 bg-gradient-to-r from-red-500 via-red-600 to-red-400  flex items-center justify-between">
              <p className="mr-0 text-white text-lg pl-5">RETIRED</p>
            </div>
            <div className="flex justify-between px-5 pt-6 mb-2 text-sm text-gray-600">
              <p>TOTAL</p>
            </div>
            <p className="py-4 text-3xl ml-5">{totalRetiredProducts}</p>
          </div>
        </div>

        <div className="container mx-auto pr-4">
          <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
            <div className="h-20  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-400  flex items-center justify-between">
              <p className="mr-0 text-white text-lg pl-5">IN DRAFT</p>
            </div>
            <div className="flex justify-between px-5 pt-6 mb-2 text-sm text-gray-600">
              <p>TOTAL</p>
            </div>
            <p className="py-4 text-3xl ml-5">{totalInDraftProducts}</p>
          </div>
        </div>

        <div className="container mx-auto pr-4">
          <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
            <div className="h-20 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400 flex items-center justify-between">
              <p className="mr-0 text-white text-lg pl-5">PUBLISHED</p>
            </div>
            <div className="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
              <p>TOTAL</p>
            </div>
            <p className="py-4 text-3xl ml-5">{totalPublishedProducts}</p>
          </div>
        </div>

        <div className="container mx-auto">
          <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
            <div className="h-20 bg-gradient-to-r from-purple-800 via-purple-900 to-purple-800 flex items-center justify-between">
              <p className="mr-0 text-white text-lg pl-5">ARCHIVED</p>
            </div>
            <div className="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
              <p>TOTAL</p>
            </div>
            <p className="py-4 text-3xl ml-5">{totalArchivedProducts}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatistiqueSpecification;
