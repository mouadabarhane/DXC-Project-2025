import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

const UserChart = ({ userID }: { userID: string }) => {
  const chartRef = useRef(null);
  const [productOfferings, setProductOfferings] = useState([]);
  const [allProductOfferings, setAllProductOfferings] = useState([]);

  useEffect(() => {
    getProductOfferings(userID);
  }, [userID]);

  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: "doughnut",
        data: {
          labels: ["Produits du manager", "Autres produits"],
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
  }, [productOfferings]);

  function getProductCountByUser() {
    return productOfferings.length;
  }

  function getTotalProductCount() {
    return allProductOfferings.length;
  }

  async function getProductOfferings(userID: string) {
    try {
      const response = await axios.get(`${AXIOS_URL}/api/product-offering`);
      const allProductOfferings = response.data;
      setAllProductOfferings(allProductOfferings);
      const productOfferingsByUser = allProductOfferings.filter(
        (product: any) => product.createdBy === userID,
      );
      setProductOfferings(productOfferingsByUser);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des offres des produits :",
        error,
      );
    }
  }

  return (
    <div>
      {productOfferings.length === 0 ? (
        <div className="flex justify-center items-center">
          <div className="rounded-full border-t-4 border-blue-500 border-opacity-50 h-12 w-12 animate-spin"></div>
        </div>
      ) : (
        <canvas ref={chartRef} />
      )}{" "}
    </div>
  );
};

export default UserChart;
