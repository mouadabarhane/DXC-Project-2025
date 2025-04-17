import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

const AgentChart = ({ userID }: { userID: string }) => {
  const chartRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [allProductOrders, setAllProductOrders] = useState([]);

  useEffect(() => {
    getProductOrders(userID);
  }, [userID]);

  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: "doughnut",
        data: {
          labels: ["Agent Order", "Others"],
          datasets: [
            {
              data: [
                getProductCountByUser(),
                getTotalProductCount() - getProductCountByUser(),
              ],
              backgroundColor: [
                "rgba(255, 99, 132, 0.9)",
                "rgba(255, 255, 140, 0.9)",
                "rgba(255, 159, 64, 0.9)",
              ],
              hoverOffset: 4,
            },
          ],
        },
      });

      return () => {
        chart.destroy();
      };
    }
  }, [products]);

  function getProductCountByUser() {
    return products.length;
  }

  function getTotalProductCount() {
    return allProductOrders.length;
  }

  async function getProductOrders(userID: string) {
    try {
      const response = await axios.get(
        `${AXIOS_URL}/api/customer-order/product`,
      );
      const productsData = response.data;
      setAllProductOrders(productsData);
      const ordersByUser = productsData.filter(
        (order: any) => order.createdBy === userID,
      );
      setProducts(ordersByUser);
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes :", error);
    }
  }

  return (
    <div>
      {products.length === 0 ? (
        <div className="flex justify-center items-center">
          <div className="rounded-full border-t-4 border-blue-500 border-opacity-50 h-12 w-12 animate-spin"></div>
        </div>
      ) : (
        <div className="w-full flex justify-center ">
          <canvas ref={chartRef} />
        </div>
      )}
    </div>
  );
};

export default AgentChart;
