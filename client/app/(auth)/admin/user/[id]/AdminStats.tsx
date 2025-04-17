import React, { useState, useEffect } from "react";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

const AdminStatistique = () => {
  const [products, setProducts] = useState([]);
  const [productOffering, setProductOfferings] = useState([]);
  const [productOrders, setProductOreder] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await axios.get(`${AXIOS_URL}/api/user`);
        const usersData = response.data;
        setUsers(usersData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs:",
          error,
        );
      }
    }
    getUsers();
  }, []);

  useEffect(() => {
    getProductOrders();
    getProductOfferings();
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

  async function getProductOfferings() {
    try {
      const response = await axios.get(`${AXIOS_URL}/api/product-offering`);
      const allProductOfferings = response.data;
      setProductOfferings(allProductOfferings);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  }

  async function getProductOrders() {
    try {
      const response = await axios.get(
        `${AXIOS_URL}/api/customer-order/product`,
      );
      const productsData = response.data;
      setProductOreder(productsData);
    } catch (error) {
      console.error("Erreur lors de la récupération des products:", error);
    }
  }

  const totalproductSpecifications = products.length;
  const totalProductOfferings = productOffering.length;
  const totalProductOrders = productOrders.length;
  const totalUsers = users.length;
  return (
    <div>
      <div className="flex justify-center bg-white py-10 p-14">
        <div className="container mx-auto pr-4">
          <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
            <div className="h-20  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-400  flex items-center justify-between">
              <p className="mr-0 text-white text-lg pl-5">PRODUCT OFFERINGS</p>
            </div>
            <div className="flex justify-between px-5 pt-6 mb-2 text-sm text-gray-600">
              <p>TOTAL</p>
            </div>
            <p className="py-4 text-3xl ml-5">{totalProductOfferings}</p>
          </div>
        </div>

        <div className="container mx-auto pr-4">
          <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
            <div className="h-20 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400 flex items-center justify-between">
              <p className="mr-0 text-white text-lg pl-5">
                PRODUCT SPECIFICATIONS
              </p>
            </div>
            <div className="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
              <p>TOTAL</p>
            </div>
            <p className="py-4 text-3xl ml-5">{totalproductSpecifications}</p>
          </div>
        </div>
        <div className="container mx-auto pr-4">
          <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
            <div className="h-20 bg-gradient-to-r from-red-400 via-red-500 to-red-400 flex items-center justify-between">
              <p className="mr-0 text-white text-lg pl-5">Users</p>
            </div>
            <div className="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
              <p>TOTAL</p>
            </div>
            <p className="py-4 text-3xl ml-5">{totalUsers}</p>
          </div>
        </div>
        <div className="container mx-auto">
          <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
            <div className="h-20 bg-gradient-to-r from-purple-800 via-purple-900 to-purple-800 flex items-center justify-between">
              <p className="mr-0 text-white text-lg pl-5">PRODUCT ORDERS</p>
            </div>
            <div className="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
              <p>TOTAL</p>
            </div>
            <p className="py-4 text-3xl ml-5">{totalProductOrders}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistique;
