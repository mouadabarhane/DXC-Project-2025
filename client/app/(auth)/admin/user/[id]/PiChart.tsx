import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

export type TUser = {
  _id: string;
  id: string;
  profile: string;
  username: string;
  password: string;
  role: string;
  userID: string;
};

const PieChart = () => {
  const chartRef = useRef(null);
  const [users, setUsers] = useState<TUser[]>([]);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: "pie",
        data: {
          labels: getUserLabels(),
          datasets: [
            {
              label: "User Profiles",
              data: getUserCounts(),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(201, 203, 207, 0.2)",
              ],
              hoverOffset: 4,
            },
          ],
        },
        options: {},
      });

      return () => {
        chart.destroy();
      };
    }
  }, [users]);

  function getUserLabels() {
    const uniqueValues = Array.from(new Set(users.map((user) => user.profile)));
    return uniqueValues;
  }

  function getUserCounts() {
    const userCounts = getUserLabels().map(
      (label) => users.filter((user) => user.profile === label).length,
    );
    return userCounts;
  }

  async function getUsers() {
    try {
      const response = await axios.get<TUser[]>(`${AXIOS_URL}/api/user`);
      const usersData = response.data;
      setUsers(usersData);
    } catch (error) {
      console.error("Error retrieving users:", error);
    }
  }

  return <canvas ref={chartRef} />;
};

export default PieChart;
