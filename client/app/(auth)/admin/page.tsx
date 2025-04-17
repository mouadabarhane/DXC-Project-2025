import React from "react";
import Sidebar from "../../dashboard/components/Sidebar";
import Header from "../../dashboard/components/header/Header";

const page = () => {
  return (
    <div className="user">
      <div className="bg-gray-100 flex">
        <Sidebar />
        <div className="bg-white  min-h-screen-100 w-5/6  ">
          <Header />
        </div>
        {/* Autres composants ou contenu de la page */}
      </div>
    </div>
  );
};

export default page;
