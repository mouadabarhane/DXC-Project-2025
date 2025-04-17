"use client";
import { useEffect, useState } from "react";
import * as dotenv from "dotenv";

import ListProductOffering from "./listProductOffering";
import Header from "../../dashboard/components/header/Header";
import Footer from "../../dashboard/components/Footer";
import Sidebar from "../../dashboard/components/Sidebar";

/*
dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

type ProductOffering = {
  id: string;
  number: string;
  name: string;
  description: string;
  productSpecification: { name: string };
  version: string;
  state: string;
  validFor: { startDateTime: string };
};

*/

export default function AllProductOfferingsPage() {
 /* const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;
  const [products, setProducts] = useState<ProductOffering[]>([]);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${AXIOS_URL}/api/product-offering/`)
        .then((data) => data.json())
        .catch((e) => console.log(e));
      console.log(res);
      setProducts(res);
    } catch (error) {
      console.error(error);
    }
  };
  */
  return (
    <div>
      <div className="bg-gray-100 flex">
        <Sidebar />
        <div className="bg-white  min-h-screen-100 w-5/6">
          <Header />
          <h1 className="text-center text-blue-700 text-4xl font-bold my-5">
            All Product Offerings
          </h1>
          <ListProductOffering />

          <Footer />
        </div>
      </div>
    </div>
  );
}
