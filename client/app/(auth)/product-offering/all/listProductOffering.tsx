"use client";

import React, { useEffect, useState } from "react";
import "./form.css";
import { useRouter } from "next/navigation";
import * as dotenv from "dotenv";
import Product from "./product";
import IProductOfferingDocument from "../../../../../server/models/product-offering/IProductOffering";
import axios, { AxiosError } from "axios";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

interface ProductProps {
  product: IProductOfferingDocument;
}
const listProductOffering: React.FC = () => {
  const router = useRouter();
  const [products, setProducts] = useState<IProductOfferingDocument[]>([]);
  const [productsOriginData, setProductsOriginData] = useState<
    IProductOfferingDocument[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  // const records = products.slice(firstIndex, lastIndex);
  const [searchTerm, setSearchTerm] = useState<string>("");


  const [productSpecifications, setProductSpecifications] = useState<
    {
      _id: string;
      name: string;
      id: string;
      version: string;
      internalVersion: string;
      internalId: string;
    }[]
  >([]);


  useEffect(() => {
    fetchProducts();
    fetchProductSpecifications();
  }, []);

  const fetchProducts = async () => {
    try {
      
      const res = await fetch(`${AXIOS_URL}/api/product-offering/`);
      if (!res.ok) {
        throw new Error(
          `Failed to fetch products: ${res.status} ${res.statusText}`,
        );
      }
      const data = await res.json();
     // console.log(data); // Log the parsed data
      setProducts(data);
      setProductsOriginData(data);
      // setCurrentPage(1);
    } catch (error) {
      console.error(error);
    }
  };


  /*
  * oussama : I moved this from the product component to this component for better performance
              and added a filter to fetch only valid product specifications      
  */
  const fetchProductSpecifications = async () => {
    try {
      const url = `${AXIOS_URL}/api/product-specification`;
      const response = await axios.get(url);
      const data = response.data;
     const validData = data.filter((productSpec:any) => {
        return productSpec.status=="published"
      });
      console.log( " published product specifications : ", validData);
      setProductSpecifications(validData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const filtredProducts = productsOriginData.filter((product) => {
      const productValues = Object.values(product).join(" ").toLowerCase();
      const isMatchingSearchTerm = productValues.includes(
        searchTerm.toLowerCase(),
      );

      return isMatchingSearchTerm;
    });

    setProducts(filtredProducts);
    // console.log(filtredProducts);
  }, [searchTerm]);

  return (
    <div className="inline-block min-w-full" style={{ padding: 60 }}>
      <div className="my-2 flex sm:flex-row flex-col">
        <div className="block relative">
          <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current text-gray-500"
            >
              <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
            </svg>
          </span>
          <input
            placeholder=" Search"
            className="mx-2 px-3 py-2 border border-gray-300 focus:outline-none rounded-lg shadow-sm"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <table className="min-w-full leading-normal shadow rounded-lg overflow-hidden">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {/* <th scope="col" className="px-6 py-3">
              Number
            </th> */}
            <th
              scope="col"
              className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider text-center"
            >
              Display Name
            </th>
            <th
              scope="col"
              className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider text-center"
            >
              Description
            </th>
            <th
              scope="col"
              className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider text-center"
            >
              Product Specification
            </th>
            <th
              scope="col"
              className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider text-center"
            >
              Version
            </th>
            <th
              scope="col"
              className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider text-center"
            >
              State
            </th>
            <th
              scope="col"
              className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider text-center"
            >
              Start Date
            </th>
            <th
              scope="col"
              className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold uppercase tracking-wider text-center"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-4">
                <div
                  className="flex justify-center items-center rounded-full border-t-4 border-blue-500 border-opacity-50 h-12 w-12 animate-spin"
                  style={{ margin: "0 auto" }}
                ></div>
              </td>
            </tr>
          ) : (
            products
              .slice(firstIndex, lastIndex)
              .map((product) => <Product key={product._id} product={product} specifications={productSpecifications} />)
          )}
        </tbody>
      </table>
      <nav className="px-5 py-5 border-t flex justify-center">
        <ul className="pagination flex space-x-2">
          <li className="page-item">
            <a
              href="#"
              onClick={prePage}
              className="text-sm bg-gradient-to-r from-purple-800 via-purple-700 to-purple-600 hover:bg-purple-400 text-white font-semibold py-2 px-4 rounded-l"
            >
              Prev
            </a>
          </li>
          <li>
            <span className="text-xs xs:text-sm text-gray-900">
              Showing {firstIndex + 1} to {Math.min(lastIndex, products.length)}{" "}
              of {products.length} Entries
            </span>
          </li>
          {/* {numbers.map((n, i) => (
            <li
              className={`page-item ${currentPage === n ? "active" : ""}`}
              key={i}
            >
              <a href="#" onClick={() => changePage(n)}>
                {n}
              </a>
            </li>
          ))} */}
          <li className="page-item">
            <a
              href="#"
              onClick={nextPage}
              className="text-sm bg-gradient-to-r from-purple-800 via-purple-700 to-purple-600 hover:bg-purple-400 text-white font-semibold py-2 px-4 rounded-r"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
  function prePage() {
    setCurrentPage(currentPage - 1);
  }
  function nextPage() {
    setCurrentPage(currentPage + 1);
  }
  // function changePage(n: number): void {
  //   setCurrentPage(n);
  // }
};

export default listProductOffering;
