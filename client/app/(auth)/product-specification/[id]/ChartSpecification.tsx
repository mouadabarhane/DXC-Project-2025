import React, { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import axios from "axios";
import * as dotenv from "dotenv";
import { getProductSpecification } from "../utils";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

interface ProductOfferings {
  _id: string;
  id: string;
  link: string;
  name: string;
  description: string;
  state: string;
  internalVersion: string;
  orderDate: string;
  lastUpdate: string;
  status: string;
}

const ProductOfferingsChart = ({
  params,
}: {
  params: {
    id: string;
    productSpecification: string;
    productSpecificationName: string;
    name: string;
    internalId: string;
  };
}) => {
  const [productOfferings, setProductOfferings] = useState<ProductOfferings[]>(
    [],
  );
  const [productSpec, setProductSpec] = useState<any>();

  useEffect(() => {
    getProductSpecification(params.id, setProductSpec);
  }, [params.id]);

  useEffect(() => {
    fetchData();
  }, [productSpec]);

  useEffect(() => {
    if (productOfferings.length > 0) {
      createChart();
    }
  }, [productOfferings]);

  async function fetchData() {
    try {
      const response = await axios.get(`${AXIOS_URL}/api/product-offering`);
      const allProductOfferings = response.data;
      console.log(allProductOfferings);

      const filteredOfferings = allProductOfferings.filter((offering: any) => {
        return (
          offering.productSpecification &&
          offering.productSpecification.id &&
          offering.productSpecification.id.trim() === productSpec.id.trim()
        );
      });

      console.log("filteredOfferings", filteredOfferings);
      setProductOfferings(filteredOfferings);
    } catch (error) {
      console.error("Error reading product offerings:", error);
      setProductOfferings([]);
    }
  }

  function createChart() {
    const states: { [key: string]: number } = {};
    productOfferings.forEach((offering) => {
      const state = offering.status;
      if (states[state]) {
        states[state]++;
      } else {
        states[state] = 1;
      }
    });

    const labels = Object.keys(states);
    const data = Object.values(states);
    const chart = new Chart("productOfferingsChart", {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.9)",
              "rgba(54, 162, 235, 0.9)",
              "rgba(255, 206, 86, 0.9)",
              "rgba(75, 192, 192, 0.9)",
              "rgba(153, 102, 255, 0.9)",
              "rgba(255, 159, 64, 0.9)",
            ],
          },
        ],
      },
    });
  }

  return (
    <div>
      <canvas id="productOfferingsChart"></canvas>
    </div>
  );
};

export default ProductOfferingsChart;
