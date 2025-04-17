"use client";
import React, { useEffect, useRef } from "react";
// import { Chart, initTE } from "tw-elements";

// Chart.register(initTE);

const Chartt = () => {
  // const darkModeChartRef = useRef(null);

  // useEffect(() => {
  //   initTE({ Chart });

  //   const dataBarDarkMode = {
  //     type: "bar",
  //     data: {
  //       labels: [
  //         "January",
  //         "February",
  //         "March",
  //         "April",
  //         "May",
  //         "June",
  //         "July",
  //       ],
  //       datasets: [
  //         {
  //           label: "Traffic",
  //           data: [30, 15, 62, 65, 61, 65, 40],
  //         },
  //       ],
  //     },
  //   };

  //   const optionsDarkMode = {
  //     options: {
  //       scales: {
  //         y: {
  //           ticks: {
  //             color: "rgb(158, 50, 200)",
  //           },
  //           grid: {
  //             display: false,
  //           },
  //         },
  //         x: {
  //           ticks: {
  //             color: "yellow",
  //           },
  //         },
  //       },
  //       plugins: {
  //         legend: {
  //           labels: {
  //             color: "green",
  //           },
  //         },
  //       },
  //     },
  //   };

  //   if (darkModeChartRef.current) {
  //     new Chart(darkModeChartRef.current, dataBarDarkMode, {}, optionsDarkMode);
  //   }
  // }, []);

  return (
    <div className="mx-auto w-2/3 overflow-hidden">
      {/* <canvas ref={darkModeChartRef} id="darkmode-customization"></canvas> */}
    </div>
  );
};

export default Chartt;
