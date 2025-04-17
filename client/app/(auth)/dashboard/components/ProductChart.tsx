import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

Chart.register(...registerables);

const ChartProduct = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart<"bar", number[], string> | null>(null);
  const [products, setProductOfferings] = useState<{
    labels: string[];
    data: number[];
  }>({ labels: [], data: [] });

  //Anass: "Erreur lors de la récupération des produits" fixed

  useEffect(() => {
    getProductOfferings();
  }, []);

  async function getProductOfferings() {
    try {
      const response = await axios.get(`${AXIOS_URL}/api/product-offering`);
      const allProductOfferings = response.data;
      const months = [];
      const currentDate = new Date();
      for (let i = 0; i < 12; i += 1) {
        const date = new Date(currentDate.getFullYear(), i, 1);
        months.push(date.toLocaleString("default", { month: "long" }));
      }
      const ordersByMonth: { [key: string]: number } = {};
      months.forEach((month) => {
        ordersByMonth[month] = 0;
      });

      allProductOfferings.forEach(
        (product: { validFor?: { startDateTime?: string } }) => {
          if (product.validFor?.startDateTime) {
            const orderDate = new Date(product.validFor.startDateTime);
            const orderMonth = orderDate.toLocaleString("default", {
              month: "long",
            });
            if (
              Object.prototype.hasOwnProperty.call(ordersByMonth, orderMonth)
            ) {
              ordersByMonth[orderMonth] += 1;
            }
          }
        },
      );

      const labels = Object.keys(ordersByMonth);
      const data = Object.values(ordersByMonth);

      setProductOfferings({ labels, data });
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
    }
  }

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        const backgroundColors = [
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 205, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(201, 203, 207, 0.5)",
        ];

        const config: any = {
          type: "bar",
          data: {
            labels: products.labels,
            datasets: [
              {
                label: "Number of Product Offerings",
                data: products.data,
                backgroundColor: backgroundColors.slice(
                  0,
                  products.labels.length,
                ),
                borderColor: [
                  "rgb(255, 99, 132)",
                  "rgb(255, 159, 64)",
                  "rgb(255, 205, 86)",
                  "rgb(75, 192, 192)",
                  "rgb(54, 162, 235)",
                  "rgb(153, 102, 255)",
                  "rgb(201, 203, 207)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            maintainAspectRatio: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        };

        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart<"bar", number[], string>(ctx, config);
      } else {
        console.error("Le contexte de rendu du canvas est null.");
      }
    }
  }, [products]);

  return (
    <div>
      {products.labels.length === 0 ? (
        <div className="flex justify-center items-center ">
          <div className="rounded-full border-t-4 border-blue-500 border-opacity-50 h-12 w-12 animate-spin"></div>
        </div>
      ) : (
        <div className=" mx-auto py-4 text-center ">
          <canvas ref={chartRef} />
          <p className=" text-indigo-800 font-semibold">
            Product Offerings by Month
          </p>
        </div>
      )}
    </div>
  );
};

export default ChartProduct;
