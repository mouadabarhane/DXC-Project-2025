// import { product_Archived } from "./data";

import Sidebar from "../../../dashboard/components/Sidebar";
import Footer from "../../../dashboard/components/Footer";
import ArchivedProductOfferings from "./components/ArchivedProductOfferings";
import Header from "../../../dashboard/components/header/Header";

export default function ArchivedProductOfferingsPage() {
  return (
    <div className="bg-gray-100 flex">
      <Sidebar />
      <div className="bg-white min-h-screen-100 w-5/6 ">
        <Header />
        <ArchivedProductOfferings />
        <Footer />
      </div>
    </div>
  );
}
