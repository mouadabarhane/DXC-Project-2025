import React from "react";
import Link from "next/link";
import Image from "next/image";
import cover from "../../../../public/assets/product_cover.png";
import images from "../../../../public/assets/home_internet.png";

interface SavedProductOffering {
  _id: any;
  id: string;
  productId: string;
  status: string;
  link: string;
  name: string;
  description: string;
  internalVersion: string;
  lastUpdate: string;
}

function getStateTextColor(status: string) {
  switch (status) {
    case "retired":
      return " text-white";
    case "published":
      return "text-blue-900";
    case "draft":
      return "text-white";
    case "archived":
      return "text-red-900";
    default:
      return "";
  }
}

function getStateBgColor(status: string) {
  switch (status) {
    case "retired":
      return "bg-red-600 shadow-red-300";
    case "draft":
      return "bg-purple-600  shadow-yellow-300";
    case "published":
      return "bg-green-200 shadow-green-300";
    case "archived":
      return "bg-yellow-200 shadow-yellow-300";
    default:
      return "";
  }
}

const SavedProductOfferingsList: React.FC<{
  savedProductOfferings: SavedProductOffering[];
}> = ({ savedProductOfferings }) => {
  return (
    <div>
      <h2 className=" mt-4 text-md text-purple-800 font-semibold">
        Saved Product Offerings
      </h2>
      <div className="flex flex-wrap">
        {savedProductOfferings.map((offering) => (
          <div
            key={offering._id}
            //className="bg-white rounded shadow-lg  p-4"
          >
            <div className="mx-2 mt-2 container ">
              <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-6">
                <div className="flex flex-col">
                  <div className="">
                    <div className="relative h-62 w-full mb-3">
                      <div className="absolute flex flex-col top-0 right-0 p-3">
                        <button className="transition ease-in duration-300 bg-white hover:text-purple-500 shadow hover:shadow-md text-gray-500 rounded-full w-8 h-8 text-center p-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke={
                              savedProductOfferings.find(
                                (p) => p.productId === offering._id,
                              )
                                ? "purple"
                                : "gray"
                            }
                            // onClick={() => handleSaveButtonClick(offering._id)}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>
                      </div>
                      <Image
                        src={images}
                        alt="Just a flower"
                        className="w-full h-full object-fill rounded-2xl"
                      />
                    </div>
                    <div className="flex-auto justify-evenly">
                      <div className="flex flex-wrap">
                        <div className="w-full flex-none text-sm flex items-center text-gray-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-red-500 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-gray-400 whitespace-nowrap mr-3">
                            4.60
                          </span>
                          <span className="test-md text-gray-400">
                            {offering.name}
                          </span>
                        </div>
                        <div className="flex items-center w-full justify-between min-w-0 ">
                          <h2 className="text-lg mr-auto cursor-pointer text-purple-800  font-semibold hover:text-purple-500 truncate">
                            {offering.description}
                          </h2>
                          {/* <div className="flex items-center bg-green-400 text-white text-xs px-8 py-1 ml-3 rounded-lg"></div> */}
                        </div>
                      </div>
                      <div className="text-xl text-white font-semibold mt-1">
                        $240.00
                      </div>
                      <div className="lg:flex py-4 text-sm text-gray-600">
                        <div className="flex-1 inline-flex items-center mb-3">
                          <span
                            className={`relative inline-block px-3 py-1 font-semibold ${getStateTextColor(
                              offering.status,
                            )} leading-tight`}
                          >
                            <span
                              aria-hidden
                              className={`absolute inset-0 ${getStateBgColor(
                                offering.status,
                              )} rounded-full`}
                            ></span>
                            <span
                              className={`relative inset-0 ${getStateTextColor(
                                offering.status,
                              )} rounded-full`}
                            >
                              {offering.status}
                            </span>
                          </span>
                        </div>
                        <div className="flex space-x-2 text-sm font-medium justify-start">
                          <button
                            onClick={() => {
                              window.location.href = `/product-offering/${offering._id}`;
                            }}
                            className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-gradient-to-r from-purple-800 via-purple-700 to-pink-400 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600"
                          >
                            <span>View Details</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedProductOfferingsList;
