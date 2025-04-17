import React from "react";
import Link from "next/link";
import Image from "next/image";
import image from "../../../../public/assets/wifi-survey2.jpg";

interface SavedProduct {
  _id: string;
  productId: string;
  name: string;
  status: string;
  description: string;
  lastUpdate: string;
  validFor: {
    startDateTime: string;
    endDateTime: string;
  };
}
function getStateTextColor(status: string) {
  switch (status) {
    case "active":
      return "text-blue-900";
    case "in progress":
      return "text-yellow-900";
    case "completed":
      return "text-green-900";
    case "canceled":
      return "text-red-900";
    default:
      return "";
  }
}

function getStateBgColor(status: string) {
  switch (status) {
    case "draft":
      return "bg-blue-200 shadow-blue-300";
    case "published":
      return "bg-green-200 shadow-yellow-300";
    case "completed":
      return "bg-yellow-200 shadow-green-300";
    case "on hold":
      return "bg-orange-200 shadow-red-300";
    case "canceled":
      return "bg-red-200 shadow-red-300";
    default:
      return "";
  }
}

const SavedProductsList: React.FC<{ savedProducts: SavedProduct[] }> = ({
  savedProducts,
}) => {
  return (
    <div>
      <h2 className="text-md text-purple-800 font-semibold">
        Saved Products Specifications
      </h2>
      <div className="flex flex-wrap">
        {savedProducts.map((product) => (
          <div
            key={product.productId}
            className="card focus:outline-none mx-2 w-72 xl:mb-0 mb-8  shadow rounded-lg p-4 cursor-pointer"
          >
            <div>
              <Image
                alt="person capturing an image"
                src={image}
                className="focus:outline-none w-full h-44"
              />
            </div>
            <div className="bg-white">
              <div className="flex items-center justify-between px-4 pt-4">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`focus:outline-none ${
                      savedProducts.find(
                        (p) => p.productId === product.productId,
                      )
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke={
                      savedProducts.find(
                        (p) => p.productId === product.productId,
                      )
                        ? "purple"
                        : "gray"
                    }
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    //onClick={() => handleSaveButtonClick(product.productId)}
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2"></path>
                  </svg>
                </div>

                <div className="">
                  <p className="focus:outline-none">
                    <span
                      className={`relative inline-block px-3 py-1 font-semibold ${getStateTextColor(
                        product.status,
                      )} leading-tight`}
                    >
                      <span
                        aria-hidden
                        className={`absolute inset-0 ${getStateBgColor(
                          product.status,
                        )}  rounded-full`}
                      ></span>
                      <span
                        className={`relative inset-0 ${getStateTextColor(
                          product.status,
                        )}  rounded-full`}
                      >
                        {product.status}
                      </span>
                    </span>
                  </p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center">
                  <h2 className="focus:outline-none text-lg font-semibold line-clamp-1">
                    {product.name}
                  </h2>
                  <p className="focus:outline-none  tiem-end text-xs text-gray-600 pl-5">
                    <Link
                      href={`/product-specification/${product._id}`}
                      className=" button text-sm bg-blue-600 text-white font-semibold py-2 px-2 rounded-r flex items-end transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300"
                    >
                      Details
                    </Link>
                  </p>
                </div>
                <p className="focus:outline-none text-xs text-gray-600 mt-2 line-clamp-1">
                  {product.description}
                </p>
                <div className="flex mt-4">
                  <div>
                    <p className="focus:outline-none text-xs text-white px-2 bg-indigo-500 py-1">
                      {product?.validFor?.startDateTime}
                    </p>
                  </div>
                  <div className="pl-2">
                    <p className="focus:outline-none text-xs text-white px-2 bg-indigo-700 py-1">
                      {product?.validFor?.endDateTime}
                    </p>
                  </div>
                </div>
                {/* <div className="flex items-center justify-between py-4">
                  <h2 className="focus:outline-none text-indigo-700 text-xs font-semibold">
                    {product.lastUpdate}
                  </h2>
                  <h3 className="focus:outline-none text-indigo-700 text-xl font-semibold"></h3>
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedProductsList;
