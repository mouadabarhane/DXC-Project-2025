import React from "react";

const Statistique = () => {
  return (
    <div>
      <div className="flex justify-center bg-white py-10 p-14">
        <div className="container mx-auto pr-4">
          <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
            <div className="h-20 bg-gradient-to-r from-red-500 via-red-600 to-red-400  flex items-center justify-between">
              <p className="mr-0 text-white text-lg pl-5">RETIRED</p>
            </div>
            <div className="flex justify-between px-5 pt-6 mb-2 text-sm text-gray-600">
              <p>TOTAL</p>
              <h3 className="mt-2 text-3xl font-bold leading-8">
                {" "}
                {/* Total: {totalCompletedOrders}{" "} */}
              </h3>

              <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-400 w-12 h-12  rounded-full shadow-xl shadow-green-300 border-white   border-2  flex justify-center items-center ">
                <div>
                  <h1 className="text-white mt-1 text-base">
                    %<br />
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto pr-4">
          <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
            <div className="h-20  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-400  flex items-center justify-between">
              <p className="mr-0 text-white text-lg pl-5">IN DRAFT</p>
            </div>
            <div className="flex justify-between px-5 pt-6 mb-2 text-sm text-gray-600">
              <p>TOTAL</p>
              <h3 className="mt-2 text-3xl font-bold leading-8">
                {" "}
                {/* Total: {totalCompletedOrders}{" "} */}
              </h3>

              <div className=" bg-gradient-to-r from-blue-500 via-blue-600 to-blue-400 w-12 h-12  rounded-full shadow-xl shadow-green-300 border-white   border-2  flex justify-center items-center ">
                <div>
                  <h1 className="text-white mt-1 text-base">
                    %<br />
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto pr-4">
          <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
            <div className="h-20 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400 flex items-center justify-between">
              <p className="mr-0 text-white text-lg pl-5">PUBLISHED</p>
            </div>
            <div className="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
              <p>TOTAL</p>
              <h3 className="mt-2 text-3xl font-bold leading-8">
                {" "}
                {/* Total: {totalCompletedOrders}{" "} */}
              </h3>

              <div className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400 w-12 h-12  rounded-full shadow-xl shadow-green-300 border-white   border-2  flex justify-center items-center ">
                <div>
                  <h1 className="text-white mt-1 text-base">
                    %<br />
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto">
          <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
            <div className="h-20 bg-gradient-to-r from-purple-800 via-purple-900 to-purple-800 flex items-center justify-between">
              <p className="mr-0 text-white text-lg pl-5">REJECTED</p>
            </div>
            <div className="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
              <p>TOTAL</p>
              <h3 className="mt-2 text-3xl font-bold leading-8">
                {" "}
                {/* Total: {totalCompletedOrders}{" "} */}
              </h3>

              <div className="bg-gradient-to-r from-purple-800 via-purple-900 to-purple-800 w-12 h-12  rounded-full shadow-xl shadow-green-300 border-white   border-2  flex justify-center items-center ">
                <div>
                  <h1 className="text-white mt-1 text-base">
                    %<br />
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistique;
