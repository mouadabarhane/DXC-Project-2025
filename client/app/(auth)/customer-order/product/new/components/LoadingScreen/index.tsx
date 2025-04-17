import React from "react";
import { FaCircleNotch } from "react-icons/fa";

import "./index.css";

const LoadingScreen = ({ title = "Loading..." }) => {
  return (
    <div className="loading-screen">
      <FaCircleNotch className="loading-icon" />
      <h2 className="loading-title">{title}</h2>
    </div>
  );
};

export default LoadingScreen;
