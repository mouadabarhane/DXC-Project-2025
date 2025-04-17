import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

Chart.register(...registerables);

const BarChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart<"bar", number[], string> | null>(null);
  const [products, setProducts] = useState<{
    labels: string[];
    data: number[];
  }>({ labels: [], data: [] });

  useEffect(() => {
    getProductOrders();
  }, []);

  async function getProductOrders() {
    try {
      const response = await axios.get(
        `${AXIOS_URL}/api/customer-order/product`,
      );
      const productsData = response.data;
      // Obtenez les mois de la date actuelle à la date actuelle moins 6 mois
      const months = [];
      const currentDate = new Date();
      for (let i = 0; i < 12; i += 1) {
        const date = new Date(currentDate.getFullYear(), i, 1);
        months.push(date.toLocaleString("default", { month: "long" }));
      }

      // Initialisez un objet pour stocker le décompte des commandes par mois
      const ordersByMonth: { [key: string]: number } = {};
      months.forEach((month) => {
        ordersByMonth[month] = 0;
      });

      // Parcourez les données des produits et incrémentez le décompte des commandes pour chaque mois correspondant
      productsData.forEach((product: { orderDate: string }) => {
        const orderDate = new Date(product.orderDate);
        const orderMonth = orderDate.toLocaleString("default", {
          month: "long",
        });
        if (Object.prototype.hasOwnProperty.call(ordersByMonth, orderMonth)) {
          ordersByMonth[orderMonth] += 1;
        }
      });

      // Convertissez le décompte des commandes par mois en un tableau pour les étiquettes et les données du graphique
      const labels = Object.keys(ordersByMonth);
      const data = Object.values(ordersByMonth);

      setProducts({ labels, data });
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
    }
  }

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        const backgroundColors = [
          "rgba(255, 99, 132, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(255, 205, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(201, 203, 207, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(255, 255, 140, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(201, 203, 207, 0.7)",
        ];

        const config: any = {
          type: "bar",
          data: {
            labels: products.labels,
            datasets: [
              {
                label: "Nombre de commandes",
                data: products.data,
                backgroundColor: backgroundColors.slice(
                  0,
                  products.labels.length,
                ),
                borderColor: [
                  "rgb(255, 99, 132,0.9)",
                  "rgb(255, 159, 64,0.9)",
                  "rgb(255, 205, 86,0.9)",
                  "rgb(75, 192, 192,0.9)",
                  "rgb(54, 162, 235,0.9)",
                  "rgb(153, 102, 255,0.9)",
                  "rgb(201, 203, 207,0.9)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
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
        <div className="flex justify-center items-center">
          <div className="rounded-full border-t-4 border-blue-500 border-opacity-50 h-12 w-12 animate-spin"></div>
        </div>
      ) : (
        <div className=" mt-14 mx-auto py-4 text-center">
          <canvas ref={chartRef} />
          <p className=" mt-12 text-indigo-800 font-semibold">
            Product Orders By Month
          </p>
        </div>
      )}

      {/* <div className="item-end">
        <p className="mt-2 text-gray-600 font-semibold">Total Revenue : </p>
      </div> */}
    </div>
  );
};

export default BarChart;
