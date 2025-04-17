import React from "react";
import "./styles.css";
import Header from "../../dashboard/components/header/Header";
import Footer from "../../dashboard/components/Footer";
import ProductOrders from "./components/ProductOrders";
import Sidebar from "../../dashboard/components/Sidebar";

export default function ProductCustomerOrdersPage() {
  return (
    <div className="product-customer-orders">
      <div className="bg-gray-100 flex">
        <Sidebar />
        <div className="bg-white min-h-screen-100 w-5/6">
          <Header />
          <ProductOrders />
          <Footer />
        </div>
      </div>
    </div>
  );
}
