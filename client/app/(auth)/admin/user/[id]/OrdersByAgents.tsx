import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Chart, registerables } from "chart.js";
import * as dotenv from "dotenv";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;
interface ProductOrders {
  createdBy: string;
}
Chart.register(...registerables);
const OrdersByAgents = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [productOrders, setProductOrders] = useState<ProductOrders[]>([]);
  const [chartInstance, setChartInstance] = useState<Chart<
    "doughnut",
    number[],
    string
  > | null>(null);
  useEffect(() => {
    getProductOrders();
  }, []);

  async function getProductOrders() {
    try {
      const response = await axios.get(
        `${AXIOS_URL}/api/customer-order/product`,
      );
      const productsData = response.data;
      setProductOrders(productsData);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
    }
  }
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      const nameCounts: { [key: string]: number } = {};
      productOrders.forEach((productOrder) => {
        const { createdBy } = productOrder;
        if (
          createdBy &&
          Object.prototype.hasOwnProperty.call(nameCounts, createdBy)
        ) {
          nameCounts[createdBy] += 1;
        } else {
          nameCounts[createdBy] = 1;
        }
      });

      const labels = Object.keys(nameCounts);
      const data = Object.values(nameCounts);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: "Nombre de product offerings par état",
            data: data,
            backgroundColor: [
              "rgba(255, 255, 140, 0.9)",
              "rgba(153, 102, 255, 0.9)",
              "rgba(201, 203, 207, 0.9)",
            ],
            hoverOffset: 4,
          },
        ],
      };

      if (chartInstance) {
        chartInstance.destroy();
      }

      if (ctx !== null) {
        const newChartInstance = new Chart(ctx, {
          type: "doughnut",
          data: chartData,
          options: {},
        });
        setChartInstance(newChartInstance);
      } else {
        console.error("Le contexte de rendu du canvas est null.");
      }
    }
  }, [productOrders]);
  return (
    <div className="mx-auto  text-center">
      <canvas ref={chartRef} />
      <p className="mt-2 text-gray-600 font-semibold">
        Product Orders By Agents
      </p>
    </div>
  );
};

export default OrdersByAgents;
