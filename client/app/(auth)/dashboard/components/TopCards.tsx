import React from "react";
import DataOrders from "../data/dataOrders";
import dataCostumerOrders from "../data/dataCostumerOrders";
import dataProductOfferings from "../data/dataProductOfferings";
import dataCostumers from "../data/dataCostumers";

const TopCards = () => {
  /* Product Orders */
  const newProductOrders = dataCostumerOrders.filter(
    (order) => order.state === "new" && order.category === "product",
  );
  const totalProductOrders = newProductOrders.length;

  /*  Service Orders*/
  const newSeriveOrders = dataCostumerOrders.filter(
    (order) => order.state === "new" && order.category === "service",
  );
  const totalNewSerivceOrders = newSeriveOrders.length;

  /*  product offerings*/
  const newProductOfferings = dataProductOfferings.filter(
    (productOff) => productOff.state === "new",
  );
  const totalNewProductOfferings = newProductOfferings.length;

  /* Customers */
  const totalCostumer = dataCostumers.length;

  return (
    <div>
      <div className="ml-6 grid lg:grid-cols-4 gap-4 p-4 ">
        {/* Carte New orders**/}
        <div className="bg-white flex justify-between hover:scale-105 duration-500 w-full border p-4 rounded-lg cursor-pointer shadow-lg shadow-gray-500 md:shadow-1/2xl md:shadow-orange-200  ">
          <div className="flex flex-col w-50 pb-2">
            <p className="text-gray-600 mr-0 text-xl  font-bold pl-5">
              New Product Orders :{" "}
              <span className="text-2xl font-bold test-gray-400">
                {totalProductOrders}
              </span>{" "}
            </p>
          </div>
          <p className="flex justify-center items-center p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="orange"
              className="w-8 h-8"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                clipRule="evenodd"
              />
            </svg>
          </p>
        </div>

        {/* Carte des nouvelles commandes */}
        <div className="bg-white flex justify-between  hover:scale-105 duration-500 w-full border p-4 rounded-lg cursor-pointer shadow-lg shadow-gray-500 md:shadow-1/2xl md:shadow-green-300  ">
          <div className="flex flex-col w-50 pb-2">
            <p className="text-gray-600 mr-0 text-xl  font-bold pl-5">
              New Service Orders:{" "}
              <span className="text-2xl font-bold test-gray-400">
                {totalNewSerivceOrders}
              </span>{" "}
            </p>
          </div>
          <p className=" flex justify-center items-center p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="green"
              className="w-8 h-8"
            >
              <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
            </svg>
          </p>
        </div>
        <div className=" bg-white flex justify-between  hover:scale-105 duration-500 w-full border p-4 rounded-lg cursor-pointer shadow-lg shadow-gray-500 md:shadow-1/2xl md:shadow-purple-300  ">
          <div className="flex flex-col w-full pb-4">
            <p className="text-gray-600 mr-0 text-xl  font-bold pl-5">
              New Product Offerings :
              <span className="text-2xl font-bold test-gray-400">
                {" "}
                {totalNewProductOfferings}
              </span>{" "}
            </p>
          </div>
          <p className=" flex justify-center items-center p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="purple"
              className="w-8 h-8"
            >
              <path d="M11.25 3v4.046a3 3 0 00-4.277 4.204H1.5v-6A2.25 2.25 0 013.75 3h7.5zM12.75 3v4.011a3 3 0 014.239 4.239H22.5v-6A2.25 2.25 0 0020.25 3h-7.5zM22.5 12.75h-8.983a4.125 4.125 0 004.108 3.75.75.75 0 010 1.5 5.623 5.623 0 01-4.875-2.817V21h7.5a2.25 2.25 0 002.25-2.25v-6zM11.25 21v-5.817A5.623 5.623 0 016.375 18a.75.75 0 010-1.5 4.126 4.126 0 004.108-3.75H1.5v6A2.25 2.25 0 003.75 21h7.5z" />
              <path d="M11.085 10.354c.03.297.038.575.036.805a7.484 7.484 0 01-.805-.036c-.833-.084-1.677-.325-2.195-.843a1.5 1.5 0 012.122-2.12c.517.517.759 1.36.842 2.194zM12.877 10.354c-.03.297-.038.575-.036.805.23.002.508-.006.805-.036.833-.084 1.677-.325 2.195-.843A1.5 1.5 0 0013.72 8.16c-.518.518-.76 1.362-.843 2.194z" />
            </svg>
          </p>
        </div>
        <div className="bg-white flex justify-between w-full hover:scale-105 duration-500 border p-4 rounded-lg cursor-pointer shadow-lg shadow-gray-500 md:shadow-1/2xl md:shadow-indigo-300 ">
          <div className="flex flex-col w-full pb-4">
            <p className="text-gray-600 mr-0 text-xl  font-bold pl-5">
              {" "}
              All Costumers :{" "}
              <span className="text-2xl font-bold test-gray-400">
                {totalCostumer}
              </span>{" "}
            </p>
          </div>
          <p className="flex justify-center items-center p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="indigo"
              className="w-8 h-8"
            >
              <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
            </svg>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopCards;
