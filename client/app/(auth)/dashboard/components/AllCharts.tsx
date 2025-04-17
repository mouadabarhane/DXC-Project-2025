import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { CircleLoader } from "react-spinners";
import * as dotenv from "dotenv";
import CercleChart from "./ChartCercle";
import ChartProduct from "./ProductChart";
import OrderByStats from "./OrderByStats";
import Chartt from "./chart";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

interface ProductOfferings {
  link: string;
  name: string;
  description: string;
  state: string;
  internalVersion: string;
  orderDate: string;
  lastUpdate: string;
  validFor: {
    startDateTime: string;
    endDateTime: string;
  };
  month: string;
  quantity: number;
}
const AllCharts = () => {
  const [productOfferings, setProductOfferings] = useState<ProductOfferings[]>(
    [],
  );
  const [currentChart, setCurrentChart] = useState<"OrderByStats" | "Chartt">(
    "OrderByStats",
  );
  const [comparisonResult, setComparisonResult] = useState("");
  useEffect(() => {
    getProductOfferings();
  }, []);
  async function getProductOfferings() {
    try {
      const response = await axios.get(`${AXIOS_URL}/api/product-offering`);
      const allProductOfferings = response.data;
      setProductOfferings(allProductOfferings);

      const months = [];
      const currentDate = new Date();
      for (let i = 0; i < 12; i += 1) {
        const date = new Date(currentDate.getFullYear(), i, 1);
        months.push(date.toLocaleString("default", { month: "long" }));
      }

      const totalsByMonth: { [key: string]: number } = {};
      months.forEach((month) => {
        totalsByMonth[month] = 0;
      });

      allProductOfferings.forEach(
        (product: { validFor: { startDateTime: string } }) => {
          const orderDate = new Date(product.validFor.startDateTime);
          const orderMonth = orderDate.toLocaleString("default", {
            month: "long",
          });
          if (Object.prototype.hasOwnProperty.call(totalsByMonth, orderMonth)) {
            totalsByMonth[orderMonth] += 1;
          }
        },
      );

      Object.keys(totalsByMonth).forEach((month) => {
        console.log(month + ": " + totalsByMonth[month]);
      });

      const comparisonResult = compareTotals(totalsByMonth);
      setComparisonResult(String(comparisonResult));
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
    }
  }
  const handleCardClick = () => {
    setCurrentChart(
      currentChart === "OrderByStats" ? "Chartt" : "OrderByStats",
    );
  };
  function compareTotals(totals: { [key: string]: number }): string | number {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    if (currentMonth === 1) {
      return compareWithPreviousMonth(totals, "January", "December");
    } else {
      const previousMonth = getMonthName(currentMonth - 1);
      return compareWithPreviousMonth(
        totals,
        getMonthName(currentMonth),
        previousMonth,
      );
    }
  }

  function compareWithPreviousMonth(
    totalsByMonth: { [key: string]: number },
    currentMonth: string,
    previousMonth: string,
  ): string | number {
    const currentTotal = totalsByMonth[currentMonth];
    const previousTotal = totalsByMonth[previousMonth];
    if (currentTotal > previousTotal) {
      const increasePercentage = (
        ((currentTotal - previousTotal) / previousTotal) *
        100
      ).toFixed(2);
      return `+${increasePercentage}%`;
    } else if (currentTotal < previousTotal) {
      const decreasePercentage = (
        ((previousTotal - currentTotal) / previousTotal) *
        100
      ).toFixed(2);
      return `-${decreasePercentage}%`;
    } else {
      return 0;
    }
  }
  function getMonthName(month: number): string {
    const date = new Date();
    date.setMonth(month - 1);
    return date.toLocaleString("default", { month: "long" });
  }

  const totalProductOfferings = productOfferings.length;
  const PublichedProductOfferings = productOfferings.filter(
    (product) => product.state === "Published",
  );
  const totalPublichedProductOfferings = PublichedProductOfferings.length;
  {
    /*  Statistics %  Published Product Offering  */
  }
  const percentPublichedProductOfferings = Math.floor(
    (totalPublichedProductOfferings / productOfferings.length) * 100,
  );
  const totalsByMonth = {};

  return (
    <div>
      <div className="px-6 pt-6 2xl:container">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="py-8 px-6 space-y-6 rounded-xl hover:scale-105 duration-500 bg-white shadow-indigo-100 shadow-md">
              <div className="bg-white">
                <CercleChart />
              </div>
              {/* <h5 className=" mt-8 text-xl text-gray-700 text-center">
                Published
              </h5>
              <div className="my-4">
                <h3 className="text-3xl font-bold text-gray-800 text-center">
                  {percentPublichedProductOfferings}%
                </h3>
                <span className="text-gray-500">
                  Compared to last week $13,988
                </span>
              </div> */}
            </div>
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <div className=" py-8 px-6 space-y-6 rounded-xl hover:scale-105 duration-500 bg-white shadow-indigo-100 shadow-md">
              <div className=" bg-white ">
                <ChartProduct />
              </div>
              <div className="">
                <h5 className="text-xl text-gray-700 text-center">
                  Total Products
                </h5>
                <div className="flex justify-center gap-4">
                  <h3 className="text-3xl font-bold text-gray-700">
                    {totalProductOfferings}
                  </h3>
                  <div className="flex items-end gap-1 text-blue-700">
                    <span>
                      {parseFloat(comparisonResult) < 0 ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="red"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                          />
                        </svg>
                      )}
                      {comparisonResult}
                    </span>
                  </div>
                </div>

                {/* <span className="block text-center text-gray-500">
                  Compared to last week 13
                </span> */}
              </div>
            </div>
          </div>

          <div>
            <div
              className="py-8 px-6 text-gray-600 rounded-xl hover:scale-105 duration-500 bg-white shadow-indigo-100 shadow-md"
              onClick={handleCardClick}
            >
              <div className="bg-white">
                {currentChart === "OrderByStats" ? (
                  <OrderByStats />
                ) : (
                  <Chartt />
                )}
                {/* <OrderByStats /> */}
              </div>

              {/* <h5 className="text-xl text-gray-600 text-center">
                  Total Revenues
                </h5> */}
              {/* <div className="mt-2 flex justify-center gap-4">
                  <h3 className="text-3xl font-bold text-gray-700">$23,988</h3>
                  <div className="flex items-end gap-1 text-green-500">
                    <svg
                      className="w-3"
                      viewBox="0 0 12 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.00001 0L12 8H-3.05176e-05L6.00001 0Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span>2%</span>
                  </div>
                </div> */}
              {/* <span className="block text-center text-gray-500">
                  Compared to last week $13,988
                </span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCharts;
