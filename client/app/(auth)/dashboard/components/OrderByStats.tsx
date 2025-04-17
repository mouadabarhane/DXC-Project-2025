import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Chart, registerables, ChartConfiguration } from "chart.js";
import dotenv from "dotenv";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;
export type TDataCustomerOrder = {
  state: string;
  orderDate: string;
  ponr: string;
  version: string;
  _id: string;
};

Chart.register(...registerables);
const OrderByStats = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [orders, setOrders] = useState<TDataCustomerOrder[]>([]);
  const chartInstanceRef = useRef<Chart<"pie"> | null>(null);

  useEffect(() => {
    getProductOrders();
  }, []);

  async function getProductOrders() {
    try {
      const response = await axios.get(
        `${AXIOS_URL}/api/customer-order/product`,
      );
      const productsData = response.data;
      setOrders(productsData);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
    }
  }

  useEffect(() => {
    createChart();
  }, [orders]);

  function createChart() {
    const orderCountsByState: Record<string, number> = {};
    orders.forEach((order) => {
      const { state } = order;
      if (orderCountsByState[state]) {
        orderCountsByState[state]++;
      } else {
        orderCountsByState[state] = 1;
      }
    });

    const chartData = {
      labels: Object.keys(orderCountsByState),
      datasets: [
        {
          data: Object.values(orderCountsByState),
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 205, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
          ],
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    const canvas = chartRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart<"pie">(ctx, {
          type: "pie",
          data: chartData,
          options: chartOptions,
        });
      }
    }
  }

  return (
    <div>
      {orders.length === 0 ? (
        <div className="flex justify-center items-center">
          <div className="rounded-full border-t-4 border-blue-500 border-opacity-50 h-12 w-12 animate-spin"></div>
        </div>
      ) : (
        <div>
          <div className="mt-8 mx-auto text-center">
            <canvas ref={chartRef} />
          </div>
          <div className="mt-6 text-indigo-800 font-semibold text-center">
            <p>Product Orders By Stats</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderByStats;
